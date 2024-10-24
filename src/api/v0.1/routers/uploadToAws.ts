import { Router, Response, Request } from "express";
import pdf from "pdf-parse";
import Papa from "papaparse";
import { s3Bucket, BUCKET_NAME } from "../config/aws.config";
import fileUpload from "express-fileupload";
import extractTextFromURL from "../services/urlToText";
const app = Router();

app.post("/", async (req: Request, res: Response) => {
  try {
    // Check if a file was uploaded
    if (req.files && req.files.file) {
      const file = req.files.file as fileUpload.UploadedFile;

      // Process the file based on its mimetype
      if (file.mimetype === "application/pdf") {
        let data = await pdf(file.data);
        let textContent = data.text;

        file.name = file.name.replace(".pdf", ".txt");
        file.data = Buffer.from(textContent, "utf8");
        file.mimetype = "text/plain";
      } else if (file.mimetype === "text/csv") {
        const parsedData = Papa.parse(file.data.toString("utf8"));
        const jsonData = JSON.stringify(parsedData.data, null, 2);

        file.name = file.name.replace(".csv", ".txt");
        file.data = Buffer.from(jsonData, "utf8");
        file.mimetype = "text/plain";
      } else {
        return res.json({
          status: "Failed",
          message: "Unsupported file type",
        });
      }

      s3Bucket.putObject(
        {
          Bucket: BUCKET_NAME,
          Key: "uploads/" + file.name,
          Body: file.data,
          ContentType: file.mimetype,
        },

        async (err: Error, data: any) => {
          if (err) {
            console.log({ err });
            return res.json({
              status: "Failed",
              message: "File upload failed",
              error: err.message,
            });
          } else {
            return res.json({
              status: "Success",
              message: "File uploaded successfully",
              data: {
                tag: data,
                url: `https://${BUCKET_NAME}.s3.ap-south-1.amazonaws.com/uploads/${file.name}`,
              },
            });
          }
        }
      );
    }
  } catch (error) {
    res.json({
      status: "Failed",
      message: "File Upload Failed",
      error: (error as Error).message,
    });
  }
});


app.post('/url',async(req:Request, res:Response)=>{
  try {
    const { resource_url } = req.body;
        console.log(req.body.resource_url)

        const extractedText = await extractTextFromURL(resource_url);

        const fileName = resource_url.replace(/(^\w+:|^)\/\//, '').replace(/\//g, '_') + ".txt";

        s3Bucket.putObject(
            {
              Bucket: BUCKET_NAME,
              Key: "uploads/" + fileName,
              Body: extractedText,
              ContentType: 'text/plain',
            },
    
            async (err: Error, data: any) => {
              if (err) {
                console.log({ err });
                return res.json({
                  status: "Failed",
                  message: "File upload failed",
                  error: err.message,
                });
              } else {
                return res.json({
                  status: "Success",
                  message: "File uploaded successfully",
                  data: {
                    tag: data,
                    url: `https://${BUCKET_NAME}.s3.ap-south-1.amazonaws.com/uploads/${fileName}`,
                  },
                });
              }
            }
          );
  } catch (error) {
    res.json({
      status: "Failed",
      message: "File Upload Failed",
      error: (error as Error).message,
    });
  }
})

export default app;



