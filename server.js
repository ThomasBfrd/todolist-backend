const http = require("http");
const app = require("./app");

const port = normalizePort(process.env.PORT || 9002);
app.set("port", port);

const errorHandler = error => {
  if (error.syscall !== "listen") {
    throw error;
  }

  const address = server.address();
  const bind = typeof address === "string" ? "pipe" + address : "port: " + port;
  console.error(bind + " est déjà utilisé");
  process.exit(1);
};

const server = http.createServer(app);

server.on("error", errorHandler);
server.on("listening", () => {
  const address = server.address();
  const bind = typeof address === "string" ? "pipe" + address : "port: " + port;
  console.log("Listening on " + bind);
});

server.listen(port);