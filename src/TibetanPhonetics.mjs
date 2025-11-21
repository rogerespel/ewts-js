/*
  This module creates approximate phonetics for Tibetan text, according to THL Simplified Phonemic Transcription and other standards.
  Based on the original perl module Lingua::BO::Phonetics, and tightly coupled to the JS module EwtsConverter.

  Copyright (C) 2008-2025 Roger Espel Llima

  This library is Free Software.  You can redistribute it or modify it, under
  the terms of the Apache licence version 2.0.
*/

import { EwtsConverter } from './EwtsConverter.mjs';
import word_data from './words.json' with { type: 'json' };

// how many tsekbars per word max, for word splitting?
// this needs to be as long as the longest word in the exceptions list
const MAX_WORD_LENGTH = 6;

// helper function: convert an array to an object with each array element => true
const array_to_true_object = arr => Object.fromEntries(arr.map(x => [ x, true ]));

// superscript => { letter or stack below => 1 }
// (not copied from EwtsConverter b/c of different handling of "lh")
const superscripts = {
    r: array_to_true_object(["k", "g", "ng", "j", "ny", "t", "d", "n", "b", "m", "ts", "dz", "k+y", "g+y", "m+y", "b+w", "ts+w", "g+w"]),
    l: array_to_true_object(["k", "g", "ng", "c", "j", "t", "d", "p", "b"]),
    s: array_to_true_object(["k", "g", "ng", "ny", "t", "d", "n", "p", "b", "m", "ts", "k+y", "g+y", "p+y", "b+y", "m+y", "k+r", "g+r", "p+r", "b+r", "m+r", "n+r"]),
};

// umlauting suffixes
const suffix_umlaut_default = array_to_true_object([ 'd', 'n', 'l', 's', 'N' ]);

// pronunciation of suffixes (where different from their Wylie representation)
const pronounce_suffix_default = {
    g: "k",
    b: "p",
    d: "",
    s: "",
    N: "n",
    "'": "",
};

// pronunciation of main consonants (when different from wylie)
const pronounce_consonant_default = {
    c: "ch",
    th: "t",
    Th: "t",
    ph: "p",
    tsh: "ts",
    "'": "",
    a: "",
    N: "n",
    T: "t",
    D: "d",
};

// pronunciation of umlauts
const pronounce_umlaut_default = {
    a: "e",
    o: "\u00f6",        // o umlaut
    u: "\u00fc",        // u umlaut
};

// consonant clusters that change pronunciation
const pronounce_clusters_default = {
    py: "ch",
    phy: "ch",
    by: "j",
    my: "ny",
    kr: "tr",
    pr: "tr",
    tr: "tr",
    khr: "tr",
    phr: "tr",
    thr: "tr",
    gr: "dr",
    br: "dr",
    dr: "dr",
    nr: "n",
    mr: "m",
    sr: "s",
    kl: "l",
    gl: "l",
    bl: "l",
    rl: "l",
    sl: "l",
    zl: "d",
};

// Defaults for creating a new TibetanPhonetics object.
const defaults = {
    middle_suffix: true,    // strict THL: false
    middle_nasals: true,
    join_words: true,
    accent_on_e: true,
    no_double_g: false,
    smart_autosplit: false,
};

class TibetanPhonetics {

