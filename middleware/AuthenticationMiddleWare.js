const jwt = require('jsonwebtoken')

const authenticationToken = (req, res, next) =>{
    const authHeader = req.headers['authorization']
    const token = authHeader.split(' ')[1]
    if(token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.JWT_SCRETE_KEY, (err, user) =>{
        if(err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

module.exports = authenticationToken