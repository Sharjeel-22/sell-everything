import express, { Request, Response } from 'express';
import userResourcesController from '../controller/ResourcesController';
import multerHelper from '../helper/MulterHelper';
import auth from '../auth/Auth';


class UserResourceRouter {
    router: express.Router;
    constructor() {
        this.router = express.Router();
        this.routesGroup()
    }

    routesGroup = () => {
        this.router.post('/resource', multerHelper.uploads.single('imageURL'),auth.verifyToken,userResourcesController.postUserResources)
        this.router.post('/resource/comment/',auth.verifyToken,userResourcesController.postUserCommentsOnResources);
        this.router.put('/resource/:id',auth.verifyToken,userResourcesController.updateUserResources);
        this.router.put('/resource/comment/:id',auth.verifyToken,userResourcesController.UpdateUserCommentsOnResources)
        this.router.get('/resources',auth.verifyToken, userResourcesController.getAllResources);
        this.router.get('/resource/:id',auth.verifyToken,userResourcesController.findOne);
        this.router.delete('/resource/:id',auth.verifyToken,userResourcesController.deleteUserResource);
        this.router.put('/resource/comment/update/:id',auth.verifyToken,userResourcesController.deleteUserCommentsOnResources);
    }
}

const userResourcesRoute = new UserResourceRouter();
export default userResourcesRoute.router;