    // Constructor.  Options include:
    // - middle_suffix: (bool) allow a consonant in the middle of a tsek-bar to be a suffix, like the "g" in the abbreviation "bzhugso".  default is true; set it to false to get stricter THL phonetics.
    // - middle_nasals: (bool) nasalize a-chungs in subsequent syllables, as in "mkha' 'gro'" => "kan dro".  default is true.
    // - join_words: (bool) join the syllables that belong to a single word, as in "khorwa" rather than "khor wa".
    // - accent_on_e: (bool) whether to put acute accents on final "e" vowels, to avoid English-speakers mispronouncing them as /i/.
    // - no_double_g: (bool) simplify double "g" before "n", as in "sangye" rather than "sanggye".  Not done by default.
    // - smart_autosplit: (bool) smart auto split based on common Tib syllables
    // - pronounce_suffix: (object) an optional object of { suffix_consonant => pronunciation }, ex. { b => 'b' }.  Only those that differ from the default need to be specified.
    // - pronounce_consonant: (object) an optional object of { consonant => pronunciation }, ex. { zh => 'shy' } to make "zha" become "shya".
    // - pronounce_vowel: (object) an optional object of { vowel => pronunciation }, ex. { u => 'ou' }
    // - pronounce_umlaut: (object) an optional object of { vowel => umlauted_vowel }, ex. { a => "\xe4" }.
    // - pronounce_clusters: (object) an optional object of { consonant_cluster => pronunciation }, ex. { by => "ch" }.
    // - suffix_umlaut: (object) an optional object of { suffix_consonant => boolean }, ex. { l => false }.  Only those suffixes that differ from the default need to be specified.
    // - devoice_initials: (object) an optional object of { consonant => devoiced_pronounciaton }, ex. { j => 'ch' }.  Provide this if you want initial 2nd-column consonants (g, j, d, b) to be devoiced when they are not preceded by a prefix or a superscript.  This is not done by default.
    //     Note that this is applied I<after> pronounce_clusters, so if you devoice "j" to "ch", then "bya" also turns into "cha".  If you want things like "gra" to be devoiced to "tra", you also need to add (dr => 'tr') to this hash, i.e devoice the output of pronounce_clusters.
    // - second_vowel: (object) an optional object of { vowel => separator }.  To specify optional separators before second vowel stacks in the same tsekbar, ex. Wylie pa'am -> "pam" (no separator), "pa'am" or "pa am".
    // - devoice_each_syllable: (bool) whether devoicing of initial consonants should apply to all the syllables in a word, or only to the first (default false, i.e to the first only)
    // - dbu_is_u: (bool) pronounce "dbu" as "u" rather than "wu"

    constructor(opts = {}) {
        // merge defaults and opts
        Object.assign(this, defaults, opts);

        this._warns = [];
        this._wl = new EwtsConverter();

        // pronunciation lists: what we are given overrides the defaults
	this.pronounce_suffix = Object.assign({}, pronounce_suffix_default, (this.pronounce_suffix || {}));
	this.suffix_umlaut = Object.assign({}, suffix_umlaut_default, (this.suffix_umlaut || {}));
	this.pronounce_consonant = Object.assign({}, pronounce_consonant_default, (this.pronounce_consonant || {}));
	this.pronounce_vowel ||= {};
	this.pronounce_umlaut = Object.assign({}, pronounce_umlaut_default, (this.pronounce_umlaut || {}));
	this.pronounce_clusters = Object.assign({}, pronounce_clusters_default, (this.pronounce_clusters || {}));

        this.devoice_initials ||= {};
        this.second_vowel ||= {};

	// for word splitting
	this._words ||= word_data.words;
	this._exceptions ||= word_data.exceptions;
    }

    // Retrieve the list of warnings generated from the previous phonetics call(s); note that warnings accumulate until cleared
    get_warnings() {
        return this._warns || [];
    }

    // Clear warnings
    clear_warnings() {
        this._warns = [];
    }

    // Creates Tibetan phonetics from (string, { options })
    // - string can be either Unicode or Wylie; it will be converted from Wylie if it doesn't include any main characters from the Tibetan Unicode set, and has alphanumerics.
    // - options:
    //   = joiner: The character or string used to B<join syllables> that belong to a word.  Tibetan in Wylie with syllables joined with "-" looks like this: sangs-rgyas dang byang-chub-sems-dpa' thams-cad la phyag-'tshal-lo
    //   = separator: The character or string used to B<separate syllables> that don't belong to a word, or undef.  You cannot have a joiner and a separator at the same time.  Tibetan in Wylie with words separated with "/" looks like this: sangs rgyas / dang / byang chub sems dpa' / thams cad / la / phyag 'tshal lo
    //   = autosplit: Automatically split into words using a built-in word list.  This is incompatible with both joiner and separator.
    //   = clear_warnings: clear warnings from previous calls (by default they accumulate)
    // If neither of joiner/separator/autosplit are specified, then each syllable will be handled separately.
    // Note that if the input is Wylie, then the joiner or separator should be Wylie, and if the input is Unicode, then the joiner or separator should be Unicode too.

