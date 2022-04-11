import { Router, Request, Response } from 'express'
import postController from './Controllers/postController'
import uploadConfig from './config/uploadConfig'
import multer from 'multer'
import userController from './Controllers/userController'
import { isAuthorized } from './utils/isAuthorized'

const upload = multer(uploadConfig)

const route = Router()

route.get('/', (req: Request, res: Response) => {
  return res.status(200).send({ msg: 'Yoga API!!!' })
})

route.get('/getall', postController.getAll)
route.get('/get-one', isAuthorized, postController.getLast)
route.put('/update/:id', isAuthorized, upload.single('image'), postController.update)
route.delete('/del/:id', isAuthorized, postController.deletar)
route.post('/register', isAuthorized, upload.single('image'), postController.register)

route.get('/get-all-users', userController.getAll)
route.post('/register-user', userController.register)
route.post('/login', userController.login)

export default route
