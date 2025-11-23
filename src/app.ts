import express from "express";
import * as swaggerDocument from "../src/config/swagger.json";
import swaggerUI from "swagger-ui-express";
import dotenv from "dotenv/config";
import { connectDB } from "./config/db.connect";
import cors from "cors";
import cookies from "cookie-parser";
import sessions from "express-session";
import MongoStore from "connect-mongo";
import { authRoute } from "./routes/authrouttes";
import { ErrorHandelingMiddlewear } from "./middlewears/global.error.middlewear";
const app = express();

if (!process.env.SESSIONS_SECRET) {
  throw new Error("SESSIONS_SECRET is missing in environment variables");
}
const SESSION_SECRET: string = process.env.SESSIONS_SECRET;

//CORS config
const whitelist = ["http://localhost:5173","http://localhost:4500",'https://book-hotel-n3ht.vercel.app'];

const runServer = async () => {
  //cors
  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin || whitelist.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
      credentials: true,
    })
  );

  //middlewear
  app.use(express.json({ limit: "16kb" }));
  app.use(express.urlencoded({ extended: true, limit: "16kb" }));
  app.use(cookies());

  app.use(
    sessions({
      secret:SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({
        mongoUrl:
          process.env.NODE_ENV == "DEV"
            ? process.env.MONGO_LOCAL
            : process.env.MONGO_CLOUD,
            collectionName:"sessions",
            ttl:60*60,//1h session expiry
            autoRemove:"native"
      }),
      cookie:{
        httpOnly:true,
        secure:true,
        sameSite:'none',
        maxAge:60*60*1000,//1h
      }
    })
  );

  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use("/api",authRoute)

 
  app.use(ErrorHandelingMiddlewear);

  connectDB();
};

export { runServer, app };
