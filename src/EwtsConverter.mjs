/*
  This JavaScript module implements the conversion between Unicode Tibetan text, 
  and EWTS (Extended Wylie) transliteration.

  It is based on the equivalent Perl module, Lingua::BO::Wylie, found at 
  http://www.lotsawahouse.org/other/digitaltibetan
  with some enhancements ported over from the Java codebase found at
  https://github.com/buda-base/ewts-converter

  The Extended Wylie Transliteration System is documented at:
  http://www.thlib.org/reference/transliteration/#essay=/thl/ewts/

  This is a JS module written in modern JavaScript as of 2021.

  For wider compatibility, a version of this code processed by Babel is included
  in the 'lib' directory.  The most modern feature that is still required by 
  the Babel version is String.prototype.replaceAll, which Safari only implemented
  in version 13.1 in early 2020.

  A sample single-page-app featuring this code is implemented by the files ewts.html
  and index.js, which is processed by Babel and Webpack into the 'dist' directory.

  See the README.md file for further details.

  Copyright (C) 2010-2021 Roger Espel Llima

  This library is Free Software.  You can redistribute it or modify it, under
  the terms of the Apache licence version 2.0.

  Please contact the author if you wish to use it under some terms not covered
  here.
*/


// helper function: convert an array to an object with each array element => true
const array_to_true_object = arr => Object.fromEntries(arr.map(x => [ x, true ]));

// the class
class EwtsConverter {
	// Various classes of Tibetan symbols in Wylie and Unicode.
	static consonant = {
		"k": "\u0f40",
		"kh": "\u0f41",
		"g": "\u0f42",
		"gh": "\u0f42\u0fb7",
		"g+h": "\u0f42\u0fb7",
		"ng": "\u0f44",
		"c": "\u0f45",
		"ch": "\u0f46",
		"j": "\u0f47",
		"ny": "\u0f49",
		"T": "\u0f4a",
		"-t": "\u0f4a",
		"Th": "\u0f4b",
		"-th": "\u0f4b",
		"D": "\u0f4c",
		"-d": "\u0f4c",
		"Dh": "\u0f4c\u0fb7",
		"D+h": "\u0f4c\u0fb7",
		"-dh": "\u0f4c\u0fb7",
		"-d+h": "\u0f4c\u0fb7",
		"N": "\u0f4e",
		"-n": "\u0f4e",
		"t": "\u0f4f",
		"th": "\u0f50",
		"d": "\u0f51",
		"dh": "\u0f51\u0fb7",
		"d+h": "\u0f51\u0fb7",
		"n": "\u0f53",
		"p": "\u0f54",
		"ph": "\u0f55",
		"b": "\u0f56",
		"bh": "\u0f56\u0fb7",
		"b+h": "\u0f56\u0fb7",
		"m": "\u0f58",
		"ts": "\u0f59",
		"tsh": "\u0f5a",
		"dz": "\u0f5b",
		"dzh": "\u0f5b\u0fb7",
		"dz+h": "\u0f5b\u0fb7",
		"w": "\u0f5d",
		"zh": "\u0f5e",
		"z": "\u0f5f",
		"'": "\u0f60",
		"y": "\u0f61",
		"r": "\u0f62",
		"l": "\u0f63",
		"sh": "\u0f64",
		"Sh": "\u0f65",
		"-sh": "\u0f65",
		"s": "\u0f66",
		"h": "\u0f67",
		"W": "\u0f5d",
		"Y": "\u0f61",
		"R": "\u0f6a",
		"f": "\u0f55\u0f39",
		"v": "\u0f56\u0f39",
	};

	static subjoined = {
		"k": "\u0f90",
		"kh": "\u0f91",
		"g": "\u0f92",
		"gh": "\u0f92\u0fb7",
		"g+h": "\u0f92\u0fb7",
		"ng": "\u0f94",
		"c": "\u0f95",
		"ch": "\u0f96",
		"j": "\u0f97",
		"ny": "\u0f99",
		"T": "\u0f9a",
		"-t": "\u0f9a",
		"Th": "\u0f9b",
		"-th": "\u0f9b",
		"D": "\u0f9c",
		"-d": "\u0f9c",
		"Dh": "\u0f9c\u0fb7",
		"D+h": "\u0f9c\u0fb7",
		"-dh": "\u0f9c\u0fb7",
		"-d+h": "\u0f9c\u0fb7",
		"N": "\u0f9e",
		"-n": "\u0f9e",
		"t": "\u0f9f",
		"th": "\u0fa0",
		"d": "\u0fa1",
		"dh": "\u0fa1\u0fb7",
		"d+h": "\u0fa1\u0fb7",
		"n": "\u0fa3",
		"p": "\u0fa4",
		"ph": "\u0fa5",
		"b": "\u0fa6",
		"bh": "\u0fa6\u0fb7",
		"b+h": "\u0fa6\u0fb7",
		"m": "\u0fa8",
		"ts": "\u0fa9",
		"tsh": "\u0faa",
		"dz": "\u0fab",
		"dzh": "\u0fab\u0fb7",
		"dz+h": "\u0fab\u0fb7",
		"w": "\u0fad",
		"zh": "\u0fae",
		"z": "\u0faf",
		"'": "\u0fb0",
		"y": "\u0fb1",
		"r": "\u0fb2",
		"l": "\u0fb3",
		"sh": "\u0fb4",
		"Sh": "\u0fb5",
		"-sh": "\u0fb5",
		"s": "\u0fb6",
		"h": "\u0fb7",
		"a": "\u0fb8",
		"W": "\u0fba",
		"Y": "\u0fbb",
		"R": "\u0fbc",
	};

	static vowel = {
		"a": "\u0f68",		// a-chen
		"A": "\u0f71",
		"i": "\u0f72",
		"I": "\u0f71\u0f72",
		"u": "\u0f74",
		"U": "\u0f71\u0f74",
		"e": "\u0f7a",
		"ai": "\u0f7b",
		"o": "\u0f7c",
		"au": "\u0f7d",
		"-i": "\u0f80",
		"-I": "\u0f71\u0f80",

		// special sanskrit vowels
		"r-i": "\u0fb2\u0f80",
		"r-I": "\u0fb2\u0f71\u0f80",
		"l-i": "\u0fb3\u0f80",
		"l-I": "\u0fb3\u0f71\u0f80",
	};

	// these vowels have different forms for the standalone thing and when added to a syllable
	// Wylie => [ 'standalone', 'added' ]
	static complex_vowel = {
		"r-i": [ "\u0f62\u0f80", "\u0fb2\u0f80" ],
		"r-I": [ "\u0f62\u0f71\u0f80", "\u0fb2\u0f71\u0f80" ], 
		"l-i": [ "\u0f63\u0f80", "\u0fb3\u0f80" ],
		"l-I": [ "\u0f63\u0f71\u0f80", "\u0fb3\u0f71\u0f80" ], 
	};

	// stuff that can come after the vowel
	// symbol => [ unicode, class ]  (cannot have more than 1 of the same class in the same stack)
	static finals = {
		"M": [ "\u0f7e", "M" ],		// anusvara / bindu / circle above / nga ro
		"~M`": [ "\u0f82", "M" ],	// crescent, bindu & nada
		"~M": [ "\u0f83", "M" ],	// crescent & bindu
		"X": [ "\u0f37", "X" ],		// small circle under
		"~X": [ "\u0f35", "X" ],	// small circle w/ crescent under
		"H": [ "\u0f7f", "H" ],		// visarga / rnam bcad
		"?": [ "\u0f84", "?" ],		// halanta / srog med
		"^": [ "\u0f39", "^" ],		// tsa-phru
		"&": [ "\u0f85", "&" ],		// paluta / avagraha
	};

