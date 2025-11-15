const express = require('express');
const { handleWebhookCallback, handleWebhookEvent } = require('../controllers/WebhookController');

const TrelloWebhookCallbackRouter = express.Router();

TrelloWebhookCallbackRouter.head('/', handleWebhookCallback);
TrelloWebhookCallbackRouter.post('/', handleWebhookEvent);

module.exports = TrelloWebhookCallbackRouter;