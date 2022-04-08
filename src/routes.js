import { Router } from 'express'

const route = Router()

// route.get('/', postController.getAll)
route.get('/', (req, res) => {
  return res.status(200).send({ msg: 'Entrou no get!!!!' })
})

export default route