	// other standalone symbols
	static other = {
		"0": "\u0f20",
		"1": "\u0f21",
		"2": "\u0f22",
		"3": "\u0f23",
		"4": "\u0f24",
		"5": "\u0f25",
		"6": "\u0f26",
		"7": "\u0f27",
		"8": "\u0f28",
		"9": "\u0f29",
		" ": "\u0f0b",
		"*": "\u0f0c",
		"/": "\u0f0d",
		"//": "\u0f0e",
		";": "\u0f0f",
		"|": "\u0f11",
		"!": "\u0f08",
		":": "\u0f14",
		"_": " ",
		"=": "\u0f34",
		"<": "\u0f3a",
		">": "\u0f3b",
		"(": "\u0f3c",
		")": "\u0f3d",
		"@": "\u0f04",
		"#": "\u0f05",
		"$": "\u0f06",
		"%": "\u0f07"
	};

	// special characters: flag those if they occur out of context
	static special = array_to_true_object([ ".", "+", "-", "~", "^", "?", "`", "]" ]);

	// superscript => { letter or stack below => true }
	static superscripts = {
		"r": array_to_true_object(["k","g","ng","j","ny","t","d","n","b","m","ts","dz","k+y","g+y","m+y","b+w","ts+w","g+w"]),
		"l": array_to_true_object(["k","g","ng","c","j","t","d","p","b","h"]),
		"s": array_to_true_object(["k","g","ng","ny","t","d","n","p","b","m","ts","k+y","g+y","p+y","b+y","m+y","k+r","g+r","p+r","b+r","m+r","n+r"]),
	};

	// subscript => { letter or stack above => true }
	static subscripts = {
		"y": array_to_true_object(["k","kh","g","p","ph","b","m","r+k","r+g","r+m","s+k","s+g","s+p","s+b","s+m"]),
		"r": array_to_true_object(["k","kh","g","t","th","d","n","p","ph","b","m","sh","s","h","dz","s+k","s+g","s+p","s+b","s+m","s+n"]),
		"l": array_to_true_object(["k","g","b","r","s","z"]),
		"w": array_to_true_object(["k","kh","g","c","ny","t","d","ts","tsh","zh","z","r","l","sh","s","h","g+r","d+r","ph+y","r+g","r+ts"]),
	};
	// prefix => { consonant or stack after => true }
	static prefixes = {
		"g": array_to_true_object(["c","ny","t","d","n","ts","zh","z","y","sh","s"]),
		"d": array_to_true_object(["k","g","ng","p","b","m","k+y","g+y","p+y","b+y","m+y","k+r","g+r","p+r","b+r"]),
		"b": array_to_true_object(["k","g","c","t","d","ts","zh","z","sh","s","r","l","k+y","g+y","k+r","g+r","r+l","s+l","r+k","r+g","r+ng",
			"r+j","r+ny","r+t","r+d","r+n","r+ts","r+dz","s+k","s+g","s+ng","s+ny","s+t","s+d","s+n","s+ts","r+k+y",
			"r+g+y","s+k+y","s+g+y","s+k+r","s+g+r","l+d","l+t","k+l","s+r","z+l","s+w"]),
		"m": array_to_true_object(["kh","g","ng","ch","j","ny","th","d","n","tsh","dz","kh+y","g+y","kh+r","g+r"]),
		"'": array_to_true_object(["kh","g","ch","j","th","d","ph","b","tsh","dz","kh+y","g+y","ph+y","b+y","kh+r","g+r","d+r","ph+r","b+r"]),
	};

	// suffix => true; also included are some Skt letters b/c they occur often in suffix position in Skt words
	static suffixes = array_to_true_object(["'","g","ng","d","n","b","m","r","l","s","N","T","-n","-t"]);

	// 2nd suffix => letter before
	static suff2 = {
		"s": array_to_true_object(["g","ng","b","m"]),
		"d": array_to_true_object(["n","r","l"]),
	};

	// to help handle stuff like pa'm
	static affixedsuff2 = array_to_true_object(['ng', 'm']);

	// root letter index for very ambiguous 3 letter syllables: consonant string => [ root index, "wylie result" ]
	static ambiguous = {
		"dgs": [ 1, "dgas" ],
		"dngs": [ 1, "dngas" ],
		"'gs": [ 1, "'gas" ],
		"'bs": [ 1, "'bas" ],
		"dbs": [ 1, "dbas" ],
		"dms": [ 1, "dmas" ],
		"bgs": [ 0, "bags" ],
		"mngs": [ 0, "mangs" ],
		"mgs": [ 0, "mags" ],

		// some syllables ending in '-d' added here to silence some warnings
		"gnd": [ 1, "gnad" ],
	};

	// Unicode to Wylie mappings

	// top letters
	static tib_top = {
		"\u0f40": "k",
		"\u0f41": "kh",
		"\u0f42": "g",
		"\u0f43": "g+h",
		"\u0f44": "ng",
		"\u0f45": "c",
		"\u0f46": "ch",
		"\u0f47": "j",
		"\u0f49": "ny",
		"\u0f4a": "T",
		"\u0f4b": "Th",
		"\u0f4c": "D",
		"\u0f4d": "D+h",
		"\u0f4e": "N",
		"\u0f4f": "t",
		"\u0f50": "th",
		"\u0f51": "d",
		"\u0f52": "d+h",
		"\u0f53": "n",
		"\u0f54": "p",
		"\u0f55": "ph",
		"\u0f56": "b",
		"\u0f57": "b+h",
		"\u0f58": "m",
		"\u0f59": "ts",
		"\u0f5a": "tsh",
		"\u0f5b": "dz",
		"\u0f5c": "dz+h",
		"\u0f5d": "w",
		"\u0f5e": "zh",
		"\u0f5f": "z",
		"\u0f60": "'",
		"\u0f61": "y",
		"\u0f62": "r",
		"\u0f63": "l",
		"\u0f64": "sh",
		"\u0f65": "Sh",
		"\u0f66": "s",
		"\u0f67": "h",
		"\u0f68": "a",
		"\u0f69": "k+Sh",
		"\u0f6a": "R"
	};

	// subjoined letters
	static tib_subjoined = {
		"\u0f90": "k",
		"\u0f91": "kh",
		"\u0f92": "g",
		"\u0f93": "g+h",
		"\u0f94": "ng",
		"\u0f95": "c",
		"\u0f96": "ch",
		"\u0f97": "j",
		"\u0f99": "ny",
		"\u0f9a": "T",
		"\u0f9b": "Th",
		"\u0f9c": "D",
		"\u0f9d": "D+h",
		"\u0f9e": "N",
		"\u0f9f": "t",
		"\u0fa0": "th",
		"\u0fa1": "d",
		"\u0fa2": "d+h",
		"\u0fa3": "n",
		"\u0fa4": "p",
		"\u0fa5": "ph",
		"\u0fa6": "b",
		"\u0fa7": "b+h",
		"\u0fa8": "m",
		"\u0fa9": "ts",
		"\u0faa": "tsh",
		"\u0fab": "dz",
		"\u0fac": "dz+h",
		"\u0fad": "w",
		"\u0fae": "zh",
		"\u0faf": "z",
		"\u0fb0": "'",
		"\u0fb1": "y",
		"\u0fb2": "r",
		"\u0fb3": "l",
		"\u0fb4": "sh",
		"\u0fb5": "Sh",
		"\u0fb6": "s",
		"\u0fb7": "h",
		"\u0fb8": "a",
		"\u0fb9": "k+Sh",
		"\u0fba": "W",
		"\u0fbb": "Y",
		"\u0fbc": "R"
	};

