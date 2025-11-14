const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const http = require('http');

const { PortNo } = require('./config/serverConfig');
const errorHandler = require('./middleware/errorHandler');
const BoardRoutes = require('./routes/BoardRoutes');
const { initSocket } = require('./socket/index');
const trelloWebhookCallbackRouter = require('./routes/TrelloWebhookCallback');
const webhooksRouter = require('./routes/WebhookRoutes');

const app = express();

const server = http.createServer(app);
initSocket(server);

app.use(morgan('dev'));
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/webhook/trello",express.raw({type: 'application/json'}) ,trelloWebhookCallbackRouter);
app.use("/v1/api/webhooks", webhooksRouter);
app.use("/v1/api", BoardRoutes);
app.use(errorHandler);




server.listen(PortNo, () => {
    console.log(`Server is running on port ${PortNo}`);
});
