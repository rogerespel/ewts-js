/*
  This module creates approximate phonetics for Tibetan text, according to Lhasey Lotsawa's usage.
  Based on the original perl module Lingua::BO::Phonetics::Lhasey.

  Copyright (C) 2008-2025 Roger Espel Llima

  This library is Free Software.  You can redistribute it or modify it, under
  the terms of the Apache licence version 2.0.
*/

import { TibetanPhonetics } from './TibetanPhonetics.mjs';
import word_data from './lhasey.json' with { type: 'json' };

const { words, exceptions } = word_data;

const default_opts = {
    middle_nasals: false,
    accent_on_e: true,
    no_double_g: false,
    pronounce_suffix: {
        b: 'p',
        g: 'k',
    },
    pronounce_clusters: {},
    pronounce_consonant: {},
    suffix_umlaut: {},
    devoice_initials: {},
    smart_autosplit: true,
};

// for future multi-lingual support
const lang_opts = {};

class TibetanPhoneticsLhasey extends TibetanPhonetics {
    
    // Constructor.  Options include:
    // - lang: unused so far
    // Any other options are passed to TibetanPhonetics.

    constructor(opts = {}) {
        const default_lang = 'en';
        const lang = opts.lang || default_lang;
        delete opts.lang;
        
        // combine the global options, the language's options, and the passed options
        const combined_opts = Object.assign({}, default_opts, lang_opts[lang] || {}, opts);
        
        // load the list of exceptions and words
        combined_opts._exceptions = exceptions[lang] || exceptions[default_lang] || {};
        combined_opts._words = words;
        
        super(combined_opts);
        
        // remember the language
        this.lhasey_lang = lang;
    }
}

export { TibetanPhoneticsLhasey };

