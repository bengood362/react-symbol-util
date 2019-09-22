const R = require('ramda');
const babelParser = require('@babel/parser');
const fs = require('fs');
const traverseTree = require("./traverseTree");

const targetFile = 'my-app/src/App.js';

const fileContent = fs.readFileSync(targetFile, 'utf-8');
const fileContentJson = babelParser.parse(fileContent, { sourceType: 'module', plugins: ['jsx', 'classProperties'] });
const fileContentJsonString = JSON.stringify(fileContentJson, null, 4);
fs.writeFileSync('App.js.json', fileContentJsonString);

const programBody = fileContentJson.program.body;

// BabelTypes: https://babeljs.io/docs/en/babel-types
// intefface CodeCoordinate: { line: number, col: number }
// interface Selectable: { start: number, end: number }
// interface Loc: { start: CodeCoordinate, end: CodeCoordinate, identifierName?: string }
// interface CodePiece: { type: BabelTypes, ...Selectable, loc: Loc }
// ProgramBody: { ...CodePiece, specifiers: [Specifier], Source }
// Source: { type, start, end, Loc, extra: { rawValue, raw }, value }
// Specifier: { type: BabelTypes, ...Selectable, loc: Loc, local?: Local }