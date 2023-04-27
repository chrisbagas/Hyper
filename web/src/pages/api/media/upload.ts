import type { NextApiRequest, NextApiResponse } from "next"
import formidable from "formidable"
import fs from "fs"
import { b2Client, reauthenticate } from "../../../server/b2"
import { FileMimeType } from "../../../utils/mime"
import { env } from "../../../env.mjs"

export const config = {
  api: {
    bodyParser: false
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const data: any = await new Promise((resolve, reject) => {
    const form = formidable()
   
    // @ts-ignore
    form.maxFileSize = 8000000;
    // @ts-ignore
    form.uploadDir = "/tmp"
    // @ts-ignore
    form.keepExtensions = false

    form.parse(req, (err, fields, files) => {
      if (err) reject({ err })
      resolve({ err, fields, files })
    })
  })

  const file = fs.readFileSync(data.files.file.filepath)

  await reauthenticate()
  const presignObject = await b2Client.getUploadUrl({
    bucketId: env.BUCKET_ID,
  })

  const newFileName = data.files.file.newFilename;
  const mimetype = data.files.file.mimetype;

  const uploadedFile = await b2Client.uploadFile({
    uploadUrl: presignObject.data.uploadUrl,
    uploadAuthToken: presignObject.data.authorizationToken,
    fileName: `${newFileName}.${FileMimeType[mimetype]}`,
    data: file,
  })

  res.status(201).json({
    url: env.BUCKET_URL + uploadedFile.data.fileName
  })
}
