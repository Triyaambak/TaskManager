require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();
const connectDb = require('./database/connect');
const notFound = require('./middleware/not_found');
const errorHandlerMiddleWare = require('./middleware/error_handler');

//setting up extra security packages
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');

app.set('trust proxy', 1);
app.use(
    rateLimit({
        windowsMs: 15 * 60 * 1000,
        max: 1000,
    })
);
app.use(express.json());
//app.use(helmet());
app.use(cors());
//app.use(xss());

//using the static frontend
app.use(express.static('./public'));

//setting up the routs
const tasks = require('./routes/tasks');
app.use('/api/v1/tasks', tasks);
app.use(notFound);
app.use(errorHandlerMiddleWare);

//setting up and connecting to server
const PORT = process.env.PORT || 5000;

const start = async () => {
    try {
        await connectDb(process.env.MONGO_URI);
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
}

start();