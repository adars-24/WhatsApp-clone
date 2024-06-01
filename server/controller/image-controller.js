

import grid from 'gridfs-stream';
import mongoose from 'mongoose';

const url = 'http://localhost:8000';

let gfs, gridFsBucket;

const conn = mongoose.connection;
conn.once('open', () => {
    gridFsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'fs'
    });
    gfs = grid(conn.db, mongoose.mongo);
    gfs.collection('fs');
});

export const uploadFile = async (request, response) => {
    try {
        if (!request.file)
            return response.status(400).json({ error: "No file uploaded" });



        const imageUrl = `${url}/file/${request.file.filename}`;
        response.status(200).json({ imageUrl });
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
};



export const getImage = async (request, response) => {
    try {
        if (!gfs || !gridFsBucket)
            return response.status(500).json({ error: "GridFS not initialized" });

        const file = await gfs.files.findOne({ filename: request.params.filename });
        if (!file)
            return response.status(404).json({ error: "File not found" });


        // console.log(file._id);
        const readStream = gridFsBucket.openDownloadStream(file._id);
        readStream.on('error', (error) => {
            response.status(500).json({ error: error.message });
        });
        readStream.pipe(response);
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
};
