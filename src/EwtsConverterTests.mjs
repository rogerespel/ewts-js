/*
  A module with tests for EwtsConverter.mjs.

  Tests have been quickly ported over from the Java version of this code, 

  Copyright (C) 2010-2021 Roger Espel Llima

  This library is Free Software.  You can redistribute it or modify it, under
  the terms of the Apache licence version 2.0.
*/

import { EwtsConverter } from './EwtsConverter.mjs';

let ewts_tests = [
   {
      "warns" : 0,
      "wylie" : "a",
      "uni" : "\u0f68",
      "uni_diff" : 0,
      "wylie_warns" : 0,
      "wylie2" : "a"
   },
   {
      "wylie" : "a ",
      "warns" : 0,
      "uni_diff" : 0,
      "uni" : "\u0f68\u0f0b",
      "wylie_warns" : 0,
      "wylie2" : "a "
   },
   {
      "warns" : 0,
      "wylie" : "a     ",
      "uni_diff" : 0,
      "uni" : "\u0f68\u0f0b",
      "wylie_warns" : 0,
      "wylie2" : "a "
   },
   {
      "wylie_warns" : 0,
      "uni_diff" : 0,
      "uni" : "\u0f60",
      "wylie2" : "'a",
      "wylie" : "'a",
      "warns" : 0
   },
   {
      "warns" : 0,
      "wylie" : "ka",
      "uni_diff" : 0,
      "wylie2" : "ka",
      "wylie_warns" : 0,
      "uni" : "\u0f40"
   },
   {
      "wylie" : "kaba",
      "warns" : 0,
      "uni_diff" : 0,
      "wylie_warns" : 0,
      "wylie2" : "kab",
      "uni" : "\u0f40\u0f56"
   },
   {
      "uni_diff" : 0,
      "wylie2" : "ga",
      "wylie_warns" : 0,
      "uni" : "\u0f42",
      "wylie" : "ga",
      "warns" : 0
   },
   {
      "wylie2" : "g+ha",
      "uni_diff" : 0,
      "wylie_warns" : 0,
      "uni" : "\u0f42\u0fb7",
      "wylie" : "gha",
      "warns" : 2
   },
   {
      "warns" : 0,
      "wylie" : "g+ha",
      "uni_diff" : 0,
      "wylie_warns" : 0,
      "uni" : "\u0f42\u0fb7",
      "wylie2" : "g+ha"
   },
   {
      "warns" : 0,
      "wylie" : "gang",
      "wylie_warns" : 0,
      "uni_diff" : 0,
      "uni" : "\u0f42\u0f44",
      "wylie2" : "gang"
   },
   {
      "wylie" : "ganga",
      "warns" : 0,
      "uni_diff" : 0,
      "uni" : "\u0f42\u0f44",
      "wylie_warns" : 0,
      "wylie2" : "gang"
   },
   {
      "wylie_warns" : 0,
      "uni_diff" : 0,
      "wylie2" : "ca",
      "uni" : "\u0f45",
      "wylie" : "ca",
      "warns" : 0
   },
   {
      "warns" : 0,
      "wylie" : "cha",
      "wylie_warns" : 0,
      "uni_diff" : 0,
      "wylie2" : "cha",
      "uni" : "\u0f46"
   },
   {
      "uni_diff" : 0,
      "uni" : "\u0f4a",
      "wylie_warns" : 0,
      "wylie2" : "Ta",
      "wylie" : "Ta",
      "warns" : 0
   },
   {
      "warns" : 0,
      "wylie" : "nya",
      "uni_diff" : 0,
      "wylie_warns" : 0,
      "uni" : "\u0f49",
      "wylie2" : "nya"
   },
   {
      "wylie" : "n+ya",
      "warns" : 0,
      "uni_diff" : 0,
      "wylie2" : "n+ya",
      "wylie_warns" : 0,
      "uni" : "\u0f53\u0fb1"
   },
   {
      "warns" : 0,
      "wylie" : "-ta",
      "uni" : "\u0f4a",
      "uni_diff" : 0,
      "wylie_warns" : 0,
      "wylie2" : "Ta"
   },
   {
      "uni_diff" : 0,
      "uni" : "\u0f4b",
      "wylie_warns" : 0,
      "wylie2" : "Tha",
      "wylie" : "-tha",
      "warns" : 0
   },
   {
      "warns" : 0,
      "wylie" : "Tha",
      "uni_diff" : 0,
      "uni" : "\u0f4b",
      "wylie_warns" : 0,
      "wylie2" : "Tha"
   },
   {
      "wylie_warns" : 0,
      "uni_diff" : 0,
      "uni" : "\u0f56\u0fb7\u0fb2\u0f71\u0f74\u0f7e",
      "wylie2" : "b+h+rUM",
      "wylie" : "bhrUM",
      "warns" : 2
   },
   {
      "warns" : 0,
      "wylie" : "b+h+rUM",
      "uni_diff" : 0,
      "wylie2" : "b+h+rUM",
      "wylie_warns" : 0,
      "uni" : "\u0f56\u0fb7\u0fb2\u0f71\u0f74\u0f7e"
   },
   {
      "wylie" : "tsa",
      "warns" : 0,
      "uni_diff" : 0,
      "wylie_warns" : 0,
      "wylie2" : "tsa",
      "uni" : "\u0f59"
   },
   {
      "wylie" : "tsha",
      "warns" : 0,
      "uni_diff" : 0,
      "wylie2" : "tsha",
      "wylie_warns" : 0,
      "uni" : "\u0f5a"
   },
   {
      "wylie" : "dza",
      "warns" : 0,
      "wylie2" : "dza",
      "uni_diff" : 0,
      "wylie_warns" : 0,
      "uni" : "\u0f5b"
   },
   {
      "uni_diff" : 0,
      "wylie_warns" : 0,
      "uni" : "\u0f5b\u0fb7",
      "wylie2" : "dz+ha",
      "warns" : 2,
      "wylie" : "dzha"
   },
   {
      "wylie_warns" : 0,
      "uni_diff" : 0,
      "uni" : "\u0f5b\u0fb7",
      "wylie2" : "dz+ha",
      "warns" : 0,
      "wylie" : "dz+ha"
   },
   {
      "uni_diff" : 0,
      "uni" : "\u0f60",
      "wylie_warns" : 0,
      "wylie2" : "'a",
      "wylie" : "'a",
      "warns" : 0
   },
   {
      "wylie" : "\u2019a",
      "warns" : 0,
      "wylie_warns" : 0,
      "uni_diff" : 0,
      "wylie2" : "'a",
      "uni" : "\u0f60"
   },
   {
      "wylie_warns" : 0,
      "uni_diff" : 0,
      "wylie2" : "ya",
      "uni" : "\u0f61",
      "warns" : 0,
      "wylie" : "ya"
   },
   {
      "uni_diff" : 0,
      "uni" : "\u0f62\u0fb1",
      "wylie_warns" : 0,
      "wylie2" : "r+ya",
      "wylie" : "rya",
      "warns" : 2
   },
   {
      "warns" : 2,
      "wylie" : "mrya",
      "uni_diff" : 0,
      "wylie_warns" : 0,
      "uni" : "\u0f58\u0fb2\u0fb1",
      "wylie2" : "m+r+ya"
   },
   {
      "uni_diff" : 0,
      "wylie2" : "sha",
      "wylie_warns" : 0,
      "uni" : "\u0f64",
      "wylie" : "sha",
      "warns" : 0
   },
   {
      "warns" : 0,
      "wylie" : "Sha",
      "uni" : "\u0f65",
      "uni_diff" : 0,
      "wylie_warns" : 0,
      "wylie2" : "Sha"
   },
   {
      "wylie" : "s+ha",
      "warns" : 0,
      "uni_diff" : 0,
      "uni" : "\u0f66\u0fb7",
      "wylie_warns" : 0,
      "wylie2" : "s+ha"
   },
   {
      "warns" : 0,
      "wylie" : "s+wa",
      "uni_diff" : 0,
      "uni" : "\u0f66\u0fad",
      "wylie_warns" : 0,
      "wylie2" : "swa"
   },
   {
      "wylie" : "s+Wa",
      "warns" : 0,
      "wylie_warns" : 0,
      "uni_diff" : 0,
      "uni" : "\u0f66\u0fba",
      "wylie2" : "s+Wa"
   },
   {
      "uni_diff" : 0,
      "wylie2" : "s+ya",
      "wylie_warns" : 0,
      "uni" : "\u0f66\u0fb1",
      "warns" : 0,
      "wylie" : "s+ya"
   },
   {
      "wylie" : "sya",
      "warns" : 2,
      "uni_diff" : 0,
      "wylie_warns" : 0,
      "wylie2" : "s+ya",
      "uni" : "\u0f66\u0fb1"
   },
   {
      "wylie" : "s+Ya",
      "warns" : 0,
      "uni_diff" : 0,
      "wylie2" : "s+Ya",
      "wylie_warns" : 0,
      "uni" : "\u0f66\u0fbb"
   },
   {
      "wylie" : "s+ra",
      "warns" : 0,
      "wylie2" : "sra",
      "uni_diff" : 0,
      "wylie_warns" : 0,
      "uni" : "\u0f66\u0fb2"
   },
   {
      "uni_diff" : 0,
      "wylie_warns" : 0,
      "uni" : "\u0f66\u0fb2",
      "wylie2" : "sra",
      "warns" : 0,
      "wylie" : "sra"
   },
   {
      "wylie_warns" : 0,
      "uni_diff" : 0,
      "uni" : "\u0f66\u0fbc",
      "wylie2" : "s+Ra",
      "warns" : 0,
      "wylie" : "s+Ra"
   },
   {
      "wylie" : "s+a",
      "warns" : 0,
      "uni_diff" : 0,
      "uni" : "\u0f66\u0fb8",
      "wylie_warns" : 0,
      "wylie2" : "s+a"
   },
   {
      "wylie_warns" : 0,
      "uni_diff" : 0,
      "wylie2" : "fa",
      "uni" : "\u0f55\u0f39",
      "wylie" : "fa",
      "warns" : 0
   },
   {
      "warns" : 0,
      "wylie" : "va",
      "wylie_warns" : 0,
      "uni_diff" : 0,
      "wylie2" : "va",
      "uni" : "\u0f56\u0f39"
   },
   {
      "wylie" : "f+ra",
      "warns" : 0,
      "uni_diff" : 1,
      "uni" : "\u0f55\u0f39\u0fb2",
      "wylie_warns" : 0,
      "wylie2" : "phr^a"
   },
   {
      "uni_diff" : 1,
      "wylie_warns" : 0,
      "uni" : "\u0f56\u0f39\u0fb3",
      "wylie2" : "bl^a",
      "warns" : 0,
      "wylie" : "v+la"
   },
   {
      "wylie" : "r+-ta",
      "warns" : 0,
      "uni_diff" : 0,
      "wylie2" : "r+Ta",
      "wylie_warns" : 0,
      "uni" : "\u0f62\u0f9a"
   },
   {
      "warns" : 0,
      "wylie" : "r+Ta",
      "uni" : "\u0f62\u0f9a",
      "uni_diff" : 0,
      "wylie_warns" : 0,
      "wylie2" : "r+Ta"
   },
   {
      "wylie" : "m+Na",
      "warns" : 0,
      "uni_diff" : 0,
      "uni" : "\u0f58\u0f9e",
      "wylie_warns" : 0,
      "wylie2" : "m+Na"
   },
   {
      "warns" : 0,
      "wylie" : "m+'a",
      "uni_diff" : 0,
      "uni" : "\u0f58\u0fb0",
      "wylie_warns" : 0,
      "wylie2" : "m+'a"
   },
   {
      "wylie" : "mA",
      "warns" : 0,
      "wylie_warns" : 0,
      "uni_diff" : 0,
      "uni" : "\u0f58\u0f71",
      "wylie2" : "mA"
   },
   {
      "warns" : 0,
      "wylie" : "e",
      "uni_diff" : 0,
      "wylie2" : "e",
      "wylie_warns" : 0,
      "uni" : "\u0f68\u0f7a"
   },
   {
      "wylie" : "A",
      "warns" : 0,
      "uni_diff" : 0,
      "wylie_warns" : 0,
      "wylie2" : "A",
      "uni" : "\u0f68\u0f71"
   },
   {
      "wylie" : "i",
      "warns" : 0,
      "uni_diff" : 0,
      "wylie2" : "i",
      "wylie_warns" : 0,
      "uni" : "\u0f68\u0f72"
   },
   {
      "wylie" : "I",
      "warns" : 0,
      "wylie2" : "I",
      "uni_diff" : 0,
      "wylie_warns" : 0,
      "uni" : "\u0f68\u0f71\u0f72"
   },
   {
      "warns" : 0,
      "wylie" : "u",
      "uni_diff" : 0,
      "wylie_warns" : 0,
      "uni" : "\u0f68\u0f74",
      "wylie2" : "u"
   },
   {
      "warns" : 0,
      "wylie" : "U",
      "wylie_warns" : 0,
      "uni_diff" : 0,
      "uni" : "\u0f68\u0f71\u0f74",
      "wylie2" : "U"
   },
   {
      "uni_diff" : 0,
      "uni" : "\u0f62\u0f71\u0f74",
      "wylie_warns" : 0,
      "wylie2" : "rU",
      "wylie" : "rU",
      "warns" : 0
   },
   {
      "wylie" : "rai",
      "warns" : 0,
      "wylie_warns" : 0,
      "uni_diff" : 0,
      "wylie2" : "rai",
      "uni" : "\u0f62\u0f7b"
   },
   {
      "wylie_warns" : 0,
      "uni_diff" : 0,
      "wylie2" : "ro",
      "uni" : "\u0f62\u0f7c",
      "warns" : 0,
      "wylie" : "ro"
   },
   {
      "uni_diff" : 0,
      "uni" : "\u0f56\u0fb2\u0f80",
      "wylie_warns" : 0,
      "wylie2" : "br-i",
      "wylie" : "br-i",
      "warns" : 0
   },
   {
      "warns" : 0,
      "wylie" : "kr-i",
      "uni_diff" : 0,
      "wylie_warns" : 0,
      "uni" : "\u0f40\u0fb2\u0f80",
      "wylie2" : "kr-i"
   },
   {
      "uni_diff" : 0,
      "wylie2" : "c+r-i",
      "wylie_warns" : 0,
      "uni" : "\u0f45\u0fb2\u0f80",
      "wylie" : "cr-i",
      "warns" : 0
   },
   {
      "warns" : 0,
      "wylie" : "c+r-i",
      "uni" : "\u0f45\u0fb2\u0f80",
      "uni_diff" : 0,
      "wylie_warns" : 0,
      "wylie2" : "c+r-i"
   },
   {
      "wylie" : "c+l-I",
      "warns" : 0,
      "uni_diff" : 0,
      "uni" : "\u0f45\u0fb3\u0f71\u0f80",
      "wylie_warns" : 0,
      "wylie2" : "c+l-I"
   },
   {
      "warns" : 0,
      "wylie" : "oM",
      "uni_diff" : 0,
      "uni" : "\u0f68\u0f7c\u0f7e",
      "wylie_warns" : 0,
      "wylie2" : "oM"
   },
   {
      "wylie" : "o~M`",
      "warns" : 0,
      "wylie_warns" : 0,
      "uni_diff" : 0,
      "uni" : "\u0f68\u0f7c\u0f82",
      "wylie2" : "o~M`"
   },
   {
      "warns" : 0,
      "wylie" : "o~M",
      "uni_diff" : 0,
      "wylie2" : "o~M",
      "wylie_warns" : 0,
      "uni" : "\u0f68\u0f7c\u0f83"
   },
   {
      "wylie" : "aH",
      "warns" : 0,
      "uni_diff" : 0,
      "wylie_warns" : 0,
      "wylie2" : "aH",
      "uni" : "\u0f68\u0f7f"
   },
   {
      "uni_diff" : 0,
      "wylie2" : "ka?",
      "wylie_warns" : 0,
      "uni" : "\u0f40\u0f84",
      "wylie" : "k?",
      "warns" : 0
   },
   {
      "wylie2" : "aHX",
      "uni_diff" : 0,
      "wylie_warns" : 0,
      "uni" : "\u0f68\u0f7f\u0f37",
      "wylie" : "aHX",
      "warns" : 0
   },
   {
      "uni_diff" : 0,
      "wylie_warns" : 0,
      "uni" : "\u0f68\u0f7f\u0f35",
      "wylie2" : "aH~X",
      "warns" : 0,
      "wylie" : "aH~X"
   },
   {
      "warns" : 0,
      "wylie" : "ph^a",
      "wylie_warns" : 0,
      "uni_diff" : 0,
      "uni" : "\u0f55\u0f39",
      "wylie2" : "fa"
   },
   {
      "wylie" : "0123456789",
      "warns" : 0,
      "uni_diff" : 0,
      "uni" : "\u0f20\u0f21\u0f22\u0f23\u0f24\u0f25\u0f26\u0f27\u0f28\u0f29",
      "wylie_warns" : 0,
      "wylie2" : "0123456789"
   },
   {
      "wylie_warns" : 0,
      "uni_diff" : 0,
      "wylie2" : "gra gro",
      "uni" : "\u0f42\u0fb2\u0f0b\u0f42\u0fb2\u0f7c",
      "wylie" : "gra gro",
      "warns" : 0
   },
   {
      "wylie_warns" : 0,
      "uni_diff" : 0,
      "wylie2" : "gra*gro",
      "uni" : "\u0f42\u0fb2\u0f0c\u0f42\u0fb2\u0f7c",
      "warns" : 0,
      "wylie" : "gra*gro"
   },
   {
      "uni_diff" : 0,
      "uni" : "\u0f42\u0fb2\u0f0d",
      "wylie_warns" : 0,
      "wylie2" : "gra/",
      "wylie" : "gra/",
      "warns" : 0
   },
   {
      "uni_diff" : 0,
      "wylie_warns" : 0,
      "uni" : "\u0f42\u0fb2\u0f0e",
      "wylie2" : "gra//",
      "warns" : 0,
      "wylie" : "gra//"
   },
   {
      "uni_diff" : 0,
      "wylie2" : "gra;",
      "wylie_warns" : 0,
      "uni" : "\u0f42\u0fb2\u0f0f",
      "wylie" : "gra;",
      "warns" : 0
   },
   {
      "uni" : "\u0f42\u0fb2\u0f11",
      "uni_diff" : 0,
      "wylie_warns" : 0,
      "wylie2" : "gra|",
      "warns" : 0,
      "wylie" : "gra|"
   },
   {
      "uni_diff" : 0,
      "uni" : "\u0f42\u0fb2\u0f08",
      "wylie_warns" : 0,
      "wylie2" : "gra!",
      "wylie" : "gra!",
      "warns" : 0
   },
   {
      "uni_diff" : 0,
      "uni" : "\u0f68\u0f7c\u0f7e\u0f14",
      "wylie_warns" : 0,
      "wylie2" : "oM:",
      "warns" : 0,
      "wylie" : "oM:"
   },
   {
      "wylie_warns" : 0,
      "uni_diff" : 0,
      "uni" : "\u0f56 \u0f63",
      "wylie2" : "ba_la",
      "wylie" : "ba_la",
      "warns" : 0
   },
   {
      "warns" : 0,
      "wylie" : "ba=la",
      "uni_diff" : 0,
      "wylie2" : "ba=la",
      "wylie_warns" : 0,
      "uni" : "\u0f56\u0f34\u0f63"
   },
   {
      "uni_diff" : 0,
      "wylie_warns" : 0,
      "wylie2" : "<ba>",
      "uni" : "\u0f3a\u0f56\u0f3b",
      "wylie" : "<ba>",
      "warns" : 0
   },
   {
      "uni_diff" : 0,
      "wylie2" : "(ba)",
      "wylie_warns" : 0,
      "uni" : "\u0f3c\u0f56\u0f3d",
      "wylie" : "(ba)",
      "warns" : 0
   },
   {
      "wylie2" : "gra",
      "uni_diff" : 0,
      "wylie_warns" : 0,
      "uni" : "\u0f42\u0fb2",
      "wylie" : "gra",
      "warns" : 0
   },
   {
      "uni_diff" : 0,
      "wylie_warns" : 0,
      "uni" : "\u0f56\u0f66\u0f92\u0fb2",
      "wylie2" : "bsgra",
      "warns" : 0,
      "wylie" : "bsgra"
   },
   {
      "warns" : 0,
      "wylie" : "u",
      "wylie_warns" : 0,
      "uni_diff" : 0,
      "uni" : "\u0f68\u0f74",
      "wylie2" : "u"
   },
   {
      "uni_diff" : 0,
      "uni" : "\u0f60\u0f74",
      "wylie_warns" : 0,
      "wylie2" : "'u",
      "wylie" : "'u",
      "warns" : 0
   },
   {
      "wylie" : "gu",
      "warns" : 0,
      "wylie_warns" : 0,
      "uni_diff" : 0,
      "wylie2" : "gu",
      "uni" : "\u0f42\u0f74"
   },
   {
      "wylie_warns" : 0,
      "uni_diff" : 0,
      "wylie2" : "gru",
      "uni" : "\u0f42\u0fb2\u0f74",
      "warns" : 0,
      "wylie" : "gru"
   },
   {
      "wylie" : "bsgru",
      "warns" : 0,
      "uni_diff" : 0,
      "uni" : "\u0f56\u0f66\u0f92\u0fb2\u0f74",
      "wylie_warns" : 0,
      "wylie2" : "bsgru"
   },
   {
      "uni_diff" : 0,
      "wylie_warns" : 0,
      "uni" : "\u0f54",
      "wylie2" : "pa",
      "warns" : 0,
      "wylie" : "pa"
   },
   {
      "wylie" : "pa'i",
      "warns" : 0,
      "uni_diff" : 0,
      "wylie2" : "pa'i",
      "wylie_warns" : 0,
      "uni" : "\u0f54\u0f60\u0f72"
   },
   {
      "warns" : 0,
      "wylie" : "pa'am",
      "uni" : "\u0f54\u0f60\u0f58",
      "uni_diff" : 0,
      "wylie_warns" : 0,
      "wylie2" : "pa'am"
   },
   {
      "uni_diff" : 0,
      "uni" : "\u0f56\u0fb3\u0f7c",
      "wylie_warns" : 0,
      "wylie2" : "blo",
      "wylie" : "blo",
      "warns" : 0
   },
   {
      "warns" : 0,
      "wylie" : "bla ma",
      "uni_diff" : 0,
      "uni" : "\u0f56\u0fb3\u0f0b\u0f58",
      "wylie_warns" : 0,
      "wylie2" : "bla ma"
   },
   {
      "wylie_warns" : 1,
      "uni_diff" : 0,
      "uni" : "comment",
      "wylie2" : "[comment]",
      "wylie" : "[comment]",
      "warns" : 2
   },
   {
      "warns" : 0,
      "wylie" : "[comment] gra",
      "uni_diff" : 0,
      "wylie2" : "[comment] gra",
      "wylie_warns" : 0,
      "uni" : "comment\u0f0b\u0f42\u0fb2"
   },
   {
      "uni_diff" : 0,
      "wylie_warns" : 0,
      "wylie2" : "[comment \\[with embedded\\[\\]\\] brackets ]bslu",
      "uni" : "comment [with embedded[]] brackets \u0f56\u0f66\u0fb3\u0f74",
      "wylie" : "[comment [with embedded[]] brackets ]bslu",
      "warns" : 0
   },
   {
      "uni_diff" : 0,
      "wylie2" : "[comment with embedded unicode escapes] a",
      "wylie_warns" : 0,
      "uni" : "comment with embedded unicode escapes\u0f0b\u0f68",
      "wylie" : "[comment\\u0020with embedded\\U00000020unicode escapes] a",
      "warns" : 0
   },
   {
      "wylie2" : "a [unfinished \\[comment\\]]",
      "uni_diff" : 0,
      "wylie_warns" : 0,
      "uni" : "\u0f68\u0f0bunfinished [comment]",
      "wylie" : "a [unfinished [comment]",
      "warns" : 2
   },
   {
      "uni_diff" : 0,
      "wylie_warns" : 0,
      "uni" : "\u0f56\u0fb3\u0f0b\u0f58\u0f0b",
      "wylie2" : "bla ma ",
      "warns" : 0,
      "wylie" : "bla   ma   "
   },
   {
      "warns" : 0,
      "wylie" : "\ufeffbla",
      "wylie_warns" : 0,
      "uni_diff" : 0,
      "uni" : "\u0f56\u0fb3",
      "wylie2" : "bla"
   },
   {
      "wylie" : "\\u0020\\U00000020\\u0032\\t\\i\\x\\!",
      "warns" : 2,
      "uni_diff" : 0,
      "uni" : "  2tix!",
      "wylie_warns" : 1,
      "wylie2" : "[  2tix!]"
   },
   {
      "wylie" : "a\\u01x3a",
      "warns" : 2,
      "wylie_warns" : 0,
      "uni_diff" : 0,
      "wylie2" : "aa",
      "uni" : "\u0f68\u0f68"
   },
   {
      "wylie_warns" : 1,
      "uni_diff" : 0,
      "wylie2" : "[xxx]",
      "uni" : "xxx",
      "warns" : 2,
      "wylie" : "xxx"
   },
   {
      "wylie" : "blaxbla",
      "warns" : 2,
      "uni_diff" : 0,
      "uni" : "\u0f56\u0fb3x\u0f56\u0fb3",
      "wylie_warns" : 0,
      "wylie2" : "bla[x]bla"
   },
   {
      "uni_diff" : 0,
      "wylie_warns" : 0,
      "uni" : "\u0f58\u0f7c\u0f37",
      "wylie2" : "moX",
      "warns" : 0,
      "wylie" : "moX"
   },
   {
      "wylie" : "mo . ???",
      "warns" : 2,
      "uni_diff" : 0,
      "wylie2" : "mo [.] [???]",
      "wylie_warns" : 0,
      "uni" : "\u0f58\u0f7c\u0f0b.\u0f0b???"
   },
   {
      "warns" : 0,
      "wylie" : "sgra",
      "uni" : "\u0f66\u0f92\u0fb2",
      "uni_diff" : 0,
      "wylie_warns" : 0,
      "wylie2" : "sgra"
   },
   {
      "uni_diff" : 0,
      "uni" : "\u0f66\u0f92\u0fb2\u0fad",
      "wylie_warns" : 0,
      "wylie2" : "s+g+r+wa",
      "wylie" : "sgrwa",
      "warns" : 1
   },
   {
      "uni_diff" : 0,
      "uni" : "\u0f4f\u0f42\u0fb2",
      "wylie_warns" : 0,
      "wylie2" : "tagra",
      "warns" : 2,
      "wylie" : "tgra"
   },
   {
      "wylie" : "g^ra",
      "warns" : 0,
      "wylie_warns" : 0,
      "uni_diff" : 0,
      "uni" : "\u0f42\u0fb2\u0f39",
      "wylie2" : "gr^a"
   },
   {
      "warns" : 2,
      "wylie" : "g^r^a",
      "uni_diff" : 0,
      "wylie2" : "gr^a",
      "wylie_warns" : 0,
      "uni" : "\u0f42\u0fb2\u0f39"
   },
   {
      "wylie" : "gr^a",
      "warns" : 0,
      "uni_diff" : 0,
      "wylie_warns" : 0,
      "wylie2" : "gr^a",
      "uni" : "\u0f42\u0fb2\u0f39"
   },
   {
      "wylie" : "gra^",
      "warns" : 0,
      "uni_diff" : 0,
      "wylie2" : "gr^a",
      "wylie_warns" : 0,
      "uni" : "\u0f42\u0fb2\u0f39"
   },
   {
      "wylie" : "rgwa",
      "warns" : 0,
      "wylie2" : "rgwa",
      "uni_diff" : 0,
      "wylie_warns" : 0,
      "uni" : "\u0f62\u0f92\u0fad"
   },
   {
      "uni_diff" : 0,
      "wylie_warns" : 0,
      "uni" : "\u0f62\u0fa9\u0fad",
      "wylie2" : "rtswa",
      "warns" : 0,
      "wylie" : "rtswa"
   },
   {
      "wylie_warns" : 0,
      "uni_diff" : 0,
      "uni" : "\u0f62\u0f90",
      "wylie2" : "rka",
      "warns" : 0,
      "wylie" : "rka"
   },
   {
      "wylie" : "rnga",
      "warns" : 0,
      "uni_diff" : 0,
      "uni" : "\u0f62\u0f94",
      "wylie_warns" : 0,
      "wylie2" : "rnga"
   },
   {
      "wylie" : "lnga",
      "warns" : 0,
      "wylie_warns" : 0,
      "uni_diff" : 0,
      "wylie2" : "lnga",
      "uni" : "\u0f63\u0f94"
   },
   {
      "wylie_warns" : 0,
      "uni_diff" : 0,
      "wylie2" : "snga",
      "uni" : "\u0f66\u0f94",
      "warns" : 0,
      "wylie" : "snga"
   },
   {
      "wylie" : "a",
      "warns" : 0,
      "uni_diff" : 0,
      "uni" : "\u0f68",
      "wylie_warns" : 0,
      "wylie2" : "a"
   },
   {
      "warns" : 0,
      "wylie" : "a+a",
      "uni_diff" : 0,
      "wylie_warns" : 0,
      "uni" : "\u0f68\u0fb8",
      "wylie2" : "a+a"
   },
   {
      "uni_diff" : 0,
      "wylie2" : "b+a",
      "wylie_warns" : 0,
      "uni" : "\u0f56\u0fb8",
      "wylie" : "ba+a",
      "warns" : 0
   },
   {
      "uni" : "\u0f56\u0fb8\u0f7a",
      "uni_diff" : 0,
      "wylie_warns" : 0,
      "wylie2" : "b+ae",
      "warns" : 0,
      "wylie" : "b+ae"
   },
   {
      "uni_diff" : 0,
      "uni" : "\u0f68\u0fb1\u0f7c",
      "wylie_warns" : 0,
      "wylie2" : "a+yo",
      "wylie" : "a+yo",
      "warns" : 0
   },
   {
      "warns" : 2,
      "wylie" : "c",
      "uni_diff" : 0,
      "uni" : "\u0f45",
      "wylie_warns" : 0,
      "wylie2" : "ca"
   },
   {
      "wylie" : "gra",
      "warns" : 0,
      "wylie_warns" : 0,
      "uni_diff" : 0,
      "uni" : "\u0f42\u0fb2",
      "wylie2" : "gra"
   },
   {
      "uni_diff" : 0,
      "wylie2" : "grwa",
      "wylie_warns" : 0,
      "uni" : "\u0f42\u0fb2\u0fad",
      "warns" : 0,
      "wylie" : "grwa"
   },
   {
      "wylie" : "grywa",
      "warns" : 2,
      "uni_diff" : 0,
      "wylie_warns" : 0,
      "wylie2" : "gar+y+wa",
      "uni" : "\u0f42\u0f62\u0fb1\u0fad"
   },
   {
      "uni_diff" : 0,
      "wylie2" : "garla",
      "wylie_warns" : 0,
      "uni" : "\u0f42\u0f62\u0fb3",
      "wylie" : "grla",
      "warns" : 2
   },
   {
      "wylie" : "brla",
      "warns" : 0,
      "wylie2" : "brla",
      "uni_diff" : 0,
      "wylie_warns" : 0,
      "uni" : "\u0f56\u0f62\u0fb3"
   },
   {
      "uni_diff" : 0,
      "wylie_warns" : 0,
      "uni" : "\u0f45\u0fb3",
      "wylie2" : "c+la",
      "warns" : 2,
      "wylie" : "cla"
   },
   {
      "warns" : 1,
      "wylie" : "rbya",
      "wylie_warns" : 0,
      "uni_diff" : 0,
      "uni" : "\u0f62\u0fa6\u0fb1",
      "wylie2" : "r+b+ya"
   },
   {
      "wylie" : "g+mra",
      "warns" : 0,
      "uni_diff" : 0,
      "uni" : "\u0f42\u0fa8\u0fb2",
      "wylie_warns" : 0,
      "wylie2" : "g+m+ra"
   },
   {
      "wylie" : "g+m+ra",
      "warns" : 0,
      "wylie_warns" : 0,
      "uni_diff" : 0,
      "wylie2" : "g+m+ra",
      "uni" : "\u0f42\u0fa8\u0fb2"
   },
   {
      "wylie_warns" : 0,
      "uni_diff" : 0,
      "wylie2" : "g+m+r+a",
      "uni" : "\u0f42\u0fa8\u0fb2\u0fb8",
      "warns" : 0,
      "wylie" : "g+m+r+a"
   },
   {
      "wylie" : "g+X",
      "warns" : 2,
      "uni_diff" : 0,
      "uni" : "\u0f42\u0f37",
      "wylie_warns" : 0,
      "wylie2" : "gaX"
   },
   {
      "uni_diff" : 1,
      "wylie_warns" : 1,
      "uni" : "\u0f42\u0f7a\u0fb8",
      "wylie2" : "g+ae",
      "warns" : 2,
      "wylie" : "ge+a"
   },
   {
      "wylie" : "ge+r",
      "warns" : 2,
      "uni_diff" : 1,
      "wylie2" : "gre",
      "wylie_warns" : 1,
      "uni" : "\u0f42\u0f7a\u0fb2"
   },
   {
      "warns" : 0,
      "wylie" : "oM",
      "uni" : "\u0f68\u0f7c\u0f7e",
      "uni_diff" : 0,
      "wylie_warns" : 0,
      "wylie2" : "oM"
   },
   {
      "wylie" : "oMM",
      "warns" : 2,
      "uni_diff" : 0,
      "uni" : "\u0f68\u0f7c\u0f7e",
      "wylie_warns" : 0,
      "wylie2" : "oM"
   },
   {
      "uni_diff" : 0,
      "uni" : "\u0f68\u0f7c\u0f82",
      "wylie_warns" : 0,
      "wylie2" : "o~M`",
      "warns" : 0,
      "wylie" : "o~M`"
   },
   {
      "wylie" : "o~M`M",
      "warns" : 2,
      "wylie_warns" : 0,
      "uni_diff" : 0,
      "uni" : "\u0f68\u0f7c\u0f82",
      "wylie2" : "o~M`"
   },
   {
      "warns" : 0,
      "wylie" : "gyag",
      "uni_diff" : 0,
      "wylie2" : "gyag",
      "wylie_warns" : 0,
      "uni" : "\u0f42\u0fb1\u0f42"
   },
   {
      "uni_diff" : 0,
      "wylie_warns" : 0,
      "wylie2" : "g.yag",
      "uni" : "\u0f42\u0f61\u0f42",
      "wylie" : "g.yag",
      "warns" : 0
   },
   {
      "wylie" : "g....yag",
      "warns" : 2,
      "uni_diff" : 0,
      "wylie2" : "ga[...]yag",
      "wylie_warns" : 0,
      "uni" : "\u0f42...\u0f61\u0f42"
   },
   {
      "wylie2" : "garaglam",
      "uni_diff" : 0,
      "wylie_warns" : 0,
      "uni" : "\u0f42\u0f62\u0f42\u0fb3\u0f58",
      "wylie" : "grglam",
      "warns" : 2
   },
   {
      "warns" : 0,
      "wylie" : "AH",
      "uni_diff" : 0,
      "wylie_warns" : 0,
      "uni" : "\u0f68\u0f71\u0f7f",
      "wylie2" : "AH"
   },
   {
      "wylie_warns" : 0,
      "uni_diff" : 0,
      "uni" : "\u0f56\u0f42\u0fb2\u0f74",
      "wylie2" : "bgru",
      "warns" : 0,
      "wylie" : "bgru"
   },
   {
      "uni_diff" : 0,
      "uni" : "\u0f54\u0f42\u0fb2\u0f74",
      "wylie_warns" : 0,
      "wylie2" : "pagru",
      "wylie" : "pgru",
      "warns" : 2
   },
   {
      "wylie_warns" : 0,
      "uni_diff" : 0,
      "wylie2" : "bza",
      "uni" : "\u0f56\u0f5f",
      "wylie" : "bza",
      "warns" : 0
   },
   {
      "wylie_warns" : 0,
      "uni_diff" : 0,
      "wylie2" : "badza",
      "uni" : "\u0f56\u0f5b",
      "warns" : 2,
      "wylie" : "bdza"
   },
   {
      "uni_diff" : 0,
      "uni" : "\u0f56\u0f5f",
      "wylie_warns" : 0,
      "wylie2" : "bza",
      "wylie" : "bz",
      "warns" : 2
   },
   {
      "uni_diff" : 0,
      "wylie_warns" : 0,
      "uni" : "\u0f68\u0f5f",
      "wylie2" : "aza",
      "warns" : 1,
      "wylie" : "az"
   },
   {
      "uni_diff" : 0,
      "wylie2" : "b.ras",
      "wylie_warns" : 0,
      "uni" : "\u0f56\u0f62\u0f66",
      "wylie" : "bars",
      "warns" : 2
   },
   {
      "warns" : 2,
      "wylie" : "bart",
      "uni" : "\u0f56\u0f62\u0f4f",
      "uni_diff" : 0,
      "wylie_warns" : 0,
      "wylie2" : "b.rata"
   },
   {
      "uni_diff" : 0,
      "uni" : "\u0f42\u0f56\u0f66",
      "wylie_warns" : 0,
      "wylie2" : "gabs",
      "wylie" : "gabs",
      "warns" : 0
   },
   {
      "warns" : 2,
      "wylie" : "gabsp",
      "uni_diff" : 0,
      "uni" : "\u0f42\u0f56\u0f66\u0f54",
      "wylie_warns" : 0,
      "wylie2" : "gabasapa"
   },
   {
      "wylie_warns" : 0,
      "uni_diff" : 0,
      "uni" : "\u0f56",
      "wylie2" : "ba",
      "wylie" : "b",
      "warns" : 2
   },
   {
      "uni_diff" : 0,
      "wylie2" : "dag",
      "wylie_warns" : 0,
      "uni" : "\u0f51\u0f42",
      "warns" : 0,
      "wylie" : "dag"
   },
   {
      "wylie" : "dga",
      "warns" : 2,
      "uni_diff" : 0,
      "wylie_warns" : 0,
      "wylie2" : "dag",
      "uni" : "\u0f51\u0f42"
   },
   {
      "uni_diff" : 0,
      "wylie2" : "dgas",
      "wylie_warns" : 0,
      "uni" : "\u0f51\u0f42\u0f66",
      "wylie" : "dgas",
      "warns" : 0
   },
   {
      "wylie" : "'gas",
      "warns" : 0,
      "wylie2" : "'gas",
      "uni_diff" : 0,
      "wylie_warns" : 0,
      "uni" : "\u0f60\u0f42\u0f66"
   },
   {
      "warns" : 0,
      "wylie" : "dbas",
      "uni_diff" : 0,
      "wylie_warns" : 0,
      "uni" : "\u0f51\u0f56\u0f66",
      "wylie2" : "dbas"
   },
   {
      "warns" : 0,
      "wylie" : "dmas",
      "wylie_warns" : 0,
      "uni_diff" : 0,
      "uni" : "\u0f51\u0f58\u0f66",
      "wylie2" : "dmas"
   },
   {
      "uni_diff" : 0,
      "uni" : "\u0f56\u0f42\u0f66",
      "wylie_warns" : 0,
      "wylie2" : "bags",
      "wylie" : "bags",
      "warns" : 0
   },
   {
      "wylie" : "mangs",
      "warns" : 0,
      "wylie_warns" : 0,
      "uni_diff" : 0,
      "wylie2" : "mangs",
      "uni" : "\u0f58\u0f44\u0f66"
   },
   {
      "wylie" : "‘ga‘ ‘ga‘",
      "warns" : 0,
      "wylie_warns" : 0,
      "uni_diff" : 0,
      "wylie2" : "'ga' 'ga'",
      "uni" : "འགའ་འགའ"
   },
   {
      "warns" : 2,
      "wylie" : "dags",
      "wylie_warns" : 0,
      "uni_diff" : 0,
      "wylie2" : "dgas",
      "uni" : "\u0f51\u0f42\u0f66"
   },
   {
      "wylie" : "'ags",
      "warns" : 2,
      "uni_diff" : 0,
      "uni" : "\u0f60\u0f42\u0f66",
      "wylie_warns" : 0,
      "wylie2" : "'gas"
   },
   {
      "warns" : 2,
      "wylie" : "dabs",
      "uni_diff" : 0,
      "wylie_warns" : 0,
      "uni" : "\u0f51\u0f56\u0f66",
      "wylie2" : "dbas"
   },
   {
      "uni_diff" : 0,
      "wylie2" : "dmas",
      "wylie_warns" : 0,
      "uni" : "\u0f51\u0f58\u0f66",
      "wylie" : "dams",
      "warns" : 2
   },
   {
      "warns" : 2,
      "wylie" : "bgas",
      "uni" : "\u0f56\u0f42\u0f66",
      "uni_diff" : 0,
      "wylie_warns" : 0,
      "wylie2" : "bags"
   },
   {
      "wylie" : "Mi",
      "warns" : 2,
      "uni_diff" : 0,
      "uni" : "M\u0f68\u0f72",
      "wylie_warns" : 0,
      "wylie2" : "[M]i"
   },
   {
      "warns" : 0,
      "wylie" : "bde gshegs chos kyi sku mnga\u2019 sras bcas dang//",
      "uni_diff" : 0,
      "uni" : "\u0f56\u0f51\u0f7a\u0f0b\u0f42\u0f64\u0f7a\u0f42\u0f66\u0f0b\u0f46\u0f7c\u0f66\u0f0b\u0f40\u0fb1\u0f72\u0f0b\u0f66\u0f90\u0f74\u0f0b\u0f58\u0f44\u0f60\u0f0b\u0f66\u0fb2\u0f66\u0f0b\u0f56\u0f45\u0f66\u0f0b\u0f51\u0f44\u0f0e",
      "wylie_warns" : 0,
      "wylie2" : "bde gshegs chos kyi sku mnga' sras bcas dang//"
   },
   {
      "wylie" : "bde gshegs chos kyi sku mnga' sras bcas dang//",
      "warns" : 0,
      "wylie_warns" : 0,
      "uni_diff" : 0,
      "uni" : "\u0f56\u0f51\u0f7a\u0f0b\u0f42\u0f64\u0f7a\u0f42\u0f66\u0f0b\u0f46\u0f7c\u0f66\u0f0b\u0f40\u0fb1\u0f72\u0f0b\u0f66\u0f90\u0f74\u0f0b\u0f58\u0f44\u0f60\u0f0b\u0f66\u0fb2\u0f66\u0f0b\u0f56\u0f45\u0f66\u0f0b\u0f51\u0f44\u0f0e",
      "wylie2" : "bde gshegs chos kyi sku mnga' sras bcas dang//"
   },
   {
      "uni_diff" : 0,
      "wylie2" : "oM ma Ni pad+me hU~M` ",
      "wylie_warns" : 0,
      "uni" : "\u0f68\u0f7c\u0f7e\u0f0b\u0f58\u0f0b\u0f4e\u0f72\u0f0b\u0f54\u0f51\u0fa8\u0f7a\u0f0b\u0f67\u0f71\u0f74\u0f82\u0f0b",
      "warns" : 0,
      "wylie" : "oM ma Ni pad+me hU~M` "
   },
   {
      "uni_diff" : 0,
      "wylie_warns" : 0,
      "wylie2" : "oM aHhU~M` badzra gu ru pad+ma sid+d+hi hU~M`:",
      "uni" : "\u0f68\u0f7c\u0f7e\u0f0b\u0f68\u0f7f\u0f67\u0f71\u0f74\u0f82\u0f0b\u0f56\u0f5b\u0fb2\u0f0b\u0f42\u0f74\u0f0b\u0f62\u0f74\u0f0b\u0f54\u0f51\u0fa8\u0f0b\u0f66\u0f72\u0f51\u0fa1\u0fb7\u0f72\u0f0b\u0f67\u0f71\u0f74\u0f82\u0f14",
      "wylie" : "oM aHhU~M` badzra gu ru pad+ma sid+dhi hU~M`:",
      "warns" : 2
   },
   {
      "uni_diff" : 0,
      "wylie_warns" : 0,
      "wylie2" : "oM aHhU~M` badz+ra gu ru pad+ma sid+d+hi hU~M`:",
      "uni" : "\u0f68\u0f7c\u0f7e\u0f0b\u0f68\u0f7f\u0f67\u0f71\u0f74\u0f82\u0f0b\u0f56\u0f5b\u0fb2\u0f0b\u0f42\u0f74\u0f0b\u0f62\u0f74\u0f0b\u0f54\u0f51\u0fa8\u0f0b\u0f66\u0f72\u0f51\u0fa1\u0fb7\u0f72\u0f0b\u0f67\u0f71\u0f74\u0f82\u0f14",
      "wylie" : "oM aHhU~M` badz+ra gu ru pad+ma sid+d+hi hU~M`:",
      "warns" : 0
   },
   {
      "wylie" : "bla \\u0f20\\u0fc2",
      "warns" : 0,
      "uni_diff" : 0,
      "wylie2" : "bla 0\\u0fc2",
      "wylie_warns" : 0,
      "uni" : "\u0f56\u0fb3\u0f0b\u0f20\u0fc2"
   },
   {
      "wylie2" : "bla \\u0f73",
      "uni_diff" : 1,
      "wylie_warns" : 1,
      "uni" : "\u0f56\u0fb3\u0f0b\u0f73",
      "wylie" : "bla \\u0f73",
      "warns" : 0
   },
   {
      "warns" : 0,
      "wylie" : "bla \\u0f04",
      "uni_diff" : 0,
      "wylie_warns" : 0,
      "uni" : "\u0f56\u0fb3\u0f0b\u0f04",
      "wylie2" : "bla @"
   },
   {
      "warns" : 0,
      "wylie" : "bla \\u0f09",
      "wylie_warns" : 0,
      "uni_diff" : 0,
      "uni" : "\u0f56\u0fb3\u0f0b\u0f09",
      "wylie2" : "bla \\u0f09"
   },
   {
      "wylie" : "bla\\u0f0bblu",
      "warns" : 0,
      "uni_diff" : 0,
      "uni" : "\u0f56\u0fb3\u0f0b\u0f56\u0fb3\u0f74",
      "wylie_warns" : 0,
      "wylie2" : "bla blu"
   },
   {
      "wylie_warns" : 0,
      "uni_diff" : 0,
      "wylie2" : "bla*blu",
      "uni" : "\u0f56\u0fb3\u0f0c\u0f56\u0fb3\u0f74",
      "wylie" : "bla\\u0f0cblu",
      "warns" : 0
   },
   {
      "warns" : 0,
      "wylie" : "bla\\u0f73",
      "wylie_warns" : 0,
      "uni_diff" : 1,
      "wylie2" : "blI",
      "uni" : "\u0f56\u0fb3\u0f73"
   },
   {
      "uni_diff" : 1,
      "uni" : "\u0f56\u0f76",
      "wylie_warns" : 0,
      "wylie2" : "br-i",
      "wylie" : "ba\\u0f76",
      "warns" : 0
   },
   {
      "warns" : 0,
      "wylie" : "ra\\u0f77",
      "uni_diff" : 1,
      "wylie_warns" : 0,
      "uni" : "\u0f62\u0f77",
      "wylie2" : "r+r-I"
   },
   {
      "wylie" : "\\u0f77",
      "warns" : 2,
      "uni_diff" : 1,
      "wylie2" : "\\u0fb2\\u0f71\\u0f80",
      "wylie_warns" : 3,
      "uni" : "\u0f77"
   },
   {
      "warns" : 2,
      "wylie" : "bo+ra",
      "uni" : "\u0f56\u0f7c\u0fb2",
      "uni_diff" : 1,
      "wylie_warns" : 1,
      "wylie2" : "bro"
   },
   {
      "uni_diff" : 1,
      "uni" : "\u0f56\u0f7e\u0fb2",
      "wylie_warns" : 1,
      "wylie2" : "braM",
      "wylie" : "baM\\u0fb2",
      "warns" : 0
   },
   {
      "warns" : 0,
      "wylie" : "baM\\u0f74",
      "uni_diff" : 1,
      "uni" : "\u0f56\u0f7e\u0f74",
      "wylie_warns" : 1,
      "wylie2" : "buM"
   },
   {
      "wylie_warns" : 1,
      "uni_diff" : 1,
      "uni" : "\u0f56\u0f7e\u0f82",
      "wylie2" : "baM~M`",
      "wylie" : "baM\\u0f82",
      "warns" : 0
   },
   {
      "uni_diff" : 0,
      "wylie2" : "a",
      "wylie_warns" : 0,
      "uni" : "\u0f68",
      "warns" : 0,
      "wylie" : "a"
   },
   {
      "wylie" : "e",
      "warns" : 0,
      "uni_diff" : 0,
      "wylie_warns" : 0,
      "wylie2" : "e",
      "uni" : "\u0f68\u0f7a"
   },
   {
      "wylie" : "i",
      "warns" : 0,
      "uni_diff" : 0,
      "wylie2" : "i",
      "wylie_warns" : 0,
      "uni" : "\u0f68\u0f72"
   },
   {
      "wylie" : "I",
      "warns" : 0,
      "wylie2" : "I",
      "uni_diff" : 0,
      "wylie_warns" : 0,
      "uni" : "\u0f68\u0f71\u0f72"
   },
   {
      "uni_diff" : 0,
      "wylie_warns" : 0,
      "uni" : "\u0f68\u0f71\u0f74",
      "wylie2" : "U",
      "warns" : 0,
      "wylie" : "U"
   },
   {
      "wylie_warns" : 0,
      "uni_diff" : 0,
      "uni" : "\u0f55\u0f39\u0f0b\u0f56\u0f0b\u0f56\u0f39\u0f0b\u0f55",
      "wylie2" : "fa ba va pha",
      "warns" : 0,
      "wylie" : "fa ba va pha"
   },
   {
      "wylie" : "rdo+e",
      "warns" : 0,
      "uni_diff" : 0,
      "uni" : "\u0f62\u0fa1\u0f7c\u0f7a",
      "wylie_warns" : 0,
      "wylie2" : "rdo+e"
   },
   {
      "wylie_warns" : 0,
      "uni_diff" : 0,
      "wylie2" : "rde",
      "uni" : "\u0f62\u0fa1\u0f7a",
      "wylie" : "rda+e",
      "warns" : 0
   },
   {
      "warns" : 0,
      "wylie" : "bgra",
      "wylie_warns" : 0,
      "uni_diff" : 0,
      "wylie2" : "bgra",
      "uni" : "\u0f56\u0f42\u0fb2"
   },
   {
      "wylie" : "bgrwa",
      "warns" : 1,
      "uni_diff" : 0,
      "uni" : "\u0f56\u0f42\u0fb2\u0fad",
      "wylie_warns" : 0,
      "wylie2" : "bgrwa"
   },
   {
      "uni_diff" : 0,
      "wylie_warns" : 0,
      "uni" : "\u0f56\u0f42\u0fb2\u0fb1",
      "wylie2" : "bag+r+ya",
      "warns" : 2,
      "wylie" : "bgrya"
   },
   {
      "uni_diff" : 0,
      "wylie2" : "mnad",
      "wylie_warns" : 1,
      "uni" : "\u0f58\u0f53\u0f51",
      "wylie" : "mand",
      "warns" : 0
   },
   {
      "warns" : 0,
      "wylie" : "pand",
      "uni" : "\u0f54\u0f53\u0f51",
      "uni_diff" : 0,
      "wylie_warns" : 0,
      "wylie2" : "pand"
   },
   {
      "wylie" : "mgas",
      "warns" : 2,
      "uni_diff" : 0,
      "uni" : "\u0f58\u0f42\u0f66",
      "wylie_warns" : 0,
      "wylie2" : "mags"
   }
];

