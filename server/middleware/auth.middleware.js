import jwt from "jsonwebtoken";

export const decodeToken = (req, _res, next) => {
  const auth = req.headers.authorization;
  if (!auth?.startsWith("Bearer ")) return next();

  try {
    const token = auth.split(" ")[1];
    const payload = jwt.verify(token, "secretkey");
    console.log("called");
    
    req.user = payload;
  } catch {}
  next();
};
