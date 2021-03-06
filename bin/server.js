import app from "../app.js";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import TWtime from '../function/TWtime.js';
import scheduleUpdateData from '../function/MongoDB/scheduleUpdateData.js';


dotenv.config();

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;

try {
    const db = await mongoose.connect(process.env.MONGO_URI, { keepAlive: true });
    console.log(`[${TWtime().full}] | successfully connected to MongoDB, Database name: "${db.connections[0].name}"`);
    app.set('port', port);
    var server = app.listen(app.get('port'), err => {
        if (err) throw err;
        console.error(`[${TWtime().full}] | server listening on ${host}:${server.address().port}`);
        scheduleUpdateData();
    });
}
catch (error) {
    console.error(error.message);
};