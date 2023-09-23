require("dotenv").config();
require("./database/mysql");
const port = process.env.PORT;

const server = require("./utils/server");
export const app = server.createServer();
const http = require("http").Server(app);

http.listen(port || 2023, () => {
  console.log(`Server started on port ${port}`);
});
