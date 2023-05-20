// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from "next";
import { fileUpload } from "@/libs/fileUpload";
import { Request, Response } from "express";

export const config = {
  api: {
    bodyParser: false,
  },
};

type CustomNextApiRequest = NextApiRequest &
  Request & {
    files: any[];
  };

type CustomNextApiResponse = NextApiResponse & Response;

export default async function handler(
  req: CustomNextApiRequest,
  res: CustomNextApiResponse
) {
  try {
    fileUpload(req, res, async (error) => {
      if (error) {
        return res.send(500);
      }
      const files = req.files as Express.MulterS3.File[];
      const file = files[0];
      const assetUrl = file.location;
      res.send({ assetUrl });
    });
  } catch (err) {
    res.send(500);
  }
}
