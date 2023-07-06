const { v4: uuidv4 } = require('uuid');
const { createHmac } = require('node:crypto');

exports.buildHasedPassword = (password, userSalt) => {
    const salt = userSalt || uuidv4();
    const hashedPassword = createHmac(process.env.HASH_ALGO, salt).update(password).digest(process.env.HASH_DIGEST);
    return {
        hashedPassword,
        salt
    }
}