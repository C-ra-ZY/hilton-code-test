const jwtDecoder = require("jwt-decode")
const crypto = require("crypto");

module.exports = {
    jwtObj(authorization) {
        let jwtObj;
        try {
            jwtObj = jwtDecoder(authorization)
        } catch (err) {
            jwtObj = null
        }
        return jwtObj
    },
    saltHashPassword(password) {
        var salt = "123456";
        var hash = crypto.createHmac("sha512", salt); /** Hashing algorithm sha512 */
        hash.update(password);
        var value = hash.digest("hex");
        return {
            salt: salt,
            passwordHash: value,
        };
    }
}