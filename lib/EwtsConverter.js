"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EwtsConverter = void 0;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
var array_to_true_object = function array_to_true_object(arr) {
  return Object.fromEntries(arr.map(function (x) {
    return [x, true];
  }));
}; // the class


var EwtsConverter = /*#__PURE__*/function () {
  // EwtsConverter constructor.  Flags get passed as named arguments in an optional object literal:
  // - check: generate warnings for illegal consonant sequences and the like; default is true.
  // - check_strict: stricter checking, examine the whole stack; default is true.
  // - fix_spacing: remove spaces after newlines, collapse multiple tseks into one, etc; default is true.
  // - sloppy: silently fix a number of common Wylie mistakes when converting to Unicode
  // - leave_dubious: when converting to Unicode, leave dubious syllables unprocessed, between [brackets], instead of doing a best attempt.
  // - pass_through: when converting to EWTS, pass through non-Tib characters instead of converting to [comments]
  function EwtsConverter() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$check = _ref.check,
        check = _ref$check === void 0 ? true : _ref$check,
        _ref$check_strict = _ref.check_strict,
        check_strict = _ref$check_strict === void 0 ? true : _ref$check_strict,
        _ref$fix_spacing = _ref.fix_spacing,
        fix_spacing = _ref$fix_spacing === void 0 ? true : _ref$fix_spacing,
        _ref$leave_dubious = _ref.leave_dubious,
        leave_dubious = _ref$leave_dubious === void 0 ? false : _ref$leave_dubious,
        _ref$sloppy = _ref.sloppy,
        sloppy = _ref$sloppy === void 0 ? false : _ref$sloppy,
        _ref$pass_through = _ref.pass_through,
        pass_through = _ref$pass_through === void 0 ? false : _ref$pass_through;

    _classCallCheck(this, EwtsConverter);

    // initialize calculated static properties once
    this.constructor.static_init(); // set up preferences

    if (check_strict && !check) throw new Error("Cannot have 'check_strict' without 'check'.");
    this.check = check;
    this.check_strict = check_strict;
    this.fix_spacing = fix_spacing;
    this.leave_dubious = leave_dubious;
    this.sloppy = sloppy;
    this.pass_through = pass_through; // initialize instance variables

    this.warnings = [];
  } // Adjusts the input string based on the idea that people often are sloppy when
  // writing Wylie and use ' ' instead of '_' when a space is actually meant in
  // the output. 
  // This routine does not handle the case of " /" which requires more care to
  // accomodate "ng /" and "ngi /" and so on which are intentional since a tsheg
  // is required in these cases. Also it is not feasible to handle "g " for a
  // final "ga" at the end of a phrase where the '/' is usually omitted in favor
  // of the descender on the "ga". Detecting this is non-trivial.
  // Ported from the Java and Python version - missing in Perl.


  _createClass(EwtsConverter, [{
    key: "consonant",
    value: // helper function to get access to the static tables - static property access sucks in JS
    function consonant(s) {
      return this.constructor.consonant[s];
    }
  }, {
    key: "subjoined",
    value: function subjoined(s) {
      return this.constructor.subjoined[s];
    }
  }, {
    key: "vowel",
    value: function vowel(s) {
      return this.constructor.vowel[s];
    }
  }, {
    key: "finals",
    value: function finals(s) {
      return this.constructor.finals[s];
    }
  }, {
    key: "complex_vowel",
    value: function complex_vowel(s) {
      return this.constructor.complex_vowel[s];
    }
  }, {
    key: "other",
    value: function other(s) {
      return this.constructor.other[s];
    }
  }, {
    key: "is_special",
    value: function is_special(s) {
      return this.constructor.special[s];
    }
  }, {
    key: "is_superscript",
    value: function is_superscript(s) {
      return !!this.constructor.superscripts[s];
    }
  }, {
    key: "superscript",
    value: function superscript(sup, below) {
      var s = this.constructor.superscripts[sup];
      return s && s[below];
    }
  }, {
    key: "is_subscript",
    value: function is_subscript(s) {
      return !!this.constructor.subscripts[s];
    }
  }, {
    key: "subscript",
    value: function subscript(sub, above) {
      var s = this.constructor.subscripts[sub];
      return s && s[above];
    }
  }, {
    key: "is_prefix",
    value: function is_prefix(s) {
      return !!this.constructor.prefixes[s];
    }
  }, {
    key: "prefix",
    value: function prefix(pref, after) {
      var s = this.constructor.prefixes[pref];
      return s && s[after];
    }
  }, {
    key: "is_suffix",
    value: function is_suffix(s) {
      return this.constructor.suffixes[s];
    }
  }, {
    key: "is_suff2",
    value: function is_suff2(s) {
      return !!this.constructor.suff2[s];
    }
  }, {
    key: "suff2",
    value: function suff2(suff, before) {
      var s = this.constructor.suff2[suff];
      return s && s[before];
    }
  }, {
    key: "affixedsuff2",
    value: function affixedsuff2(s) {
      return this.constructor.affixedsuff2[s];
    }
  }, {
    key: "ambiguous",
    value: function ambiguous(s) {
      return this.constructor.ambiguous[s];
    }
  }, {
    key: "tib_top",
    value: function tib_top(s) {
      return this.constructor.tib_top[s];
    }
  }, {
    key: "tib_subjoined",
    value: function tib_subjoined(s) {
      return this.constructor.tib_subjoined[s];
    }
  }, {
    key: "tib_vowel",
    value: function tib_vowel(s) {
      return this.constructor.tib_vowel[s];
    }
  }, {
    key: "tib_vowel_long",
    value: function tib_vowel_long(s) {
      return this.constructor.tib_vowel_long[s];
    }
  }, {
    key: "tib_final",
    value: function tib_final(s) {
      return this.constructor.tib_final[s];
    }
  }, {
    key: "tib_caret",
    value: function tib_caret(s) {
      return this.constructor.tib_caret[s];
    }
  }, {
    key: "tib_other",
    value: function tib_other(s) {
      return this.constructor.tib_other[s];
    }
  }, {
    key: "tib_stack",
    value: function tib_stack(s) {
      return this.constructor.tib_stack[s];
    }
  }, {
    key: "fix_sloppy",
    value: function fix_sloppy(str) {
      return str.replaceAll("ʼ", "'").replaceAll("ʹ", "'").replaceAll("‘", "'").replaceAll("’", "'").replaceAll("ʾ", "'") // JavaWylie replaces 'x' and 'X' with '྾' (Tib. Ku Ru Kha) but THL uses X for small circle under marking root text
      // .replaceAll("x", "\\u0fbe")
      // .replaceAll("X", "\\u0fbe")
      .replaceAll("...", "\\u0f0b\\u0f0b\\u0f0b").replaceAll(" (", "_(").replaceAll(") ", ")_").replaceAll("/ ", "/_").replaceAll(" 0", "_0").replaceAll(" 1", "_1").replaceAll(" 2", "_2").replaceAll(" 3", "_3").replaceAll(" 4", "_4").replaceAll(" 5", "_5").replaceAll(" 6", "_6").replaceAll(" 7", "_7").replaceAll(" 8", "_8").replaceAll(" 9", "_9").replaceAll("_ ", "__").replaceAll("G", "g").replaceAll("K", "k").replaceAll("C", "c").replaceAll("B", "b").replaceAll("P", "p").replaceAll("L", "l").replaceAll("Z", "z").replaceAll(" b ", " ba ").replaceAll(" b'i ", " ba'i ").replaceAll(" m ", " ma ").replaceAll(" m'i ", " ma'i ").replaceAll("Ts", "ts").replaceAll("Dz", "dz").replaceAll("Ny", "ny").replaceAll("Ng", "ng").replaceAll(" (", "(").replaceAll(") ", ")").replaceAll("༼", "(").replaceAll("༽", ")").replaceAll("：", ":").replaceAll("H ", "H") // lower case H and M unless preceded by a vowel or other signs that can happen (e.g ~M)
      .replace(/(^|[^aeiouAIU])H/g, "$1h").replace(/(^|[^aeiouAIU~])M/g, "$1m") // convert S but not Sh
      .replace(/S($|[^h])/g, "s$1");
    } // Checks if a character is a Tibetan Unicode combining character.

  }, {
    key: "is_combining",
    value: function is_combining(str) {
      // ported from Java EWTS and inspired from
      // https://github.com/apache/jena/blob/master/jena-core/src/main/java/org/apache/jena/rdfxml/xmlinput/impl/CharacterModel.java
      var x = str.charCodeAt(0);
      return x > 0x0f71 && x < 0x0f84 || x < 0x0f8d && x > 0x0fbc;
    } // handle a Converter unicode escape, \\uxxxx or \\Uxxxxxxxx

  }, {
    key: "unicode_escape",
    value: function unicode_escape(t, line) {
      var hex = t.substring(2);
      if (hex == '') return null;

      if (!hex.match(/^[0-9a-fA-F]+$/)) {
        this.warn("line ".concat(line, ": \"").concat(hex, "\": invalid hex code."));
        return '';
      }

      var codepoint = parseInt(hex, 16);
      return String.fromCodePoint(codepoint);
    } // Generate a warning

  }, {
    key: "warn",
    value: function warn(str) {
      this.warnings.push(str);
    } // Get warnings

  }, {
    key: "get_warnings",
    value: function get_warnings() {
      return this.warnings;
    } // Converts a string from EWTS to Unicode
    // - Optional argument: keep: a string of characters which should be preserved, unprocessed

  }, {
    key: "to_unicode",
    value: function to_unicode(str) {
      var keep = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var line = 1,
          units = 0,
          out = "";
      this.warnings = []; // characters to keep?

      var keep_hash = array_to_true_object(((keep || "") + "").split("")); // remove initial spaces

      if (this.fix_spacing) str = str.trimStart(); // fix sloppy wylie

      if (this.sloppy) {
        str = this.fix_sloppy(str); // at least fix all kinds of unicode single qutoes
      } else {
        str = str.replaceAll("ʼ", "'").replaceAll("ʹ", "'").replaceAll("‘", "'").replaceAll("’", "'").replaceAll("ʾ", "'");
      } // split into tokens, add a null token to mark the end


      var tokens = str.split(this.constructor.tokens_regex).filter(function (x) {
        return x !== "";
      });
      tokens.push(null);
      var i = 0,
          t; // iterate over them

      ITER: while ((t = tokens[i]) !== null) {
        var o = void 0; // characters to keep untouched

        if (keep_hash[t]) {
          out += t;
          i++;
          continue ITER;
        } // [non-tibetan text] : pass through, nesting brackets


        if (t === '[') {
          var nesting = 1;
          i++;

          ESC: while ((t = tokens[i++]) !== null) {
            if (t === '[') nesting++;
            if (t === ']') nesting--;
            if (nesting === 0) continue ITER; // handle unicode escapes and \1-char escapes within [comments]...

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

          this.warn("line ".concat(line, ": Unfinished [non-Wylie stuff]."));
          break ITER;
        } // punctuation, numbers, etc


        if (o = this.other(t)) {
          out += o;
          i++;
          units++; // collapse multiple spaces

          if (t === ' ' && this.fix_spacing) {
            while (tokens[i] === ' ') {
              i++;
            }
          }

          continue ITER;
        } // vowels & consonants: process tibetan script up to a tsek, punctuation or line noise


        if (this.vowel(t) || this.consonant(t)) {
          var _this$_to_unicode_one = this._to_unicode_one_tsekbar(tokens, i),
              uni = _this$_to_unicode_one.uni,
              toks = _this$_to_unicode_one.toks,
              warns = _this$_to_unicode_one.warns;

          var word = tokens.slice(i, i + toks).join('');
          i += toks;
          units++;

          if (warns.length > 0 && this.leave_dubious) {
            out += '[' + word + ']';
          } else {
            out += uni;
          }

          var _iterator = _createForOfIteratorHelper(warns),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var w = _step.value;
              this.warn("line ".concat(line, ": \"").concat(word, "\": ").concat(w));
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }

          continue ITER;
        } // ** misc unicode and line handling things **
        // ignore BOM and zero-width space


        if (t === "\uFEFF" || t === "\u200B") {
          i++;
          continue ITER;
        } // \\u, \\U unicode characters


        if (t.startsWith("\\u") || t.startsWith("\\U")) {
          o = this.unicode_escape(t, line);

          if (o !== null) {
            i++;
            out += o;
            continue ITER;
          }
        } // backslashed characters


        if (t.startsWith("\\")) {
          out += t.substring(1);
          i++;
          continue ITER;
        } // count lines


        if (t === "\r\n" || t === "\n" || t === "\r") {
          line++;
          out += t;
          i++; // also eat spaces after newlines (optional)

          if (this.fix_spacing) {
            while (tokens[i] === " ") {
              i++;
            }
          }

          continue ITER;
        } // stuff that shouldn't occur out of context: special chars and remaining [a-zA-Z]


        if (this.is_special(t) || t.match(/[a-zA-Z]/)) {
          this.warn("line ".concat(line, ": Unexpected character \"").concat(t, "\"."));
        } // anything else, pass through


        out += t;
        i++;
      }

      if (units === 0) this.warn("No Tibetan characters found!");
      return out;
    } // Internal method: Converts successive stacks of Wylie into unicode, starting at the given index
    // within the array of tokens. 
    // 
    // Assumes that the first available token is valid, and is either a vowel or a consonant.
    // 
    // Returns: [ unicode_string, num_tokens_used, [ warnings generated ] ]

  }, {
    key: "_to_unicode_one_tsekbar",
    value: function _to_unicode_one_tsekbar(tokens, i) {
      var orig_i = i;
      var t = tokens[i]; // variables for tracking the state within the syllable as we parse it

      var uni,
          toks,
          cons = null,
          cons_a,
          these_warns,
          prev_cons,
          visarga; // variables for checking the root letter, after parsing a whole tsekbar made of only single
      // consonants and one consonant with "a" vowel

      var check_root = true,
          consonants = [],
          root_idx = null;
      var out = "",
          warns = []; // the type of token that we are expecting next in the input stream
      //   - PREFIX : expect a prefix consonant, or a main stack
      //   - MAIN   : expect only a main stack
      //   - SUFF1  : expect a main stack again, or a 1st suffix
      //   - SUFF2  : expect a 2nd suffix
      //   - NONE   : expect nothing (after a 2nd suffix)
      //
      // valid tsek-bars end in one of these states: SUFF1, SUFF2, NONE

      var state = "PREFIX";

      while (t !== null && (this.vowel(t) || this.consonant(t)) && !visarga) {
        // translate a stack
        prev_cons = cons; // destructuring without a 'let' requires parens around it, blame JS

        var _this$_to_unicode_one2 = this._to_unicode_one_stack(tokens, i);

        uni = _this$_to_unicode_one2.uni;
        toks = _this$_to_unicode_one2.toks;
        cons = _this$_to_unicode_one2.cons;
        cons_a = _this$_to_unicode_one2.cons_a;
        these_warns = _this$_to_unicode_one2.warns;
        visarga = _this$_to_unicode_one2.visarga;
        i += toks;
        warns = warns.concat(these_warns);
        t = tokens[i];
        out += uni; // no checking?

        if (!this.check) continue; // check for syllable structure consistency by iterating a simple state machine
        // - prefix consonant

        if (state === "PREFIX" && cons) {
          consonants.push(cons);

          if (this.is_prefix(cons)) {
            var next = this.check_strict ? this._consonant_string(tokens, i) : t || '';

            if (next !== '' && !this.prefix(cons, next)) {
              next = next.replaceAll('+', '');
              warns.push("Prefix \"".concat(cons, "\" does not occur before \"").concat(next, "\"."));
            }
          } else {
            warns.push("Invalid prefix consonant \"".concat(cons, "\"."));
          }

          state = "MAIN"; // - main stack with vowel or multiple consonants
        } else if (!cons) {
          // should not be able to have a main stack after a suffix in proper Tib, but it does happen 
          // in Skt and abbreviations, so let it be
          state = "SUFF1"; // keep track of the root consonant if it was a single cons with an "a" vowel

          if (root_idx !== null) {
            check_root = false;
          } else if (cons_a) {
            consonants.push(cons_a);
            root_idx = consonants.length - 1;
          } // - unexpected single consonant after prefix

        } else if (state === "MAIN") {
          warns.push("Expected vowel after \"".concat(cons, "\".")); // - 1st suffix
        } else if (state === "SUFF1") {
          consonants.push(cons); // check this one only in strict mode b/c it trips on lots of Skt stuff

          if (this.check_strict && !this.is_suffix(cons)) {
            warns.push("Invalid suffix consonant: \"".concat(cons, "\"."));
          }

          state = "SUFF2"; // - 2nd suffix
        } else if (state === "SUFF2") {
          consonants.push(cons);

          if (this.is_suff2(cons)) {
            if (!this.suff2(cons, prev_cons)) {
              warns.push("\"Second suffix \"".concat(cons, "\" does not occur after \"").concat(prev_cons, "\"."));
            }
          } else {
            // handles pa'm, pa'ng
            if (!this.affixedsuff2(cons) || !prev_cons === "'") {
              warns.push("Invalid 2nd suffix consonant: \"".concat(cons, "\"."));
            }
          }

          state = "NONE"; // more crap after a 2nd suffix
        } else if (state === "NONE") {
          warns.push("Cannot have another consonant \"".concat(cons, "\" after 2nd suffix."));
        }
      }

      if (state === "MAIN" && cons && this.is_prefix(cons)) {
        warns.push("Vowel expected after \"".concat(cons, "\"."));
      } // check root consonant placement only if there were no warnings so far, and the syllable
      // looks ambiguous. not many checks are needed here because the previous state machine
      // already takes care of most illegal combinations.


      if (this.check && !warns.length && check_root && root_idx !== null) {
        // 2 letters where each could be prefix/suffix: root is 1st
        if (consonants.length === 2 && root_idx !== 0 && this.prefix(consonants[0], consonants[1]) && this.is_suffix(consonants[1])) {
          warns.push("Syllable should probably be \"".concat(consonants[0], "a").concat(consonants[1], "\".")); // 3 letters where 1st can be prefix, 2nd can be postfix before "s" and last is "s":
          // use a lookup table as this is completely ambiguous.
        } else if (consonants.length === 3 && this.is_prefix(consonants[0]) && this.suff2("s", consonants[1]) && consonants[2] === "s") {
          var cc = consonants.join(''),
              expect = this.ambiguous(cc);

          if (expect && expect[0] !== root_idx) {
            warns.push("Syllable should probably be \"".concat(expect[1], "\"."));
          }
        }
      } // converted unicode string, num of tokens used, warnings


      return {
        uni: out,
        toks: i - orig_i,
        warns: warns
      };
    } // Internal method: Converts one stack's worth of Wylie into unicode, starting at the given index
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

  }, {
    key: "_to_unicode_one_stack",
    value: function _to_unicode_one_stack(tokens, i) {
      var orig_i = i;
      var t,
          t2,
          out = "",
          warns = [];
      var consonants = 0; // how many consonants found

      var vowel_found = null; // any vowels? (including a-chen)

      var vowel_sign = null; // any vowel signs (that go under or over the main stack)

      var single_consonant = null; // did we find just a consonant?

      var plus = false; // any explicit subjoining via "+"?

      var caret = 0; // find any '^'?

      var final_found = {}; // keep track of finals (H, M, etc) to warn on repetition
      // do we have a superscript?

      t = tokens[i];
      t2 = tokens[i + 1];

      if (t2 !== null && this.is_superscript(t) && this.superscript(t, t2)) {
        if (this.check_strict) {
          var next = this._consonant_string(tokens, i + 1);

          if (!this.superscript(t, next)) {
            next = next.replaceAll('+', ' ');
            warns.push("Superscript \"".concat(t, "\" does not occur above combination \"").concat(next, "\"."));
          }
        }

        out += this.consonant(t);
        consonants++;
        i++;

        while (tokens[i] === '^') {
          caret++;
          i++;
        }
      } // main consonant + stuff underneath.
      // this is usually executed just once, but the "+" subjoining operator makes it come back here


      MAIN: while (true) {
        // main consonant (or "a" after a "+")
        t = tokens[i];

        if (this.consonant(t) || out !== "" && this.subjoined(t)) {
          out += out === "" ? this.consonant(t) : this.subjoined(t);
          i++;

          if (t === 'a') {
            vowel_found = 'a';
          } else {
            consonants++;
            single_consonant = t;
          } // warn about "dh", etc. (proper EWTS is "d+h")


          var m = t.match(/(?:g|d|D|b|dz)h/);

          if (m) {
            var should = t.replace(/(g|d|D|b|dz)h/, "$1+h");
            warns.push("\"".concat(t, " should be \"").concat(should, "\"."));
          }

          while (tokens[i] === '^') {
            caret++;
            i++;
          } // subjoined: rata, yata, lata, wazur.  there can be up two subjoined letters in a stack.


          for (var _i = 0, _arr = [0, 1]; _i < _arr.length; _i++) {
            var z = _arr[_i];
            var _t = tokens[i];

            if (_t !== null && this.is_subscript(_t)) {
              // lata does not occur below multiple consonants (otherwise we mess up "brla" = "b.r+la")
              if (_t === 'l' && consonants > 1) break; // full stack checking (disabled by "+")

              if (this.check_strict && !plus) {
                var prev = this._consonant_string_backwards(tokens, i - 1, orig_i);

                if (!this.subscript(_t, prev)) {
                  prev = prev.replaceAll('+', '');
                  warns.push("Subjoined \"".concat(_t, "\" not expected after \"").concat(prev, "\"."));
                }
              } else if (this.check) {
                if (!this.subscript(_t, t) && !(z === 1 && _t === 'w' && t === 'y')) {
                  warns.push("Subjoined \"".concat(_t, "\" not expected after \"").concat(t, "\""));
                }
              }

              out += this.subjoined(_t);
              i++;
              consonants++;

              while (tokens[i] === '^') {
                caret++;
                i++;
              }

              t = _t;
            } else {
              break;
            }
          }
        } // caret (^) can come anywhere in Wylie but in Unicode we generate it at the end of 
        // the stack but before vowels if it came there (seems to be what OpenOffice expects),
        // or at the very end of the stack if that's how it was in the Wylie.


        if (caret > 0) {
          if (caret > 1) warns.push("Cannot have more than one \"^\" applied to the same stack.");
          var caret_final = this.finals('^');
          final_found['^'] = '^';
          out += caret_final[0];
          caret = 0;
        } // vowel(s)


        t = tokens[i];

        if (t !== null && this.vowel(t)) {
          var comp = this.complex_vowel(t);

          if (comp) {
            out += out.length ? comp[1] : comp[0];
          } else {
            if (out === '') out += this.vowel('a');
            if (t !== 'a') out += this.vowel(t);
          }

          i++;
          vowel_found = t;
          if (t !== 'a') vowel_sign = t;
        } // plus sign: forces more subjoining


        t = tokens[i];

        if (t === '+') {
          i++;
          plus = true; // sanity check: next token must be vowel or subjoinable consonant.  

          t = tokens[i];

          if (t === null || !this.vowel(t) && !this.subjoined(t)) {
            if (this.check) warns.push("Expected vowel or consonant after \"+\".");
            break MAIN;
          } // consonants after vowels doesn't make much sense but process it anyway


          if (this.check) {
            if (!this.vowel(t) && vowel_sign) {
              warns.push("Cannot subjoin consonant \"".concat(t, "\" after vowel \"").concat(vowel_sign, "\" in same stack."));
            } else if (t === 'a' && vowel_sign) {
              warns.push("Cannot subjoin a-chen \"".concat(t, "\" after vowel \"").concat(vowel_sign, "\" in same stack."));
            }
          }

          continue MAIN;
        }

        break MAIN;
      } // final tokens


      t = tokens[i];

      while (t !== null && this.finals(t)) {
        var _this$finals = this.finals(t),
            _this$finals2 = _slicedToArray(_this$finals, 2),
            uni = _this$finals2[0],
            klass = _this$finals2[1]; // check for duplicates


        if (final_found[klass] !== undefined) {
          if (final_found[klass] === t) {
            warns.push("Cannot have two \"".concat(t, "\" applied to the same stack."));
          } else {
            warns.push("Cannot have \"".concat(t, "\" and \"").concat(final_found[klass], "\" applied to the same stack."));
          }
        } else {
          final_found[klass] = t;
          out += uni;
        }

        i++;
        single_consonant = null;
        t = tokens[i];
      } // if next is a dot "." (stack separator), skip it.


      if (tokens[i] === '.') i++; // if we had more than a consonant and no vowel, and no explicit "+" joining, backtrack and
      // return the 1st consonant alone

      if (consonants > 1 && vowel_found === null) {
        if (plus) {
          if (this.check) warns.push("Stack with multiple consonants should end with vowel.");
        } else {
          i = orig_i + 1;
          consonants = 1;
          single_consonant = tokens[orig_i];
          out = this.consonant(single_consonant);
        }
      } // single consonant is single consonant


      if (consonants !== 1 || plus) single_consonant = null;
      return {
        uni: out,
        // converted unicode string
        toks: i - orig_i,
        // num of tokens used
        cons: vowel_found ? null : single_consonant,
        // single consonant without vowel
        cons_a: vowel_found === 'a' ? single_consonant : null,
        // single consonant with 'a'
        warns: warns,
        // warnings
        visarga: '^' in final_found // did we find a visarga

      };
    } // Looking from i onwards within tokens, returns as many consonants as it finds,
    // up to and not including the next vowel or punctuation. Skips the caret "^".
    // Returns: a string of consonants joined by "+" signs.

  }, {
    key: "_consonant_string",
    value: function _consonant_string(tokens, i) {
      var out = [],
          t;

      while ((t = tokens[i++]) !== null) {
        if (t === '+' || t === '^') continue;
        if (!this.consonant(t)) break;
        out.push(t);
      }

      return out.join('+');
    } // Looking from i backwards within tokens, at most up to orig_i, returns as
    // many consonants as it finds, up to and not including the next vowel or
    // punctuation. Skips the caret "^".
    // Returns: a string of consonants (in forward order) joined by "+" signs.

  }, {
    key: "_consonant_string_backwards",
    value: function _consonant_string_backwards(tokens, i, orig_i) {
      var out = [],
          t;

      while (i >= orig_i && tokens[i] !== null) {
        t = tokens[i--];
        if (t === '+' || t === '^') continue;
        if (!this.consonant(t)) break;
        out.push(t);
      }

      return out.reverse().join('+');
    } // Converts a string from Unicode to EWTS
    // Returns: the transliterated string
    // To get the warnings, call ewts.get_warnings() afterwards.

  }, {
    key: "to_ewts",
    value: function to_ewts(str) {
      var out = "",
          line = 1,
          units = 0;
      this.warnings = []; // globally search and replace some deprecated pre-composed Sanskrit vowels

      str = str.replaceAll("\u0F76", "\u0FB2\u0F80").replaceAll("\u0F77", "\u0FB2\u0F71\u0F80").replaceAll("\u0F78", "\u0FB3\u0F80").replaceAll("\u0F79", "\u0FB3\u0F71\u0F80").replaceAll("\u0F81", "\u0F71\u0F80").replaceAll("\u0F75", "\u0F71\u0F74").replaceAll("\u0F73", "\u0F71\u0F72");
      var i = 0,
          len = str.length; // iterate over the string, codepoint by codepoint

      ITER: while (i < len) {
        var t = str.charAt(i); // found tibetan script - handle one tsekbar

        if (this.tib_top(t)) {
          // we don't need the analyzed stacks in 'stacks'
          var _this$_to_ewts_one_ts = this._to_ewts_one_tsekbar(str, len, i),
              toks = _this$_to_ewts_one_ts.toks,
              wylie = _this$_to_ewts_one_ts.wylie,
              warns = _this$_to_ewts_one_ts.warns;

          out += wylie;
          i += toks;
          units++;

          var _iterator2 = _createForOfIteratorHelper(warns),
              _step2;

          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var w = _step2.value;
              this.warn("line ".concat(line, ": ").concat(w));
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }

          if (this.pass_through) {
            var _this$_handle_spaces = this._handle_spaces(str, i, out);

            var _this$_handle_spaces2 = _slicedToArray(_this$_handle_spaces, 2);

            i = _this$_handle_spaces2[0];
            out = _this$_handle_spaces2[1];
          }

          continue ITER;
        } // punctuation and special stuff.  spaces are tricky:
        // - in pass through mode: spaces are not turned to '_' here (handled by handleSpaces)
        // - otherwise: don't do spaces if there is non-tibetan coming, so they become part
        //   of the [  escaped block].


        var o = this.tib_other(t);

        if (o && (t !== ' ' || !this.pass_through && !this._followed_by_nontibetan(str, i))) {
          out += o;
          i++;
          units++;

          if (this.pass_through) {
            var _this$_handle_spaces3 = this._handle_spaces(str, i, out);

            var _this$_handle_spaces4 = _slicedToArray(_this$_handle_spaces3, 2);

            i = _this$_handle_spaces4[0];
            out = _this$_handle_spaces4[1];
          }

          continue ITER;
        } // newlines, count lines. "\r\n" together count as one newline.


        if (t === "\n" || t === "\r") {
          line++;
          i++;
          out += t;

          if (t === "\r" && i < len && str.charAt(i) === "\n") {
            i++;
            out += "\n";
          }

          continue ITER;
        } // ignore BOM and zero-width space


        if (t === "\uFEFF" || t === "\u200B") {
          i++;
          continue ITER;
        } // anything else - pass along?


        if (this.pass_through) {
          out += t;
          i++;
          continue ITER;
        } // other characters in the tibetan plane, escape with \\u0fxx


        var tchar = t.charCodeAt(0);

        if (tchar >= 0x0f00 && tchar <= 0x0fff) {
          var _o = this._format_hex(tchar);

          out += _o;
          i++; // warn for tibetan codepoints that should appear only after a tib_top

          if (this.tib_subjoined(t) || this.tib_vowel(t) || this.tib_final(t)) {
            this.warn("line ".concat(line, ": Tibetan sign ").concat(_o, " needs a top symbol to attach to."));
          }

          continue ITER;
        } // ... or escape according to Wylie:
        // put it in [comments], escaping [] sequences and closing at line ends


        out += '[';

        while (!this.tib_top(t) && (!this.tib_other(t) || t === ' ') && t !== "\r" && t !== "\n") {
          // \escape [opening and closing] brackets
          if (t === '[' || t === ']') {
            out += "\\" + t; // unicode-escape anything in the tibetan plane (i.e characters not handled by Wylie)
          } else if (t.charCodeAt(0) >= 0x0f00 && t.charCodeAt(0) <= 0x0fff) {
            out += this._format_hex(t.charCodeAt(0)); // and just pass through anything else!
          } else {
            out += t;
          }

          if (++i >= len) break;
          t = str.charAt(i);
        }

        out += ']';
      }

      if (units === 0) this.warn("No Tibetan characters found!");
      return out;
    } // given a character codepoint number, return a string like "\\uxxxx", with its code in hex

  }, {
    key: "_format_hex",
    value: function _format_hex(cp) {
      var s = Number(cp).toString(16);

      while (s.length < 4) {
        s = "0" + s;
      }

      return "\\u" + s;
    } // Handles spaces (if any) in the input stream, turning them into '_'.
    // this is abstracted out because in non-escaping mode, we only want to turn spaces into _
    // when they come in the middle of Tibetan script.
    // Returns: new_i, new_out

  }, {
    key: "_handle_spaces",
    value: function _handle_spaces(str, i, out) {
      var found = 0;

      while (i < str.length && str.charAt(i) === ' ') {
        i++;
        found++;
      }

      if (found === 0 || i === str.length) return [i, out];
      var t = str.charAt(i);
      if (!this.tib_top(t) && !this.tib_other(t)) return [i, out]; // found 'found' spaces between two tibetan bits; generate the same number of '_'s

      for (var x = 0; x < found; x++) {
        out += '_';
      }

      return [i, out];
    } // for space-handling in escaping mode: is the next thing coming (after a number of spaces)
    // some non-tibetan bit, within the same line?

  }, {
    key: "_followed_by_nontibetan",
    value: function _followed_by_nontibetan(str, i) {
      var len = str.length;

      while (i < len && str.charAt(i) === ' ') {
        i++;
      }

      if (i === len) return false;
      var t = str.charAt(i);
      return !this.tib_top(t) && !this.tib_other(t) && t !== "\r" && t !== "\n";
    } // Convert Unicode to EWTS: one tsekbar

  }, {
    key: "_to_ewts_one_tsekbar",
    value: function _to_ewts_one_tsekbar(str, len, i) {
      var _this = this;

      var orig_i = i,
          warns = [],
          stacks = []; // make a list of stacks, until we get to punctuation or to a visarga

      ITER: while (true) {
        var _this$_to_ewts_one_st = this._to_ewts_one_stack(str, len, i),
            toks = _this$_to_ewts_one_st.toks,
            stack = _this$_to_ewts_one_st.stack,
            these_warns = _this$_to_ewts_one_st.warns;

        stacks.push(stack);
        warns = warns.concat(these_warns);
        i += toks;
        if (stack.visarga) break ITER;
        if (i >= len || !this.tib_top(str.charAt(i))) break ITER;
      } // figure out if some of these stacks can be prefixes or suffixes (in which case
      // they don't need their "a" vowels)


      var num_stacks = stacks.length,
          last = num_stacks - 1;

      if (num_stacks > 1 && stacks[0].single_cons) {
        // we don't count the wazur in the root stack, for prefix checking
        var cs = stacks[1].cons_str.replaceAll("+w", "");

        if (this.prefix(stacks[0].single_cons, cs)) {
          stacks[0].prefix = true;
        }
      }

      if (num_stacks > 1 && stacks[last].single_cons && this.is_suffix(stacks[last].single_cons)) {
        stacks[last].suffix = true;
      }

      if (num_stacks > 2 && stacks[last].single_cons && stacks[last - 1].single_cons && this.is_suffix(stacks[last - 1].single_cons) && this.is_suff2(stacks[last].single_cons) && this.suff2(stacks[last].single_cons, stacks[last - 1].single_cons)) {
        stacks[last].suff2 = true;
        stacks[last - 1].suffix = true;
      } // if there are two stacks and both can be prefix-suffix, then 1st is root


      if (num_stacks === 2 && stacks[0].prefix && stacks[1].suffix) {
        stacks[0].prefix = false;
      } // if there are three stacks and they can be prefix, suffix and suff2, then check w/ a table


      if (num_stacks === 3 && stacks[0].prefix && stacks[1].suffix && stacks[2].suff2) {
        var _str = stacks.map(function (x) {
          return x.single_cons;
        }).join("");

        var amb = this.ambiguous(_str);
        var root;

        if (amb) {
          root = amb[0];
        } else {
          warns.push("Ambiguous syllable found: root consonant not known for \"".concat(_str, "\".")); // make it up... 

          root = 1;
        }

        stacks[root].prefix = stacks[root].suffix = false;
        stacks[root + 1].suff2 = false;
      } // if the prefix together with the main stack could be mistaken for a single stack, add a "."


      if (stacks[0].prefix && this.tib_stack(stacks[0].single_cons + "+" + stacks[1].cons_str)) {
        stacks[0].dot = true;
      } // if some stack after the first starts with a vowel, put a dot before it (ex. "ba.a")


      for (var k = 1; k < stacks.length; k++) {
        if (stacks[k].top == 'a') stacks[k - 1].dot = true;
      } // put it all together


      var wylie = stacks.map(function (x) {
        return _this._put_stack_together(x);
      }).join("");
      return {
        toks: i - orig_i,
        // number of tokens used
        wylie: wylie,
        // ewts produced
        warns: warns,
        // warnings produced
        stacks: stacks // analyzed stacks

      };
    } // Puts an analyzed stack together into EWTS output, adding an implicit "a" if needed.

  }, {
    key: "_put_stack_together",
    value: function _put_stack_together(stack) {
      var out = ""; // put the main elements together... stacked with "+" unless it's a regular stack

      if (this.tib_stack(stack.cons_str)) {
        out += stack.stack.join("");
      } else {
        out += stack.cons_str;
      } // caret (tsa-phru) goes here as per some (halfway broken) Unicode specs...


      if (stack.caret) out += '^'; // vowels...

      if (stack.vowels.length > 0) {
        out += stack.vowels.join("+");
      } else if (!stack.prefix && !stack.suffix && !stack.suff2 && !stack.cons_str.match(/a$/)) {
        out += 'a';
      } // final stuff


      out += stack.finals.join("");
      if (stack.dot) out += '.';
      return out;
    } // Unicode to EWTS: one stack at a time

  }, {
    key: "_to_ewts_one_stack",
    value: function _to_ewts_one_stack(str, len, i) {
      var orig_i = i,
          warns = [];
      var ffinal = null,
          vowel = null,
          klass = null; // analyze the stack into: 
      //   - top symbol
      //   - stacked signs (first is the top symbol again, then subscribed main characters...)
      //   - caret (did we find a stray tsa-phru or not?)
      //   - vowel signs (including small subscribed a-chung, "-i" Skt signs, etc)
      //   - final stuff (including anusvara, visarga, halanta...)
      //   - and some more variables to keep track of what has been found

      var stack = {
        top: null,
        // top symbol
        stack: [],
        // [ consonants and also a-chen ]
        caret: false,
        // caret found?
        vowels: [],
        // [ vowels found ]
        finals: [],
        // [ finals found ]
        finals_found: {},
        // { klass of final => ewts }
        visarga: false,
        // visarga found
        cons_str: null,
        // all stack elements separated by "+" (including 'a-chen')
        single_cons: null,
        // is this a single consonant with no vowel signs or finals?
        prefix: false,
        // later set to true if it's a prefix
        suffix: false,
        // later set to true if it's a suffix
        suff2: false,
        // later set to true if it's a second suffix
        dot: false // later set to true if we need a '.' after this stack (ex. "g.yag")

      }; // for easy access

      var stst = stack.stack,
          stvow = stack.vowels; // assume: this.tib_top(t) exists

      var t = str.charAt(i++);
      stack.top = this.tib_top(t);
      stst.push(this.tib_top(t)); // grab everything else below the top sign and classify in various categories

      while (i < len) {
        t = str.charAt(i);
        var o = void 0;

        if (o = this.tib_subjoined(t)) {
          i++;
          stst.push(o); // check for bad ordering

          if (stack.finals.length > 0) {
            warns.push("Subjoined sign \"".concat(o, "\" found after final sign \"").concat(ffinal, "\"."));
          } else if (stvow.length > 0) {
            warns.push("Subjoined sign \"".concat(o, "\" found after vowel sign \"").concat(vowel, "\"."));
          }
        } else if (o = this.tib_vowel(t)) {
          i++;
          stvow.push(o);
          if (vowel === null) vowel = o; // check for bad ordering

          if (stack.finals.length > 0) {
            warns.push("Vowel sign \"".concat(o, "\" found after final sign \"").concat(ffinal, "\"."));
          }
        } else if (o = this.tib_final(t)) {
          i++;
          var _o2 = o;

          var _o3 = _slicedToArray(_o2, 2);

          o = _o3[0];
          klass = _o3[1];

          if (o === '^') {
            stack.caret = true;
          } else {
            if (o === 'H') stack.visarga = true;
            if (ffinal === null) ffinal = o; // check for invalid combinations

            if (stack.finals_found[klass] !== undefined) {
              warns.push("Final sign \"".concat(o, "\" should not combine with final sign \"").concat(stack.finals_found[klass], "\"."));
            } else {
              stack.finals_found[klass] = o;
              stack.finals.push(o);
            }
          }
        } else {
          break;
        }
      } // now analyze the stack according to various rules:
      // a-chen with vowel signs: remove the "a" and keep the vowel signs


      if (stack.top === "a" && stst.length === 1 && stvow.length > 0) {
        stst.shift();
      } // handle long vowels: A+i becomes I, etc.


      if (stvow.length > 1 && stvow[0] === 'A' && this.tib_vowel_long(stvow[1])) {
        stvow.splice(0, 2, this.tib_vowel_long(stvow[1]));
      } // Sanskrit vocalic 'r' and 'l' (r-i, r-I, l-i, l-I): treat them as vowels


      if (stst.length > 0 && stst[stst.length - 1] in ['r', 'l'] && stvow.length === 1 && stvow[0] in ['-i', '-I']) {
        var rl = stst.pop();
        stvow[0] = rl + stvow[0];
      } // special cases: "ph^" becomes "f", "b^" becomes "v"


      if (stack.caret && stst.length === 1 && this.tib_caret(stack.top)) {
        stack.top = stst[0] = this.tib_caret(stack.top);
        stack.caret = false;
      }

      stack.cons_str = stst.join("+"); // if this is a single consonant, keep track of it (useful for prefix/suffix analysis)

      if (stst.length === 1 && stst[0] !== 'a' && !stack.caret && stvow.length === 0 && stack.finals.length === 0) {
        stack.single_cons = stack.cons_str;
      } // return the analyzed stack


      return {
        toks: i - orig_i,
        // tokens used
        stack: stack,
        warns: warns
      };
    }
  }], [{
    key: "static_init",
    value: // Various classes of Tibetan symbols in Wylie and Unicode.
    // these vowels have different forms for the standalone thing and when added to a syllable
    // Wylie => [ 'standalone', 'added' ]
    // stuff that can come after the vowel
    // symbol => [ unicode, class ]  (cannot have more than 1 of the same class in the same stack)
    // other standalone symbols
    // special characters: flag those if they occur out of context
    // superscript => { letter or stack below => true }
    // subscript => { letter or stack above => true }
    // prefix => { consonant or stack after => true }
    // suffix => true; also included are some Skt letters b/c they occur often in suffix position in Skt words
    // 2nd suffix => letter before
    // to help handle stuff like pa'm
    // root letter index for very ambiguous 3 letter syllables: consonant string => [ root index, "wylie result" ]
    // Unicode to Wylie mappings
    // top letters
    // subjoined letters
    // vowel signs:
    // a-chen is not here because that's a top character: not a vowel sign.
    // pre-composed "I" and "U" are dealt here; other pre-composed Skt vowels are more
    // easily handled by a global replace in toWylie(), b/c they turn into subjoined "r"/"l".
    // long (Skt) vowels
    // final symbols: unicode => [ wylie, class ] (cannot have more than 1 of the same class in the same stack)
    // special characters introduced by ^
    // other stand-alone characters
    // all these stacked consonant combinations don't need "+"s in them
    // static method to run initialization that needs to run once only (not for every object creation)
    // - note that 'this' in this context refers to the class itself, not to any instance, so e.g this.finals is the static var
    function static_init() {
      if (this.initialized) return;
      this.initialized = true;

      var quotemeta = function quotemeta(str) {
        return (str + '').replace(/\W/g, '\\$&');
      }; // polyfill String.prototype.replaceAll if needed - not an industrial grade polyfill but close enough
      // modified from https://vanillajstoolkit.com/polyfills/stringreplaceall/


      if (!String.prototype.replaceAll) {
        String.prototype.replaceAll = function (str, repl) {
          // pass regexes to regular .replace()
          if (Object.prototype.toString.call(str).toLowerCase() === '[object regexp]') {
            return this.replace(str, repl);
          }

          return this.replace(new RegExp(quotemeta(str), 'g'), repl);
        };
      } // precompute the regexp to split a string into Wylie tokens.  sort by decreasing size
      // so that things like "sh" don't get split into ("s", "h").  the "." and the 's' flag
      // ensure that any remaining characters are taken as a single-char token.


      var sort_tokens = function sort_tokens(a, b) {
        return a.length < b.length ? 1 : a.length > b.length ? -1 : a < b ? -1 : a > b ? 1 : 0;
      };

      var toks = Object.assign({}, this.consonant, this.subjoined, this.vowel, this.finals, this.other);
      toks = Object.keys(toks).filter(function (x) {
        return x.length > 1;
      }).sort(sort_tokens);
      var regex = toks.map(quotemeta).join('|');
      regex = "(".concat(regex, "|\\\\u....|\\\\U........|\\\\.|\r\n|.)");
      this.tokens_regex = new RegExp(regex, 's');
    }
  }]);

  return EwtsConverter;
}();

