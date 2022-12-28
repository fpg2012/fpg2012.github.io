all:
	ssushi build -A
inc:
	ssushi build
test:
	ssushi build -c _test.yml
	sfz -r _test_gen
deploy:
	cd _gen
	git add .
	git commit -m "update: `date`"
	git push
	cd ..
	git add .
	git commit -a
	git push
