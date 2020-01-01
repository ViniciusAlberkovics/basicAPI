const jwt = require('jsonwebtoken');
const fs = require('fs');
const basePath = __dirname.substr(0, __dirname.lastIndexOf('\\'));

module.exports = {
    sign(paramsToken) {
        let privateKey = fs.readFileSync(basePath + '\\keys\\private.key', 'utf8');
        return jwt.sign({ ...paramsToken }, privateKey, {
            expiresIn: 300,
            algorithm: 'RS256'
        });
    }
}