exports.EwtsConverter = EwtsConverter;

_defineProperty(EwtsConverter, "consonant", {
  "k": "\u0F40",
  "kh": "\u0F41",
  "g": "\u0F42",
  "gh": "\u0F42\u0FB7",
  "g+h": "\u0F42\u0FB7",
  "ng": "\u0F44",
  "c": "\u0F45",
  "ch": "\u0F46",
  "j": "\u0F47",
  "ny": "\u0F49",
  "T": "\u0F4A",
  "-t": "\u0F4A",
  "Th": "\u0F4B",
  "-th": "\u0F4B",
  "D": "\u0F4C",
  "-d": "\u0F4C",
  "Dh": "\u0F4C\u0FB7",
  "D+h": "\u0F4C\u0FB7",
  "-dh": "\u0F4C\u0FB7",
  "-d+h": "\u0F4C\u0FB7",
  "N": "\u0F4E",
  "-n": "\u0F4E",
  "t": "\u0F4F",
  "th": "\u0F50",
  "d": "\u0F51",
  "dh": "\u0F51\u0FB7",
  "d+h": "\u0F51\u0FB7",
  "n": "\u0F53",
  "p": "\u0F54",
  "ph": "\u0F55",
  "b": "\u0F56",
  "bh": "\u0F56\u0FB7",
  "b+h": "\u0F56\u0FB7",
  "m": "\u0F58",
  "ts": "\u0F59",
  "tsh": "\u0F5A",
  "dz": "\u0F5B",
  "dzh": "\u0F5B\u0FB7",
  "dz+h": "\u0F5B\u0FB7",
  "w": "\u0F5D",
  "zh": "\u0F5E",
  "z": "\u0F5F",
  "'": "\u0F60",
  "y": "\u0F61",
  "r": "\u0F62",
  "l": "\u0F63",
  "sh": "\u0F64",
  "Sh": "\u0F65",
  "-sh": "\u0F65",
  "s": "\u0F66",
  "h": "\u0F67",
  "W": "\u0F5D",
  "Y": "\u0F61",
  "R": "\u0F6A",
  "f": "\u0F55\u0F39",
  "v": "\u0F56\u0F39"
});

