const jwt = require('jsonwebtoken');
const fs = require('fs');
const  path = require('path')

const basePath = __dirname.substr(0, __dirname.lastIndexOf(path.sep));

module.exports = {
    signUser(user){
        return this.sign({ id: user._id, name: user.name, email: user.email, roles: user.roles })
    },
    sign(paramsToken) {
        let privateKey = fs.readFileSync(`${basePath}${path.sep}keys${path.sep}private.key`, 'utf8');
        return jwt.sign({ ...paramsToken }, privateKey, {
            expiresIn: 300,
            algorithm: 'RS256'
        });
    }
}