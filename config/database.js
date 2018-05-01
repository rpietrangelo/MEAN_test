const crypto = require('crypto').randomBytes(256).toString('hex');

module.exports = {
    uri: 'mongodb://test:test@ds157639.mlab.com:57639/test12341234',
    secret: crypto,
    db: 'test12341234'
}