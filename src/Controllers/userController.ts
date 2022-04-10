import { Request, Response } from 'express'
import md5 from 'md5'
import jwt from 'jsonwebtoken'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

import dotenv from 'dotenv'

dotenv.config()

async function register(req: Request, res: Response) {
  try {
    const user = await prisma.users.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        password: String(md5(req.body.password, process.env.SECRET as string & { asBytes: true })),
      },
    })

    return res.status(201).send({ msg: 'user created successfuly!', user })
  } catch (error) {
    return res.status(400).json({ msg: 'ERROS!!', error })
  }
}

async function getAll(req: Request, res: Response) {
  try {
    const data = await prisma.users.findMany()

    return res.status(200).json(data)
  } catch (error) {
    return res.status(400).json(error)
  }
}

export async function generateToken(data: any) {
  const { email, password } = data
  return jwt.sign({ email, password }, process.env.SECRET as string & { asBytes: true }, {
    expiresIn: '1d',
  })
}

async function login(req: Request, res: Response) {
  try {
    const user = await prisma.users.findFirst({
      where: {
        email: req.body.email,
        password: String(md5(req.body.password, process.env.SECRET as string & { asBytes: true })),
      },
    })
    if (!user) {
      return res.status(400).send({ msg: 'Email ou senha invalidos!' })
    }

    const token = await generateToken(user)

    return res.status(201).send({ msg: 'Login done successfuly!', token })
  } catch (error) {
    return res.status(400).json({ msg: 'ERROS!!', error })
  }
}

export default { register, getAll, login }
