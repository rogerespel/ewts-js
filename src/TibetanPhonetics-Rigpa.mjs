/*
  This module creates approximate phonetics for Tibetan text, according to Rigpa's usage.
  Based on the original perl module Lingua::BO::Phonetics::Rigpa.

  Copyright (C) 2008-2025 Roger Espel Llima

  This library is Free Software.  You can redistribute it or modify it, under
  the terms of the Apache licence version 2.0.
*/

import { TibetanPhonetics } from './TibetanPhonetics.mjs';
import word_data from './rigpa.json' with { type: 'json' };

const { words, exceptions } = word_data;

const default_opts = {
    middle_nasals: false,
    accent_on_e: true,
    dbu_is_u: true,
    pronounce_suffix: { b: 'b' },
    pronounce_consonant: { zh: 'shy' },
    suffix_umlaut: { l: undefined },
    second_vowel: { a: " ", o: " ", u: "'", e: "'" },
    smart_autosplit: true,
};

const lang_opts = {
    en: {},
    es: {
        accent_on_e: false,
        no_double_g: true,
        pronounce_consonant: {
            ny: "\xf1",     // use Spanish n-tilde
            zh: 'shy',
        },
        devoice_initials: {
            j: 'ch',
        },
    },
    fr: {
        suffix_umlaut: { l: true },
        pronounce_umlaut: {
            u: "u",
            ol: "o",        // neutralize the umlauting effect of 'l', except after u
            al: "a",
        },
        pronounce_vowel: {
            u: "ou",
        },
        pronounce_consonant: {
            kh: "k'",
            ph: "p'",
            th: "t'",
            Th: "t'",
            zh: 'shy',
        },
        pronounce_clusters: {
            khr: "t'r",
            phr: "t'r",
            thr: "t'r",
            Thr: "t'r",
            lh: "l'",
        },
    },
    de: {
        accent_on_e: false,
    },
};

// make LotsawaHouse style exceptions; same as Rigpa exceptions but with 'zh' rather than 'shy'
// - these go under exceptions["en-lh"], etc.
// - harmless if called multiple times, will not recalculate
function make_lh_exceptions() {
    for (const lang of Object.keys(exceptions)) {
        if (/-lh$/.test(lang)) continue;
        const key = lang + '-lh';
        if (exceptions[key]) continue;

        const hash = exceptions[lang];
        const new_hash = (exceptions[key] = {});

        for (const k of Object.keys(hash)) {
            let v = hash[k];
            v = v.replace(/shy/g, 'zh');
            new_hash[k] = v;
        }
    }
}

class TibetanPhoneticsRigpa extends TibetanPhonetics {

    // Constructor.  Options include:
    // - lang: What language phonetics we want.  Valid values so far are "en", "es", "fr" and "de".
    //   Default is "en" (English).
    // - lotsawahouse: (boolean, default false) LotsawaHouse style is just like Rigpa, but uses zh instead of shy.
    // Any other options are passed to TibetanPhonetics.

    constructor(opts = {}) {
        const lang = opts.lang || 'en';
        delete opts.lang;
        
        const lh = opts.lotsawahouse ? '-lh' : '';
        delete opts.lotsawahouse;
        const key = lang + lh;

        // combine the global options, the language's options, and the passed options
        const combined_opts = Object.assign({}, default_opts, lang_opts[lang] || {}, opts);

        // load the list of exceptions and words, if not loaded already (should not happen, they get loaded at module init)
        if (lh) make_lh_exceptions();

	// - make sure not to alter the lang_opts object!!  otherwise creating a 'rigpa' engine after a 'lotsawahouse' engine would still produce 'zh'
        if (lh && combined_opts.pronounce_consonant) {
	    combined_opts.pronounce_consonant = {
		...combined_opts.pronounce_consonant,
		zh: 'zh',
	    };
	}

        combined_opts._exceptions = exceptions[key] || exceptions["en" + lh] || {};
        combined_opts._words = words;

        // create the object
        super(combined_opts);

        // remember the language
        this.rigpa_lang = lang;
    }

    // French needs some extra processing to get the vowels right.

    final_tsekbar_tweak(pron) {
        if (this.rigpa_lang === 'fr') {
            // u (not OU) followed by n takes an actual umlaut
            pron = pron.replace(/(?<!o)un/g, '\u00fcn');

            // e takes an accent, unless followed by l,m,n,k,b,p,r
            pron = pron.replace(/e(?![lmnkbpr])/g, '\u00e9');
        }

        // full stop "'o" is now plain "o", ex. "zuk tongpa o".
        pron = pron.replace(/([aeiou])'o$/, '$1 o');

        return pron;
    }
}

export { TibetanPhoneticsRigpa };

