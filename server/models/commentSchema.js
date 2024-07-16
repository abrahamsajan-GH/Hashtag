import mongoose, { Schema } from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "Users" },
    postId: { type: Schema.Types.ObjectId, ref: "Posts" },
    comment: { type: String, required: true },
    from: { type: String, required: true },
    likes: [{ type: String }],
    replies: [
      {
        rId: { type: Schema.Types.ObjectId, ref: "Users" },
        userId: { type: Schema.Types.ObjectId, ref: "Users" },
        from: { type: String, required: true },
        replyAt: { type: String },
        reply: { type: String },
        repliedAt: { type: Date, default: Date.now() },
        updatedAt: { type: Date, default: Date.now() },
        likes: [{ type: String }],
      },
    ],
  },
  { timestamps: true }
);

const Comments = mongoose.model("Comments", commentSchema);

export default Comments;