const multer = require('multer')
import { Request } from 'express'

const uploadConfig = {
  storage: new multer.diskStorage({
    // destination: path.resolve(__dirname, '..', '..', 'uploads'),
    filename: function (req: Request, file: any, cb: any) {
      const [name] = file.originalname.split('.')
      const filename = `${name}.jpg`
      cb(null, filename)
    },
  }),
}

export default uploadConfig
