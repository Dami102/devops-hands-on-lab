"use strict";

const http = require("node:http");

function handleRequest(request, response) {
  if (request.url === "/health") {
    response.writeHead(200, {
      "content-type": "application/json; charset=utf-8",
    });
    response.end(JSON.stringify({ status: "ok" }));
    return;
  }
  if (request.url === "/") {
    response.writeHead(200, { "content-type": "text/plain; charset=utf-8" });
    response.end("Hello from the DevOps lab!\n");
    return;
  }
  response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
  response.end("Not found\n");
}

function createServer() {
  return http.createServer(handleRequest);
}

if (require.main === module) {
  const port = Number(process.env.PORT || 3000);
  createServer().listen(port, "0.0.0.0", () =>
    console.log("Listening on port " + port),
  );
}

module.exports = { createServer, handleRequest };
