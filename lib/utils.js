var crypto = require('crypto');

function randomValueHex (len) {
    return crypto.randomBytes(Math.ceil(len/2))
        .toString('hex') // convert to hexadecimal format
        .slice(0,len).toUpperCase();   // return required number of characters
}

function generateCode(req) {
    return randomValueHex(4) + Buffer.from(req.headers['x-forwarded-for'] || req.socket.remoteAddress + Date.now()).toString('base64') + randomValueHex(3)
}

export { generateCode }