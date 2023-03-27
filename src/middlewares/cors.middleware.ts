import cors from "cors";
import { Request } from "express";

const allowList = ["http://localhost:3000"];
const methodsAllowed: string[] = [
  "GET",
  "POST",
  "DELETE",
  "UPDATE",
  "PUT",
  "PATCH",
];
const moreOptions = { credentials: true, optionsSuccessStatus: 200 };
const options = { methods: methodsAllowed, ...moreOptions };

const corsManip = (req: Request, callback: any) => {
  let corsOptions;
  const origin = req.header("Origin") as string;

  // enable requested origin in cors response
  if (allowList.indexOf(origin) !== -1)
    corsOptions = {
      origin: true,
      ...options,
    };
  // disable cors in reponse
  else corsOptions = { origin: false, ...options };

  callback(null, corsOptions);
};

export default function corsMiddleware() {
  cors(corsManip);
}