    phonetics(str, { joiner, separator, autosplit, caps, clear_warnings } = {}) {
        if (clear_warnings) this._warns = [];

    	// nulls to undefined
	if (joiner === null) joiner = undefined;
	if (separator === null) separator = undefined;
	if (autosplit === null) autosplit = undefined;

        if ([ joiner, separator, autosplit ].filter(x => x !== undefined).length > 1) {
            throw new Error("Can only have one of 'joiner', 'separator' and 'autosplit'.");
        }

        const out_tokens = [];
        let units = 0;
        let line = 1;

        // Possibly convert from Wylie, and clean-up.
        // Internal representation: tsekbars (potentially) belonging to a single word are separated by non-breaking tseks.
        const [ prepared_str, warns ] = this._prepare_string(str, joiner, separator, autosplit, caps);
        for (let w of warns) this._warn(w);

        // iterate over codepoints
        let i = 0;
        let len = prepared_str.length;

        ITER: while (i < len) {
            const t = prepared_str.charAt(i);

            // newlines, count lines.  "\r\n" together count as one newline.
            if (t === "\n" || t === "\r") {
                line++;
                i++;

                // remove trailing space
                if (out_tokens.length && out_tokens[out_tokens.length - 1] === ' ') {
                    out_tokens.pop();
                }
                out_tokens.push(t);

                if (t === "\r" && i < len && prepared_str.charAt(i) === "\n") {
                    i++;
                    out_tokens.push("\n");
                }
                continue ITER;
            }

            // pass "@" along, it is internally used to mark capitalization
            if (t === '@') {
                out_tokens.push(t);
                ++i;
                continue ITER;
            }

            // skip other non-tibetan
            if (!this._wl.tib_top(t)) {
                ++i;
                continue ITER;
            }

            const tsek_bars = [];

            // split into as many successive tsekbars as we can find, separated by single
            // non-breaking tsek only (i.e candidates for being a single word)
            TSEKS: while (i < len && this._wl.tib_top(prepared_str.charAt(i))) {
                const { toks, wylie, warns: wl_warns, stacks } = this._wl._to_ewts_one_tsekbar(prepared_str, len, i);
                i += toks;
                units++;

                for (const w of wl_warns) this._warn(`line ${line}: ${w}`);

                tsek_bars.push({ stacks, wylie });

                // skip a non-breaking tsek
                if (prepared_str.charAt(i) === "\u0f0c") i++;
            }

            // now, group these tsekbars into words
            let j = 0;
            const one_unit_out = [];
            while (j <= tsek_bars.length - 1) {

                // group into words using the automatic splitter, or just take it all together
                const grab = autosplit && this.smart_autosplit ? this._find_word_smart(tsek_bars, j).grab :
		    autosplit ? this._find_word(tsek_bars, j).grab :
                    tsek_bars.length;

                const process = tsek_bars.slice(j, j + grab);
                j += grab;

                const { pron, warns: pr_warns } = this._pronounce_processed_word(process);

                // keep track for each unit of the generated pronunciation and the number of tsekbars taken
                one_unit_out.push([ pron, grab ]);

                for (const w of (pr_warns || [])) this._warn(`line ${line}: ${w}`);
            }

            if (one_unit_out.length > 0) {

                // do any optional post-processing to a "line" (actually a straight chunk) of Tibetan;
                // Padmakara forcefully joins syllables by twos at this point
                this.final_line_tweak(one_unit_out);

                // join it all together inserting spaces as appropriate
                out_tokens.push(one_unit_out.map(x => x[0]).filter(x => x !== '').join(' '), ' ');
            }
        }

        if (!units) this._warn("No Tibetan text found!");

        // put it together, remove trailing spaces and capitalize as needed
        return out_tokens.join('')
	    .replace(/ +$/g, '')
	    .replace(/@(\w)/g, (_, c) => c.toUpperCase())
	    .replace(/@/g, '');
    }

    // INTERNAL FUNCTIONS

