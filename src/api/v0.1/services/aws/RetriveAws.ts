import { BUCKET_NAME, s3Bucket } from '../../config/aws.config'

export function RetriveDataAws(source: string){
    const params = {
        Bucket: BUCKET_NAME,
        Key: source
    }
    return new Promise ((resolve, reject)=>{
        s3Bucket.getObject(params, (err, data)=>{
            if(err){
                reject('Error retrieving file')
                console.log(err)
            }
            else{
                resolve(data.Body?.toString('utf8'))
                
                return data.Body?.toString('utf8');
            }
        })
    })
}