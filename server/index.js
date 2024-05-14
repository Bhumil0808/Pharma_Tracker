import express from 'express';
import dotenv from 'dotenv';
import db from './Database/db.js';
import router from './api/api.js';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/api', router);

const URL = 'https://mongodb://localhost:27017/PharmacyDatabase';

db(URL)
    .then(() => {
        app.listen(5000, () => {
            console.log('Server is up and running on port 5000');
        });
    })
    .catch((err) => {
        console.error('Failed to connect to the database:', err);
    });