    // Convert a Tibetan string (either Wylie or Unicode) to the internal
    // representation in Unicode, using normal tseks for hard word breaks, and non
    // breaking tseks for syllables (presumably) belonging to the same word.
    _prepare_string(str, joiner, separator, autosplit, caps) {
        const warns = [];

        // internally, the caps marker always becomes an "@"
        if (caps !== undefined && caps !== null && caps !== '') {
            str = str.replaceAll(caps, "@");
        }

        // convert from Wylie if it doesn't look like tibetan unicode...
        if (!/[\u0f40-\u0f6a]/.test(str) && /[a-zA-Z]/.test(str)) {

            separator = (joiner === undefined && separator === undefined && autosplit === undefined) ? ' ' : separator;

            if (joiner !== undefined) {
                if (joiner !== '*') {
                    str = str.replaceAll('*', ' ');
                    str = str.split(joiner).join('*');
                }

            } else if (separator !== undefined) {
                if (separator !== ' ') {
                    str = str.replaceAll(' ', '*');
                    str = str.split(separator).join(' ');
                }

            } else if (autosplit) {
                str = str.replaceAll(' ', '*');

            } else {
                str = str.replaceAll('*', ' ');
            }

            str = this._wl.to_unicode(str, '@');
            for (const w of this._wl.get_warnings()) warns.push(w);

        } else {
            str = this._cleanup_unicode(str);

            separator = (joiner === undefined && separator === undefined && autosplit === undefined) ? "\u0f0b" : separator;

            if (joiner !== undefined) {
                if (joiner !== "\u0f0c") {
                    str = str.replaceAll("\u0f0c", "\u0f0b");
                    str = str.split(joiner).join("\u0f0c");
                }

            } else if (separator !== undefined) {
                if (separator !== "\u0f0b") {
                    str = str.replaceAll("\u0f0b", "\u0f0c");
                    str = str.split(separator).join("\u0f0b");
                }

            } else if (autosplit) {
                str = str.replaceAll("\u0f0b", "\u0f0c");

            } else {
                str = str.replaceAll("\u0f0c", "\u0f0b");
            }
        }

        // remove small circles under letters (0f35, 0f37), as they can mess up the phonetics process
        str = str.replace(/[\u0f35\u0f37]/g, '');

        return [ str, warns ];
    }

    // Find out how many tsekbars should we grab together to form a word, using a greedy algorithm.
    _find_word(tsek_bars, start) {
        let word;

        // how many tsekbars can we grab at most?
        let grab = tsek_bars.length - start;
        if (grab > MAX_WORD_LENGTH) grab = MAX_WORD_LENGTH;

        for (; grab > 1; grab--) {

            // do these tsekbars together make a word?
            word = tsek_bars.slice(start, start + grab).map(x => x.wylie).join(' ');
            if (this._words[word]) break;

            // or is it a derived word?
            // ex. 'khor 'ba'i, 'khor 'bas, 'khor ba'am, 'khor ba'ang, 'khor ba'o, 'khor bar
            if (word.match(/([aeiou])(?:'i|s|'am|'ang|'o|r)$/)) {
                const trimmed = word.replace(/([aeiou])(?:'i|s|'am|'ang|'o|r)$/, '$1');
                if (this._words[trimmed] || this._words[trimmed + "'"]) break;
            }
        }

        if (grab === 1) word = tsek_bars[start].wylie;
        return { grab, word };
    }

    // Advanced word-splitting; in addition to the word list, we also have some heuristics:
    //  - single syllable + pa/ba/po/bo/mo (not "ma" as it is often a negative) makes a word
    //  - "ma" + single syllable + pa/ba makes a word (ex. "ma bcos pa")
    //  - single syllable + med/ldan/bral/bya/can makes a word, unless followed by pa/ba.
    
