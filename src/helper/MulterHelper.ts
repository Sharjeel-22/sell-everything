import multer from 'multer';
class MulterHelper {

    storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "uploads/");
        },
        filename: (req, file, cb) => {
            cb(null, new Date().toDateString() + file.originalname);
        }
    });
     fileFilter:any = (req: Request, file: any, cb: any) => {
        if (
            file.mimetype === 'image/png' ||
            file.mimetype === 'image/jpg' ||
            file.mimetype === 'image/jpeg' ||
            file.mimetype === 'image/PNG' ||
            file.mimetype === 'image/JPG' ||
            file.mimetype === 'image/JPEG'
        ) {
            cb(null, true);
        } else {
            cb(null, false);
        }
    };
     uploads = multer({
        storage: this.storage,
        fileFilter: this.fileFilter,
        limits: {
            fileSize: 1024 * 1024 * 5
        }
    });

}
const multerHelper = new MulterHelper();
export default multerHelper;