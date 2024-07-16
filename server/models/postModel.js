import mongoose, { Schema } from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "Users" },
    caption: String,
    file: String,
    url: String,
    likes: [{ type: String }],
    comments: [{type: Schema.Types.ObjectId, ref: "Comments"}]
  },
  {
    timestamps: true,
  }
);

const Posts = mongoose.model("Posts", postSchema);

export default Posts;