    _find_word_smart(tsek_bars, start) {
        // how many tsekbars available?
        const max = tsek_bars.length - start;
        
        // how many tsekbars would the generic algorithm give us?
        const { grab, word } = this._find_word(tsek_bars, start);
        if (this._exceptions[word]) return { grab, word };
        
        // "ma xxx pa/ba"
        if (max >= 3 &&
            grab <= 3 &&
            tsek_bars[start].wylie === 'ma' &&
            /^[bp]a(?:'i|s|'am|'ang|'o|r)?$/.test(tsek_bars[start + 2].wylie))
        {
            return { grab: 3, word: tsek_bars.slice(start, start + 3).map(x => x.wylie).join(' ') };
        }
        
        // "xxx pa/ba/po/bo/mo med/ldan/bral/bya/can" not followed by pa/ba/po/bo.
        if (max >= 3 &&
            grab <= 3 &&
            /^(?:pa|ba|po|bo|mo)$/.test(tsek_bars[start + 1].wylie) &&
            /^(?:med|ldan|bral|bya|can)$/.test(tsek_bars[start + 2].wylie) &&
            (max === 3 || !/^[pb][ao](?:'i|s|'am|'ang|'o|r)?$/.test(tsek_bars[start + 3].wylie)))
        {
            return { grab: 3, word: tsek_bars.slice(start, start + 3).map(x => x.wylie).join(' ') };
        }
        
        // "xxx pa/ba/po/bo/mo".
        // note that we exclude "mos" from being interepreted as a weak syllable, as it is often part
        // of "mos gus" or "mos pa".
        // we also exclude "kyi bar" and "dang bar", since "bar" is here not a la-don-ified "ba".
        // same with "bar gyi", "bar chad", "bar gcod", "bar du", "bar do"
        if (max >= 2 &&
            grab <= 2 &&
            /^(?:pa|ba|po|bo|mo(?!s))(?:'i|s|'am|'ang|'o|r)?$/.test(tsek_bars[start + 1].wylie) &&
            (tsek_bars[start + 1].wylie !== 'bar' ||
                (!/^(?:dang|kyi|gyi|yi|gi)$/.test(tsek_bars[start].wylie) &&
                 (max === 2 || !/^(?:gyi|chad|gcod|du|do)$/.test(tsek_bars[start + 2].wylie)))))
        {
            return { grab: 2, word: tsek_bars.slice(start, start + 2).map(x => x.wylie).join(' ') };
        }
        
        // "xxx med/ldan/bral/bya/can" not followed by pa/ba/po/bo.  (xxx cannot be "dang")
        if (max >= 2 &&
            grab <= 2 &&
            /^(?:med|ldan|bral|bya|can)$/.test(tsek_bars[start + 1].wylie) &&
            !/^(?:dang|su)$/.test(tsek_bars[start].wylie) &&
            (max === 2 || !/^[pb][ao](?:'i|s|'am|'ang|'o|r)?$/.test(tsek_bars[start + 2].wylie)))
        {
            return { grab: 2, word: tsek_bars.slice(start, start + 2).map(x => x.wylie).join(' ') };
        }
        
        return { grab, word };
    }

    // Check for a standard tibetan syllable, comprised of one main stack (w/ prefixes & suffixes
    // as appropriate), optionally followed by up to two stacks with an a-chung, an optional
    // vowel, and possibly a suffix on the last one.
    //
    // At this point, prefixes & suffixes have been merged into the stack they attach to.
    _check_standard(stacks) {

        // at most 3 stacks
        if (stacks.length > 3) return false;

        // check the stack on the 1st one
        const st1 = stacks[0].stack.join('+');
        if (/\+/.test(st1) && !this._wl.tib_stack(st1)) return false;

        // no multiple vowels anywhere
        for (const s of stacks) {
            if (s.vowels.length > 1) return false;
        }

        // no visargas, anusvaras or halantas on non-final stacks; no halantas at the end either
        for (let idx = 0; idx < stacks.length - 1; idx++) {
            const s = stacks[idx];
            if (s.finals_found.M || s.finals_found.H || s.finals_found["?"]) return false;
        }
        if (stacks[stacks.length - 1].finals_found["?"]) return false;

        // only achung-vowels in the middle
        for (let idx = 1; idx < stacks.length - 1; idx++) {
            const s = stacks[idx];
            if (!(s.stack.length === 1 && s.stack[0] === "'" && !s.suffix)) return false;
        }

        // only achung-vowels + optional suffix at the end
        if (stacks.length > 1) {
            const s = stacks[stacks.length - 1];
            if (!(s.stack.length === 1 && s.stack[0] === "'")) return false;
        }

        return true;
    }

