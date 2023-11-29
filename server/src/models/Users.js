import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    savedEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: "events" }],
    secretCode: { type: String },
    role: { type: String, default: "user" }
});

export const UserModel = mongoose.model("users", UserSchema);
