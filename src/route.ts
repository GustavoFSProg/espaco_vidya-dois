import { Router, Request, Response } from 'express'
import postController from './Controllers/postController'
import multer from 'multer'

import { uploadConfig } from '../src/config/uploadConfig'

const upload = multer(uploadConfig)

const route = Router()

route.get('/', (req: Request, res: Response) => {
  return res.status(200).send({ msg: 'API!!!' })
})

route.get('/getall', postController.getAll)
route.post('/register', upload.single('image'), postController.register)

export default route
