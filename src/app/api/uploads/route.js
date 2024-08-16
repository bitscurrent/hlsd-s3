// import AWS from 'aws-sdk';
// import fs from 'fs/promises';


// const bucketname=process.env.AWS_S3_BUCKET_NAME
// const s3 = new AWS.S3({
//   region: AWS_REGION,
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   },
// });

// const uploadFile = async (fileName, bucketName) => {
//   try {
//     const fileContent = await fs.readFile(fileName);

//     const params = {
//       Bucket: bucketName,
//       Key: fileName, // The name of the file in S3 will be the same as the file's name locally
//       Body: fileContent,
//     };

//     const data = await s3.upload(params).promise();
//     console.log(`File uploaded successfully. ${data.Location}`);
//   } catch (err) {
//     console.error('Error uploading file:', err);
//   }
// };

// // Usage
// uploadFile('./images.png', bucketname); 

// export function GET(request) {
//     const user = "apple";
//     return NextResponse.json(user);
// }


// import AWS from 'aws-sdk';
// import fs from 'fs/promises';

// const bucketname=process.env.AWS_S3_BUCKET_NAME


// const s3 = new AWS.S3({
//   region: process.env.AWS_REGION,
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   },
// });

// const uploadFile = async (fileName, bucketName) => {
//   try {
//     const fileContent = await fs.readFile(fileName);

//     const params = {
//       Bucket: bucketName,
//       Key: `videos/${fileName}`, // Store the file in a "videos" folder in S3
//       Body: fileContent,
//       ContentType: 'video/mp4', // Specify the content type for videos
//     };

//     const data = await s3.upload(params).promise();
//     console.log(`Video uploaded successfully. ${data.Location}`);
//   } catch (err) {
//     console.error('Error uploading video:', err);
//   }
// };

// // Usage
// uploadFile("./videoplayback.mp4", bucketname); 

// export function GET(request) {
//     const user = "apple";
//     return NextResponse.json(user);
// }





import AWS from 'aws-sdk';
import { NextResponse } from 'next/server';
import { Readable } from 'stream';

AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const s3 = new AWS.S3();

// Helper function to upload file to S3
const uploadFileToS3 = async (fileBuffer, fileName) => {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: `videos/${fileName}`, // Store the file in a "videos" folder in S3
    Body: fileBuffer,
    ContentType: 'video/mp4', // Specify the content type for videos
  };

  return s3.upload(params).promise();
};

// API route handler for POST requests
export async function POST(req) {
  try {
    // Parse the form data
    const formData = await req.formData();
    
    // Retrieve the file
    const file = formData.get('file');
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }
    
    // Extract file details
    const fileName = file.name;
    const fileBuffer = Buffer.from(await file.arrayBuffer());

    // Upload file to S3
    const result = await uploadFileToS3(fileBuffer, fileName);
    
    return NextResponse.json({ message: 'File uploaded successfully', location: result.Location }, { status: 200 });
  } catch (error) {
    console.error('Error uploading file to S3:', error);
    return NextResponse.json({ error: 'Error uploading file to S3' }, { status: 500 });
  }
}
