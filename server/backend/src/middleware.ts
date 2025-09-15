import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { JWT_USER_SECRET } from "../config/config";
import multer from "multer";
import path from "path";
import fs from "fs";

interface DecodedTokenPayload {
  id: string;
}

interface AuthenticatedRequest extends Request {
  user?: { id: string };
}

function user_middleware(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      res.status(401).json({ message: "Unauthorized!" });
      return;
    }

    const parts = authorization.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
      res.status(401).json({ message: "Invalid authorization format." });
      return;
    }

    const token = parts[1];

    if (!JWT_USER_SECRET) {
      res.status(500).json({ message: "JWT secret is not configured." });
      return;
    }

    const decoded = jwt.verify(
      token,
      JWT_USER_SECRET
    ) as DecodedTokenPayload;

    req.user = { id: decoded.id };
    next();
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ message: "Invalid token." });
      return;
    }

    res.status(500).json({ message: "Internal server error." });
  }
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, "..", "public", "temp");
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage
})

export  {user_middleware, upload};
