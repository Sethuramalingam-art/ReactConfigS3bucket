Ccreate S# bucket and use it on react

https://awstip.com/setting-up-simple-aws-s3-bucket-in-react-bf7e2c3d7e3e

Create bucket in S3 AWS

S3 function :

"s3:PutObject",
"s3:GetObject",
"s3:ListBucket",
"s3:DeleteObject"

under permissions tab:

bucket policy

{
"Version": "2012-10-17",
"Statement": [
{
"Sid": "BucketPermissions",
"Effect": "Allow",
"Principal": "_",
"Action": [
"s3:PutObject",
"s3:GetObject",
"s3:ListBucket",
"s3:DeleteObject"
],
"Resource": [
"arn:aws:s3:::your_bucket_name",
"arn:aws:s3:::your_bucket_name/_"
]
}
]
}

then set up the CORS policy, copy and paste this to CORS policy:-

[
{
"AllowedHeaders": [
"*"
],
"AllowedMethods": [
"PUT",
"POST",
"DELETE",
"GET"
],
"AllowedOrigins": [
"*"
],
"ExposeHeaders": [
"ETag"
]
}
]

under properties tab:

static website hoisting -> enabled

index document : index.html

create a folders

images folder

=======================================================================

npm install aws-sdk


=======================================================================
final code for upload images to S3 bucket using React

import AWS from "aws-sdk";
import { useState } from "react";

function App() {
// Create state to store file
const [file, setFile] = useState(null);

// Function to upload file to s3
const uploadFile = async () => {
// S3 Bucket Name
const S3_BUCKET = "bucket-name";

    // S3 Region
    const REGION = "region";

    // S3 Credentials
    AWS.config.update({
      accessKeyId: "youraccesskeyhere",
      secretAccessKey: "yoursecretaccesskeyhere",
    });
    const s3 = new AWS.S3({
      params: { Bucket: S3_BUCKET },
      region: REGION,
    });

    // Files Parameters

    const params = {
      Bucket: S3_BUCKET,
      Key: file.name,
      Body: file,
    };

    // Uploading file to s3

    var upload = s3
      .putObject(params)
      .on("httpUploadProgress", (evt) => {
        // File uploading progress
        console.log(
          "Uploading " + parseInt((evt.loaded * 100) / evt.total) + "%"
        );
      })
      .promise();

    await upload.then((err, data) => {
      console.log(err);
      // Fille successfully uploaded
      alert("File uploaded successfully.");
    });

};
// Function to handle file and store it to file state
const handleFileChange = (e) => {
// Uploaded file
const file = e.target.files[0];
// Changing file state
setFile(file);
};
return (
<div className="App">
<div>
<input type="file" onChange={handleFileChange} />
<button onClick={uploadFile}>Upload</button>
</div>
</div>
);
}

export default App;