    // Cleans up tibetan unicode, replacing precombined characters with their combinations.
    _cleanup_unicode(str) {
        // globally search and replace some deprecated pre-composed Sanskrit vowels
        return str.replace(/\u0f76/g, "\u0fb2\u0f80")
	    .replace(/\u0f77/g, "\u0fb2\u0f71\u0f80")
	    .replace(/\u0f78/g, "\u0fb3\u0f80")
	    .replace(/\u0f79/g, "\u0fb3\u0f71\u0f80")
	    .replace(/\u0f81/g, "\u0f71\u0f80")

	    // ... and pre-composed dh, gh, etc
	    .replace(/\u0f43/g, "\u0f42\u0fb7")
	    .replace(/\u0f4d/g, "\u0f4c\u0fb7")
	    .replace(/\u0f52/g, "\u0f51\u0fb7")
	    .replace(/\u0f57/g, "\u0f56\u0fb7")
	    .replace(/\u0f5c/g, "\u0f5b\u0fb7")
	    .replace(/\u0f69/g, "\u0f40\u0fb5")
	    .replace(/\u0f93/g, "\u0f92\u0fb7")
	    .replace(/\u0f9d/g, "\u0f9c\u0fb7")
	    .replace(/\u0fa2/g, "\u0fa1\u0fb7")
	    .replace(/\u0fa7/g, "\u0fa6\u0fb7")
	    .replace(/\u0fac/g, "\u0fab\u0fb7")
	    .replace(/\u0fb9/g, "\u0f90\u0fb5");
    }

