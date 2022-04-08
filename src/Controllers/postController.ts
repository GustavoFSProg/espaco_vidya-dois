var cloudinary = require('cloudinary')
import { Request, Response } from 'express'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

import dotenv from 'dotenv'

dotenv.config()

var imagem = ''
var resultado = ''

async function register(req: Request, res: Response) {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    })

    cloudinary.uploader.upload(req.file?.path, function (result: any, error: any) {
      // console.log(result, error)
      imagem = result.secure_url
      resultado = result
      console.log(resultado)
    })

    const user = await prisma.posts.create({
      data: {
        title: req.body.title,
        image: imagem,
        autor: req.body.autor,
        text: req.body.text,
      },
    })

    return res.status(201).send({ msg: 'user created successfuly!', user })
  } catch (error) {
    return res.status(400).json({ msg: 'ERROS!!', error })
  }
}

async function getAll(req: Request, res: Response) {
  try {
    const data = await prisma.posts.findMany()

    return res.status(200).json(data)
  } catch (error) {
    return res.status(400).json(error)
  }
}

export default { register, getAll }