	// vowel signs:
	// a-chen is not here because that's a top character: not a vowel sign.
	// pre-composed "I" and "U" are dealt here; other pre-composed Skt vowels are more
	// easily handled by a global replace in toWylie(), b/c they turn into subjoined "r"/"l".
	static tib_vowel = {
		"\u0f71": "A",
		"\u0f72": "i",
		"\u0f73": "I",
		"\u0f74": "u",
		"\u0f75": "U",
		"\u0f7a": "e",
		"\u0f7b": "ai",
		"\u0f7c": "o",
		"\u0f7d": "au",
		"\u0f80": "-i"
	};

	// long (Skt) vowels
	static tib_vowel_long = {
		"i": "I",
		"u": "U",
		"-i": "-I"
	};

	// final symbols: unicode => [ wylie, class ] (cannot have more than 1 of the same class in the same stack)
	static tib_final = {
		"\u0f35": [ "~X",  "X" ],
		"\u0f37": [ "X",   "X" ],
		"\u0f39": [ "^",   "^" ],
		"\u0f7e": [ "M",   "M" ],
		"\u0f7f": [ "H",   "H" ],
		"\u0f82": [ "~M`", "M" ],
		"\u0f83": [ "~M",  "M" ],
		"\u0f84": [ "?",   "?" ],
		"\u0f85": [ "&",   "&" ],
	};

	// special characters introduced by ^
	static tib_caret = {
		"ph": "f",
		"b": "v",
	};

	// other stand-alone characters
	static tib_other = {
		" ": "_",
		"\u0f04": "@",
		"\u0f05": "#",
		"\u0f06": "$",
		"\u0f07": "%",
		"\u0f08": "!",
		"\u0f0b": " ",
		"\u0f0c": "*",
		"\u0f0d": "/",
		"\u0f0e": "//",
		"\u0f0f": ";",
		"\u0f11": "|",
		"\u0f14": ":",
		"\u0f20": "0",
		"\u0f21": "1",
		"\u0f22": "2",
		"\u0f23": "3",
		"\u0f24": "4",
		"\u0f25": "5",
		"\u0f26": "6",
		"\u0f27": "7",
		"\u0f28": "8",
		"\u0f29": "9",
		"\u0f34": "=",
		"\u0f3a": "<",
		"\u0f3b": ">",
		"\u0f3c": "(",
		"\u0f3d": ")"
	};

	// all these stacked consonant combinations don't need "+"s in them
	static tib_stack = array_to_true_object([
		"b+l","b+r","b+y","c+w","d+r","d+r+w","d+w","g+l","g+r","g+r+w",
		"g+w","g+y","h+r","h+w","k+l","k+r","k+w","k+y","kh+r","kh+w","kh+y","l+b","l+c",
		"l+d","l+g","l+h","l+j","l+k","l+ng","l+p","l+t","l+w","m+r","m+y","n+r","ny+w","p+r",
		"p+y","ph+r","ph+y","ph+y+w","r+b","r+d","r+dz","r+g","r+g+w","r+g+y","r+j","r+k",
		"r+k+y","r+l","r+m","r+m+y","r+n","r+ng","r+ny","r+t","r+ts","r+ts+w","r+w","s+b",
		"s+b+r","s+b+y","s+d","s+g","s+g+r","s+g+y","s+k","s+k+r","s+k+y","s+l","s+m","s+m+r",
		"s+m+y","s+n","s+n+r","s+ng","s+ny","s+p","s+p+r","s+p+y","s+r","s+t","s+ts","s+w","sh+r",
		"sh+w","t+r","t+w","th+r","ts+w","tsh+w","z+l","z+w","zh+w"
	]);

	static initialized = false;

	// static method to run initialization that needs to run once only (not for every object creation)
	// - note that 'this' in this context refers to the class itself, not to any instance, so e.g this.finals is the static var
	static static_init() {
		if (this.initialized) return;
		this.initialized = true;

		let quotemeta = str => (str + '').replace(/\W/g, '\\$&');

		// polyfill String.prototype.replaceAll if needed - not an industrial grade polyfill but close enough
		// modified from https://vanillajstoolkit.com/polyfills/stringreplaceall/
		if (!String.prototype.replaceAll) {
			String.prototype.replaceAll = function(str, repl) {

				// pass regexes to regular .replace()
				if (Object.prototype.toString.call(str).toLowerCase() === '[object regexp]') {
					return this.replace(str, repl)
				}

				return this.replace(new RegExp(quotemeta(str), 'g'), repl);
			}
		}

		// precompute the regexp to split a string into Wylie tokens.  sort by decreasing size
		// so that things like "sh" don't get split into ("s", "h").  the "." and the 's' flag
		// ensure that any remaining characters are taken as a single-char token.

		let sort_tokens = (a, b) =>
			a.length < b.length ? 1 :
			a.length > b.length ? -1 :
			a < b ? -1 :
			a > b ? 1 :
			0;

		let toks = Object.assign({}, this.consonant, this.subjoined, this.vowel, this.finals, this.other);
		toks = Object.keys(toks).filter(x => x.length > 1).sort(sort_tokens);

		let regex = toks.map(quotemeta).join('|');
		regex = `(${regex}|\\\\u....|\\\\U........|\\\\.|\r\n|.)`;
		this.tokens_regex = new RegExp(regex, 's')
	}

	// helper function to get access to the static tables - static property access sucks in JS
	consonant(s) { return this.constructor.consonant[s] }

	subjoined(s) { return this.constructor.subjoined[s] }

	vowel(s) { return this.constructor.vowel[s] }

	finals(s) { return this.constructor.finals[s] }

	complex_vowel(s) { return this.constructor.complex_vowel[s] }

	other(s) { return this.constructor.other[s] }

	is_special(s) { return this.constructor.special[s] }

	is_superscript(s) { return !!this.constructor.superscripts[s] }

	superscript(sup, below) { let s = this.constructor.superscripts[sup]; return s && s[below] }

	is_subscript(s) { return !!this.constructor.subscripts[s] }

	subscript(sub, above) { let s = this.constructor.subscripts[sub]; return s && s[above] }

	is_prefix(s) { return !!this.constructor.prefixes[s] }

	prefix(pref, after) { let s = this.constructor.prefixes[pref]; return s && s[after] }

	is_suffix(s) { return this.constructor.suffixes[s] }

	is_suff2(s) { return !!this.constructor.suff2[s] }

	suff2(suff, before) { let s = this.constructor.suff2[suff]; return s && s[before] }

	affixedsuff2(s) { return this.constructor.affixedsuff2[s] }

	ambiguous(s) { return this.constructor.ambiguous[s] }