_defineProperty(EwtsConverter, "subjoined", {
  "k": "\u0F90",
  "kh": "\u0F91",
  "g": "\u0F92",
  "gh": "\u0F92\u0FB7",
  "g+h": "\u0F92\u0FB7",
  "ng": "\u0F94",
  "c": "\u0F95",
  "ch": "\u0F96",
  "j": "\u0F97",
  "ny": "\u0F99",
  "T": "\u0F9A",
  "-t": "\u0F9A",
  "Th": "\u0F9B",
  "-th": "\u0F9B",
  "D": "\u0F9C",
  "-d": "\u0F9C",
  "Dh": "\u0F9C\u0FB7",
  "D+h": "\u0F9C\u0FB7",
  "-dh": "\u0F9C\u0FB7",
  "-d+h": "\u0F9C\u0FB7",
  "N": "\u0F9E",
  "-n": "\u0F9E",
  "t": "\u0F9F",
  "th": "\u0FA0",
  "d": "\u0FA1",
  "dh": "\u0FA1\u0FB7",
  "d+h": "\u0FA1\u0FB7",
  "n": "\u0FA3",
  "p": "\u0FA4",
  "ph": "\u0FA5",
  "b": "\u0FA6",
  "bh": "\u0FA6\u0FB7",
  "b+h": "\u0FA6\u0FB7",
  "m": "\u0FA8",
  "ts": "\u0FA9",
  "tsh": "\u0FAA",
  "dz": "\u0FAB",
  "dzh": "\u0FAB\u0FB7",
  "dz+h": "\u0FAB\u0FB7",
  "w": "\u0FAD",
  "zh": "\u0FAE",
  "z": "\u0FAF",
  "'": "\u0FB0",
  "y": "\u0FB1",
  "r": "\u0FB2",
  "l": "\u0FB3",
  "sh": "\u0FB4",
  "Sh": "\u0FB5",
  "-sh": "\u0FB5",
  "s": "\u0FB6",
  "h": "\u0FB7",
  "a": "\u0FB8",
  "W": "\u0FBA",
  "Y": "\u0FBB",
  "R": "\u0FBC"
});

