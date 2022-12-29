all:
	ssushi build -A

inc:
	ssushi build

test:
	ssushi build -c _test.yml
	sfz -r _test_gen

test-all:
	ssushi build -A -c _test.yml
	sfz -r _test_gen

deploy-gen:
	cd _gen
	git add .
	git commit -m "Update: `date`"
	git push
	cd ..

deploy: deploy-gen
	git commit -a
	git push
