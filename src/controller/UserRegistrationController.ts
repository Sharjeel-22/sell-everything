import { NextFunction, Request, Response } from "express";
import UserRegistrationModel from "../model/UserRegistration";
import jwt from "jsonwebtoken";

interface User {
  id?: string;
  firstName: string;
  lastName: string;
  imageURL: string;
  email: string;
  password: string;
  role: string;
  status: "ACTIVE" | "INACTIVE" | "DELETED";
  createdAt: Date;
  updatedAt: Date;
}

class UserRegistrationController {
  public postUserRegistration = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let { data } = req.body;
      let tempData = JSON.parse(data);
      let user: User = await UserRegistrationModel.create({
        firstName: tempData.firstName,
        lastName: tempData.lastName,
        email: tempData.email,
        password: tempData.password,
        imageURL: "https://sell-everything.herokuapp.com/uploads/" + req.file?.filename,
        role: "user",
      });
      if (!user) {
        return res.status(400).json({
          message: "User Registration Error....",
          hasError: true,
          results: {},
        });
      }
      return res.status(200).json({
        message: "User Register Successfully",
        hasError: false,
        user: user
      });
    } catch (e) {
      console.log("========User Registration Error============", e);
      return res
        .status(500)
        .json({ message: "Server Error", code: 500, error: e });
    }
  };
  public userLogin = async (req: Request, res: Response) => {
    try {
      let { email, password } = req.body;
      let user = await UserRegistrationModel.findOne({
        email: email,
        password: password,
        status: "ACTIVE",
      });
      if (!user) {
        return res.json({
          message: "Cradential not valid.....",
          hasError: true,
          user: {},
        });
      }
      if (user) {
        const token = jwt.sign(
          { email: user.email, password: user.password },
          "SomeThingReallyTricky1345",
          {
            expiresIn: "10h",
          }
        );
        user.token = token;
        await user.save();
      }
      return res.status(200).json({
        message: "User Login Successfully...",
        hasError: false,
        user: user
      });
    } catch (e) {
      console.log("========User Loging Error============", e);
      return res
        .status(500)
        .json({ message: "Server Error", code: 500, error: e });
    }
  };
  public updateUserDetail = async (req: Request, res: Response) => {
    try {
      let { id } = req.params;
      let data = req.body;
      console.log("Check :: ",data)
      let user: any = await UserRegistrationModel.findById({ _id: id ,status:"ACTIVE"});
      if (data.email) {
        user.email = data.email;
        await user.save();
      }
      if (data.password) {
        user.password = data.password;
        await user.save();
      }
      if(data.role){
        user.role = data.role;
      }
      if (!user) {
        return res.status(400).json({
          message: "User Detail's Updation Feild...!",
          hasError: true,
        });
      }
      return res.json({
        message: "User Detail's Update Successfully",
        hasError: false,
        user: user,
      });
    } catch (e) {
      console.log("========User Update Error============", e);
      return res
        .status(500)
        .json({ message: "Server Error", code: 500, error: e });
    }
  };
  public getAllRegisteredUsers = async (req: Request, res: Response) => {
    try {
      let users = await UserRegistrationModel.find({ status: "ACTIVE" });
      if (!users) {
        return res.status(400).json({
          message: "All User Getting Error.....",
          hasError: true,
          results: [],
        });
      }
      return res.status(200).json({
        message: "All Users Get Successfully....!",
        hasError: false,
        results: users,
      });
    } catch (e) {
      console.log("=========Get All Registered Users Error=========", e);
      return res
        .status(500)
        .json({ message: "Server Error", code: 500, error: e });
    }
  };
  public findOne = async (req: Request, res: Response) => {
    try {
      let { id } = req.params;
      let user = await UserRegistrationModel.findById({
        _id: id,
        status: "ACTIVE",
      });
      if (!user) {
        return res.status(400).json({
          message: "Find UserById Error.....",
          hasError: true,
          result: {},
        });
      }
      return res.status(200).json({
        message: "Find UserById Successfully.....",
        hasError: false,
        result: user,
      });
    } catch (e) {
      console.log("=========Find UserById Error=======", e);
      return res
        .status(500)
        .json({ message: "Server Error", code: 500, error: e });
    }
  };
  public deleteUser = async (req: Request, res: Response) => {
    try {
      let { id } = req.params;

      let user = await UserRegistrationModel.findById({
        _id: id,
        status: "ACTIVE",
      });
      if (user) {
        user.status = "INACTIVE";
        await user.save();
      }
      if (!user) {
        return res.status(400).json({
          message: "User Deleting Error.....!",
          hasError: true,
        });
      }
      console.log("Your Delete Successfully.....",user._id);
      return res.status(200).json({
        message: "User Deleted Successfully.....",
        hasError: false,
      });
    } catch (e) {
      console.log("==========Delete User Request Error=========", e);
      return res
        .status(500)
        .json({ message: "Server Error", code: 500, error: e });
    }
  };
}
const userRegistrationController = new UserRegistrationController();

export default userRegistrationController;
