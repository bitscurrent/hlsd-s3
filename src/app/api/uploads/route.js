import AWS from 'aws-sdk';
import fs from 'fs/promises';


const bucketname=process.env.AWS_S3_BUCKET_NAME
const s3 = new AWS.S3({
  region: AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const uploadFile = async (fileName, bucketName) => {
  try {
    const fileContent = await fs.readFile(fileName);

    const params = {
      Bucket: bucketName,
      Key: fileName, // The name of the file in S3 will be the same as the file's name locally
      Body: fileContent,
    };

    const data = await s3.upload(params).promise();
    console.log(`File uploaded successfully. ${data.Location}`);
  } catch (err) {
    console.error('Error uploading file:', err);
  }
};

// Usage
uploadFile('./images.png', bucketname); 

export function GET(request) {
    const user = "apple";
    return NextResponse.json(user);
}
