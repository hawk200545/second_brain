import dotenv from "dotenv";

import path from "path";

const envPath = path.resolve(process.cwd(), ".env"); 

dotenv.config({ path: envPath });


const mongo_url = process.env.MONGO_URL;
const b_port = process.env.PORT;
const JWT_USER_SECRET = process.env.JWT_USER_SECRET;

export { mongo_url, b_port, JWT_USER_SECRET };