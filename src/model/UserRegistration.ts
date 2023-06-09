import mongoose, { Schema, Document } from "mongoose";

export interface User extends Document {
    id?: string;
    firstName: string;
    lastName: string;
    imageURL: string;
    email: string;
    password: string;
    role: "user";
    token: string;
    status: "ACTIVE" | "INACTIVE" | "DELETED";
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new Schema<User>(
    {
        id: {
            type: Schema.Types.ObjectId,
        },
        imageURL: String,
        firstName: String,
        lastName: String,
        email: String,
        password: String,
        role: String,
        token: String,
        status: {
            type: String,
            enum: ["ACTIVE", "INACTIVE", "DELETED"],
            default: "ACTIVE",
        },
    },
    {
        timestamps: true,
    }
);

const UserRegistrationModel = mongoose.model<User>("User Registration", UserSchema);
export default UserRegistrationModel;