_defineProperty(EwtsConverter, "vowel", {
  "a": "\u0F68",
  // a-chen
  "A": "\u0F71",
  "i": "\u0F72",
  "I": "\u0F71\u0F72",
  "u": "\u0F74",
  "U": "\u0F71\u0F74",
  "e": "\u0F7A",
  "ai": "\u0F7B",
  "o": "\u0F7C",
  "au": "\u0F7D",
  "-i": "\u0F80",
  "-I": "\u0F71\u0F80",
  // special sanskrit vowels
  "r-i": "\u0FB2\u0F80",
  "r-I": "\u0FB2\u0F71\u0F80",
  "l-i": "\u0FB3\u0F80",
  "l-I": "\u0FB3\u0F71\u0F80"
});

_defineProperty(EwtsConverter, "complex_vowel", {
  "r-i": ["\u0F62\u0F80", "\u0FB2\u0F80"],
  "r-I": ["\u0F62\u0F71\u0F80", "\u0FB2\u0F71\u0F80"],
  "l-i": ["\u0F63\u0F80", "\u0FB3\u0F80"],
  "l-I": ["\u0F63\u0F71\u0F80", "\u0FB3\u0F71\u0F80"]
});

_defineProperty(EwtsConverter, "finals", {
  "M": ["\u0F7E", "M"],
  // anusvara / bindu / circle above / nga ro
  "~M`": ["\u0F82", "M"],
  // crescent, bindu & nada
  "~M": ["\u0F83", "M"],
  // crescent & bindu
  "X": ["\u0F37", "X"],
  // small circle under
  "~X": ["\u0F35", "X"],
  // small circle w/ crescent under
  "H": ["\u0F7F", "H"],
  // visarga / rnam bcad
  "?": ["\u0F84", "?"],
  // halanta / srog med
  "^": ["\u0F39", "^"],
  // tsa-phru
  "&": ["\u0F85", "&"] // paluta / avagraha

});