	tib_top(s) { return this.constructor.tib_top[s] }

	tib_subjoined(s) { return this.constructor.tib_subjoined[s] }

	tib_vowel(s) { return this.constructor.tib_vowel[s] }

	tib_vowel_long(s) { return this.constructor.tib_vowel_long[s] }

	tib_final(s) { return this.constructor.tib_final[s] }

	tib_caret(s) { return this.constructor.tib_caret[s] }

	tib_other(s) { return this.constructor.tib_other[s] }

	tib_stack(s) { return this.constructor.tib_stack[s] }

	// EwtsConverter constructor.  Flags get passed as named arguments in an optional object literal:
	// - check: generate warnings for illegal consonant sequences and the like; default is true.
	// - check_strict: stricter checking, examine the whole stack; default is true.
	// - fix_spacing: remove spaces after newlines, collapse multiple tseks into one, etc; default is true.
	// - sloppy: silently fix a number of common Wylie mistakes when converting to Unicode
	// - leave_dubious: when converting to Unicode, leave dubious syllables unprocessed, between [brackets], instead of doing a best attempt.
	// - pass_through: when converting to EWTS, pass through non-Tib characters instead of converting to [comments]
	constructor({ check = true, check_strict = true, fix_spacing = true, leave_dubious = false, sloppy = false, pass_through = false } = {}) {
		// initialize calculated static properties once
		this.constructor.static_init();

		// set up preferences
		if (check_strict && !check) throw new Error("Cannot have 'check_strict' without 'check'.");
		this.check = check;
		this.check_strict = check_strict;
		this.fix_spacing = fix_spacing;
		this.leave_dubious = leave_dubious;
		this.sloppy = sloppy;
		this.pass_through = pass_through;

		// initialize instance variables
		this.warnings = [];
	}

	// Adjusts the input string based on the idea that people often are sloppy when
	// writing Wylie and use ' ' instead of '_' when a space is actually meant in
	// the output. 
	// This routine does not handle the case of " /" which requires more care to
	// accomodate "ng /" and "ngi /" and so on which are intentional since a tsheg
	// is required in these cases. Also it is not feasible to handle "g " for a
	// final "ga" at the end of a phrase where the '/' is usually omitted in favor
	// of the descender on the "ga". Detecting this is non-trivial.
	// Ported from the Java and Python version - missing in Perl.
	fix_sloppy(str) {
		return str.replaceAll("ʼ", "'")
			.replaceAll("ʹ", "'")
			.replaceAll("‘", "'")
			.replaceAll("’", "'")
			.replaceAll("ʾ", "'")
			// JavaWylie replaces 'x' and 'X' with '྾' (Tib. Ku Ru Kha) but THL uses X for small circle under marking root text
			// .replaceAll("x", "\\u0fbe")
			// .replaceAll("X", "\\u0fbe")
			.replaceAll("...", "\\u0f0b\\u0f0b\\u0f0b")
			.replaceAll(" (", "_(")
			.replaceAll(") ", ")_")
			.replaceAll("/ ", "/_")
			.replaceAll(" 0", "_0")
			.replaceAll(" 1", "_1")
			.replaceAll(" 2", "_2")
			.replaceAll(" 3", "_3")
			.replaceAll(" 4", "_4")
			.replaceAll(" 5", "_5")
			.replaceAll(" 6", "_6")
			.replaceAll(" 7", "_7")
			.replaceAll(" 8", "_8")
			.replaceAll(" 9", "_9")
			.replaceAll("_ ", "__")
			.replaceAll("G", "g")
			.replaceAll("K", "k")
			.replaceAll("C", "c")
			.replaceAll("B", "b")
			.replaceAll("P", "p")
			.replaceAll("L", "l")
			.replaceAll("Z", "z")
			.replaceAll(" b ", " ba ")
			.replaceAll(" b'i ", " ba'i ")
			.replaceAll(" m ", " ma ")
			.replaceAll(" m'i ", " ma'i ")
			.replaceAll("Ts", "ts")
			.replaceAll("Dz", "dz")
			.replaceAll("Ny", "ny")
			.replaceAll("Ng", "ng")
			.replaceAll(" (", "(")
			.replaceAll(") ", ")")
			.replaceAll("༼", "(")
			.replaceAll("༽", ")")
			.replaceAll("：", ":")
			.replaceAll("H ", "H")

			// lower case H and M unless preceded by a vowel or other signs that can happen (e.g ~M)
			.replace(/(^|[^aeiouAIU])H/g, "$1h")
			.replace(/(^|[^aeiouAIU~])M/g, "$1m")

			// convert S but not Sh
			.replace(/S($|[^h])/g, "s$1")
	}

	// Checks if a character is a Tibetan Unicode combining character.
	is_combining(str) {
		// ported from Java EWTS and inspired from
		// https://github.com/apache/jena/blob/master/jena-core/src/main/java/org/apache/jena/rdfxml/xmlinput/impl/CharacterModel.java
		let x = str.charCodeAt(0);
		return ((x > 0x0f71 && x < 0x0f84) || (x < 0x0f8d && x > 0x0fbc));
	}

	// handle a Converter unicode escape, \\uxxxx or \\Uxxxxxxxx
	unicode_escape(t, line) {
		let hex = t.substring(2);
		if (hex == '') return null;
		if (!hex.match(/^[0-9a-fA-F]+$/)) {
			this.warn(`line ${line}: "${hex}": invalid hex code.`);
			return '';
		}
		let codepoint = parseInt(hex, 16);
		return String.fromCodePoint(codepoint);
	}

	// Generate a warning
	warn(str) {
		this.warnings.push(str);
	}

	// Get warnings
	get_warnings() {
		return this.warnings;
	}

