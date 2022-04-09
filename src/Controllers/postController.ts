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
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      CLOUDINARY_URL: process.env.CLOUDINARY_URL,
    })

    cloudinary.uploader.upload(req.file?.path, function (result: any, error: any) {
      // console.log(result, error)
      imagem = result.secure_url
      resultado = result
      console.log(resultado)
    })

    const posts = await prisma.posts.create({
      data: {
        title: req.body.title,
        image: imagem,
        text: req.body.text,
        autor: req.body.autor,
        description: req.body.description,
      },
    })

    return res.status(201).send({ msg: 'user created successfuly!', posts })
  } catch (error) {
    return res.status(400).json({ msg: 'ERROS!!', error })
  }
}

async function getAll(req: Request, res: Response) {
  try {
    const data = await prisma.posts.findMany({
      take: 3,

      orderBy: {
        createdAt: 'desc',
      },
    })

    return res.status(200).json(data)
  } catch (error) {
    return res.status(400).json(error)
  }
}

async function getLast(req: Request, res: Response) {
  try {
    const data = await prisma.posts.findFirst({
      take: 1,

      orderBy: {
        createdAt: 'desc',
      },
    })

    return res.status(200).json(data)
  } catch (error) {
    return res.status(400).json(error)
  }
}

export default { register, getAll, getLast }
