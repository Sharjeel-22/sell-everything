import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

class Authenticaton {
  constructor() {}

  public verifyToken = (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(401).json({ message: "No token provided" });
      }
      const decoded = jwt.verify(token, "SomeThingReallyTricky1345");
      next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }
  };
}

const auth = new Authenticaton();

export default auth;
