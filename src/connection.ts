import mongoose from "mongoose";

export const connectMongoDB = async (url: string) => {
    return mongoose.connect(url).then(() => {
        console.log(`Mongoose Connected`);
    }).catch(() => console.log(`Unable to Connect Database`));
}