// import cors from "cors";
// import { Request } from "express";

// const allowList = ["http://localhost:3000"];
// const methodsAllowed: string[] = [
//   "GET",
//   "POST",
//   "DELETE",
//   "UPDATE",
//   "PUT",
//   "PATCH",
// ];
// const moreOptions = { credentials: true, optionsSuccessStatus: 200 };
// const options = { methods: methodsAllowed, ...moreOptions };

// const corsManip = (req: Request, callback: any) => {
//   const origin = req.headers?.origin as string;
//   console.log("origin: ", origin);

//   // enable requested origin in cors response
//   if (allowList.indexOf(origin) !== -1)
//     callback(null, {
//       origin: true,
//       ...options,
//     });
//   // disable cors in reponse
//   else
//     callback(null, {
//       origin: false,
//       ...options,
//     });
// };

// export default function corsMiddleware() {
//   cors(corsManip);
// }

import { Request, Response, NextFunction } from 'express'

const allowedOrigins = ['http://example1.com', 'http://example2.com']
const methodsAllowed: string[] = ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
const options = {
  methods: methodsAllowed,
  credentials: true,
  optionsSuccessStatus: 200
}

const corsMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const requestOrigin = req.get('origin')
  if (requestOrigin && allowedOrigins.includes(requestOrigin)) {
    res.setHeader('Access-Control-Allow-Origin', requestOrigin)
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Credentials', 'true')
  }
  next()
}

export default corsMiddleware
