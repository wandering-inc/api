import compression from "compression";
import MongoStore from "connect-mongo";
import cors from "cors";
import express, { Request as ExRequest, Response as ExResponse } from "express";
import flash from "express-flash";
import session from "express-session";
import swaggerUi from "swagger-ui-express";
import { RegisterRoutes } from "../build/routes";
import { MONGODB_URI } from "./util/secrets";

// import routes from "./routes";
// import { mightyToken } from "./middleware";

const app = express();

app.set("port", process.env.PORT || 5000);

app.use(compression());
app.use(express.json());
app.use(cors());

// app.use("/v1/*", mightyToken);

app.use((_, response, next) => {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "kelsey",
    store: MongoStore.create({ mongoUrl: MONGODB_URI })
  })
);

app.use("/docs", swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => {
  return res.send(swaggerUi.generateHTML(await import("../build/swagger.json")));
});

app.use(flash());

// app.use(routes);

RegisterRoutes(app);

export default app;