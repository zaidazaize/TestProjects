const encrypt = require('./encrypt')
const crypto = require('crypto')
const fs = require('fs')
const { send } = require('process')

const hash = crypto.createHash('sha256')
const data = {
    firstname: "zaid",
    lastname : "aziz"
}

const myDataString = JSON.stringify(data)

console.log(myDataString)
hash.update(myDataString)

const hasheddata = hash.digest('hex');
console.log(hasheddata)

const senderPrivateKey = fs.readFileSync(__dirname+'/id_rsa_priv.pem')
const signedData = encrypt.encryptWithPrivateKey(senderPrivateKey,hasheddata)
