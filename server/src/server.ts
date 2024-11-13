import Fastify from 'fastify'
import { prisma } from './lib/prisma'

const app = Fastify()

app.get('/', async (request, reply) => {
    return reply.send("oi")
})

app.get('/business', async (request, reply) => {
  const business = await prisma.business.findMany();
  return reply.send(business)
})

app.listen({port: 3000}).then(() => {
  console.log("HTTP server running")
})