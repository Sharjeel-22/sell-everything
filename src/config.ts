import dotenv from 'dotenv';

dotenv.config();

const config = {
    secretKey: process.env.SECRET_KEY || 'SomeThingReallyTricky1345',
};

export default config;
