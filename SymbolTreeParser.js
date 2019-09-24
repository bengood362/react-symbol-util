const babelParser = require('@babel/parser');
const fs = require('fs');
const R = require('ramda');

const traverseTree = require('./traverseTree');
const Util = require('./Util');
const exampleJson = require('./appJson.js')

const util = Util(fs, R, traverseTree, 3);
const targetFile = 'my-app/src/App.js';

// create file from target
const fileContent = fs.readFileSync(targetFile, 'utf-8');
const fileContentJson = babelParser.parse(fileContent, { sourceType: 'module', plugins: ['jsx', 'classProperties'] });
util.exportJson('appJson.js', fileContentJson);

// little tool to fetch information from result.json
const root = exampleJson;
const traverseQueue = [root];
const result = {};
while (traverseQueue.length > 0) {
    let node = traverseQueue.shift();
    if (!node || typeof node !== 'object') {
        continue;
    }
    // show this node's information
    const targetInfo = util.scanvageNode(node);
    const type = node.type;
    if (type && targetInfo) {
        result[type] = result[type] ? [...result[type], targetInfo] : [{type: targetInfo}];
    }
    // push children node
    for (let key of Object.keys(node)) {
        const value = node[key];
        if (typeof value === 'object') {
            traverseQueue.push(value);
        }
    }
}

util.exportJson('resultJson.js', result);

// BabelTypes: https://babeljs.io/docs/en/babel-types
// intefface CodeCoordinate: { line: number, col: number }
// interface Selectable: { start: number, end: number }
// interface Loc: { start: CodeCoordinate, end: CodeCoordinate, identifierName?: string }
// interface CodePiece: { type: BabelTypes, ...Selectable, loc: Loc }
// ProgramBody: { ...CodePiece, specifiers: [Specifier], Source }
// Source: { type, start, end, Loc, extra: { rawValue, raw }, value }
// Specifier: { type: BabelTypes, ...Selectable, loc: Loc, local?: Local }