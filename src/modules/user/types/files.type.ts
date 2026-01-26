import { MulterFile } from "src/common/utils/multer.util"

export type ProfileImages ={
    image_profile:MulterFile[] | any,
    bg_image:MulterFile[] | any
}