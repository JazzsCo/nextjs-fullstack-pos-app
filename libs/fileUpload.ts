import { S3Client } from "@aws-sdk/client-s3";
import multer from "multer";
import multerS3 from "multer-s3";

const endpoint = process.env.SPACE_ENDPOINT || "";
const accessKey = process.env.SPACE_ACCESS_KEY_ID || "";
const secretKey = process.env.SPACE_SECRET_ACCESS_KEY || "";

// Set S3 endpoint to DigitalOcean Spaces
const s3Config = new S3Client({
  endpoint: endpoint,
  region: "sgp1",
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretKey,
  },
});

// Change bucket property to your Space name
export const fileUpload = multer({
  storage: multerS3({
    s3: s3Config,
    bucket: "msquarefdc",
    acl: "public-read",
    key: function (request, file, cb) {
      cb(null, `happy-pos/jzzz/${Date.now()}_${file.originalname}`);
    },
  }),
}).array("files", 1);
