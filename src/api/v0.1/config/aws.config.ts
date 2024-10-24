import aws from 'aws-sdk'
import "dotenv/config";
require("aws-sdk/lib/maintenance_mode_message").suppress = true;

const accessKeyId:string | undefined = process.env.AWS_ACCESS_KEY_ID
const secret: string | undefined = process.env.AWS_ACCESS_SECRET
const bucket: string | undefined = process.env.AWS_BUCKET_NAME

if (!bucket || !accessKeyId || !secret) {
    throw new Error('bucket || accessKeyId || secret is undefined');
}


aws.config.update({
    accessKeyId: accessKeyId,
    secretAccessKey: secret
})

export const BUCKET_NAME = bucket;

export const s3Bucket = new aws.S3();