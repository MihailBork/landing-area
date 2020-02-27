const SimpleCrypto = require("simple-crypto-js").default;
const secretCryptoKey = process.env.SIMPLE_CRYPTO_SECRET;
const simpleCrypto = new SimpleCrypto(secretCryptoKey);

module.exports = {
    encrypt: function (password) {
        return simpleCrypto.encrypt(password);
    },
    decrypt: function (passwordHash) {
        return simpleCrypto.decrypt(passwordHash);
    }
};