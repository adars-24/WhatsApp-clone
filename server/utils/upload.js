import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
import dotenv from 'dotenv';

dotenv.config();

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const storage = new GridFsStorage({
    url:  `mongodb://${username}:${password}@ac-tgy7oxj-shard-00-00.7lvudvn.mongodb.net:27017,ac-tgy7oxj-shard-00-01.7lvudvn.mongodb.net:27017,ac-tgy7oxj-shard-00-02.7lvudvn.mongodb.net:27017/?ssl=true&replicaSet=atlas-g7ljbq-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0`,
    useNewUrlParser: true, // Moved from options to top level
    file: (request, file) => {
        const match = ["image/png", "image/jpg"];

        if (match.indexOf(file.mimetype) === -1) {
            return `${Date.now()}-file-${file.originalname}`;
        } else {
            return {
                bucketName: "photos",
                filename: `${Date.now()}-file-${file.originalname}`
            };
        }
    }
});

export default multer({ storage });