	// Converts a string from EWTS to Unicode
	// - Optional argument: keep: a string of characters which should be preserved, unprocessed
	to_unicode(str, keep = null) {
		let line = 1, units = 0, out = "";
		this.warnings = [];

		// characters to keep?
		let keep_hash = array_to_true_object(((keep || "") + "").split(""));

		// remove initial spaces
		if (this.fix_spacing) str = str.trimStart();

		// fix sloppy wylie
		if (this.sloppy) {
			str = this.fix_sloppy(str);

		// at least fix all kinds of unicode single qutoes
		} else {
			str = str.replaceAll("ʼ", "'")
				.replaceAll("ʹ", "'")
				.replaceAll("‘", "'")
				.replaceAll("’", "'")
				.replaceAll("ʾ", "'")
		}

		// split into tokens, add a null token to mark the end
		let tokens = str.split(this.constructor.tokens_regex).filter(x => x !== "");
		tokens.push(null);
		let i = 0, t;

		// iterate over them
		ITER: while ((t = tokens[i]) !== null) {
			let o;

			// characters to keep untouched
			if (keep_hash[t]) {
				out += t;
				i++;
				continue ITER;
			}

			// [non-tibetan text] : pass through, nesting brackets
			if (t === '[') {
				let nesting = 1;
				i++;
				ESC: while ((t = tokens[i++]) !== null) {
					if (t === '[') nesting++;
					if (t === ']') nesting--;
					if (nesting === 0) continue ITER;

					// handle unicode escapes and \1-char escapes within [comments]...
					if (t.startsWith("\\u") || t.startsWith("\\U")) {
						o = this.unicode_escape(t, line);
						if (o !== null) {
							out += o;
							continue ESC;
						}
					}

					if (t.startsWith("\\")) {
						o = t.substring(1);
					} else {
						o = t;
					}

					out += o;
				}

				this.warn(`line ${line}: Unfinished [non-Wylie stuff].`);
				break ITER;
			}

			// punctuation, numbers, etc
			if ((o = this.other(t))) {
				out += o;
				i++;
				units++;

				// collapse multiple spaces
				if (t === ' ' && this.fix_spacing) {
					while (tokens[i] === ' ') i++
				}

				continue ITER;
			}

			// vowels & consonants: process tibetan script up to a tsek, punctuation or line noise
			if (this.vowel(t) || this.consonant(t)) {
				let { uni, toks, warns } = this._to_unicode_one_tsekbar(tokens, i);
				let word = tokens.slice(i, i + toks).join('');
				i += toks;
				units++;

				if (warns.length > 0 && this.leave_dubious) {
					out += '[' + word + ']';
				} else {
					out += uni;
				}

				for (let w of warns) {
					this.warn(`line ${line}: "${word}": ${w}`);
				}

				continue ITER;
			}

			// ** misc unicode and line handling things **

			// ignore BOM and zero-width space
			if (t === "\ufeff" || t === "\u200b") {
				i++;
				continue ITER;
			}

			// \\u, \\U unicode characters
			if (t.startsWith("\\u") || t.startsWith("\\U")) {
				o = this.unicode_escape(t, line);
				if (o !== null) {
					i++;
					out += o;
					continue ITER;
				}
			}

			// backslashed characters
			if (t.startsWith("\\")) {
				out += t.substring(1);
				i++;
				continue ITER;
			}

			// count lines
			if (t === "\r\n" || t === "\n" || t === "\r") {
				line++;
				out += t;
				i++;

				// also eat spaces after newlines (optional)
				if (this.fix_spacing) {
					while (tokens[i] === " ") i++;
				}

				continue ITER;
			}

			// stuff that shouldn't occur out of context: special chars and remaining [a-zA-Z]
			if (this.is_special(t) || t.match(/[a-zA-Z]/)) {
				this.warn(`line ${line}: Unexpected character "${t}".`);
			}

			// anything else, pass through
			out += t;
			i++;
		}

		if (units === 0) this.warn(`No Tibetan characters found!`);
		return out;
	}

	// Internal method: Converts successive stacks of Wylie into unicode, starting at the given index
	// within the array of tokens. 
	// 
	// Assumes that the first available token is valid, and is either a vowel or a consonant.
	// 
	// Returns: [ unicode_string, num_tokens_used, [ warnings generated ] ]
	_to_unicode_one_tsekbar(tokens, i) {
		let orig_i = i;
		let t = tokens[i];

		// variables for tracking the state within the syllable as we parse it
		let uni, toks, cons = null, cons_a, these_warns, prev_cons, visarga;

		// variables for checking the root letter, after parsing a whole tsekbar made of only single
		// consonants and one consonant with "a" vowel
		let check_root = true, consonants = [], root_idx = null;
		let out = "", warns = [];

		// the type of token that we are expecting next in the input stream
		//   - PREFIX : expect a prefix consonant, or a main stack
		//   - MAIN   : expect only a main stack
		//   - SUFF1  : expect a main stack again, or a 1st suffix
		//   - SUFF2  : expect a 2nd suffix
		//   - NONE   : expect nothing (after a 2nd suffix)
		//
		// valid tsek-bars end in one of these states: SUFF1, SUFF2, NONE
		let state = "PREFIX";

		while (t !== null && (this.vowel(t) || this.consonant(t)) && !visarga) {

			// translate a stack
			prev_cons = cons;

			// destructuring without a 'let' requires parens around it, blame JS
			({ uni, toks, cons, cons_a, warns: these_warns, visarga } = this._to_unicode_one_stack(tokens, i));

			i += toks;
			warns = warns.concat(these_warns);
			t = tokens[i];
			out += uni;

			// no checking?
			if (!this.check) continue;

			// check for syllable structure consistency by iterating a simple state machine
			// - prefix consonant
			if (state === "PREFIX" && cons) {
				consonants.push(cons);

				if (this.is_prefix(cons)) {
					let next = this.check_strict ?
						this._consonant_string(tokens, i) :
						(t || '');
					if (next !== '' && !this.prefix(cons, next)) {
						next = next.replaceAll('+', '');
						warns.push(`Prefix "${cons}" does not occur before "${next}".`);
					}
				} else {
					warns.push(`Invalid prefix consonant "${cons}".`);
				}

				state = "MAIN";

			// - main stack with vowel or multiple consonants
			} else if (!cons) {
				// should not be able to have a main stack after a suffix in proper Tib, but it does happen 
				// in Skt and abbreviations, so let it be
				state = "SUFF1";

				// keep track of the root consonant if it was a single cons with an "a" vowel
				if (root_idx !== null) {
					check_root = false;
				} else if (cons_a) {
					consonants.push(cons_a);
					root_idx = consonants.length - 1;
				}

			// - unexpected single consonant after prefix
			} else if (state === "MAIN") {
				warns.push(`Expected vowel after "${cons}".`);

			// - 1st suffix
			} else if (state === "SUFF1") {
				consonants.push(cons);
				
				// check this one only in strict mode b/c it trips on lots of Skt stuff
				if (this.check_strict && !this.is_suffix(cons)) {
					warns.push(`Invalid suffix consonant: "${cons}".`);
				}
				state = "SUFF2";

			// - 2nd suffix
			} else if (state === "SUFF2") {
				consonants.push(cons);
				if (this.is_suff2(cons)) {
					if (!this.suff2(cons, prev_cons)) {
						warns.push(`"Second suffix "${cons}" does not occur after "${prev_cons}".`);
					}
				} else {
					// handles pa'm, pa'ng
					if (!this.affixedsuff2(cons) || !prev_cons === "'") {
						warns.push(`Invalid 2nd suffix consonant: "${cons}".`);
					}
				}
				state = "NONE";

			// more crap after a 2nd suffix
			} else if (state === "NONE") {
				warns.push(`Cannot have another consonant "${cons}" after 2nd suffix.`);
			}
		}

		if (state === "MAIN" && cons && this.is_prefix(cons)) {
			warns.push(`Vowel expected after "${cons}".`);
		}

		// check root consonant placement only if there were no warnings so far, and the syllable
		// looks ambiguous. not many checks are needed here because the previous state machine
		// already takes care of most illegal combinations.

		if (this.check && !warns.length && check_root && root_idx !== null) {

			// 2 letters where each could be prefix/suffix: root is 1st
			if (consonants.length === 2 && root_idx !== 0
				&& this.prefix(consonants[0], consonants[1])
				&& this.is_suffix(consonants[1]))
			{
				warns.push(`Syllable should probably be "${consonants[0]}a${consonants[1]}".`);

			// 3 letters where 1st can be prefix, 2nd can be postfix before "s" and last is "s":
			// use a lookup table as this is completely ambiguous.
			} else if (consonants.length === 3
				&& this.is_prefix(consonants[0])
				&& this.suff2("s", consonants[1]) && consonants[2] === "s")
			{
				let cc = consonants.join(''), expect = this.ambiguous(cc);
				if (expect && expect[0] !== root_idx) {
					warns.push(`Syllable should probably be "${expect[1]}".`);
				}
			}
		}

		// converted unicode string, num of tokens used, warnings
		return {
			uni: out,
			toks: i - orig_i,
			warns
		};
	}

