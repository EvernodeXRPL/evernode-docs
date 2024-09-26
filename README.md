# Evernode documentation
Evernode documentation is built with [Sphinx](https://www.sphinx-doc.org/) and [readthedocs](https://about.readthedocs.com/). Documentation is done with [Markdown](https://www.markdownguide.org/) and [reStructuredText](https://docutils.sourceforge.io/rst.html). The documentation source files are in [docs/source](docs/source)

## Local setup

```
python -m pip install --exists-action=w --no-cache-dir -r docs/requirements.txt
```

### Updating API documentation

Update the source file paths in `api-docs.js`. After that, run the following command to update the relevant files in the documentation source directories:
```
node api-docs.js
```

### Local build

```
python -m sphinx -T -E -b html -d _build/doctrees -D language=en docs/source/ html
```
This will output into 'html' directory.

## Preview

```
cd html
python -m http.server 8080
```