function run_tests() {
	let w = new EwtsConverter({ check: true, check_strict: false, fix_spacing: true, pass_through: false });
	let w2 = new EwtsConverter({ check: true, check_strict: true, fix_spacing: true, pass_through: false });
	let outs = [], out = x => { outs.push(x) };

	for (let t of ewts_tests) {
		let s = w.to_unicode(t.wylie), e = w.get_warnings();
		let s2 = w2.to_unicode(t.wylie), e2 = w2.get_warnings();

		// re-encode into wylie
		let rewylie = w.to_ewts(s), e3 = w.get_warnings();

		// and back into unicode
		let reuni = w.to_unicode(rewylie);

		// the two first unicodes must be same
		if (s !== s2) out(`Wylie (${t.wylie}): got different unicode w/ and w/o strict checking.`);

		// expected unicode
		if (s !== t.uni) out(`Wylie (${t.wylie}): wrong unicode, expected (${t.uni}) got (${s})`);

		// expected warnings?
		if (e.length > 0 && e2.length === 0) out(`Wylie (${t.wylie}): Got warnings in easy mode but not in strict!`);

		if (t.warns == 0) {
			if (e.length > 0) out(`Wylie (${t.wylie}): no warnings expected: ${e.join(" - ")}`);
		} else if (t.warns == 1) {
			if (e.length != 0) out(`Wylie (${t.wylie}): no non-strict warnings expected.`);
			if (e2.length == 0) out(`Wylie (${t.wylie}): expected strict warnings.`);
		} else if (t.warns == 2) {
			if (e.length == 0) out(`Wylie (${t.wylie}): expected non-strict warnings.`);
		}

		// expected re-encoded Wylie?
		if (!t.wylie2 === rewylie) out(`Wylie (${t.wylie}): to_wylie expected (${t.wylie2}) got (${rewylie}).`);
		
		// expected warnings in re-encoded wylie?
		if (t.wylie_warns == 0) {
			if (e3.length > 0) out(`Wylie (${t.wylie}): unexpected to_wylie warnings.`);
		} else {
			if (e3.length == 0) out(`Wylie (${t.wylie}): missing expected to_wylie warnings.`);
		}

		// expected re-encoded unicode (unless it's supposed to be different)
		if (t.uni_diff > 0) {
			if (reuni === s) out(`Wylie (${t.wylie}): should not roundtrip to unicode.`);
		} else {
			if (reuni !== s) out(`Wylie (${t.wylie}): should roundtrip to unicode (${s}) => (${reuni})`);
		}
	}

	out(`${ewts_tests.length} tests completed`);
	return outs;
}

export { run_tests }

