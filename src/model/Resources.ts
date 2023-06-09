import mongoose, { Schema, Document } from "mongoose";
import {User} from "./UserRegistration";

interface Resource extends Document {
    id?: string;
    imageURL: string;
    title: string;
    description: string;
    userId: string;
    comments: [{
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        comment: { type: String },
        status: "ACTIVE" | "INACTIVE" | "DELETED";
        id: {
            type: Schema.Types.ObjectId,
        },
    }]
    status: "ACTIVE" | "INACTIVE" | "DELETED";
    createdAt: Date;
    updatedAt: Date;
}

const ResourcesSchema = new Schema<Resource>(
    {
        id: {
            type: Schema.Types.ObjectId,
        },
        imageURL: String,
        userId: String,
        title: String,
        description: String,
        comments: [
            {
                userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
                comment: { type: String },
                userName:{type:String, ref: 'User'},
                userImageURL: {type:String, ref: 'User'},
                status: {
                    type: String,
                    enum: ["ACTIVE", "INACTIVE", "DELETED"],
                    default: "ACTIVE",
                },
            },
        ],
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

const ResourcesModel = mongoose.model<Resource>("Resource", ResourcesSchema);
export default ResourcesModel;