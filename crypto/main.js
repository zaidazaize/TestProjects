const { encryptWithPublicKey, decryptWithPublicKey } = require('./encrypt')
const fs = require('fs')

const publicKey = fs.readFileSync(__dirname +'/id_rsa_pub.pem','utf-8')

const encryptmess = encryptWithPublicKey(publicKey, 'super secret message ffffffffffffffffffffffffffffffffffJFLSKJAF SLFJSAFJ ASDFJSLF AFJA AAAJ MAI so raha thatune uthaya kyu nahi sale mai rone laga hu ;ajfskkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkklkja;kfjas;kdjfaieojaenal;kfjda;ejfoawjefafmklajfdklasjfsajfaljdaskljfslfjlskdjflaskjflfslkflksjflkjsakf;jakkajskljfeojwralkjflkajfjdoajelafkjflajfoidajelkajlkfjaosfjeojlakjfdajfoiajelakasklkgahglkadfkjsklff')
console.log(encryptmess.toString())

const privateKey = fs.readFileSync(__dirname+'/id_rsa_priv.pem','utf-8')

console.log(decryptWithPublicKey(privateKey,encryptmess).toString())