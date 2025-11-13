const dotenv = require('dotenv');

dotenv.config();

const PortNo = process.env.PORT || 3000;

const TrelloAPIToken = process.env.ATLASSIAN_API_TOKEN || '';

const Atlassian_API_Key = process.env.ATLASSIAN_API_KEY || '';

module.exports = {
    PortNo,
    TrelloAPIToken,
    Atlassian_API_Key
}