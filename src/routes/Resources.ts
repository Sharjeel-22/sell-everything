import express, { Request, Response } from 'express';
import userResourcesController from '../controller/ResourcesController';
import multerHelper from '../helper/MulterHelper';


class UserResourceRouter {
    router: express.Router;
    constructor() {
        this.router = express.Router();
        this.routesGroup()
    }

    routesGroup = () => {
        this.router.post('/', multerHelper.uploads.single('imageURL'),userResourcesController.postUserResources)
        this.router.post('/comment/',userResourcesController.postUserCommentsOnResources);
        this.router.put('/:id',userResourcesController.updateUserResources);
        this.router.put('/comment/:id',userResourcesController.UpdateUserCommentsOnResources)
        this.router.get('/', userResourcesController.getAllResources);
        this.router.get('/:id',userResourcesController.findOne);
        this.router.delete('/:id',userResourcesController.deleteUserResource);
        this.router.put('/comment/update/:id',userResourcesController.deleteUserCommentsOnResources);
    }
}

const userResourcesRoute = new UserResourceRouter();
export default userResourcesRoute.router;
