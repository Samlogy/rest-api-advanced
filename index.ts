import App from "./app";
import mongoDB from "./src/utils/db";
// import env from "./src/config/env";
import { redisClient } from "./src/utils/cache.utils";

// Handling uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`shutting down the server for handling uncaught exception`);
});

const app = new App().app;
const PORT = 3000; //env.PORT;
const MONGODB_URI =
  "mongodb+srv://sam:sam@cluster0.fcdvt0a.mongodb.net/?retryWrites=true&w=majority"; // env.MONGODB_URI;

let server: any;

mongoDB(MONGODB_URI)
  .then(() => {
    server = app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    );
    redisClient;
  })
  .catch((err) =>
    console.error(`Failed to connect to database: ${err.message}`)
  );

// unhandled promise rejection
process.on("unhandledRejection", (err: Error) => {
  console.log(`Shutting down the server for ${err.message}`);
  console.log(`shutting down the server for unhandle promise rejection`);

  server.close(() => {
    process.exit(1);
  });
});
