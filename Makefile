.PHONY: gen clean all builddir slides handout

TMP := gen

SVGS := $(shell find * -maxdepth 0 -name '*.svg')
PNGS = $(patsubst %.svg,$(TMP)/%.png,$(SVGS))

all: slides handout
	test -d ~/public_html && cp -f gitworkshop.pdf gitworkshop\ Handout.pdf ~/public_html/ || true

slides: gen $(PNGS)
	cd $(TMP) && pdflatex ../gitworkshop.tex
	cd $(TMP) && pdflatex ../gitworkshop.tex
	mv $(TMP)/gitworkshop.pdf .

handout: gen $(PNGS)
	cd $(TMP) && HANDOUT=1 pdflatex ../gitworkshop.tex
	cd $(TMP) && HANDOUT=1 pdflatex ../gitworkshop.tex
	mv $(TMP)/gitworkshop.pdf gitworkshop\ Handout.pdf

gen:
	mkdir -p $(TMP)

$(TMP)/%.png: %.svg
	inkscape $< -z -D -d 300 -e $@

clean:
	rm -rf $(TMP)

