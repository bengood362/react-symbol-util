
function Util(
    fs, 
    R, 
    traverseTree,
    logSeverityTarget,
) {
    return {
        scanvageNode: function(node) {
            const type = node.type;
            const path = traverseTree[type];
            if (type && path) {
                const result = R.path(path, node);
                return (`${type} - ${path} - ${result}`);
            } else if (type) {
                const keys = Object.keys(node);
                
                return (`${type} - {${keys.join(', ')}}`);
            }
        },
        exportJson: function(filename, data) {
            const beautifiedJson = JSON.stringify(data, null, 4);
            fs.writeFileSync(filename, `module.exports = ${beautifiedJson}`);
        },
        log: function(message, { from, logSeverity = 3 } = {}) {
            if (typeof logSeverityTarget === 'number' && logSeverity >= logSeverityTarget) {
                console.log(`${from ? `[${from}]` : ''}${JSON.stringify(message)}`);
            }
        }
    }
}

module.exports = Util;