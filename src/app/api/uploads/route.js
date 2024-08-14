

import AWS from 'aws-sdk';
import multer from 'multer';
import { NextResponse } from 'next/server';
import { PassThrough } from 'stream';

// Configure AWS with your credentials and region
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

// Configure multer to store files in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

export async function POST(req) {
    // Use multer to parse the request
    return new Promise((resolve, reject) => {
        upload.single('file')(req, {}, async (err) => {
            if (err) {
                console.error('Error parsing form', err);
                return resolve(
                    NextResponse.json({ error: 'Error parsing form data' }, { status: 500 })
                );
            }

            const file = req.file;
            if (!file) {
                return resolve(
                    NextResponse.json({ error: 'No file provided' }, { status: 400 })
                );
            }

            const s3Params = {
                Bucket: process.env.AWS_S3_BUCKET_NAME,
                Key: file.originalname,
                Body: file.buffer,
                ContentType: file.mimetype,
                ACL: 'public-read',
            };

            try {
                await s3.upload(s3Params).promise();
                return resolve(
                    NextResponse.json({ message: 'Video uploaded successfully' }, { status: 200 })
                );
            } catch (error) {
                console.error('Error uploading video to S3', error);
                return resolve(
                    NextResponse.json({ error: 'Error uploading video' }, { status: 500 })
                );
            }
        });
    });
}

export function GET(request) {
    const user = "apple";
    return NextResponse.json(user);
}
