# Evernode documentation
Evernode documentation is built with [MkDocs](https://www.mkdocs.org/). The 'src' folder contains the source markdown files for the documentation. The 'docs' folder contains the compiled documentation website. The website is hosted via [github pages](https://pages.github.com/).

Published website: https://hotpocketdev.github.io/evernode-docs

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

## Deploying to public documentation website
1. `mkdocs build`
2. Commit the changes in 'docs' folder and merge to 'main' branch.
3. Github will automatically publish the changes to [documentation website](https://hotpocketdev.github.io/evernode-docs).