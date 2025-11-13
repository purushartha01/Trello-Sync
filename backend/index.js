const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const { PortNo } = require('./config/serverConfig');
const errorHandler = require('./middleware/errorHandler');
const BoardRoutes = require('./routes/BoardRoutes');


const app = express();


app.use(morgan('dev'));
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/v1/api", BoardRoutes);
app.use(errorHandler);


app.listen(PortNo, () => {
    console.log(`Server is running on port ${PortNo}`);
});