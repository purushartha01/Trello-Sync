const dotenv = require('dotenv');

dotenv.config();

const PortNo = process.env.PORT || 3000;

const TrelloAPIToken = process.env.ATLASSIAN_API_TOKEN || '';

module.exports = {
    PortNo,
    TrelloAPIToken
}