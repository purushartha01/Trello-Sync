const express = require('express');
const { setupWebhooks, listAllWebhooks, deleteAllWebhooks } = require('../controllers/WebhookController');

const webhookRouter = express.Router();


webhookRouter.get("/setup", setupWebhooks);
webhookRouter.delete("/deleteAll", deleteAllWebhooks);
webhookRouter.get("/list", listAllWebhooks);


module.exports = webhookRouter;