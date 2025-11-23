// hack: tibetan-date-calculator is only a dev dependency, to avoid bringing it in for everyone who installs our module

import { TibetanDate, TibetanMonth, TibetanYear } from 'tibetan-date-calculator';

const getEl = x => document.getElementById(x);
const esc = s => (s ?? '').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#39;')

const YEAR_ELEMENTS = [ 'Wood', 'Fire', 'Earth', 'Iron', 'Water' ],
	 YEAR_ANIMALS  = [ 'Mouse', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 'Horse', 'Sheep', 'Monkey', 'Bird', 'Dog', 'Pig' ],
	 YEAR_GENDER = [ 'Male', 'Female' ],
	 SPECIAL_DAYS = {
		'8': "Medicine Buddha & Tara Day",
		'10': "Guru Rinpoche Day",
		'15': "Amitabha Buddha Day; Full Moon",
		'25': "Dakini Day",
		'29': "Dharmapala Day",
		'30': "Shakyamuni Buddha Day; New Moon",
	 },
	 TIB_ORDINALS = [ 'དང་པོ།', 'གཉིས་པ།', 'གསུམ་པ།', 'བཞི་པ།', 'ལྔ་པ།', 'དྲུག་པ།', 'བདུན་པ།', 'བརྒྱད་པ།', 'དགུ་པ།', 'བཅུ་པ།', 'བཅུ་གཅིག་པ།', 'བཅུ་གཉིས་པ།' ],
	 TIB_NUMBERS = '༠༡༢༣༤༥༦༧༨༩'.split(''),
	 TIB_WEEKDAYS = [ 'ཉི།', 'ཟླ།', 'དམར།', 'ལྷག', 'ཕུར།', 'སངས།', 'སྤེན།' ],
	 WEEKDAYS = [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ],
	 MONTHS = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];

// turn a number into tib digits
function tib_number(n) {
	return String(n).split('').map(c => c >= '0' && c <= '9' ? TIB_NUMBERS[+c] : c).join('');
}

// make an english ordinal
function ordinal(n) {
	if (n % 10 === 2 && n % 100 !== 12) return `${n}nd`;
	if (n % 10 === 1 && n % 100 !== 11) return `${n}st`;
	if (n % 10 === 3 && n % 100 !== 13) return `${n}rd`;
	return `${n}th`;
}

// generate a whole year, put it in on the page
function generate(w_year) {
	w_year = +w_year;
	const out_node = getEl('calendar')
	let out = [];
	out_node.replaceChildren();
	if (!(w_year > 0 && w_year < 10000)) return;

	const year = new TibetanYear(w_year, true);
	const title = `Tibetan Year ${year.tibYearNum} – ${year.gender} ${year.element} ${year.animal} Year of the ${ordinal(year.rabjungCycle)} Rabjung Calendrical Cycle (${year.westernYear})`;

	out.push(`<br><h2>${esc(title)}</h2>`);

	for (let month = 1; month <= 12; month++) {
		out = out.concat(generate_month(year, month));
	}

	out_node.innerHTML = out.join('');
}

// generate a whole month
function generate_month(year, month_num, is_leap = false) {
	let out = [];
	const month = new TibetanMonth({ year: year.tibYearNum, month: month_num });

	// recurse for leap months - the leap month goes before the regular one
	if (month.isDoubledMonth && !is_leap) out = out.concat(generate_month(year, month_num, true));

	out.push(`
<br>
<table class="tbl" border="0" cellspacing="1" cellpadding="2">
	<tr><th colspan="6">
		<span class="tibtit">བོད་ཟླ་${TIB_ORDINALS[month_num - 1]}</span> &nbsp;&ndash;&nbsp; ${ordinal(month_num)} Tibetan Month ${month.isDoubledMonth ? '(+)' : ''}
	</th></tr>
`);

	// generate each day, making sure to carry over 'special day' info from missing days to the next
	let special, carry_special;
	for (let day_num = 1; day_num <= 30; day_num++) {
		const day = new TibetanDate({ year: year.tibYearNum, month: month_num, isLeapMonth: is_leap, day: day_num });

		// insert leap days before the main day
		if (day.isDoubledDay) {
			const leap_day = new TibetanDate({ year: year.tibYearNum, month: month_num, isLeapMonth: is_leap, day: day_num, isLeapDay: true });
			[ special, carry_special ] = special_day(day_num, leap_day, carry_special);
			out.push(do_day(leap_day, special));
		}

		[ special, carry_special ] = special_day(day_num, day, carry_special);
		if (!day.isSkippedDay) out.push(do_day(day, special));
	}

	out.push(`</table>`);
	return out;
}

