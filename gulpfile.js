'use strict';

const ts = require('typescript');
const fs = require('fs');
const code = ts.transpile(fs.readFileSync('./gulpfile.ts').toString());
eval(code);