"use server";
import { z } from "zod";
import { createServerAction } from "zsa";
import { randomUUID } from "node:crypto";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
const ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID as string;
const SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY as string;
const ENDPOINT = process.env.R2_S3_ENDPOINT as string;
const S3 = new S3Client({
    region: "auto",
    endpoint: ENDPOINT,
    credentials: {
        accessKeyId: ACCESS_KEY_ID,
        secretAccessKey: SECRET_ACCESS_KEY,
    },
    maxAttempts: 2,
});
export const getPresignedURL = createServerAction()
    .input(z.object({ type: z.string(), size: z.number() }))
    .output(z.object({ preSignedURL: z.string(), imageURL: z.string().url() }))
    .handler(async ({ input }) => {
        const key = randomUUID();
        const bucket = process.env.R2_BUCKET;
        const cmd = new PutObjectCommand({
            Bucket: bucket,
            Key: key,
            ContentLength: input.size,
            ContentType: input.type,
        });
        const preSignedURL = await getSignedUrl(S3, cmd, { expiresIn: 5000 });
        const imageURL = `${process.env.R2_BUCKET_PUBLIC_URL}/${key}`;
        return { preSignedURL, imageURL };
    });
