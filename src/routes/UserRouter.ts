import express, { Request, Response } from 'express';
import userRegistrationController from '../controller/UserRegistrationController';
import multerHelper from '../helper/MulterHelper';

class UserRouter {
    router: express.Router;

    constructor() {
        this.router = express.Router();
        this.routesGroup();
    }

    routesGroup = () => {
        this.router.post('/user',multerHelper.uploads.single("imageURL"),userRegistrationController.postUserRegistration);
        this.router.post('/user/login', userRegistrationController.userLogin)
        this.router.put('/user/:id', userRegistrationController.updateUserDetail);
        this.router.get('/users', userRegistrationController.getAllRegisteredUsers);
        this.router.get('/user/:id', userRegistrationController.findOne);
        this.router.delete('/user/:id', userRegistrationController.deleteUser);
    }
}

const userRoute = new UserRouter();
export default userRoute.router;
