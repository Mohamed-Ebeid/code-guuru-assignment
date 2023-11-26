import jwt from "jsonwebtoken";

//JWT
export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
    },

    process.env.JWT_SECRECT,

    {
      expiresIn: "30d",
    },
  );
};

//is the request authorized
export const isAuth = (req, res, next) => {
  // Middleware for authentiction
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length);
    jwt.verify(token, process.env.JWT_SECRECT, (err, decode) => {
      if (err) {
        res.status(401).send({ message: "Something is wrong!" });
      } else {
        req.user = decode;
        next();
      }
    });
  } else {
    res.status(401).send({ message: "No Token were generated!" });
  }
};
