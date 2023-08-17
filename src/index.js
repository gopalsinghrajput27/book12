const app = require("./sever");
const connectDatebase = require("./config/database");
const Port = process.env.PORT || 9000;

require("dotenv").config({
  path: "./src/config/config.env",
});

connectDatebase();
app.listen(Port, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});
