# Tibetan Phonetics and Transliteration

This JavaScript package implements two things:

- conversion between Unicode Tibetan text and
[Extended Wylie transliteration (EWTS)](http://old.thlib.org/reference/transliteration/#essay=/thl/ewts/)

- approximate Tibetan phonetics according to THL and other systems.

# Installation

```bash
npm install tibetan-ewts-converter

```

As of version 2, this is a pure ES module.

# Usage

## Wylie/EWTS conversion:

```javascript
import { EwtsConverter } from 'tibetan-ewts-converter/EwtsConverter';
const ewts = new EwtsConverter()
console.log(ewts.to_unicode("sangs rgyas"))
console.log(ewts.to_ewts("སངས་རྒྱས"))
```

## Approximate phonetics:

```javascript
import { get_phonetics } from "tibetan-ewts-converter/TibetanPhonetics-Any";
const pho = get_phonetics({ style: 'thl' });
console.log(pho.phonetics("sangs rgyas", { autosplit: true }));
```

# EwtsConverter options

The constructor accepts an optional object with named options:

- `check`: generate warnings for illegal consonant sequences and the like; default is `true`.
- `check_strict`: stricter checking, examine the whole stack; default is `true`.
- `fix_spacing`: remove spaces after newlines, collapse multiple tseks into one, fix case, etc; default is `true`.
- `sloppy`: silently fix a number of common Wylie mistakes when converting to Unicode; default is `false`
- `leave_dubious`: when converting to Unicode, leave dubious syllables unprocessed, between \[brackets\], instead of doing a best attempt; default is `false`
- `pass_through`: when converting to EWTS, pass through non-Tib characters instead of converting to \[comments\]; default is `false`

```javascript
let ewts = new EwtsConverter({ check_strict: false, leave_dubious: true, sloppy: true });
```

# TibetanPhonetics options

`get_phonetics` accepts an optional object with named options:

- `style`: one of 'thl', 'lotsawahouse', 'rigpa', 'lhasey', 'padmakara'
- `lang`: 2-letter language code, for styles that have language variants (ex. 'en', 'es')

See the code for lots of other options allowing fine control of phonetics generation.

The `phonetics` method takes a string (Tibetan Unicode or EWTS), and an optional `options` object.

Unless you're using a better external tokenizer, always pass the option `{ autosplit: true }`.

# Code and history

The first version of this code was [written in Perl](https://www.lotsawahouse.org/Static/Lingua-BO-Wylie-dev.zip)
around 2008.  In 2010 the EWTS/Unicode converter was [ported to Java](https://github.com/buda-base/ewts-converter) at the request of
[TBRC](https://tbrc.org/), now [BDRC](https://www.bdrc.io/).

This Java code was then ported to other languages by different groups: 
- [Python port by Esukhia](https://github.com/OpenPecha-dev/pyewts)
- [C# port by radiantspace](https://github.com/radiantspace/WylieCS)
- [Another Python port by radiantspace](https://github.com/radiantspace/WyliePy)
- JavaScript ports from [BDRC](https://github.com/buda-base/jsewts), [Ksana Forge](https://github.com/ksanaforge/wylie)
and [Karmapa Digital Toolbox](https://github.com/karmapa/wylie)

This JavaScript port was done in 2021, going back to the original Perl code, but incorporating some of the improvements
done by various groups.

Phonetics generation was added to this project in 2025, also ported from the original perl with the help of AI.

# License

Apache 2.0.

