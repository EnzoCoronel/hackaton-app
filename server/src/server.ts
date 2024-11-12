import Fastify from 'fastify'

const app = Fastify()

app.get('/', async (request, reply) => {
    return reply.send("oi")
})

app.listen({port: 3000}).then(() => {
  console.log("HTTP server running")
})