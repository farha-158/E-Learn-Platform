import multer from 'multer'
import path from 'path'
import fs from 'fs'
const storage=multer.diskStorage({
        destination:(req,file,cb)=>{
            let folder
            if (file.fieldname === "thumbnailImage") {
                folder = path.join("uploads", "courses");
            } else if (file.fieldname === "profileImage") {
                folder = path.join("uploads", "instructors");
            } else {
                folder = path.join("uploads", "others");
            }
            fs.mkdirSync(folder, { recursive: true });
            cb(null,folder) 
        },
        filename:(req,file,cb)=>{
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            cb(null, file.fieldname + '-' + uniqueSuffix)
        }
})


export const upload=multer({storage:storage})