_defineProperty(EwtsConverter, "other", {
  "0": "\u0F20",
  "1": "\u0F21",
  "2": "\u0F22",
  "3": "\u0F23",
  "4": "\u0F24",
  "5": "\u0F25",
  "6": "\u0F26",
  "7": "\u0F27",
  "8": "\u0F28",
  "9": "\u0F29",
  " ": "\u0F0B",
  "*": "\u0F0C",
  "/": "\u0F0D",
  "//": "\u0F0E",
  ";": "\u0F0F",
  "|": "\u0F11",
  "!": "\u0F08",
  ":": "\u0F14",
  "_": " ",
  "=": "\u0F34",
  "<": "\u0F3A",
  ">": "\u0F3B",
  "(": "\u0F3C",
  ")": "\u0F3D",
  "@": "\u0F04",
  "#": "\u0F05",
  "$": "\u0F06",
  "%": "\u0F07"
});

_defineProperty(EwtsConverter, "special", array_to_true_object([".", "+", "-", "~", "^", "?", "`", "]"]));

_defineProperty(EwtsConverter, "superscripts", {
  "r": array_to_true_object(["k", "g", "ng", "j", "ny", "t", "d", "n", "b", "m", "ts", "dz", "k+y", "g+y", "m+y", "b+w", "ts+w", "g+w"]),
  "l": array_to_true_object(["k", "g", "ng", "c", "j", "t", "d", "p", "b", "h"]),
  "s": array_to_true_object(["k", "g", "ng", "ny", "t", "d", "n", "p", "b", "m", "ts", "k+y", "g+y", "p+y", "b+y", "m+y", "k+r", "g+r", "p+r", "b+r", "m+r", "n+r"])
});

