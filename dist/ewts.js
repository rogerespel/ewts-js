(()=>{"use strict";var t,e,n={796:(t,e,n)=>{t.exports=n.p+"ewts.html"},41:(t,e,n)=>{function r(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var r,s,i=[],o=!0,a=!1;try{for(n=n.call(t);!(o=(r=n.next()).done)&&(i.push(r.value),!e||i.length!==e);o=!0);}catch(t){a=!0,s=t}finally{try{o||null==n.return||n.return()}finally{if(a)throw s}}return i}}(t,e)||i(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function s(t,e){var n="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!n){if(Array.isArray(t)||(n=i(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var r=0,s=function(){};return{s,n:function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}},e:function(t){throw t},f:s}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,a=!0,l=!1;return{s:function(){n=n.call(t)},n:function(){var t=n.next();return a=t.done,t},e:function(t){l=!0,o=t},f:function(){try{a||null==n.return||n.return()}finally{if(l)throw o}}}}function i(t,e){if(t){if("string"==typeof t)return o(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?o(t,e):void 0}}function o(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function a(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function l(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function c(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}n.d(e,{l:()=>h});var u=function(t){return Object.fromEntries(t.map((function(t){return[t,!0]})))},h=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.check,r=void 0===n||n,s=e.check_strict,i=void 0===s||s,o=e.fix_spacing,l=void 0===o||o,c=e.leave_dubious,u=void 0!==c&&c,h=e.sloppy,f=void 0!==h&&h,p=e.pass_through,d=void 0!==p&&p;if(a(this,t),this.constructor.static_init(),i&&!r)throw new Error("Cannot have 'check_strict' without 'check'.");this.check=r,this.check_strict=i,this.fix_spacing=l,this.leave_dubious=u,this.sloppy=f,this.pass_through=d,this.warnings=[]}var e,n,i;return e=t,n=[{key:"consonant",value:function(t){return this.constructor.consonant[t]}},{key:"subjoined",value:function(t){return this.constructor.subjoined[t]}},{key:"vowel",value:function(t){return this.constructor.vowel[t]}},{key:"finals",value:function(t){return this.constructor.finals[t]}},{key:"complex_vowel",value:function(t){return this.constructor.complex_vowel[t]}},{key:"other",value:function(t){return this.constructor.other[t]}},{key:"is_special",value:function(t){return this.constructor.special[t]}},{key:"is_superscript",value:function(t){return!!this.constructor.superscripts[t]}},{key:"superscript",value:function(t,e){var n=this.constructor.superscripts[t];return n&&n[e]}},{key:"is_subscript",value:function(t){return!!this.constructor.subscripts[t]}},{key:"subscript",value:function(t,e){var n=this.constructor.subscripts[t];return n&&n[e]}},{key:"is_prefix",value:function(t){return!!this.constructor.prefixes[t]}},{key:"prefix",value:function(t,e){var n=this.constructor.prefixes[t];return n&&n[e]}},{key:"is_suffix",value:function(t){return this.constructor.suffixes[t]}},{key:"is_suff2",value:function(t){return!!this.constructor.suff2[t]}},{key:"suff2",value:function(t,e){var n=this.constructor.suff2[t];return n&&n[e]}},{key:"affixedsuff2",value:function(t){return this.constructor.affixedsuff2[t]}},{key:"ambiguous",value:function(t){return this.constructor.ambiguous[t]}},{key:"tib_top",value:function(t){return this.constructor.tib_top[t]}},{key:"tib_subjoined",value:function(t){return this.constructor.tib_subjoined[t]}},{key:"tib_vowel",value:function(t){return this.constructor.tib_vowel[t]}},{key:"tib_vowel_long",value:function(t){return this.constructor.tib_vowel_long[t]}},{key:"tib_final",value:function(t){return this.constructor.tib_final[t]}},{key:"tib_caret",value:function(t){return this.constructor.tib_caret[t]}},{key:"tib_other",value:function(t){return this.constructor.tib_other[t]}},{key:"tib_stack",value:function(t){return this.constructor.tib_stack[t]}},{key:"fix_sloppy",value:function(t){return t.replaceAll("ʼ","'").replaceAll("ʹ","'").replaceAll("‘","'").replaceAll("’","'").replaceAll("ʾ","'").replaceAll("...","\\u0f0b\\u0f0b\\u0f0b").replaceAll(" (","_(").replaceAll(") ",")_").replaceAll("/ ","/_").replaceAll(" 0","_0").replaceAll(" 1","_1").replaceAll(" 2","_2").replaceAll(" 3","_3").replaceAll(" 4","_4").replaceAll(" 5","_5").replaceAll(" 6","_6").replaceAll(" 7","_7").replaceAll(" 8","_8").replaceAll(" 9","_9").replaceAll("_ ","__").replaceAll("G","g").replaceAll("K","k").replaceAll("C","c").replaceAll("B","b").replaceAll("P","p").replaceAll("L","l").replaceAll("Z","z").replaceAll(" b "," ba ").replaceAll(" b'i "," ba'i ").replaceAll(" m "," ma ").replaceAll(" m'i "," ma'i ").replaceAll("Ts","ts").replaceAll("Dz","dz").replaceAll("Ny","ny").replaceAll("Ng","ng").replaceAll(" (","(").replaceAll(") ",")").replaceAll("༼","(").replaceAll("༽",")").replaceAll("：",":").replaceAll("H ","H").replace(/(^|[^aeiouAIU])H/g,"$1h").replace(/(^|[^aeiouAIU~])M/g,"$1m").replace(/S($|[^h])/g,"s$1")}},{key:"is_combining",value:function(t){var e=t.charCodeAt(0);return e>3953&&e<3972||e<3981&&e>4028}},{key:"unicode_escape",value:function(t,e){var n=t.substring(2);if(""==n)return null;if(!n.match(/^[0-9a-fA-F]+$/))return this.warn("line ".concat(e,': "').concat(n,'": invalid hex code.')),"";var r=parseInt(n,16);return String.fromCodePoint(r)}},{key:"warn",value:function(t){this.warnings.push(t)}},{key:"get_warnings",value:function(){return this.warnings}},{key:"to_unicode",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=1,r=0,i="";this.warnings=[];var o=u(((e||"")+"").split(""));this.fix_spacing&&(t=t.trimStart());var a=(t=this.sloppy?this.fix_sloppy(t):t.replaceAll("ʼ","'").replaceAll("ʹ","'").replaceAll("‘","'").replaceAll("’","'").replaceAll("ʾ","'")).split(this.constructor.tokens_regex).filter((function(t){return""!==t}));a.push(null);var l,c=0;t:for(;null!==(l=a[c]);){var h=void 0;if(o[l])i+=l,c++;else{if("["===l){var f=1;for(c++;null!==(l=a[c++]);){if("["===l&&f++,"]"===l&&f--,0===f)continue t;!l.startsWith("\\u")&&!l.startsWith("\\U")||null===(h=this.unicode_escape(l,n))?i+=h=l.startsWith("\\")?l.substring(1):l:i+=h}this.warn("line ".concat(n,": Unfinished [non-Wylie stuff]."));break t}if(h=this.other(l)){if(i+=h,c++,r++," "===l&&this.fix_spacing)for(;" "===a[c];)c++}else if(this.vowel(l)||this.consonant(l)){var p=this._to_unicode_one_tsekbar(a,c),d=p.uni,_=p.toks,g=p.warns,b=a.slice(c,c+_).join("");c+=_,r++,g.length>0&&this.leave_dubious?i+="["+b+"]":i+=d;var v,y=s(g);try{for(y.s();!(v=y.n()).done;){var k=v.value;this.warn("line ".concat(n,': "').concat(b,'": ').concat(k))}}catch(t){y.e(t)}finally{y.f()}}else if("\ufeff"!==l&&"​"!==l)if(!l.startsWith("\\u")&&!l.startsWith("\\U")||null===(h=this.unicode_escape(l,n))){if(l.startsWith("\\"))i+=l.substring(1),c++;else if("\r\n"!==l&&"\n"!==l&&"\r"!==l)(this.is_special(l)||l.match(/[a-zA-Z]/))&&this.warn("line ".concat(n,': Unexpected character "').concat(l,'".')),i+=l,c++;else if(n++,i+=l,c++,this.fix_spacing)for(;" "===a[c];)c++}else c++,i+=h;else c++}}return 0===r&&this.warn("No Tibetan characters found!"),i}},{key:"_to_unicode_one_tsekbar",value:function(t,e){for(var n,r,s,i,o,a,l=e,c=t[e],u=null,h=!0,f=[],p=null,d="",_=[],g="PREFIX";null!==c&&(this.vowel(c)||this.consonant(c))&&!a;){o=u;var b=this._to_unicode_one_stack(t,e);if(n=b.uni,r=b.toks,u=b.cons,s=b.cons_a,i=b.warns,a=b.visarga,e+=r,_=_.concat(i),c=t[e],d+=n,this.check)if("PREFIX"===g&&u){if(f.push(u),this.is_prefix(u)){var v=this.check_strict?this._consonant_string(t,e):c||"";""===v||this.prefix(u,v)||(v=v.replaceAll("+",""),_.push('Prefix "'.concat(u,'" does not occur before "').concat(v,'".')))}else _.push('Invalid prefix consonant "'.concat(u,'".'));g="MAIN"}else u?"MAIN"===g?_.push('Expected vowel after "'.concat(u,'".')):"SUFF1"===g?(f.push(u),this.check_strict&&!this.is_suffix(u)&&_.push('Invalid suffix consonant: "'.concat(u,'".')),g="SUFF2"):"SUFF2"===g?(f.push(u),this.is_suff2(u)?this.suff2(u,o)||_.push('"Second suffix "'.concat(u,'" does not occur after "').concat(o,'".')):this.affixedsuff2(u)&&"'"!==!o||_.push('Invalid 2nd suffix consonant: "'.concat(u,'".')),g="NONE"):"NONE"===g&&_.push('Cannot have another consonant "'.concat(u,'" after 2nd suffix.')):(g="SUFF1",null!==p?h=!1:s&&(f.push(s),p=f.length-1))}if("MAIN"===g&&u&&this.is_prefix(u)&&_.push('Vowel expected after "'.concat(u,'".')),this.check&&!_.length&&h&&null!==p)if(2===f.length&&0!==p&&this.prefix(f[0],f[1])&&this.is_suffix(f[1]))_.push('Syllable should probably be "'.concat(f[0],"a").concat(f[1],'".'));else if(3===f.length&&this.is_prefix(f[0])&&this.suff2("s",f[1])&&"s"===f[2]){var y=f.join(""),k=this.ambiguous(y);k&&k[0]!==p&&_.push('Syllable should probably be "'.concat(k[1],'".'))}return{uni:d,toks:e-l,warns:_}}},{key:"_to_unicode_one_stack",value:function(t,e){var n,s,i=e,o="",a=[],l=0,c=null,u=null,h=null,f=!1,p=0,d={};if(n=t[e],null!==(s=t[e+1])&&this.is_superscript(n)&&this.superscript(n,s)){if(this.check_strict){var _=this._consonant_string(t,e+1);this.superscript(n,_)||(_=_.replaceAll("+"," "),a.push('Superscript "'.concat(n,'" does not occur above combination "').concat(_,'".')))}for(o+=this.consonant(n),l++,e++;"^"===t[e];)p++,e++}t:for(;;){if(n=t[e],this.consonant(n)||""!==o&&this.subjoined(n)){if(o+=""===o?this.consonant(n):this.subjoined(n),e++,"a"===n?c="a":(l++,h=n),n.match(/(?:g|d|D|b|dz)h/)){var g=n.replace(/(g|d|D|b|dz)h/,"$1+h");a.push('"'.concat(n,' should be "').concat(g,'".'))}for(;"^"===t[e];)p++,e++;for(var b=0,v=[0,1];b<v.length;b++){var y=v[b],k=t[e];if(null===k||!this.is_subscript(k))break;if("l"===k&&l>1)break;if(this.check_strict&&!f){var w=this._consonant_string_backwards(t,e-1,i);this.subscript(k,w)||(w=w.replaceAll("+",""),a.push('Subjoined "'.concat(k,'" not expected after "').concat(w,'".')))}else this.check&&(this.subscript(k,n)||1===y&&"w"===k&&"y"===n||a.push('Subjoined "'.concat(k,'" not expected after "').concat(n,'"')));for(o+=this.subjoined(k),e++,l++;"^"===t[e];)p++,e++;n=k}}if(p>0){p>1&&a.push('Cannot have more than one "^" applied to the same stack.');var m=this.finals("^");d["^"]="^",o+=m[0],p=0}if(null!==(n=t[e])&&this.vowel(n)){var A=this.complex_vowel(n);A?o+=o.length?A[1]:A[0]:(""===o&&(o+=this.vowel("a")),"a"!==n&&(o+=this.vowel(n))),e++,c=n,"a"!==n&&(u=n)}if("+"!==(n=t[e]))break t;if(f=!0,null===(n=t[++e])||!this.vowel(n)&&!this.subjoined(n)){this.check&&a.push('Expected vowel or consonant after "+".');break t}this.check&&(!this.vowel(n)&&u?a.push('Cannot subjoin consonant "'.concat(n,'" after vowel "').concat(u,'" in same stack.')):"a"===n&&u&&a.push('Cannot subjoin a-chen "'.concat(n,'" after vowel "').concat(u,'" in same stack.')))}for(n=t[e];null!==n&&this.finals(n);){var x=r(this.finals(n),2),j=x[0],z=x[1];void 0!==d[z]?d[z]===n?a.push('Cannot have two "'.concat(n,'" applied to the same stack.')):a.push('Cannot have "'.concat(n,'" and "').concat(d[z],'" applied to the same stack.')):(d[z]=n,o+=j),h=null,n=t[++e]}return"."===t[e]&&e++,l>1&&null===c&&(f?this.check&&a.push("Stack with multiple consonants should end with vowel."):(e=i+1,l=1,h=t[i],o=this.consonant(h))),(1!==l||f)&&(h=null),{uni:o,toks:e-i,cons:c?null:h,cons_a:"a"===c?h:null,warns:a,visarga:"^"in d}}},{key:"_consonant_string",value:function(t,e){for(var n,r=[];null!==(n=t[e++]);)if("+"!==n&&"^"!==n){if(!this.consonant(n))break;r.push(n)}return r.join("+")}},{key:"_consonant_string_backwards",value:function(t,e,n){for(var r,s=[];e>=n&&null!==t[e];)if("+"!==(r=t[e--])&&"^"!==r){if(!this.consonant(r))break;s.push(r)}return s.reverse().join("+")}},{key:"to_ewts",value:function(t){var e="",n=1,i=0;this.warnings=[];for(var o=0,a=(t=t.replaceAll("ྲྀ","ྲྀ").replaceAll("ཷ","ྲཱྀ").replaceAll("ླྀ","ླྀ").replaceAll("ཹ","ླཱྀ").replaceAll("ཱྀ","ཱྀ").replaceAll("ཱུ","ཱུ").replaceAll("ཱི","ཱི")).length;o<a;){var l=t.charAt(o);if(this.tib_top(l)){var c=this._to_ewts_one_tsekbar(t,a,o),u=c.toks;e+=c.wylie,o+=u,i++;var h,f=s(c.warns);try{for(f.s();!(h=f.n()).done;){var p=h.value;this.warn("line ".concat(n,": ").concat(p))}}catch(t){f.e(t)}finally{f.f()}if(this.pass_through){var d=r(this._handle_spaces(t,o,e),2);o=d[0],e=d[1]}}else{var _=this.tib_other(l);if(!_||" "===l&&(this.pass_through||this._followed_by_nontibetan(t,o)))if("\n"!==l&&"\r"!==l)if("\ufeff"!==l&&"​"!==l)if(this.pass_through)e+=l,o++;else{var g=l.charCodeAt(0);if(g>=3840&&g<=4095){var b=this._format_hex(g);e+=b,o++,(this.tib_subjoined(l)||this.tib_vowel(l)||this.tib_final(l))&&this.warn("line ".concat(n,": Tibetan sign ").concat(b," needs a top symbol to attach to."))}else{for(e+="[";!(this.tib_top(l)||this.tib_other(l)&&" "!==l||"\r"===l||"\n"===l||("["===l||"]"===l?e+="\\"+l:l.charCodeAt(0)>=3840&&l.charCodeAt(0)<=4095?e+=this._format_hex(l.charCodeAt(0)):e+=l,++o>=a));)l=t.charAt(o);e+="]"}}else o++;else n++,o++,e+=l,"\r"===l&&o<a&&"\n"===t.charAt(o)&&(o++,e+="\n");else if(e+=_,o++,i++,this.pass_through){var v=r(this._handle_spaces(t,o,e),2);o=v[0],e=v[1]}}}return 0===i&&this.warn("No Tibetan characters found!"),e}},{key:"_format_hex",value:function(t){for(var e=Number(t).toString(16);e.length<4;)e="0"+e;return"\\u"+e}},{key:"_handle_spaces",value:function(t,e,n){for(var r=0;e<t.length&&" "===t.charAt(e);)e++,r++;if(0===r||e===t.length)return[e,n];var s=t.charAt(e);if(!this.tib_top(s)&&!this.tib_other(s))return[e,n];for(var i=0;i<r;i++)n+="_";return[e,n]}},{key:"_followed_by_nontibetan",value:function(t,e){for(var n=t.length;e<n&&" "===t.charAt(e);)e++;if(e===n)return!1;var r=t.charAt(e);return!this.tib_top(r)&&!this.tib_other(r)&&"\r"!==r&&"\n"!==r}},{key:"_to_ewts_one_tsekbar",value:function(t,e,n){var r=this,s=n,i=[],o=[];t:for(;;){var a=this._to_ewts_one_stack(t,e,n),l=a.toks,c=a.stack,u=a.warns;if(o.push(c),i=i.concat(u),n+=l,c.visarga)break t;if(n>=e||!this.tib_top(t.charAt(n)))break t}var h=o.length,f=h-1;if(h>1&&o[0].single_cons){var p=o[1].cons_str.replaceAll("+w","");this.prefix(o[0].single_cons,p)&&(o[0].prefix=!0)}if(h>1&&o[f].single_cons&&this.is_suffix(o[f].single_cons)&&(o[f].suffix=!0),h>2&&o[f].single_cons&&o[f-1].single_cons&&this.is_suffix(o[f-1].single_cons)&&this.is_suff2(o[f].single_cons)&&this.suff2(o[f].single_cons,o[f-1].single_cons)&&(o[f].suff2=!0,o[f-1].suffix=!0),2===h&&o[0].prefix&&o[1].suffix&&(o[0].prefix=!1),3===h&&o[0].prefix&&o[1].suffix&&o[2].suff2){var d,_=o.map((function(t){return t.single_cons})).join(""),g=this.ambiguous(_);g?d=g[0]:(i.push('Ambiguous syllable found: root consonant not known for "'.concat(_,'".')),d=1),o[d].prefix=o[d].suffix=!1,o[d+1].suff2=!1}o[0].prefix&&this.tib_stack(o[0].single_cons+"+"+o[1].cons_str)&&(o[0].dot=!0);for(var b=1;b<o.length;b++)"a"==o[b].top&&(o[b-1].dot=!0);return{toks:n-s,wylie:o.map((function(t){return r._put_stack_together(t)})).join(""),warns:i,stacks:o}}},{key:"_put_stack_together",value:function(t){var e="";return this.tib_stack(t.cons_str)?e+=t.stack.join(""):e+=t.cons_str,t.caret&&(e+="^"),t.vowels.length>0?e+=t.vowels.join("+"):t.prefix||t.suffix||t.suff2||t.cons_str.match(/a$/)||(e+="a"),e+=t.finals.join(""),t.dot&&(e+="."),e}},{key:"_to_ewts_one_stack",value:function(t,e,n){var s=n,i=[],o=null,a=null,l=null,c={top:null,stack:[],caret:!1,vowels:[],finals:[],finals_found:{},visarga:!1,cons_str:null,single_cons:null,prefix:!1,suffix:!1,suff2:!1,dot:!1},u=c.stack,h=c.vowels,f=t.charAt(n++);for(c.top=this.tib_top(f),u.push(this.tib_top(f));n<e;){f=t.charAt(n);var p=void 0;if(p=this.tib_subjoined(f))n++,u.push(p),c.finals.length>0?i.push('Subjoined sign "'.concat(p,'" found after final sign "').concat(o,'".')):h.length>0&&i.push('Subjoined sign "'.concat(p,'" found after vowel sign "').concat(a,'".'));else if(p=this.tib_vowel(f))n++,h.push(p),null===a&&(a=p),c.finals.length>0&&i.push('Vowel sign "'.concat(p,'" found after final sign "').concat(o,'".'));else{if(!(p=this.tib_final(f)))break;n++;var d=r(p,2);p=d[0],l=d[1],"^"===p?c.caret=!0:("H"===p&&(c.visarga=!0),null===o&&(o=p),void 0!==c.finals_found[l]?i.push('Final sign "'.concat(p,'" should not combine with final sign "').concat(c.finals_found[l],'".')):(c.finals_found[l]=p,c.finals.push(p)))}}if("a"===c.top&&1===u.length&&h.length>0&&u.shift(),h.length>1&&"A"===h[0]&&this.tib_vowel_long(h[1])&&h.splice(0,2,this.tib_vowel_long(h[1])),u.length>0&&u[u.length-1]in["r","l"]&&1===h.length&&h[0]in["-i","-I"]){var _=u.pop();h[0]=_+h[0]}return c.caret&&1===u.length&&this.tib_caret(c.top)&&(c.top=u[0]=this.tib_caret(c.top),c.caret=!1),c.cons_str=u.join("+"),1!==u.length||"a"===u[0]||c.caret||0!==h.length||0!==c.finals.length||(c.single_cons=c.cons_str),{toks:n-s,stack:c,warns:i}}}],i=[{key:"static_init",value:function(){if(!this.initialized){this.initialized=!0;var t=function(t){return(t+"").replace(/\W/g,"\\$&")};String.prototype.replaceAll||(String.prototype.replaceAll=function(e,n){return"[object regexp]"===Object.prototype.toString.call(e).toLowerCase()?this.replace(e,n):this.replace(new RegExp(t(e),"g"),n)});var e=Object.assign({},this.consonant,this.subjoined,this.vowel,this.finals,this.other),n=(e=Object.keys(e).filter((function(t){return t.length>1})).sort((function(t,e){return t.length<e.length?1:t.length>e.length||t<e?-1:t>e?1:0}))).map(t).join("|");n="(".concat(n,"|\\\\u....|\\\\U........|\\\\.|\r\n|.)"),this.tokens_regex=new RegExp(n,"s")}}}],n&&l(e.prototype,n),i&&l(e,i),t}();c(h,"consonant",{k:"ཀ",kh:"ཁ",g:"ག",gh:"གྷ","g+h":"གྷ",ng:"ང",c:"ཅ",ch:"ཆ",j:"ཇ",ny:"ཉ",T:"ཊ","-t":"ཊ",Th:"ཋ","-th":"ཋ",D:"ཌ","-d":"ཌ",Dh:"ཌྷ","D+h":"ཌྷ","-dh":"ཌྷ","-d+h":"ཌྷ",N:"ཎ","-n":"ཎ",t:"ཏ",th:"ཐ",d:"ད",dh:"དྷ","d+h":"དྷ",n:"ན",p:"པ",ph:"ཕ",b:"བ",bh:"བྷ","b+h":"བྷ",m:"མ",ts:"ཙ",tsh:"ཚ",dz:"ཛ",dzh:"ཛྷ","dz+h":"ཛྷ",w:"ཝ",zh:"ཞ",z:"ཟ","'":"འ",y:"ཡ",r:"ར",l:"ལ",sh:"ཤ",Sh:"ཥ","-sh":"ཥ",s:"ས",h:"ཧ",W:"ཝ",Y:"ཡ",R:"ཪ",f:"ཕ༹",v:"བ༹"}),c(h,"subjoined",{k:"ྐ",kh:"ྑ",g:"ྒ",gh:"ྒྷ","g+h":"ྒྷ",ng:"ྔ",c:"ྕ",ch:"ྖ",j:"ྗ",ny:"ྙ",T:"ྚ","-t":"ྚ",Th:"ྛ","-th":"ྛ",D:"ྜ","-d":"ྜ",Dh:"ྜྷ","D+h":"ྜྷ","-dh":"ྜྷ","-d+h":"ྜྷ",N:"ྞ","-n":"ྞ",t:"ྟ",th:"ྠ",d:"ྡ",dh:"ྡྷ","d+h":"ྡྷ",n:"ྣ",p:"ྤ",ph:"ྥ",b:"ྦ",bh:"ྦྷ","b+h":"ྦྷ",m:"ྨ",ts:"ྩ",tsh:"ྪ",dz:"ྫ",dzh:"ྫྷ","dz+h":"ྫྷ",w:"ྭ",zh:"ྮ",z:"ྯ","'":"ྰ",y:"ྱ",r:"ྲ",l:"ླ",sh:"ྴ",Sh:"ྵ","-sh":"ྵ",s:"ྶ",h:"ྷ",a:"ྸ",W:"ྺ",Y:"ྻ",R:"ྼ"}),c(h,"vowel",{a:"ཨ",A:"ཱ",i:"ི",I:"ཱི",u:"ུ",U:"ཱུ",e:"ེ",ai:"ཻ",o:"ོ",au:"ཽ","-i":"ྀ","-I":"ཱྀ","r-i":"ྲྀ","r-I":"ྲཱྀ","l-i":"ླྀ","l-I":"ླཱྀ"}),c(h,"complex_vowel",{"r-i":["རྀ","ྲྀ"],"r-I":["རཱྀ","ྲཱྀ"],"l-i":["ལྀ","ླྀ"],"l-I":["ལཱྀ","ླཱྀ"]}),c(h,"finals",{M:["ཾ","M"],"~M`":["ྂ","M"],"~M":["ྃ","M"],X:["༷","X"],"~X":["༵","X"],H:["ཿ","H"],"?":["྄","?"],"^":["༹","^"],"&":["྅","&"]}),c(h,"other",{0:"༠",1:"༡",2:"༢",3:"༣",4:"༤",5:"༥",6:"༦",7:"༧",8:"༨",9:"༩"," ":"་","*":"༌","/":"།","//":"༎",";":"༏","|":"༑","!":"༈",":":"༔",_:" ","=":"༴","<":"༺",">":"༻","(":"༼",")":"༽","@":"༄","#":"༅",$:"༆","%":"༇"}),c(h,"special",u([".","+","-","~","^","?","`","]"])),c(h,"superscripts",{r:u(["k","g","ng","j","ny","t","d","n","b","m","ts","dz","k+y","g+y","m+y","b+w","ts+w","g+w"]),l:u(["k","g","ng","c","j","t","d","p","b","h"]),s:u(["k","g","ng","ny","t","d","n","p","b","m","ts","k+y","g+y","p+y","b+y","m+y","k+r","g+r","p+r","b+r","m+r","n+r"])}),c(h,"subscripts",{y:u(["k","kh","g","p","ph","b","m","r+k","r+g","r+m","s+k","s+g","s+p","s+b","s+m"]),r:u(["k","kh","g","t","th","d","n","p","ph","b","m","sh","s","h","dz","s+k","s+g","s+p","s+b","s+m","s+n"]),l:u(["k","g","b","r","s","z"]),w:u(["k","kh","g","c","ny","t","d","ts","tsh","zh","z","r","l","sh","s","h","g+r","d+r","ph+y","r+g","r+ts"])}),c(h,"prefixes",{g:u(["c","ny","t","d","n","ts","zh","z","y","sh","s"]),d:u(["k","g","ng","p","b","m","k+y","g+y","p+y","b+y","m+y","k+r","g+r","p+r","b+r"]),b:u(["k","g","c","t","d","ts","zh","z","sh","s","r","l","k+y","g+y","k+r","g+r","r+l","s+l","r+k","r+g","r+ng","r+j","r+ny","r+t","r+d","r+n","r+ts","r+dz","s+k","s+g","s+ng","s+ny","s+t","s+d","s+n","s+ts","r+k+y","r+g+y","s+k+y","s+g+y","s+k+r","s+g+r","l+d","l+t","k+l","s+r","z+l","s+w"]),m:u(["kh","g","ng","ch","j","ny","th","d","n","tsh","dz","kh+y","g+y","kh+r","g+r"]),"'":u(["kh","g","ch","j","th","d","ph","b","tsh","dz","kh+y","g+y","ph+y","b+y","kh+r","g+r","d+r","ph+r","b+r"])}),c(h,"suffixes",u(["'","g","ng","d","n","b","m","r","l","s","N","T","-n","-t"])),c(h,"suff2",{s:u(["g","ng","b","m"]),d:u(["n","r","l"])}),c(h,"affixedsuff2",u(["ng","m"])),c(h,"ambiguous",{dgs:[1,"dgas"],dngs:[1,"dngas"],"'gs":[1,"'gas"],"'bs":[1,"'bas"],dbs:[1,"dbas"],dms:[1,"dmas"],bgs:[0,"bags"],mngs:[0,"mangs"],mgs:[0,"mags"],gnd:[1,"gnad"]}),c(h,"tib_top",{ཀ:"k",ཁ:"kh",ག:"g",གྷ:"g+h",ང:"ng",ཅ:"c",ཆ:"ch",ཇ:"j",ཉ:"ny",ཊ:"T",ཋ:"Th",ཌ:"D",ཌྷ:"D+h",ཎ:"N",ཏ:"t",ཐ:"th",ད:"d",དྷ:"d+h",ན:"n",པ:"p",ཕ:"ph",བ:"b",བྷ:"b+h",མ:"m",ཙ:"ts",ཚ:"tsh",ཛ:"dz",ཛྷ:"dz+h",ཝ:"w",ཞ:"zh",ཟ:"z",འ:"'",ཡ:"y",ར:"r",ལ:"l",ཤ:"sh",ཥ:"Sh",ས:"s",ཧ:"h",ཨ:"a",ཀྵ:"k+Sh",ཪ:"R"}),c(h,"tib_subjoined",{"ྐ":"k","ྑ":"kh","ྒ":"g","ྒྷ":"g+h","ྔ":"ng","ྕ":"c","ྖ":"ch","ྗ":"j","ྙ":"ny","ྚ":"T","ྛ":"Th","ྜ":"D","ྜྷ":"D+h","ྞ":"N","ྟ":"t","ྠ":"th","ྡ":"d","ྡྷ":"d+h","ྣ":"n","ྤ":"p","ྥ":"ph","ྦ":"b","ྦྷ":"b+h","ྨ":"m","ྩ":"ts","ྪ":"tsh","ྫ":"dz","ྫྷ":"dz+h","ྭ":"w","ྮ":"zh","ྯ":"z","ྰ":"'","ྱ":"y","ྲ":"r","ླ":"l","ྴ":"sh","ྵ":"Sh","ྶ":"s","ྷ":"h","ྸ":"a","ྐྵ":"k+Sh","ྺ":"W","ྻ":"Y","ྼ":"R"}),c(h,"tib_vowel",{"ཱ":"A","ི":"i","ཱི":"I","ུ":"u","ཱུ":"U","ེ":"e","ཻ":"ai","ོ":"o","ཽ":"au","ྀ":"-i"}),c(h,"tib_vowel_long",{i:"I",u:"U","-i":"-I"}),c(h,"tib_final",{"༵":["~X","X"],"༷":["X","X"],"༹":["^","^"],"ཾ":["M","M"],"ཿ":["H","H"],"ྂ":["~M`","M"],"ྃ":["~M","M"],"྄":["?","?"],"྅":["&","&"]}),c(h,"tib_caret",{ph:"f",b:"v"}),c(h,"tib_other",{" ":"_","༄":"@","༅":"#","༆":"$","༇":"%","༈":"!","་":" ","༌":"*","།":"/","༎":"//","༏":";","༑":"|","༔":":","༠":"0","༡":"1","༢":"2","༣":"3","༤":"4","༥":"5","༦":"6","༧":"7","༨":"8","༩":"9","༴":"=","༺":"<","༻":">","༼":"(","༽":")"}),c(h,"tib_stack",u(["b+l","b+r","b+y","c+w","d+r","d+r+w","d+w","g+l","g+r","g+r+w","g+w","g+y","h+r","h+w","k+l","k+r","k+w","k+y","kh+r","kh+w","kh+y","l+b","l+c","l+d","l+g","l+h","l+j","l+k","l+ng","l+p","l+t","l+w","m+r","m+y","n+r","ny+w","p+r","p+y","ph+r","ph+y","ph+y+w","r+b","r+d","r+dz","r+g","r+g+w","r+g+y","r+j","r+k","r+k+y","r+l","r+m","r+m+y","r+n","r+ng","r+ny","r+t","r+ts","r+ts+w","r+w","s+b","s+b+r","s+b+y","s+d","s+g","s+g+r","s+g+y","s+k","s+k+r","s+k+y","s+l","s+m","s+m+r","s+m+y","s+n","s+n+r","s+ng","s+ny","s+p","s+p+r","s+p+y","s+r","s+t","s+ts","s+w","sh+r","sh+w","t+r","t+w","th+r","ts+w","tsh+w","z+l","z+w","zh+w"])),c(h,"initialized",!1)}},r={};function s(t){var e=r[t];if(void 0!==e)return e.exports;var i=r[t]={exports:{}};return n[t](i,i.exports,s),i.exports}s.m=n,s.d=(t,e)=>{for(var n in e)s.o(e,n)&&!s.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},s.f={},s.e=t=>Promise.all(Object.keys(s.f).reduce(((e,n)=>(s.f[n](t,e),e)),[])),s.u=t=>t+".ewts.js",s.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),s.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),t={},e="tibetan-ewts-converter:",s.l=(n,r,i,o)=>{if(t[n])t[n].push(r);else{var a,l;if(void 0!==i)for(var c=document.getElementsByTagName("script"),u=0;u<c.length;u++){var h=c[u];if(h.getAttribute("src")==n||h.getAttribute("data-webpack")==e+i){a=h;break}}a||(l=!0,(a=document.createElement("script")).charset="utf-8",a.timeout=120,s.nc&&a.setAttribute("nonce",s.nc),a.setAttribute("data-webpack",e+i),a.src=n),t[n]=[r];var f=(e,r)=>{a.onerror=a.onload=null,clearTimeout(p);var s=t[n];if(delete t[n],a.parentNode&&a.parentNode.removeChild(a),s&&s.forEach((t=>t(r))),e)return e(r)},p=setTimeout(f.bind(null,void 0,{type:"timeout",target:a}),12e4);a.onerror=f.bind(null,a.onerror),a.onload=f.bind(null,a.onload),l&&document.head.appendChild(a)}},s.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},(()=>{var t;s.g.importScripts&&(t=s.g.location+"");var e=s.g.document;if(!t&&e&&(e.currentScript&&(t=e.currentScript.src),!t)){var n=e.getElementsByTagName("script");n.length&&(t=n[n.length-1].src)}if(!t)throw new Error("Automatic publicPath is not supported in this browser");t=t.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),s.p=t})(),(()=>{var t={179:0};s.f.j=(e,n)=>{var r=s.o(t,e)?t[e]:void 0;if(0!==r)if(r)n.push(r[2]);else{var i=new Promise(((n,s)=>r=t[e]=[n,s]));n.push(r[2]=i);var o=s.p+s.u(e),a=new Error;s.l(o,(n=>{if(s.o(t,e)&&(0!==(r=t[e])&&(t[e]=void 0),r)){var i=n&&("load"===n.type?"missing":n.type),o=n&&n.target&&n.target.src;a.message="Loading chunk "+e+" failed.\n("+i+": "+o+")",a.name="ChunkLoadError",a.type=i,a.request=o,r[1](a)}}),"chunk-"+e,e)}};var e=(e,n)=>{var r,i,[o,a,l]=n,c=0;if(o.some((e=>0!==t[e]))){for(r in a)s.o(a,r)&&(s.m[r]=a[r]);l&&l(s)}for(e&&e(n);c<o.length;c++)i=o[c],s.o(t,i)&&t[i]&&t[i][0](),t[o[c]]=0},n=self.webpackChunktibetan_ewts_converter=self.webpackChunktibetan_ewts_converter||[];n.forEach(e.bind(null,0)),n.push=e.bind(null,n.push.bind(n))})(),(()=>{var t=s(41),e=(s(796),function(t){return document.getElementById(t)}),n=function(t){return t.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#x27;")};function r(){var t=e("id__tib_font"),n=t.options[t.selectedIndex].value,r=(t=e("id__tib_size")).options[t.selectedIndex].value,s=(t=e("id__conversion")).options[t.selectedIndex].value;(t=e("id__tib_out"))&&(t.style.fontFamily=n,t.style.fontSize=r),t=e("id__txt"),"wy2uni"==s?(t.style.fontFamily="Verdana, Tahoma, Helvetica",t.style.fontSize="14px"):(t.style.fontFamily=n,t.style.fontSize=r)}function i(){var r=e("id__conversion"),s="uni2wy"===r.options[r.selectedIndex].value,i=e("id__txt").value,o=e("id__leave_dubious").checked;try{var a=window.ewts=new t.l({leave_dubious:o,pass_through:o});if(s){var l=a.to_ewts(i);e("id__tibetan").style.display="none",e("id__wylie_out").value=l,e("id__wylie").style.display="block"}else{var c=a.to_unicode(i);e("id__wylie").style.display="none",e("id__tib_out").value=c,e("id__tibetan").style.display="block"}var u=a.get_warnings();e("warnings-inner").innerHTML=u.map(n).join("<br>"),e("warnings").style.display=u.length>0?"block":"none"}catch(r){alert("Converter crashed - please try with a recent version of Firefox or Chrome.\n"+r.message)}}e("id__tib_font").addEventListener("change",r),e("id__tib_size").addEventListener("change",r),e("id__conversion").addEventListener("change",r),e("id__txt").addEventListener("keydown",(function(t){13==t.keyCode&&t.ctrlKey&&(i(),t.preventDefault())})),e("id__convert").addEventListener("click",i);var o=window.ewts_tests=function(){try{s.e(730).then(s.bind(s,730)).then((function(t){var r=t.run_tests();e("warnings-inner").innerHTML=r.map(n).join("<br>"),e("warnings").style.display=r.length>0?"block":"none"})).catch((function(t){alert("Failed to load EwtsConverterTests.mjs.\n"+t.message)}))}catch(t){alert("Tests crashed - please try with a recent version of Firefox or Chrome.\n"+t.message)}};e("run-tests").addEventListener("click",o)})()})();