	// Internal method: Converts one stack's worth of Wylie into unicode, starting at the given index
	// within the array of tokens.
	// 
	// Assumes that the first available token is valid, and is either a vowel or a consonant.
	// 
	// Returns an array with the following results:
	//  - unicode string
	//  - number of tokens used
	//  - the (Wylie) consonant if this stack was a single consonant w/o vowel, otherwise undef
	//  - the (Wylie) consonant if this stack was a single consonant w/ "a", otherwise undef
	//  - array list of warning strings
	//  - did we find a visarga?  (boolean)

	_to_unicode_one_stack(tokens, i) {
		let orig_i = i;
		let t, t2, out = "", warns = [];

		let consonants = 0; 		// how many consonants found
		let vowel_found = null;		// any vowels? (including a-chen)
		let vowel_sign = null;		// any vowel signs (that go under or over the main stack)
		let single_consonant = null;	// did we find just a consonant?
		let plus = false;		// any explicit subjoining via "+"?
		let caret = 0;			// find any '^'?
		let final_found = {};		// keep track of finals (H, M, etc) to warn on repetition

		// do we have a superscript?
		t = tokens[i];
		t2 = tokens[i + 1];
		if (t2 !== null && this.is_superscript(t) && this.superscript(t, t2)) {

			if (this.check_strict) {
				let next = this._consonant_string(tokens, i + 1);
				if (!this.superscript(t, next)) {
					next = next.replaceAll('+', ' ');
					warns.push(`Superscript "${t}" does not occur above combination "${next}".`);
				}
			}

			out += this.consonant(t);
			consonants++;
			i++;
			while (tokens[i] === '^') {
				caret++;
				i++;
			}
		}

		// main consonant + stuff underneath.
		// this is usually executed just once, but the "+" subjoining operator makes it come back here
		MAIN: while (true) {
			
			// main consonant (or "a" after a "+")
			t = tokens[i];
			if (this.consonant(t) || (out !== "" && this.subjoined(t))) {
				out += (out === "" ? this.consonant(t) : this.subjoined(t));
				i++;

				if (t === 'a') {
					vowel_found = 'a';
				} else {
					consonants++;
					single_consonant = t;
				}

				// warn about "dh", etc. (proper EWTS is "d+h")
				let m = t.match(/(?:g|d|D|b|dz)h/);
				if (m) {
					let should = t.replace(/(g|d|D|b|dz)h/, "$1+h");
					warns.push(`"${t} should be "${should}".`);
				}

				while (tokens[i] === '^') {
					caret++;
					i++;
				}

				// subjoined: rata, yata, lata, wazur.  there can be up two subjoined letters in a stack.
				for (let z of [0, 1]) {
					let t2 = tokens[i];
					if (t2 !== null && this.is_subscript(t2)) {

						// lata does not occur below multiple consonants (otherwise we mess up "brla" = "b.r+la")
						if (t2 === 'l' && consonants > 1) break;

						// full stack checking (disabled by "+")
						if (this.check_strict && !plus) {
							let prev = this._consonant_string_backwards(tokens, i - 1, orig_i);
							if (!this.subscript(t2, prev)) {
								prev = prev.replaceAll('+', '');
								warns.push(`Subjoined "${t2}" not expected after "${prev}".`);
							}

						} else if (this.check) {
							if (!this.subscript(t2, t) && !(z === 1 && t2 === 'w' && t === 'y')) {
								warns.push(`Subjoined "${t2}" not expected after "${t}"`);
							}
						}

						out += this.subjoined(t2);
						i++;
						consonants++;
						while (tokens[i] === '^') {
							caret++;
							i++;
						}

						t = t2;

					} else {
						break;
					}
				}
			}

			// caret (^) can come anywhere in Wylie but in Unicode we generate it at the end of 
			// the stack but before vowels if it came there (seems to be what OpenOffice expects),
			// or at the very end of the stack if that's how it was in the Wylie.
			if (caret > 0) {
				if (caret > 1) warns.push(`Cannot have more than one "^" applied to the same stack.`);
				let caret_final = this.finals('^');
				final_found['^'] = '^';
				out += caret_final[0];
				caret = 0
			}

			// vowel(s)
			t = tokens[i];
			if (t !== null && this.vowel(t)) {
				let comp = this.complex_vowel(t);
				if (comp) {
					out += (out.length ? comp[1] : comp[0]);
				} else {
					if (out === '') out += this.vowel('a');
					if (t !== 'a') out += this.vowel(t);
				}

				i++;
				vowel_found = t;
				if (t !== 'a') vowel_sign = t;
			}

			// plus sign: forces more subjoining
			t = tokens[i];
			if (t === '+') {
				i++;
				plus = true;

				// sanity check: next token must be vowel or subjoinable consonant.  
				t = tokens[i];
				if (t === null || (!this.vowel(t) && !this.subjoined(t))) {
					if (this.check) warns.push(`Expected vowel or consonant after "+".`);
					break MAIN;
				}

				// consonants after vowels doesn't make much sense but process it anyway
				if (this.check) {
					if (!this.vowel(t) && vowel_sign) {
						warns.push(`Cannot subjoin consonant "${t}" after vowel "${vowel_sign}" in same stack.`);
					} else if (t === 'a' && vowel_sign) {
						warns.push(`Cannot subjoin a-chen "${t}" after vowel "${vowel_sign}" in same stack.`);
					}
				}

				continue MAIN;
			}
			break MAIN;
		}

		// final tokens
		t = tokens[i];
		while (t !== null && this.finals(t)) {
			let [ uni, klass ] = this.finals(t);

			// check for duplicates
			if (final_found[klass] !== undefined) {
				if (final_found[klass] === t) {
					warns.push(`Cannot have two "${t}" applied to the same stack.`);
				} else {
					warns.push(`Cannot have "${t}" and "${final_found[klass]}" applied to the same stack.`);
				}
			} else {
				final_found[klass] = t;
				out += uni;
			}

			i++;
			single_consonant = null;
			t = tokens[i];
		}

		// if next is a dot "." (stack separator), skip it.
		if (tokens[i] === '.') i++;

		// if we had more than a consonant and no vowel, and no explicit "+" joining, backtrack and
		// return the 1st consonant alone
		if (consonants > 1 && vowel_found === null) {
			if (plus) {
				if (this.check) warns.push(`Stack with multiple consonants should end with vowel.`);
			} else {
				i = orig_i + 1;
				consonants = 1;
				single_consonant = tokens[orig_i];
				out = this.consonant(single_consonant);
			}
		}

		// single consonant is single consonant
		if (consonants !== 1 || plus) single_consonant = null;

		return {
			uni: out,						// converted unicode string
			toks: i - orig_i,					// num of tokens used
			cons: (vowel_found ? null : single_consonant),		// single consonant without vowel
			cons_a: (vowel_found === 'a' ? single_consonant : null), // single consonant with 'a'
			warns,							// warnings
			visarga: ('^' in final_found),				// did we find a visarga
		};
	}

