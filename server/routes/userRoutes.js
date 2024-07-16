import express from "express";
import {
  searchUsers,
  getUserByUsername,
  editProfile,
  getAllUsers,
  followUser,
  unfollowUser,
} from "../controllers/userController.js";
import userAuth from "../middleware/authMiddleware.js";
import upload from "../middleware/multer.js";

const router = express.Router();

router.get("/search/:searchTerm", searchUsers);
router.get("/:username",userAuth, getUserByUsername);
router.put('/:id', userAuth, upload.single('profile_image'), editProfile);
router.get("/",userAuth, getAllUsers);
router.post('/follow/:id', userAuth, followUser);
router.post('/unfollow/:id', userAuth, unfollowUser);

export default router;