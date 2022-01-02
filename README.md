# Evernode documentation
Evernode documentation is built with [MkDocs](https://www.mkdocs.org/). The 'src' folder contains the source markdown files for the documentation. The 'docs' folder contains the compiled documentation website. The website is hosted via [github pages](https://pages.github.com/).

## Install MkDocs
```
apt install python3-pip
pip install mkdocs
```
(Do not use mkdocs apt package via `apt install mkdocs` as it's outdated)

## Building documentation website
```
mkdocs build
```

## Live preview web server
```
mkdocs serve
```
Preview website can then be accessed via http://localhost:8000