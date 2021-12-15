# EWTS Converter

This JavaScript module implements the conversion between Unicode Tibetan text and
[Extended Wylie transliteration (EWTS)](http://www.thlib.org/reference/transliteration/#essay=/thl/ewts/).

# Installation

```bash
npm install tibetan-ewts-converter

```

# Usage

## From node:

```javascript
let { EwtsConverter } = require('tibetan-ewts-converter')
let ewts = new EwtsConverter()
console.log(ewts.to_unicode("sangs rgyas"))
console.log(ewts.to_ewts("སངས་རྒྱས"))

// retrieve warnings from the last conversion, as an array of strings
let warns = ewts.get_warnings();
if (warns.length > 0) console.log(warns.join("\n"));
```

Output:

```
'སངས་རྒྱས'
'sangs rgyas'
```

## ES6 module

Use the ES6 module directly and transpile/pack as needed:

```javascript
import { EwtsConverter } from 'src/EwtsConverter.mjs';
let ewts = new EwtsConverter();

```

# Options

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

# Code and history

The first version of this code was [written in Perl](https://www.lotsawahouse.org/Static/Lingua-BO-Wylie-dev.zip)
around 2008, followed in 2010 by a [Java port](https://github.com/buda-base/ewts-converter) at the request of
[TBRC](https://tbrc.org/), now [BDRC](https://www.bdrc.io/).

The Java code was then ported to other languages by different groups: 
- [Python port by Esukhia](https://github.com/OpenPecha-dev/pyewts)
- [C# port by radiantspace](https://github.com/radiantspace/WylieCS)
- [Another Python port by radiantspace](https://github.com/radiantspace/WyliePy)
- JavaScript ports from [BDRC](https://github.com/buda-base/jsewts), [Ksana Forge](https://github.com/ksanaforge/wylie)
and [Karmapa Digital Toolbox](https://github.com/karmapa/wylie)

This is a new JavaScript port going back to the original Perl code, but incorporating some of the improvements
done by various groups.  It is written in modern and idiomatic JavaScript as of 2021.

# Files

## Main conversion library

The raw code that implements the conversion between EWTS and Unicode is contained 
in the file `src/EwtsConverter.mjs`, implemented as a pure ES6 module.

## Transpiled library

The same library, transpiled by Babel for wider compatibility, is contained
in the file `lib/EwtsConverter.js`.

Should be compatible with all recent browsers as well as Node.

## Sample SPA

The files `src/index.js` and `src/ewts.html` implement a tiny, self-contained
single page app for online conversion bewteen EWTS and Unicode.

This is packed by Webpack into the `dist` folder, ready to publish.

The online converter can be found on [LotsawaHouse](https://www.lotsawahouse.org/Static/tools/ewts.html).

