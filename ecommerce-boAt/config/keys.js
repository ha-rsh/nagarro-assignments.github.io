require('dotenv').config()

dbPassword = process.env.MONGOURI

module.exports = {
    mongoURI: dbPassword
};
