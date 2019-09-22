// Format: { type: [path], }
module.exports = {
    Identifier: ['name'],
    // imports
    ImportDeclaration: ['specifiers'], 
    ImportDefaultSpecifier: ['local'],
    ImportSpecifier: ['imported', 'local'],
    // classes
    ClassDeclaration: ['id', 'body'],
    ClassBody: ['body'],
    ClassProperty: ['static', 'key'],
    ClassMethod: ['static', 'key', 'kind', 'body'],
    // functions
    // variables
    // objects
    ObjectExpression: ['properties'],
    ObjectProperty: ['key'], 
    // string
    StringLiteral: ['value'],
};