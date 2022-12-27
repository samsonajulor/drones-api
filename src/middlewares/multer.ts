import multer from 'multer';
import { GenericInterface } from '../@types/index';

const storage = multer.memoryStorage();
const multerUploads: GenericInterface = multer({ storage });

export default multerUploads;
