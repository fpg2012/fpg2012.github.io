set shell := ["zsh", "-cu"]

venv := "source .venv/bin/activate"

all:
	{{venv}} && ssushi build -A

inc:
	{{venv}} && ssushi build

test:
	{{venv}} && ssushi build -c _test.yml
	{{venv}} && { sfz --bind 127.0.0.1 -r _test_gen & sfz --bind '[::1]' -r _test_gen & wait; }

test-all:
	{{venv}} && ssushi build -A -c _test.yml
	{{venv}} && { sfz --bind 127.0.0.1 -r _test_gen & sfz --bind '[::1]' -r _test_gen & wait; }

test-debug-all:
	{{venv}} && ssushi --debug build -A -c _test.yml
	{{venv}} && { sfz --bind 127.0.0.1 -r _test_gen & sfz --bind '[::1]' -r _test_gen & wait; }

test-debug:
	{{venv}} && ssushi --debug build -c _test.yml
	{{venv}} && { sfz --bind 127.0.0.1 -r _test_gen & sfz --bind '[::1]' -r _test_gen & wait; }

clean-gen:
	{{venv}} && cd _gen && rm -rf *

new-post:
	{{venv}} && mkdir -p "posts/`date -I`-newpost" && cp _model/post.md "posts/`date -I`-newpost/index.md"

new-note:
	{{venv}} && cp _model/note.md "notes/`date -I`-newnote.md"
