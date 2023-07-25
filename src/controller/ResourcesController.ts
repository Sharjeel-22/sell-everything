import { NextFunction, Request, Response } from "express";
import ResourcesModel from "../model/Resources";
import UserRegistrationModel from "../model/UserRegistration";
interface Resource {
  id?: string;
  imageURL: string;
  title: string;
  description: string;
  userId: string;
  status: "ACTIVE" | "INACTIVE" | "DELETED";
  createdAt: Date;
  updatedAt: Date;
}

class ResourcesController {
  public postUserResources = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let { resourceDetail } = req.body;
      let data = JSON.parse(resourceDetail);
      let resource: Resource = await ResourcesModel.create({
        userId: data.userId,
        title: data.title,
        description: data.description,
        imageURL: "http://localhost:5000/uploads/" + req.file?.filename,
      });
      if (!resource) {
        return res.status(400).json({
          message: "User Resources Creating Error....",
          hasError: true,
          results: {},
        });
      }
      return res.status(200).json({
        message: "User Resources Created Successfully",
        hasError: false,
        user: resource,
      });
    } catch (e) {
      console.log("========User Resources Creating Error============", e);
      return res
        .status(500)
        .json({ message: "Server Error", code: 500, error: e });
    }
  };
  public updateUserResources = async (req: Request, res: Response) => {
    try {
      let { id } = req.params;
      let data = req.body;
      let resource: any = await ResourcesModel.findById({
        _id: id,
        status: "ACTIVE",
      });
      if (data) {
        resource.title = data.title;
        resource.imageURL = data.imageURL;
        resource.description = data.description;
        await resource.save();
      }
      if (!resource) {
        return res.status(400).json({
          message: "User Resource Updation Feild...!",
          hasError: true,
        });
      }
      return res.json({
        message: "User Resources Update Successfully",
        hasError: false,
        user: resource,
      });
    } catch (e) {
      console.log("========User Resources Update Error============", e);
      return res
        .status(500)
        .json({ message: "Server Error", code: 500, error: e });
    }
  };
  public postUserCommentsOnResources = async (req: Request, res: Response) => {
    try {
      let data = req.body;
      let resource: any = await ResourcesModel.findById({
        _id: data.id,
        status: "ACTIVE",
      });
      if (!resource) {
        return res.status(400).json({
          message: "User Comment on Resource Feild...!",
          hasError: true,
        });
      }
      resource.comments.push({
        userId: data.userId,
        userName: data.userName,
        userImageURL: data.imageURL,
        comment: data.comment,
      });
      await resource.save();
      return res.json({
        message: "User Comments on Resources Successfully",
        hasError: false,
        user: resource,
      });
    } catch (e) {
      console.log("========User Comments on Resources Error============", e);
      return res
        .status(500)
        .json({ message: "Server Error", code: 500, error: e });
    }
  };

  public UpdateUserCommentsOnResources = async (
    req: Request,
    res: Response
  ) => {
    try {
      let { id } = req.params;
      let data = req.body;
      let resource: any = await ResourcesModel.findByIdAndUpdate({
        _id: id,
        status: "ACTIVE",
      });
      console.log("Check data :: ",resource);
      if (!resource) {
        return res.status(400).json({
          message: "User Comment update on Resource Feild...!",
          hasError: true,
        });
      }
      resource.comments.forEach((c: any) => {
        if (c._id == data.id) {
          c.comment = data.comment;
        }
      });
      await resource.save();
      return res.json({
        message: "User Comments update on Resources Successfully",
        hasError: false,
        user: resource,
      });
    } catch (e) {
      console.log("========User Comments on Resources Error============", e);
      return res
        .status(500)
        .json({ message: "Server Error", code: 500, error: e });
    }
  };
  public deleteUserCommentsOnResources = async (
    req: Request,
    res: Response
  ) => {
    try {
      let { id } = req.params;
      const data = req.body;
      let resource: any = await ResourcesModel.findByIdAndUpdate({
        _id: data.postId,
        status: "ACTIVE"
      });
      if (!resource) {
        return res.status(400).json({
          message: "User Comment delete on Resource Feild...!",
          hasError: true,
        });
      }
      resource.comments.forEach(
        (comment: any,i:any) => {
          if(comment._id == id) {
            resource.comments.splice(i,1);
          }
        });
      await resource.save();
      return res.json({
        message: "User Comments delete on Resources Successfully",
        hasError: false,
        user: resource,
      });
    } catch (e) {
      console.log("========User Comments on Resources Error============", e);
      return res
        .status(500)
        .json({ message: "Server Error", code: 500, error: e });
    }
  };
  public getAllResources = async (req: Request, res: Response) => {
    try {
      let resources = await ResourcesModel.find({ status: "ACTIVE" });
      if (!resources) {
        return res.status(400).json({
          message: "All User Resources Getting Error.....",
          hasError: true,
          results: [],
        });
      }
      return res.status(200).json({
        message: "All Users Resources Get Successfully....!",
        hasError: false,
        results: resources,
      });
    } catch (e) {
      console.log("=========Get All Users Resources Error=========", e);
      return res
        .status(500)
        .json({ message: "Server Error", code: 500, error: e });
    }
  };
  public findOne = async (req: Request, res: Response) => {
    try {
      let { id } = req.params;
      let resource = await ResourcesModel.findById({
        _id: id,
        status: "ACTIVE",
      });
      if (!resource) {
        return res.status(400).json({
          message: "Find UserResourceById Error.....",
          hasError: true,
          result: {},
        });
      }
      return res.status(200).json({
        message: "Find UserResourceById Successfully.....",
        hasError: false,
        result: resource,
      });
    } catch (e) {
      console.log("=========Find UserResourceById Error=======", e);
      return res
        .status(500)
        .json({ message: "Server Error", code: 500, error: e });
    }
  };
  public deleteUserResource = async (req: Request, res: Response) => {
    try {
      let { id } = req.params;
      let resource = await ResourcesModel.findById({
        _id: id,
        status: "ACTIVE",
      });
      if (resource) {
        resource.status = "INACTIVE";
        await resource.save();
      }
      if (!resource) {
        return res.status(400).json({
          message: "User Resources Deleting Error.....!",
          hasError: true,
        });
      }

      return res.status(200).json({
        message: "User Resource Deleted Successfully.....",
        hasError: false,
      });
    } catch (e) {
      console.log("==========Delete User Resource Request Error=========", e);
      return res
        .status(500)
        .json({ message: "Server Error", code: 500, error: e });
    }
  };
}
const userResourcesController = new ResourcesController();

export default userResourcesController;