	// Looking from i onwards within tokens, returns as many consonants as it finds,
	// up to and not including the next vowel or punctuation. Skips the caret "^".
	// Returns: a string of consonants joined by "+" signs.
	_consonant_string(tokens, i) {
		let out = [], t;
		while ((t = tokens[i++]) !== null) {
			if (t === '+' || t === '^') continue;
			if (!this.consonant(t)) break;
			out.push(t);
		}
		return out.join('+');
	}

	// Looking from i backwards within tokens, at most up to orig_i, returns as
	// many consonants as it finds, up to and not including the next vowel or
	// punctuation. Skips the caret "^".
	// Returns: a string of consonants (in forward order) joined by "+" signs.
	_consonant_string_backwards(tokens, i, orig_i) {
		let out = [], t;
		while (i >= orig_i && tokens[i] !== null) {
			t = tokens[i--];
			if (t === '+' || t === '^') continue;
			if (!this.consonant(t)) break;
			out.push(t);
		}
		return out.reverse().join('+');
	}

	// Converts a string from Unicode to EWTS
	// Returns: the transliterated string
	// To get the warnings, call ewts.get_warnings() afterwards.
	to_ewts(str) {
		let out = "", line = 1, units = 0;
		this.warnings = [];

		// globally search and replace some deprecated pre-composed Sanskrit vowels
		str = str.replaceAll("\u0f76", "\u0fb2\u0f80")
			.replaceAll("\u0f77", "\u0fb2\u0f71\u0f80")
			.replaceAll("\u0f78", "\u0fb3\u0f80")
			.replaceAll("\u0f79", "\u0fb3\u0f71\u0f80")
			.replaceAll("\u0f81", "\u0f71\u0f80")
			.replaceAll("\u0f75", "\u0f71\u0f74")
			.replaceAll("\u0f73", "\u0f71\u0f72");
		
		let i = 0, len = str.length;

		// iterate over the string, codepoint by codepoint
		ITER: while (i < len) {
			let t = str.charAt(i);

			// found tibetan script - handle one tsekbar
			if (this.tib_top(t)) {

				// we don't need the analyzed stacks in 'stacks'
				let { toks, wylie, warns } = this._to_ewts_one_tsekbar(str, len, i);
				out += wylie;
				i += toks;
				units++;

				for (let w of warns) {
					this.warn(`line ${line}: ${w}`);
				}

				if (this.pass_through) [ i, out ] = this._handle_spaces(str, i, out);
				continue ITER;
			}

			// punctuation and special stuff.  spaces are tricky:
			// - in pass through mode: spaces are not turned to '_' here (handled by handleSpaces)
			// - otherwise: don't do spaces if there is non-tibetan coming, so they become part
			//   of the [  escaped block].
			let o = this.tib_other(t);
			if (o && (t !== ' ' || (!this.pass_through && !this._followed_by_nontibetan(str, i)))) {
				out += o;
				i++;
				units++;

				if (this.pass_through) [ i, out ] = this._handle_spaces(str, i, out);
				continue ITER;
			}

			// newlines, count lines. "\r\n" together count as one newline.
			if (t === "\n" || t === "\r") {
				line++;
				i++;
				out += t;

				if (t === "\r" && i < len && str.charAt(i) === "\n") {
					i++;
					out += "\n";
				}
				continue ITER;
			}

			// ignore BOM and zero-width space
			if (t === "\ufeff" || t === "\u200b") {
				i++;
				continue ITER;
			}

			// anything else - pass along?
			if (this.pass_through) {
				out += t;
				i++;
				continue ITER;
			}

			// other characters in the tibetan plane, escape with \\u0fxx
			let tchar = t.charCodeAt(0);
			if (tchar >= 0x0f00 && tchar <= 0x0fff) {
				let o = this._format_hex(tchar);
				out += o;
				i++;

				// warn for tibetan codepoints that should appear only after a tib_top
				if (this.tib_subjoined(t) || this.tib_vowel(t) || this.tib_final(t)) {
					this.warn(`line ${line}: Tibetan sign ${o} needs a top symbol to attach to.`);
				}
				continue ITER;
			}

			// ... or escape according to Wylie:
			// put it in [comments], escaping [] sequences and closing at line ends
			out += '[';

			while (!this.tib_top(t) && (!this.tib_other(t) || t === ' ') && t !== "\r" && t !== "\n") {

				// \escape [opening and closing] brackets
				if (t === '[' || t === ']') {
					out += "\\" + t;

				// unicode-escape anything in the tibetan plane (i.e characters not handled by Wylie)
				} else if (t.charCodeAt(0) >= 0x0f00 && t.charCodeAt(0) <= 0x0fff) {
					out += this._format_hex(t.charCodeAt(0));

				// and just pass through anything else!
				} else {
					out += t;
				}

				if (++i >= len) break;
				t = str.charAt(i);
			}

			out += ']';
		}

		if (units === 0) this.warn(`No Tibetan characters found!`);
		return out;
	}

	// given a character codepoint number, return a string like "\\uxxxx", with its code in hex
	_format_hex(cp) {
		let s = Number(cp).toString(16);
		while (s.length < 4) s = "0" + s;
		return "\\u" + s;
	}

	// Handles spaces (if any) in the input stream, turning them into '_'.
	// this is abstracted out because in non-escaping mode, we only want to turn spaces into _
	// when they come in the middle of Tibetan script.
	// Returns: new_i, new_out
	_handle_spaces(str, i, out) {
		let found = 0;
		while (i < str.length && str.charAt(i) === ' ') {
			i++;
			found++;
		}

		if (found === 0 || i === str.length) return [ i, out ];

		let t = str.charAt(i);
		if (!this.tib_top(t) && !this.tib_other(t)) return [ i, out ];

		// found 'found' spaces between two tibetan bits; generate the same number of '_'s
		for (let x = 0; x < found; x++) {
			out += '_';
		}
		return [ i, out ];
	}

	// for space-handling in escaping mode: is the next thing coming (after a number of spaces)
	// some non-tibetan bit, within the same line?
	_followed_by_nontibetan(str, i) {
		let len = str.length;
		while (i < len && str.charAt(i) === ' ') i++;
		if (i === len) return false;
		let t = str.charAt(i);
		return !this.tib_top(t) && !this.tib_other(t) && t !== "\r" && t !== "\n";
	}

