build:
	npm run build

watch:
	npm start

open:
	open http://localhost:3000/

publish: build
	rm -rf docs
	mv -f build docs

.PHONY: build watch open publish

