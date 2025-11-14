const express = require('express');
const { handleWebhookCallback } = require('../controllers/WebhookController');

const TrelloWebhookCallbackRouter = express.Router();

TrelloWebhookCallbackRouter.head('/', handleWebhookCallback);
TrelloWebhookCallbackRouter.post('/', handleWebhookCallback);

module.exports = TrelloWebhookCallbackRouter;