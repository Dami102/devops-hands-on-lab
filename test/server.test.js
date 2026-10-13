"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const { handleRequest } = require("../src/server");

function runRequest(url) {
  const result = { status: null, headers: null, body: "" };
  const response = {
    writeHead(status, headers) {
      result.status = status;
      result.headers = headers;
    },
    end(body = "") {
      result.body = body;
    },
  };
  handleRequest({ url }, response);
  return result;
}

test("home page returns the greeting", () => {
  const r = runRequest("/");
  assert.equal(r.status, 200);
  assert.equal(r.body, "Hello from the DevOps lab!\n");
});

test("health endpoint returns OK", () => {
  const r = runRequest("/health");
  assert.equal(r.status, 200);
  assert.deepEqual(JSON.parse(r.body), { status: "ok" });
});

test("unknown paths return 404", () => {
  assert.equal(runRequest("/missing").status, 404);
});
