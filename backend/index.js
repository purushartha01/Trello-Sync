const express = require('express');


const { PortNo } = require('./config/serverConfig');
const morgan = require('morgan');
const errorHandler = require('./middleware/errorHandler');
const BoardRoutes = require('./routes/BoardRoutes');

const app = express();



app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(BoardRoutes);
app.use(errorHandler);


app.listen(PortNo, () => {
    console.log(`Server is running on port ${PortNo}`);
});