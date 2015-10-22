.PHONY: all builddir slides handout

all: slides handout
	rm -rf tmp
	test -d ~/public_html && cp -f gitworkshop.pdf gitworkshop\ Handout.pdf ~/public_html/ || true

slides: builddir tmp/inputs.tex
	cd tmp && pdflatex ../gitworkshop.tex
	cd tmp && pdflatex ../gitworkshop.tex
	mv tmp/gitworkshop.pdf .

handout: builddir tmp/inputs.tex
	cd tmp && HANDOUT=1 pdflatex ../gitworkshop.tex
	cd tmp && HANDOUT=1 pdflatex ../gitworkshop.tex
	mv tmp/gitworkshop.pdf gitworkshop\ Handout.pdf

builddir:
	rm -rf tmp
	mkdir tmp

tmp/inputs.tex: $(sections/*.tex)
	ls sections/*.tex | IFS='\n' awk '{ printf "\\input{../"; gsub( " ", "\\space " ); printf $$0; print "}" }' > tmp/inputs.tex
