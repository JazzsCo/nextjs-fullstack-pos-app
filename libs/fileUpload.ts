import multer from "multer";
import multerS3 from "multer-s3";
import QRCode from "qrcode";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

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

export const generateLinkForQRCode = (locationId: number, tableId: number) => {
  return `http://localhost:3000/order?locationId=${locationId}&tableId=${tableId}`;
};

export const qrCodeImageUpload = async (
  locationId: number,
  tableId: number
) => {
  try {
    const qrImageData = await QRCode.toDataURL(
      generateLinkForQRCode(locationId, tableId)
    );
    const input = {
      Bucket: "msquarefdc",
      Key: `happy-pos/qrcode/jzzz/locationId-${locationId}-tableId-${tableId}.png`,
      ACL: "public-read",
      Body: Buffer.from(
        qrImageData.replace(/^data:image\/\w+;base64,/, ""),
        "base64"
      ),
    };
    const command = new PutObjectCommand(input);
    await s3Config.send(command);
  } catch (err) {
    console.error(err);
  }
};

export const getQrCodeUrl = (locationId: number, tableId: number) => {
  return `https://msquarefdc.sgp1.cdn.digitaloceanspaces.com/happy-pos/qrcode/jzzz/locationId-${locationId}-tableId-${tableId}.png`;
};