	// Convert Unicode to EWTS: one tsekbar
	_to_ewts_one_tsekbar(str, len, i) {
		let orig_i = i, warns = [], stacks = [];
		
		// make a list of stacks, until we get to punctuation or to a visarga
		ITER: while (true) {
			let { toks, stack, warns: these_warns } = this._to_ewts_one_stack(str, len, i);
			stacks.push(stack);
			warns = warns.concat(these_warns);
			i += toks;

			if (stack.visarga) break ITER;
			if (i >= len || !this.tib_top(str.charAt(i))) break ITER;
		}

		// figure out if some of these stacks can be prefixes or suffixes (in which case
		// they don't need their "a" vowels)
		let num_stacks = stacks.length, last = num_stacks - 1;
		if (num_stacks > 1 && stacks[0].single_cons) {
			// we don't count the wazur in the root stack, for prefix checking
			let cs = stacks[1].cons_str.replaceAll("+w", "");
			if (this.prefix(stacks[0].single_cons, cs)) {
				stacks[0].prefix = true;
			}
		}

		if (num_stacks > 1 && stacks[last].single_cons && this.is_suffix(stacks[last].single_cons)) {
			stacks[last].suffix = true;
		}

		if (num_stacks > 2
			&& stacks[last].single_cons
			&& stacks[last - 1].single_cons
			&& this.is_suffix(stacks[last - 1].single_cons)
			&& this.is_suff2(stacks[last].single_cons)
			&& this.suff2(stacks[last].single_cons, stacks[last - 1].single_cons))
		{
			stacks[last].suff2 = true;
			stacks[last - 1].suffix = true;
		}

		// if there are two stacks and both can be prefix-suffix, then 1st is root
		if (num_stacks === 2 && stacks[0].prefix && stacks[1].suffix) {
			stacks[0].prefix = false;
		}

		// if there are three stacks and they can be prefix, suffix and suff2, then check w/ a table
		if (num_stacks === 3 && stacks[0].prefix && stacks[1].suffix && stacks[2].suff2) {
			let str = stacks.map(x => x.single_cons).join("");
			let amb = this.ambiguous(str);
			let root;

			if (amb) {
				root = amb[0];
			} else {
				warns.push(`Ambiguous syllable found: root consonant not known for "${str}".`);
				// make it up... 
				root = 1;
			}

			stacks[root].prefix = stacks[root].suffix = false;
			stacks[root + 1].suff2 = false;
		}

		// if the prefix together with the main stack could be mistaken for a single stack, add a "."
		if (stacks[0].prefix && this.tib_stack(stacks[0].single_cons + "+" + stacks[1].cons_str)) {
			stacks[0].dot = true;
		}

		// if some stack after the first starts with a vowel, put a dot before it (ex. "ba.a")
		for (let k = 1; k < stacks.length; k++) {
			if (stacks[k].top == 'a') stacks[k - 1].dot = true;
		}

		// put it all together
		let wylie = stacks.map(x => this._put_stack_together(x)).join("");

		return {
			toks: i - orig_i,	// number of tokens used
			wylie,			// ewts produced
			warns,			// warnings produced
			stacks			// analyzed stacks
		};
	}

	// Puts an analyzed stack together into EWTS output, adding an implicit "a" if needed.
	_put_stack_together(stack) {
		let out = "";

		// put the main elements together... stacked with "+" unless it's a regular stack
		if (this.tib_stack(stack.cons_str)) {
			out += stack.stack.join("")
		} else {
			out += stack.cons_str;
		}

		// caret (tsa-phru) goes here as per some (halfway broken) Unicode specs...
		if (stack.caret) out += '^';

		// vowels...
		if (stack.vowels.length > 0) {
			out += stack.vowels.join("+");

		} else if (!stack.prefix && !stack.suffix && !stack.suff2 && !stack.cons_str.match(/a$/)) {
			out += 'a';
		}

		// final stuff
		out += stack.finals.join("");
		if (stack.dot) out += '.';

		return out;
	}

	// Unicode to EWTS: one stack at a time
	_to_ewts_one_stack(str, len, i) {
		let orig_i = i, warns = [];
		let ffinal = null, vowel = null, klass = null;

		// analyze the stack into: 
		//   - top symbol
		//   - stacked signs (first is the top symbol again, then subscribed main characters...)
		//   - caret (did we find a stray tsa-phru or not?)
		//   - vowel signs (including small subscribed a-chung, "-i" Skt signs, etc)
		//   - final stuff (including anusvara, visarga, halanta...)
		//   - and some more variables to keep track of what has been found
		let stack = {
			top:		null,		// top symbol
			stack:		[],		// [ consonants and also a-chen ]
			caret:		false,		// caret found?
			vowels:		[],		// [ vowels found ]
			finals:		[],		// [ finals found ]

			finals_found:	{},		// { klass of final => ewts }
			visarga:	false,		// visarga found
			cons_str:	null,		// all stack elements separated by "+" (including 'a-chen')
			single_cons:	null,		// is this a single consonant with no vowel signs or finals?
			prefix:		false,		// later set to true if it's a prefix
			suffix:		false,		// later set to true if it's a suffix
			suff2:		false,		// later set to true if it's a second suffix
			dot:		false,		// later set to true if we need a '.' after this stack (ex. "g.yag")
		};

		// for easy access
		let stst = stack.stack, stvow = stack.vowels;

		// assume: this.tib_top(t) exists
		let t = str.charAt(i++);
		stack.top = this.tib_top(t);
		stst.push(this.tib_top(t));

		// grab everything else below the top sign and classify in various categories
		while (i < len) {
			t = str.charAt(i);
			let o;
			
			if ((o = this.tib_subjoined(t))) {
				i++;
				stst.push(o);

				// check for bad ordering
				if (stack.finals.length > 0) {
					warns.push(`Subjoined sign "${o}" found after final sign "${ffinal}".`);
				} else if (stvow.length > 0) {
					warns.push(`Subjoined sign "${o}" found after vowel sign "${vowel}".`);
				}

			} else if ((o = this.tib_vowel(t))) {
				i++;
				stvow.push(o);
				if (vowel === null) vowel = o;

				// check for bad ordering
				if (stack.finals.length > 0) {
					warns.push(`Vowel sign "${o}" found after final sign "${ffinal}".`);
				}

			} else if ((o = this.tib_final(t))) {
				i++;
				[ o, klass ] = o;

				if (o === '^') {
					stack.caret = true;
				} else {
					if (o === 'H') stack.visarga = true;
					if (ffinal === null) ffinal = o;

					// check for invalid combinations
					if (stack.finals_found[klass] !== undefined) {
						warns.push(`Final sign "${o}" should not combine with final sign "${stack.finals_found[klass]}".`);
					} else {
						stack.finals_found[klass] = o;
						stack.finals.push(o);
					}
				}

			} else {
				break;
			}
		}

		// now analyze the stack according to various rules:

		// a-chen with vowel signs: remove the "a" and keep the vowel signs
		if (stack.top === "a" && stst.length === 1 && stvow.length > 0) {
			stst.shift();
		}

		// handle long vowels: A+i becomes I, etc.
		if (stvow.length > 1 && stvow[0] === 'A' && this.tib_vowel_long(stvow[1])) {
			stvow.splice(0, 2, this.tib_vowel_long(stvow[1]));
		}

		// Sanskrit vocalic 'r' and 'l' (r-i, r-I, l-i, l-I): treat them as vowels
		if (stst.length > 0
			&& stst[stst.length - 1] in ['r', 'l']
			&& stvow.length === 1
			&& stvow[0] in ['-i', '-I'])
		{
			let rl = stst.pop();
			stvow[0] = rl + stvow[0];
		}

		// special cases: "ph^" becomes "f", "b^" becomes "v"
		if (stack.caret && stst.length === 1 && this.tib_caret(stack.top)) {
			stack.top = stst[0] = this.tib_caret(stack.top);
			stack.caret = false;

		}

		stack.cons_str = stst.join("+");

		// if this is a single consonant, keep track of it (useful for prefix/suffix analysis)
		if (stst.length === 1
			&& stst[0] !== 'a'
			&& !stack.caret
			&& stvow.length === 0
			&& stack.finals.length === 0)
		{
			stack.single_cons = stack.cons_str;
		}

		// return the analyzed stack
		return {
			toks: i - orig_i,	// tokens used
			stack,
			warns
		};
	}
}

export { EwtsConverter }

