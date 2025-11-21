// Glue code to bind TibetanPhonetics-Any to a simple html front-end.  See 'htdocs/phonetics.html'.

import { get_phonetics } from '../TibetanPhonetics-Any.mjs';

const getEl = x => document.getElementById(x);

// submit on control-Enter
getEl('id__txt').addEventListener('keydown', (ev) => {
  if (ev && ev.keyCode == 13 && ev.ctrlKey) {
    ev.preventDefault();
    process();
  }
});

getEl('id__txt').select();
getEl('id__txt').focus();

// do it
function process() {
  const pho_opts = { autosplit: true };
  let type = getEl('id__type').value, lang;

  [ type, lang ] = type.split(/-/);
  const class_opts = { style: type };
  if (lang) class_opts.lang = lang;

  const pho = get_phonetics(class_opts);

  const input = getEl('id__txt').value
  	.trim()
	.replace(/\r\n|\r|\n/g, "\n")

  const out = input === '' ? '' :
	getEl('id-add').checked ? line_by_line(pho, input, pho_opts) :
  	pho.phonetics(input, pho_opts);

  const warns = pho.get_warnings();

  getEl('id__out').value = out;
  getEl('id__outbox').style.display = 'block';

  const warn_box = getEl('id__warnbox');
  const warn_div = getEl('id__warns');

  warn_div.replaceChildren();

  if (warns.length) {
    for (const str of warns) {
      const one = document.createElement('div');
      one.textContent = str;
      warn_div.appendChild(one);
    }
    warn_box.style.display = 'block';

  } else {
    warn_box.style.display = 'none';
  }
}
getEl('id__process').addEventListener('click', process);

// interleave 
function line_by_line(pho, input, pho_opts) {
  const out = [];

  for (let l of input.split(/\n/)) {
    l = l.trim();
    if (l === '') {
      out.push('');

    } else {
      out.push(l);
      const l_out = pho.phonetics(l, { ...pho_opts }).trim();
      if (l_out !== '') out.push(l_out);
    }
  }

  return out.join("\n");
}
