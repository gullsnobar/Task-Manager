const test = require("node:test");
const assert = require("node:assert/strict");
const { once } = require("node:events");

const app = require("../server");

test("GET /api/health returns a healthy response", async (t) => {
  const server = app.listen(0);
  await once(server, "listening");

  t.after(
    () =>
      new Promise((resolve, reject) => {
        server.close((error) => {
          if (error) reject(error);
          else resolve();
        });
      })
  );

  const address = server.address();
  assert.notEqual(typeof address, "string");

  const response = await fetch(
    `http://127.0.0.1:${address.port}/api/health`
  );
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(body.status, "ok");
});
