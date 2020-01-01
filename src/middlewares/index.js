exports.apiAuthorization = (req, res, next) => {
    let authorization = req.headers['api-authorization'];
    if (!authorization || authorization !== 'Catapimbas')
        return res.status(403).json({ message: 'Denied access.' });

    next();
}

exports.error = (err, req, res, next) => {
    res.status(500).json({ message: 'Error performing operation!', data: err });
}

exports.verifyJWT = (req, res, next) => {
    let token = req.headers['authorization'];
    if (!token)
        return res.status(401).json({ message: 'No token provided.' });

    let publicKey = fs.readFileSync(basePath + '\\keys\\public.key', 'utf8');
    jwt.verify(token, publicKey, { algorithms: 'RS256' }, (err, decoded) => {
        if (err) {
            if (err.name === 'TokenExpiredError')
                return res.status(401).json({ message: 'Expired token.' });
            else
                return res.status(500).json({ message: 'Failed to authenticate token.' });
        }

        req.userId = decoded.id;
        next();
    });
}