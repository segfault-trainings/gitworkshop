.PHONY: build clean all builddir slides handout

TMP := build

SVGS := $(shell find assets/diagrams/* -maxdepth 0 -name '*.svg')
PNGS = $(patsubst %.svg,$(TMP)/%.pdf,$(SVGS))

all: slides handout
	test -d ~/public_html && cp -f gitworkshop.pdf gitworkshop\ Handout.pdf ~/public_html/ || true

slides: build-dir $(PNGS)
	cd $(TMP) && pdflatex ../gitworkshop.tex
	cd $(TMP) && pdflatex ../gitworkshop.tex
	mv $(TMP)/gitworkshop.pdf GitWorkshop_Slides.pdf
	cp GitWorkshop_Slides.pdf GitWorkshop_Slides_$(shell date "+%Y-%m-%d").pdf

handout: build-dir $(PNGS)
	cd $(TMP) && HANDOUT=1 pdflatex ../gitworkshop.tex
	cd $(TMP) && HANDOUT=1 pdflatex ../gitworkshop.tex
	mv $(TMP)/gitworkshop.pdf GitWorkshop_Handout.pdf
	cp GitWorkshop_Handout.pdf GitWorkshop_Handout_$(shell date "+%Y-%m-%d").pdf

build-dir:
	mkdir -p $(TMP)/assets/diagrams

$(TMP)/%.pdf: %.svg
	inkscape $< --without-gui --export-area-drawing --export-dpi=600 --export-pdf $@

clean:
	rm -rf $(TMP)

pull-image:
	docker pull blang/latex

travis-run-container:
	docker run --rm -ti -v $(shell pwd):/data blang/latex sh -c "apt update && apt install -y inkscape && make"