_defineProperty(EwtsConverter, "subscripts", {
  "y": array_to_true_object(["k", "kh", "g", "p", "ph", "b", "m", "r+k", "r+g", "r+m", "s+k", "s+g", "s+p", "s+b", "s+m"]),
  "r": array_to_true_object(["k", "kh", "g", "t", "th", "d", "n", "p", "ph", "b", "m", "sh", "s", "h", "dz", "s+k", "s+g", "s+p", "s+b", "s+m", "s+n"]),
  "l": array_to_true_object(["k", "g", "b", "r", "s", "z"]),
  "w": array_to_true_object(["k", "kh", "g", "c", "ny", "t", "d", "ts", "tsh", "zh", "z", "r", "l", "sh", "s", "h", "g+r", "d+r", "ph+y", "r+g", "r+ts"])
});

_defineProperty(EwtsConverter, "prefixes", {
  "g": array_to_true_object(["c", "ny", "t", "d", "n", "ts", "zh", "z", "y", "sh", "s"]),
  "d": array_to_true_object(["k", "g", "ng", "p", "b", "m", "k+y", "g+y", "p+y", "b+y", "m+y", "k+r", "g+r", "p+r", "b+r"]),
  "b": array_to_true_object(["k", "g", "c", "t", "d", "ts", "zh", "z", "sh", "s", "r", "l", "k+y", "g+y", "k+r", "g+r", "r+l", "s+l", "r+k", "r+g", "r+ng", "r+j", "r+ny", "r+t", "r+d", "r+n", "r+ts", "r+dz", "s+k", "s+g", "s+ng", "s+ny", "s+t", "s+d", "s+n", "s+ts", "r+k+y", "r+g+y", "s+k+y", "s+g+y", "s+k+r", "s+g+r", "l+d", "l+t", "k+l", "s+r", "z+l", "s+w"]),
  "m": array_to_true_object(["kh", "g", "ng", "ch", "j", "ny", "th", "d", "n", "tsh", "dz", "kh+y", "g+y", "kh+r", "g+r"]),
  "'": array_to_true_object(["kh", "g", "ch", "j", "th", "d", "ph", "b", "tsh", "dz", "kh+y", "g+y", "ph+y", "b+y", "kh+r", "g+r", "d+r", "ph+r", "b+r"])
});

