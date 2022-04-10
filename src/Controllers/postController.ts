var cloudinary = require('cloudinary')
import { Request, Response } from 'express'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

import dotenv from 'dotenv'

dotenv.config()

var imagem = ''
var resultado = ''
let imagemDB = ''

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

async function update(req: Request, res: Response) {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      CLOUDINARY_URL: process.env.CLOUDINARY_URL,
    })

    cloudinary.uploader.upload(req.file?.path, function (result: any, error: any) {
      // console.log(result, error)
      imagemDB = result.secure_url
      resultado = result
      // console.log(resultado)
    })
    const { id } = req.params

    console.log(imagemDB)
    await prisma.posts.update({
      where: { id: id },

      data: {
        title: req.body.title,
        image: imagemDB,
        text: req.body.text,
        autor: req.body.autor,
        description: req.body.description,
      },
    })

    return res.status(200).json({ msg: 'Post Editado!!' })
  } catch (error) {
    return res.status(400).json({ msg: 'Erro!!', error })
  }
}

async function deletar(req: Request, res: Response) {
  try {
    const { id } = req.params

    await prisma.posts.delete({
      where: { id: id },
    })

    return res.status(200).json({ msg: 'Post deleted!!' })
  } catch (error) {
    return res.status(400).json(error)
  }
}

export default { register, getAll, deletar, getLast, update }
