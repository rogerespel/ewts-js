// Glue code to bind EwtsConverter to a simple html front-end.  See 'htdocs/ewts.html'.

import { EwtsConverter } from '../EwtsConverter.mjs';

// helper functions
const getEl = x => document.getElementById(x);

const htmlescape = x => x.replaceAll('&', '&amp;')
	.replaceAll('<', '&lt;')
	.replaceAll('>', '&gt;')
	.replaceAll('"', '&quot;')
	.replaceAll("'", '&#x27;');

// UI code follows
function set_tib_font() {
	let e = getEl('id__tib_font');
	let ft = e.options[e.selectedIndex].value;
	e = getEl('id__tib_size');
	let fs = e.options[e.selectedIndex].value;
	e = getEl('id__conversion');
	let conv = e.options[e.selectedIndex].value;

	e = getEl('id__tib_out');
	if (e) {
		e.style.fontFamily = ft;
		e.style.fontSize = fs;
	}

	e = getEl('id__txt');
	if (conv == 'wy2uni') {
		e.style.fontFamily = "Verdana, Tahoma, Helvetica";
		e.style.fontSize = "14px"
	} else {
		e.style.fontFamily = ft;
		e.style.fontSize = fs;
	}
}

getEl('id__tib_font').addEventListener('change', set_tib_font);
getEl('id__tib_size').addEventListener('change', set_tib_font);
getEl('id__conversion').addEventListener('change', set_tib_font);

getEl('id__txt').addEventListener('keydown', function(ev) {
	// process on control-Enter
	if (ev.keyCode == 13 && ev.ctrlKey) {
		process();
		ev.preventDefault();
	}
});

getEl('id__convert').addEventListener('click', process);

// do it
function process() {
	let e = getEl('id__conversion'), conv = e.options[e.selectedIndex].value;
	let to_ewts = (conv === 'uni2wy');
	let input = getEl('id__txt').value;
	let leave_dubious = getEl('id__leave_dubious').checked;

	try {
		// add the ewts instance to the global window object so we can use it from the dev console
		let ewts = window.ewts = new EwtsConverter({ leave_dubious, pass_through: leave_dubious });

		if (to_ewts) {
			let out = ewts.to_ewts(input);
			getEl('id__tibetan').style.display = 'none';
			getEl('id__wylie_out').value = out;
			getEl('id__wylie').style.display = 'block';

		} else {
			let out = ewts.to_unicode(input);
			getEl('id__wylie').style.display = 'none';
			getEl('id__tib_out').value = out;
			getEl('id__tibetan').style.display = 'block';
		}

		let warns = ewts.get_warnings();
		getEl('warnings-inner').innerHTML = warns.map(htmlescape).join("<br>");
		getEl('warnings').style.display = warns.length > 0 ? 'block' : 'none';

	// catch exceptions when running on old or incompatible browsers
	} catch (e) {
		alert("Converter crashed - please try with a recent version of Firefox, Chrome, Safari or Edge.\n" + e.message);
	}
}
