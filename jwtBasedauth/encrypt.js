const crypto = require('crypto')

module.exports.encryptWithPublicKey = function encryptWithPublicKey(publicKey, messase) {
    const bufferedMessage = Buffer.from(messase,'utf-8')
    return crypto.publicEncrypt(publicKey,bufferedMessage)
}

module.exports.decryptWithPrivateKey = function decryptWithPublicKey(privateKey, message) {
    return crypto.privateDecrypt(privateKey,message)
}

module.exports.encryptWithPrivateKey = function encryptWithPrivateKey(privateKey, message) {
    const buf = Buffer.from(message,'utf-8')
    return crypto.privateEncrypt(privateKey,buf)
}
module.exports.decryptWithPublicKey = function decryptWithPrivateKey(publicKey, message) {
    return crypto.publicDecrypt(publicKey,message)
}