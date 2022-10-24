// Require the framework and instantiate it
const fastify = require("fastify")({ logger: true });
const { randomUUID: uuid } = require("crypto"); // >= v15.6.0, v14.17.0
// https://nodejs.org/docs/latest-v17.x/api/crypto.html#cryptorandomuuidoptions

let todos = [];

const todoC_Schema = {
  body: {
    type: "object",
    required: ["text", "done"],
    properties: {
      text: { type: "string" },
      done: { type: "boolean" },
    },
  },
};

fastify.get("/api/todos", async (request, reply) => {
  if (request.query.q) {
    return todos.filter((t) => t.text.includes(request.query.q));
  } else {
    return todos;
  }
});

fastify.post("/api/todos", { schema: todoC_Schema }, async (request, reply) => {
  todos.unshift({ ...request.body, id: uuid() });
  reply.code(201);
  return todos[0];
});

const todoP_Schema = { ...todoC_Schema };
delete todoP_Schema.body.required;

fastify.patch(
  "/api/todos/:id",
  { schema: todoP_Schema },
  async (request, reply) => {
    const todoIdx = todos.findIndex((t) => t.id === request.params.id);
    if (todoIdx === -1) {
      reply.code(404).send();
    }

    todos[todoIdx] = { ...todos[todoIdx], ...request.body };
    reply.code(200);
    return todos[todoIdx];
  }
);

fastify.delete("/api/todos/:id", async (request, reply) => {
  const todoIdx = todos.findIndex((t) => t.id === request.params.id);
  if (todoIdx === -1) {
    reply.code(404).send();
  }

  const toDelTodo = todos.splice(todoIdx, 1);

  reply.code(200);
  return toDelTodo;
});

// Run the server!
const start = async () => {
  try {
    await fastify.listen(4000);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
