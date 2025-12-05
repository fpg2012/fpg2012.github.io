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

test-debug-all:
	ssushi --debug build -A -c _test.yml
	sfz -r _test_gen

test-debug:
	ssushi --debug build -c _test.yml
	sfz -r _test_gen

clean-gen:
	cd _gen
	rm -rf *
	cd ..

new-post:
	mkdir -p "posts/`date -I`-newpost"
	cp _model/post.md "posts/`date -I`-newpost/index.md"

new-note:
	cp _model/note.md "notes/`date -I`-newnote.md"