_defineProperty(EwtsConverter, "suffixes", array_to_true_object(["'", "g", "ng", "d", "n", "b", "m", "r", "l", "s", "N", "T", "-n", "-t"]));

_defineProperty(EwtsConverter, "suff2", {
  "s": array_to_true_object(["g", "ng", "b", "m"]),
  "d": array_to_true_object(["n", "r", "l"])
});

_defineProperty(EwtsConverter, "affixedsuff2", array_to_true_object(['ng', 'm']));

_defineProperty(EwtsConverter, "ambiguous", {
  "dgs": [1, "dgas"],
  "dngs": [1, "dngas"],
  "'gs": [1, "'gas"],
  "'bs": [1, "'bas"],
  "dbs": [1, "dbas"],
  "dms": [1, "dmas"],
  "bgs": [0, "bags"],
  "mngs": [0, "mangs"],
  "mgs": [0, "mags"],
  // some syllables ending in '-d' added here to silence some warnings
  "gnd": [1, "gnad"]
});

_defineProperty(EwtsConverter, "tib_top", {
  "\u0F40": "k",
  "\u0F41": "kh",
  "\u0F42": "g",
  "\u0F43": "g+h",
  "\u0F44": "ng",
  "\u0F45": "c",
  "\u0F46": "ch",
  "\u0F47": "j",
  "\u0F49": "ny",
  "\u0F4A": "T",
  "\u0F4B": "Th",
  "\u0F4C": "D",
  "\u0F4D": "D+h",
  "\u0F4E": "N",
  "\u0F4F": "t",
  "\u0F50": "th",
  "\u0F51": "d",
  "\u0F52": "d+h",
  "\u0F53": "n",
  "\u0F54": "p",
  "\u0F55": "ph",
  "\u0F56": "b",
  "\u0F57": "b+h",
  "\u0F58": "m",
  "\u0F59": "ts",
  "\u0F5A": "tsh",
  "\u0F5B": "dz",
  "\u0F5C": "dz+h",
  "\u0F5D": "w",
  "\u0F5E": "zh",
  "\u0F5F": "z",
  "\u0F60": "'",
  "\u0F61": "y",
  "\u0F62": "r",
  "\u0F63": "l",
  "\u0F64": "sh",
  "\u0F65": "Sh",
  "\u0F66": "s",
  "\u0F67": "h",
  "\u0F68": "a",
  "\u0F69": "k+Sh",
  "\u0F6A": "R"
});

