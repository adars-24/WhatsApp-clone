import mongoose from 'mongoose';
import dotenv from 'dotenv'

dotenv.config();

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD

const Connection = async () => {
    const URL = `mongodb://${username}:${password}@ac-tgy7oxj-shard-00-00.7lvudvn.mongodb.net:27017,ac-tgy7oxj-shard-00-01.7lvudvn.mongodb.net:27017,ac-tgy7oxj-shard-00-02.7lvudvn.mongodb.net:27017/?ssl=true&replicaSet=atlas-g7ljbq-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0`;
    try {
        await mongoose.connect(URL);
        console.log('Database Connected Succesfully');
    } catch(error) {
        console.log('Error: ', error.message);
    }

};

export default Connection;