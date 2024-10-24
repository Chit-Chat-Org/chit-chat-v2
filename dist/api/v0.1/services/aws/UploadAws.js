"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadEmbededModeltoAWS = void 0;
const aws_config_1 = require("../../config/aws.config");
async function uploadEmbededModeltoAWS(embeddingStore, fileName) {
    const uploadParams = {
        Bucket: aws_config_1.BUCKET_NAME,
        Key: `embedding/embeded-${fileName}`,
        Body: JSON.stringify(embeddingStore),
    };
    return new Promise((resolve, reject) => {
        aws_config_1.s3Bucket.putObject(uploadParams, (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                const embededFileLocation = `https://${aws_config_1.BUCKET_NAME}.s3.ap-south-1.amazonaws.com/embedding/embeded-${fileName}`;
                resolve({ embededFileLocation: embededFileLocation });
            }
        });
    });
}
exports.uploadEmbededModeltoAWS = uploadEmbededModeltoAWS;
