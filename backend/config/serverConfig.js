const dotenv = require('dotenv');

dotenv.config();

const PortNo = process.env.PORT || 3000;

const TrelloAPIToken = process.env.ATLASSIAN_API_TOKEN || '';

const Atlassian_API_Key = process.env.ATLASSIAN_API_KEY || '';

const Atlassian_Secret_Key = process.env.ATLASSIAN_APP_SECRET || '';

const callbackUrl = `${process.env.CALLBACK_URL}/webhook/trello` || 'http://localhost:3000/webhook/trello';

    module.exports = {
        PortNo,
        TrelloAPIToken,
        Atlassian_API_Key,
        Atlassian_Secret_Key,
        callbackUrl
    }