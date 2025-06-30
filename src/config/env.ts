import { z } from "zod";

const envSchema = z.object({
  VITE_FIREBASE_API_KEY: z.string().min(1),
  VITE_FIREBASE_AUTH_DOMAIN: z.string().min(1),
  VITE_FIREBASE_PROJECT_ID: z.string().min(1),
  VITE_FIREBASE_STORAGE_BUCKET: z.string().min(1),
  VITE_FIREBASE_MESSAGING_SENDER_ID: z.string().min(1),
  VITE_FIREBASE_APP_ID: z.string().min(1),
  VITE_WHATSAPP_PHONE: z
    .preprocess((val) => Number(val), z.number())
    .default(54999999999),
  VITE_EMAIL: z.string().default("test@gmail.com"),
  VITE_INSTAGRAM_NAME: z.string().default("test"),
  VITE_INSTAGRAM_URL: z.string().default("https://www.instagram.com/test/"),
  VITE_EXCHANGE_RATE_API_URL: z.string().min(1),
});

const cleanEnv = Object.fromEntries(
  Object.entries(import.meta.env).filter(
    ([_, value]) => value !== undefined && value !== ""
  )
);

export const env = envSchema.parse(cleanEnv);
