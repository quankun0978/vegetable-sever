import cors from "cors";
const configCors = (app) => {
  app.use(cors({ origin: "*" }));
};

export default configCors;
