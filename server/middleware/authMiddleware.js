import JWT from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const authHeader = req?.headers?.authorization;

  if (!authHeader || !authHeader?.startsWith("Bearer")) {
    return res.status(401).json({ message: "Authentication Failed: No token provided" });
  }

  const token = authHeader?.split(" ")[1];

  try {
    const userToken = JWT.verify(token, process.env.JWT_KEY);

    req.user = {
      userId: userToken.userId,
    };

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Authentication Failed: Invalid token" });
  }
};

export default userAuth;
