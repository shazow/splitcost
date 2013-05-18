## Develop:

serve:
	python -m SimpleHTTPServer


## CSS:

css_watch:
	compass watch ./compass

css:
	compass compile ./compass

css_production:
	compass compile ./compass --output-style compressed --force
