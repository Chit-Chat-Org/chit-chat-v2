import { BUCKET_NAME, s3Bucket } from "../../config/aws.config";

export async function uploadEmbededModeltoAWS(embeddingStore:string, fileName:string):Promise<{ embededFileLocation: string}> {
  const uploadParams = {
    Bucket: BUCKET_NAME,
    Key: `embedding/embeded-${fileName}`,
    Body: JSON.stringify(embeddingStore),
  };
  return new Promise<{ embededFileLocation: string}>((resolve, reject) => {
    s3Bucket.putObject(uploadParams, (err, data) => {
      if (err) {
        reject(err);
      } else {
        const embededFileLocation = `https://${BUCKET_NAME}.s3.ap-south-1.amazonaws.com/embedding/embeded-${fileName}`;
        resolve({ embededFileLocation: embededFileLocation });
      }
    });
  });
}
