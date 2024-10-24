"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RetriveDataAws = void 0;
const aws_config_1 = require("../../config/aws.config");
function RetriveDataAws(source) {
    const params = {
        Bucket: aws_config_1.BUCKET_NAME,
        Key: source
    };
    return new Promise((resolve, reject) => {
        aws_config_1.s3Bucket.getObject(params, (err, data) => {
            var _a, _b;
            if (err) {
                reject('Error retrieving file');
                console.log(err);
            }
            else {
                resolve((_a = data.Body) === null || _a === void 0 ? void 0 : _a.toString('utf8'));
                return (_b = data.Body) === null || _b === void 0 ? void 0 : _b.toString('utf8');
            }
        });
    });
}
exports.RetriveDataAws = RetriveDataAws;
