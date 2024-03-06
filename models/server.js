const express = require("express");
const { dbConnection, dbDisconnection } = require("../database/config");

class Server {
  constructor() {
    // express
    this.app = express();

    // Port
    this.port = process.env.PORT;

    // Paths
    this.paths = {
      shortener: "/",
    };

    // DB Connect
    this.connectDB();

    // EJS view engine configuration
    this.app.set("view engine", "ejs");

    // Middleware
    this.middleware();

    // Routes
    this.routes();

    process.on("SIGINT", () => {
      this.disconnectDB();
    });
  }

  // DB Connection
  async connectDB() {
    await dbConnection();
  }

  // DB Disconnection
  async disconnectDB() {
    await dbDisconnection();
  }

  middleware() {
    // read and parse body
    this.app.use(express.json());

    // parse data of forms
    this.app.use(express.urlencoded({ extended: false }));
  }

  routes() {
    this.app.use(this.paths.shortener, require("../routes/shortUrl.routes"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`listening at http://localhost:${this.port}`);
    });
  }
}

module.exports = Server;
