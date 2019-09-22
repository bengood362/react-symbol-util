const babelParser = require('@babel/parser')

const targetFile = 'my-app/src/App.js'

const fileContent = fs.readFileSync(targetFile, 'utf-8')
const fileContentJson = babelParser.parse(fileContent, { sourceType: 'module', plugins: ['jsx'] })
const programBody = fileContentJson.program.body;

// body: [{ },]
// ProgramBody: type, start, end, Loc, Specifiers, Source
// Loc: { start: { line, col }, end: { line, col } }
