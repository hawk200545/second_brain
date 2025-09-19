import dotenv from "dotenv";

import path from "path";

const envPath = path.resolve(process.cwd(), ".env"); 

dotenv.config({ path: envPath });


const mongo_url = process.env.MONGO_URL;
const b_port = process.env.PORT;
const FRONTEND_URL = process.env.FRONTEND_URL;
const JWT_USER_SECRET = process.env.JWT_USER_SECRET;
const CLOUDINARY_NAME= process.env.CLOUDINARY_NAME;
const CLOUDINARY_API_KEY= process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

export { mongo_url, b_port, JWT_USER_SECRET, CLOUDINARY_API_KEY, CLOUDINARY_NAME, CLOUDINARY_API_SECRET, FRONTEND_URL };