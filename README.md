# git workshop

This repository contains the slides and handouts for our git workshop.


## Build the slides

On Debian based OS:

```
sudo apt update
sudo apt install --yes texlive-latex-base texlive-latex-extra texlive-latex-recommended latex-beamer texlive-fonts-extra texlive-fonts-recommended inkscape
make
```

Or use docker:

```
docker pull blang/latex
docker run --rm -ti -v "$PWD:/data" blang/latex sh -c "apt update && apt install -y inkscape && make"
```

Note: the generated PDF are owned by root. `sudo chown $UID:$GID *.pdf`
