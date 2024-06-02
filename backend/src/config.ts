import * as  dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
export const MONGODB_URI: string = process.env.MONGODB_URI as string
export const SECRET_KEY: string = process.env.SECRET_KEY as string