.PHONY: all builddir slides handout

all: slides handout
	rm -rf tmp
	test -d ~/public_html && cp -f gitworkshop.pdf gitworkshop\ Handout.pdf ~/public_html/ || true

slides: builddir inputs.tex
	cd tmp && pdflatex ../gitworkshop.tex
	cd tmp && pdflatex ../gitworkshop.tex
	mv tmp/gitworkshop.pdf .

handout: builddir inputs.tex
	cd tmp && HANDOUT=1 pdflatex ../gitworkshop.tex
	cd tmp && HANDOUT=1 pdflatex ../gitworkshop.tex
	mv tmp/gitworkshop.pdf gitworkshop\ Handout.pdf

builddir:
	rm -f inputs.tex
	rm -rf tmp
	mkdir tmp

inputs.tex: $(sections/*.tex)
	ls sections/*.tex | IFS='\n' awk '{ printf "\\input{../"; gsub( " ", "\\space " ); printf $$0; print "}" }' > inputs.tex
