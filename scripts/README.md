The script `make-words-exceptions.mjs` converts the source `*.txt` files containing word and exception lists, into the JSON format used by the various `TibetanPhonetics` classes.

It only needs to be run after making changes to the word or exception lists.

Run it with: `node ./make-words-exceptions.mjs`.  It updates all the JSON files under `src`.

