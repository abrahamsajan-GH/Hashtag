import Users from "../models/userModel.js";

export const getUserByUsername = async (req, res) => {
  try {
    const user = await Users.findOne({ username: req.params.username }).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const searchUsers = async (req, res) => {
  const { searchTerm } = req.params;

  try {
    const users = await Users.find(
      { username: { $regex: searchTerm, $options: "i" } },
      { _id: 1, username: 1, profile_image: 1 }
    );
    res.json(users);
  } catch (err) {
    console.error("Error searching users:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const editProfile = async (req, res) => {
  const { id } = req.params;
  const { fullname, gender, bio } = req.body;
  const profile_image = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const user = await Users.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.profile_image = profile_image || user.profile_image;
    user.fullname = fullname || user.fullname;
    user.gender = gender || user.gender;
    user.bio = bio || user.bio;

    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await Users.find({}, { profile_image: 1, username: 1, _id: 1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const followUser = async (req, res) => {
  try {
    const userId = req.user.userId;
    const followId = req.params.id;

    await Users.findByIdAndUpdate(userId, { $addToSet: { following: followId } });

    await Users.findByIdAndUpdate(followId, { $addToSet: { followers: userId } });

    res.status(200).json({ message: 'User followed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error following user', error });
  }
};

export const unfollowUser = async (req, res) => {
  try {
    const userId = req.user.userId;
    const unfollowId = req.params.id;

    await Users.findByIdAndUpdate(userId, { $pull: { following: unfollowId } });

    await Users.findByIdAndUpdate(unfollowId, { $pull: { followers: userId } });

    res.status(200).json({ message: 'User unfollowed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error unfollowing user', error });
  }
};