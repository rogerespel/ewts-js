/*
  Loader module for any style of Tibetan phonetics.
  Copyright (C) 2008-2025 Roger Espel Llima

  This library is Free Software.  You can redistribute it or modify it, under
  the terms of the Apache licence version 2.0.
*/

import { TibetanPhonetics }		from './TibetanPhonetics.mjs';
import { TibetanPhoneticsRigpa }	from './TibetanPhonetics-Rigpa.mjs';
import { TibetanPhoneticsLhasey }	from './TibetanPhonetics-Lhasey.mjs';
import { TibetanPhoneticsPadmakara }	from './TibetanPhonetics-Padmakara.mjs';

// get any kind of phonetics
// options are:
// - style: 'thl', 'lotsawahouse', 'rigpa', 'padmakara', 'lhasey'
// - anything else is passed to the respective class
function get_phonetics(opts = {}) {
	const style = opts.style ?? 'thl';
	delete opts.style;

	if (style === 'thl')		return new TibetanPhonetics(opts);
	if (style === 'lotsawahouse')	return new TibetanPhoneticsRigpa({ ...opts, lotsawahouse: true });
	if (style === 'rigpa')		return new TibetanPhoneticsRigpa(opts);
	if (style === 'lhasey')		return new TibetanPhoneticsLhasey(opts);
	if (style === 'padmakara')	return new TibetanPhoneticsPadmakara(opts);

	throw new Error(`Unknown phonetics style: '${style}'.`);
}

export { get_phonetics }