// generate the entry for a day
function do_day(day, special) {

	// XXX tibetan-date-calculator bug: when a doubled day follows a skipped day, only the leap day should be marked as "previousSkipped"
        const prev_skipped = day.isPreviousSkipped && (!day.isDoubledDay || day.isLeapDay);

	return `
<tr>
	<td><span class="tib">&nbsp;${TIB_WEEKDAYS[day.day]}</span></td>
	<td><span class="tib">${tib_number(day.date)}</span></td>
	<td>&nbsp;${day.date} ${prev_skipped ? '*' : ''}${day.isDoubledDay ? '+' : ''}</td>
	<td class="mark">${WEEKDAYS[day.day]}</td>
	<td>${MONTHS[day.westernDate.getMonth()]} ${day.westernDate.getDate()}</td>
	<td class="mark"><i>${esc(special)}&nbsp;</i></td>
</tr>
`;
}

// figure out if a day is special
// - if it is skipped, carry information over so it can be applied to the next day.
// - on dup days, the special one is the 1st (this can vary from source to source, but we apply this convention)
// - returns [ today_special, carry_special_for_tomorrow ]
function special_day(day_num, day, carry_special) {
	let out, today = SPECIAL_DAYS[String(day_num)];
	if (day.month === 1 && day.date === 1) today = 'Losar';

	// if we are carrying on a special feature from yesterday, apply it
	if (carry_special) out = `${carry_special} (carried over)`;

	if (!today) return [ out, null ];
	if (day.isSkippedDay) return [ null, today ];
	if (day.isDoubledDay && !day.isLeapDay) return [ out, null ];

	// carried over special features can overlap with the ones for the day itself
	if (out) {
		out += `; ${today}`;
	} else {
		out = today;
	}

	return [ out, null ];
}

// validate input and generate year calendar
function get_and_generate() {
	const year = +getEl('year-input').value;
	if (year > 0) generate(year);
}

getEl('make-calendar').addEventListener('click', get_and_generate);
getEl('year-input').addEventListener('keypress', (e) => e.key === 'Enter' && get_and_generate());
getEl('year-input').focus()

// rabjung browser

let rabjung_year = new Date().getFullYear();
rabjung_year = rabjung_year - ((rabjung_year + 5) % 12);
do_rabjung(rabjung_year);

function do_rabjung(start_w_year) {
	start_w_year = +start_w_year;
	if (!(start_w_year > 0)) return;	// bail on NaN or such crap
	rabjung_year = start_w_year;
	const rows = [];

	for (let w_year = start_w_year; w_year < start_w_year + 12; w_year++) {
		const tib_year = w_year + 127,
		  animal = YEAR_ANIMALS[ (tib_year + 1) % 12 ],
		  element = YEAR_ELEMENTS[ Math.floor((tib_year - 1) / 2) % 5 ],
		  gender = YEAR_GENDER[ (tib_year + 1) % 2],
		  cycle = Math.ceil((w_year - 1026) / 60);

	rows.push(`
<tr>
<td></td>
<td></td>
<td>${w_year}</td>
<td>${tib_year}</td>
<td>${gender}</td>
<td>${element}</td>
<td>${animal}</td>
<td>${cycle}</td>
<td></td>
<td></td>
</tr>`);
	}

	getEl('rabjung-years').innerHTML = rows.join('');
}

document.querySelector('#rabjung tr.arrows').addEventListener('click', (ev) => {
	const add = +ev.target.dataset.add;
	if (add > 0 || add < 0) do_rabjung(rabjung_year + add);
});

document.querySelector('#rabjung tr.arrows').addEventListener('dblclick', (ev) => { ev.preventDefault() });