_defineProperty(EwtsConverter, "tib_subjoined", {
  "\u0F90": "k",
  "\u0F91": "kh",
  "\u0F92": "g",
  "\u0F93": "g+h",
  "\u0F94": "ng",
  "\u0F95": "c",
  "\u0F96": "ch",
  "\u0F97": "j",
  "\u0F99": "ny",
  "\u0F9A": "T",
  "\u0F9B": "Th",
  "\u0F9C": "D",
  "\u0F9D": "D+h",
  "\u0F9E": "N",
  "\u0F9F": "t",
  "\u0FA0": "th",
  "\u0FA1": "d",
  "\u0FA2": "d+h",
  "\u0FA3": "n",
  "\u0FA4": "p",
  "\u0FA5": "ph",
  "\u0FA6": "b",
  "\u0FA7": "b+h",
  "\u0FA8": "m",
  "\u0FA9": "ts",
  "\u0FAA": "tsh",
  "\u0FAB": "dz",
  "\u0FAC": "dz+h",
  "\u0FAD": "w",
  "\u0FAE": "zh",
  "\u0FAF": "z",
  "\u0FB0": "'",
  "\u0FB1": "y",
  "\u0FB2": "r",
  "\u0FB3": "l",
  "\u0FB4": "sh",
  "\u0FB5": "Sh",
  "\u0FB6": "s",
  "\u0FB7": "h",
  "\u0FB8": "a",
  "\u0FB9": "k+Sh",
  "\u0FBA": "W",
  "\u0FBB": "Y",
  "\u0FBC": "R"
});

_defineProperty(EwtsConverter, "tib_vowel", {
  "\u0F71": "A",
  "\u0F72": "i",
  "\u0F73": "I",
  "\u0F74": "u",
  "\u0F75": "U",
  "\u0F7A": "e",
  "\u0F7B": "ai",
  "\u0F7C": "o",
  "\u0F7D": "au",
  "\u0F80": "-i"
});

_defineProperty(EwtsConverter, "tib_vowel_long", {
  "i": "I",
  "u": "U",
  "-i": "-I"
});

_defineProperty(EwtsConverter, "tib_final", {
  "\u0F35": ["~X", "X"],
  "\u0F37": ["X", "X"],
  "\u0F39": ["^", "^"],
  "\u0F7E": ["M", "M"],
  "\u0F7F": ["H", "H"],
  "\u0F82": ["~M`", "M"],
  "\u0F83": ["~M", "M"],
  "\u0F84": ["?", "?"],
  "\u0F85": ["&", "&"]
});

_defineProperty(EwtsConverter, "tib_caret", {
  "ph": "f",
  "b": "v"
});

_defineProperty(EwtsConverter, "tib_other", {
  " ": "_",
  "\u0F04": "@",
  "\u0F05": "#",
  "\u0F06": "$",
  "\u0F07": "%",
  "\u0F08": "!",
  "\u0F0B": " ",
  "\u0F0C": "*",
  "\u0F0D": "/",
  "\u0F0E": "//",
  "\u0F0F": ";",
  "\u0F11": "|",
  "\u0F14": ":",
  "\u0F20": "0",
  "\u0F21": "1",
  "\u0F22": "2",
  "\u0F23": "3",
  "\u0F24": "4",
  "\u0F25": "5",
  "\u0F26": "6",
  "\u0F27": "7",
  "\u0F28": "8",
  "\u0F29": "9",
  "\u0F34": "=",
  "\u0F3A": "<",
  "\u0F3B": ">",
  "\u0F3C": "(",
  "\u0F3D": ")"
});

_defineProperty(EwtsConverter, "tib_stack", array_to_true_object(["b+l", "b+r", "b+y", "c+w", "d+r", "d+r+w", "d+w", "g+l", "g+r", "g+r+w", "g+w", "g+y", "h+r", "h+w", "k+l", "k+r", "k+w", "k+y", "kh+r", "kh+w", "kh+y", "l+b", "l+c", "l+d", "l+g", "l+h", "l+j", "l+k", "l+ng", "l+p", "l+t", "l+w", "m+r", "m+y", "n+r", "ny+w", "p+r", "p+y", "ph+r", "ph+y", "ph+y+w", "r+b", "r+d", "r+dz", "r+g", "r+g+w", "r+g+y", "r+j", "r+k", "r+k+y", "r+l", "r+m", "r+m+y", "r+n", "r+ng", "r+ny", "r+t", "r+ts", "r+ts+w", "r+w", "s+b", "s+b+r", "s+b+y", "s+d", "s+g", "s+g+r", "s+g+y", "s+k", "s+k+r", "s+k+y", "s+l", "s+m", "s+m+r", "s+m+y", "s+n", "s+n+r", "s+ng", "s+ny", "s+p", "s+p+r", "s+p+y", "s+r", "s+t", "s+ts", "s+w", "sh+r", "sh+w", "t+r", "t+w", "th+r", "ts+w", "tsh+w", "z+l", "z+w", "zh+w"]));

_defineProperty(EwtsConverter, "initialized", false);