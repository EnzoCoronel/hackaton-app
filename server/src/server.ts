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

app.get('/close/business/:city/:lat/:long', async (request, reply) => {
  const {city, lat, long}: any = request.params;

  const business = await prisma.business.findMany({
    where: {
       city,
    }
  })

  if(business){
    
  }

})

app.listen({port: 3000}).then(() => {
  console.log("HTTP server running")
})