/*
  This module creates approximate phonetics for Tibetan text, according to Padmakara's usage.
  Based on the original perl module Lingua::BO::Phonetics::Padmakara.

  Copyright (C) 2008-2025 Roger Espel Llima

  This library is Free Software.  You can redistribute it or modify it, under
  the terms of the Apache licence version 2.0.
*/

import { TibetanPhonetics } from './TibetanPhonetics.mjs';
import word_data from './padmakara.json' with { type: 'json' };

const { words, exceptions } = word_data;

const default_opts = {
    middle_nasals: false,
    accent_on_e: false,
    no_double_g: false,
    pronounce_suffix: {
        b: 'b',
        bs: 'p',
        g: 'k',
    },

    // this together with the pronounce consonant "zl" below ensures that zla does not get devoiced to da -> ta
    pronounce_clusters: {
        zl: 'zl',
    },

    pronounce_consonant: {
        th: 'th',
        Th: 'th',
        ph: 'ph',
        zl: 'd',
    },
    suffix_umlaut: { l: null },
    devoice_initials: {
        g: 'k',
        d: 't',
        b: 'p',
        dr: 'tr',
        j: 'ch',
    },
    devoice_each_syllable: true,
    smart_autosplit: true,
};

const lang_opts = {
    en: {
        second_vowel: { i: "'" },
        accent_on_e: true,
    },
    pt: {},
};

class TibetanPhoneticsPadmakara extends TibetanPhonetics {

    // Constructor.  Options include:
    // - lang: What language phonetics we want.  Valid values so far are 'pt', 'en'.
    // Any other options are passed to TibetanPhonetics.

    constructor(opts = {}) {
        const default_lang = 'pt';
        const lang = opts.lang || default_lang;
        delete opts.lang;

        // combine the global options, the language's options, and the passed options
        const combined_opts = Object.assign({}, default_opts, lang_opts[lang] || {}, opts);

        // set the exceptions and words
        combined_opts._exceptions = exceptions[lang] || exceptions[default_lang] || {};
        combined_opts._words = words;

        super(combined_opts);

        // remember the language
        this.padmakara_lang = lang;
    }

    final_line_tweak(units) {
        // "shok" at end of line should just be "sho"
        units[units.length - 1][0] = units[units.length - 1][0].replace(/\bshok(\s*)\s*$/, 'sho$1');

        // join single syllables by twos
        let start = 0;
        let prev_tsekbars;
        for (let i = 0; i < units.length; i++) {
            const tsekbars = units[i][1];

            // try to join a second stray syllable with the previous one, but not when the first syllable includes a '
            if (start % 2 === 1 && tsekbars === 1 && prev_tsekbars === 1 && !units[i - 1][0].includes("'")) {
                units[i - 1][0] += units[i][0];
                units[i - 1][1] += units[i][1];
                units[i][0] = '';
                units[i][1] = 0;
            }

            start += tsekbars;
            prev_tsekbars = tsekbars;
        }
    }

    // Final extra processing to a tsek.
    final_tsekbar_tweak(pron) {
        // in English we keep po'i, but pa'i becomes pai, pei, pii, pui
        if (this.padmakara_lang === 'en') {
            pron = pron.replace(/([aeéiu])'i/g, '$1i');
        }

        return pron;
    }
}

export { TibetanPhoneticsPadmakara };