    // Create the phonetics for a single Tibetan word, given as a set of analyzed tsekbars.
    _pronounce_processed_word(tsek_bars) {
        const warns = [];

        // put together the Wylie
        const wylie = tsek_bars.map(x => x.wylie).join(' ');

        // is this an exceptional pronunciation from the exceptions list?
        if (this._exceptions[wylie] !== undefined) {
            return { pron: this._exceptions[wylie], warns };
        }

        // or is it a derived word?  manually do derivations from the exceptions list.
	const derived_rx = /([aeiou])('i|s|r|'am|'ang|'o)$/;
        const m = wylie.match(derived_rx);
	const base = wylie.replace(derived_rx, '$1');

        if (m && this._exceptions[base] !== undefined) {
            const add = m[2];
            let pron = this._exceptions[base];

            // do manual umlauting for 'i, s
            if ((add === "'i" && !(this.second_vowel && this.second_vowel.i)) || add === "s") {

                // french needs 'ou' to be umlauted into 'u'
                if (/ou$/.test(pron) && this.pronounce_vowel.u === 'ou' && this.pronounce_umlaut.u === 'u') {
                    pron = pron.replace(/ou$/, 'u');

                } else if (/[aou]$/.test(pron)) {
                    const last = pron.slice(-1);
                    const repl = this.pronounce_umlaut[last];
                    if (repl) {
                        pron = pron.slice(0, -1) + repl;
                        if (this.accent_on_e) pron = pron.replace(/e$/, "\u00e9");
                    }
                }

            // just add an 'r' for la-don r
            } else if (add === "r") {
                pron += "r";

            // for 'am, 'ang, 'o, add the "second vowel" separator if needed
            } else if (/^'../.test(add)) {
                const vowel = add.charAt(1),
		    rest = add.substring(2),
		    sep = (this.second_vowel && this.second_vowel[vowel]) || '';
                pron += sep;
                if (sep || !pron.endsWith(vowel)) pron += vowel;
                pron += rest;
            }

            return { pron, warns };
        }

        const out = [];

        // loop over the tsekbars in the word
        for (let i = 0; i < tsek_bars.length; i++) {
            const tsekbar_out = [];
	    const stacks = tsek_bars[i].stacks;

            // drop the prefix as a separate unit, but keep track of it in the main stack
            if (stacks[0].prefix) {
                stacks[1].has_prefix = stacks[0].single_cons;
                stacks.shift();
            }

            // optional: also allow the 2nd to be a suffix if a full stack comes after it
            // (ex. "bzhugso")
            if (this.middle_suffix &&
                stacks.length >= 3 &&
                !stacks[1].suffix && !stacks[2].suffix &&
                stacks[1].single_cons &&
                this._wl.is_suffix(stacks[1].single_cons))
            {
                stacks[1].middle_suffix = 1;
            }

            // drop the suffix & 2nd suffix as a separate unit, but keep track of the suffixes
            let suff2 = '';
            if (stacks[stacks.length - 1].suff2) {
                suff2 = stacks[stacks.length - 1].single_cons;
                stacks.pop();
            }

            if (stacks[stacks.length - 1].suffix) {
                const suff = stacks[stacks.length - 1].single_cons;
                stacks.pop();
                const s = stacks[stacks.length - 1];

                // pronounce the suffix (trying both with and without the second suffix - someone might want to pronounce "gs" differently from "g");
                // also keep track of umlauting
                if (this.suffix_umlaut[suff]) s.has_umlaut = suff;

                const pronounced = this.pronounce_suffix[suff + suff2] ?? this.pronounce_suffix[suff] ?? suff;
                if (pronounced !== '') stacks[stacks.length - 1].has_suffix = pronounced;
            }

            // handle attached 'i, 'o, 'u, 'am, etc
            for (let j = 1; j < stacks.length; j++) {
                if (stacks[j].cons_str !== "'") continue;
                const vowel = stacks[j].vowels[0] || 'a';

                // final 'i is removed as a separate stack, but sets the prev stack for umlauting, unless we have a 'second_vowel' value for it
                if (vowel === 'i' && !(this.second_vowel && (vowel in this.second_vowel))) {
                    stacks[j - 1].has_umlaut = "'i";
                    stacks.splice(j, 1);
                    j--;
                    continue;
                }

                // for other vowels we consult second_vowel to see if a separator is needed
                const sep = (this.second_vowel && this.second_vowel[vowel]) || '';
                if (sep !== '') stacks[j].second_vowel_sep = sep;
            }

            // check for a standard looking syllable
            const standard_syllable = this._check_standard(stacks);

            // in all stacks (there can be several...):
            for (const s of stacks) {

                // split the consonants for processing...
                let c = s.cons_str.split('+');

                // no wazurs, thanks!
                if (c.length > 1 && c[c.length - 1] === 'w') c.pop();

                // remove superscripts...
                if (c.length > 1) {
                    const first = c[0], rest = c.slice(1).join('+');
                    if (superscripts[first] && superscripts[first][rest]) {
                        s.has_superscripts = first;
                        c.shift();
                    }
                }

                // special rules for dba => wa, dbo => wo, dbya => ya, dbra => ra, dbu => u...
                if (s.has_prefix && s.has_prefix === 'd' && c[0] === 'b') {
                    if ((this.dbu_is_u && s.vowels.length && s.vowels[0] === 'u') ||
                        (c[1] && (c[1] === 'y' || c[1] === 'r')))
                    {
                        c.shift();
                    } else {
                        c[0] = "w";
                    }
                }

                // change ba => wa, bo => wo in the 2nd and further tsekbars; also with "-r" suffix
                if (standard_syllable && i > 0 &&
                    !s.has_prefix && s.cons_str === 'b' &&
                    (s.vowels.length === 0 || /^(?:a|o)$/.test(s.vowels[0])) &&
                    c[0] === 'b' &&
                    (!s.has_suffix || s.has_suffix === 'r'))
                {
                    c[0] = "w";
                }

                // consonant clusters: phya => cha, etc
                if (c.length > 1) {
                    const cc = c[0] + c[1];
                    if (this.pronounce_clusters[cc]) {
                        c.splice(0, 2, this.pronounce_clusters[cc]);
                    }
                }

                // (optionally) devoice initials, ex. "cha" => "ja".
                if ((i === 0 || this.devoice_each_syllable) && c.length && !s.has_prefix && !s.has_superscripts &&
                    this.devoice_initials[c[0]]) {
                    c[0] = this.devoice_initials[c[0]];
                }

                // fix consonant pronunciation
                c = c
                    .map(x => this.pronounce_consonant[x] ?? x.toLowerCase())
                    .filter(x => x !== '');

                // put it back, without plusses
                s.cons_pronounce = c.join('');

                // 2nd syllable nasalisations...
                if (this.middle_nasals && stacks.length === 1 && tsek_bars.length - 1 > i) {
                    const next = tsek_bars[i + 1];

                    // 1) a-chung prefix produces a nasal suffix in the prev syllable
                    if (next.stacks[0].prefix && next.stacks[0].single_cons === "'") {
                        const cons = next.stacks[1].cons_str;
                        if (cons === "b" || cons === "ph") {
                            s.has_suffix = "m";
                        } else {
                            s.has_suffix = "n";
                        }

                    // 2) m prefix produces an m suffix, unless there was already a nasal suffix
                    } else if (next.stacks[0].prefix && next.stacks[0].single_cons === 'm') {
                        if (!(s.has_suffix && /^(?:m|n|ng)$/.test(s.has_suffix))) {
                            s.has_suffix = 'm';
                        }

                    // 3) l superscript in ld, lt, lj produces an n suffix.  same with zl.
                    } else if (/^l\+(?:d|t|j)(?:\+|$)/.test(next.stacks[0].cons_str) ||
                               /^z\+l(?:\+|$)/.test(next.stacks[0].cons_str)) {
                        if (!(s.has_suffix && /^(?:m|n|ng)$/.test(s.has_suffix))) {
                            s.has_suffix = 'n';
                        }
                    }
                }

                // put the vowel
                const vowel = (s.vowels[0] || 'a').toLowerCase();
                if (s.middle_suffix) {
                    s.vowel_pronounce = '';
                } else if (s.has_umlaut) {
                    s.vowel_pronounce =
                        this.pronounce_umlaut[vowel + s.has_umlaut] ||
                        this.pronounce_umlaut[vowel] ||
                        this.pronounce_vowel[vowel] ||
			vowel;
                } else {
                    s.vowel_pronounce = this.pronounce_vowel[vowel] || vowel;
                }

                // finals?
                if (s.finals.some(x => x === 'M')) {
                    s.final_pronounce = 'm';
                } else if (s.finals.some(x => x === 'H')) {
                    s.final_pronounce = 'h';
                }
                if (s.finals.some(x => x === '?')) {
                    s.vowel_pronounce = '';
                }

                if (s.second_vowel_sep) tsekbar_out.push(s.second_vowel_sep);
                if (s.cons_pronounce) tsekbar_out.push(s.cons_pronounce);
                if (s.vowel_pronounce) tsekbar_out.push(s.vowel_pronounce);
                if (s.has_suffix) tsekbar_out.push(s.has_suffix);
                if (s.final_pronounce) tsekbar_out.push(s.final_pronounce);
            }

            // put together the pronunciation for the tsek-bar
            let pron = tsekbar_out.join('');

            // any more final tweaks to this tsekbar's pronunciation?
	    // does nothing by default, but can be used by subclasses to insert additional rules
            pron = this.final_tsekbar_tweak(pron);

	    // mark dubious syllables
            if (!standard_syllable && !this._words[wylie]) {
                pron += "(?)";
                const wy = tsek_bars[i].wylie;
                warns.push(`Dubious syllable: "${wy}".`);
            }

            out.push(pron);
            if (!this.join_words) out.push(" ");
        }

        let pron = out.join('').replace(/ $/, '');

        // remove duplicate vowels
        pron = pron.replace(/([aeiou])\1/g, '$1');

        // sanggye => sangye (and similar...)
        if (this.no_double_g) pron = pron.replace(/ngg/g, 'ng');

        // put accent on final "e" if needed - also before "'" and before final "i"
        if (this.accent_on_e) pron = pron.replace(/e($|\(|'|i\b| )/g, "\u00e9$1");

        return { pron, warns };
    }

    // Put something in a subclass if you need extra post-processing of each tsekbar.
    // Does nothing by default.
    final_tsekbar_tweak(pron) {
        return pron;
    }

    // Put something in a subclass to mutate units_out if you need extra post-processing of each line.
    // Does nothing by default.
    final_line_tweak(units_out) {
    }

    // Generate a warning.
    _warn(warn) {
        this._warns.push(warn);
    }
}

export { TibetanPhonetics }

