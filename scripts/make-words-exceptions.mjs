import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

// quick script to convert the words and exceptions text files to JSON

function load_write_main() {
	const words = {}, exceptions = {};

	// load the words for word splitting
	{
	    let text, fn = 'word_list.txt';
	    try {
		text = readFileSync('word_list.txt', 'utf8');
	    } catch (e) {
		throw new Error(`Cannot open word list ${fn}: ${e.message}`);
	    }
	    for (let l of text.split(/\r?\n/)) {
		l = l.replace(/^\s+|\s+$/g, '');
		l = l.replace(/\uFEFF/g, '');
		l = l.replace(/\#.*$/, '');
		if (l) words[l] = true;
	    }
	}

	// ... and load the exceptions
	{
	    let text, fn = 'exceptions.txt';
	    try {
		text = readFileSync(fn, 'utf8');
	    } catch (e) {
		throw new Error(`Cannot open exceptions file ${fn}: ${e.message}`);
	    }
	    for (let l of text.split(/\r?\n/)) {
		l = l.replace(/^\s+|\s+$/g, '');
		l = l.replace(/\uFEFF/g, '');
		l = l.replace(/\#.*$/, '');
		let [ word, pron ] = l.split(/\t/);
		if (!word || !pron) continue;
		exceptions[word] = pron;
		words[word] = true;
	    }
	}

	writeFileSync('../src/words.json', JSON.stringify({ words, exceptions }));
}
load_write_main();

function load_write_lists(words_fn, exceptions_fn, out_fn) {
    // read the word list
    let text;
    const words = {}, exceptions = {};

    try {
        text = readFileSync(words_fn, 'utf8');
    } catch (e) {
        throw new Error(`Cannot open word list ${words_fn}: ${e.message}`);
    }
    
    for (let l of text.split(/\r?\n/)) {
        l = l.replace(/^\s+|\s+$/g, '')
		.replace(/\uFEFF/g, '')
		.replace(/\#.*$/, '');
        if (l) words[l] = true;
    }

    // read the multi-lingual exceptions list
    try {
        text = readFileSync(exceptions_fn, 'utf8');
    } catch (e) {
        throw new Error(`Cannot open exceptions file ${exceptions_fn}: ${e.message}`);
    }

    const lines = text.split(/\r?\n/);
    
    // ... read the first line with the column labels
    const fl = lines.shift().replace(/^\s+|\s+$/g, '');
    const [ dummy, ...langs ] = fl.split(/\t/);

    for (let l of lines) {
        l = l.replace(/^\s+|\s+$/g, '')
		.replace(/\uFEFF/g, '')
		.replace(/\#.*$/, '');

        const [ word, ...pron ] = l.split(/\t/);
        if (!word || !pron.length) continue;
        words[word] = true;

        for (let i = 0; i < pron.length; i++) {
            const v = pron[i].replace(/^\s+|\s+$/g, '');
            if (v) {
                exceptions[langs[i]] ||= {};
                exceptions[langs[i]][word] = v;
            }
        }
    }

    writeFileSync(`../src/${out_fn}`, JSON.stringify({ words, exceptions }));
}

load_write_lists('rigpa_words.txt', 'rigpa_exceptions.txt', 'rigpa.json');
load_write_lists('padmakara_words.txt', 'padmakara_exceptions.txt', 'padmakara.json');
load_write_lists('lhasey_words.txt', 'lhasey_exceptions.txt', 'lhasey.json');

