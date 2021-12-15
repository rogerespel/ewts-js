/* 
	Run the tests for EwtsConverter.mjs.

	Copyright (C) 2010-2021 Roger Espel Llima

	This code is Free Software.  You can redistribute it or modify it, under
	the terms of the Apache licence version 2.0.
*/

// load the test module
import { run_tests } from './EwtsConverterTests.mjs';

try {
	let warns = run_tests();
	for (let str of warns) {
		console.log(str);
	}
} catch (e) {
	console.log("Tests crashed, error message follows:");
	console.log(e.message);
}

