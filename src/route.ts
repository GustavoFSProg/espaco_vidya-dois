import { Router, Request, Response } from 'express'

const route = Router()

route.get('/', (req, res) => {
  return res.status(200).send({ msg: 'Entrou no get!!!' })
})

export default route
