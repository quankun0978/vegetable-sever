import apiRouter from "../routes/api";
const configRouter = (app) => {
  // app.use("/", webRouter);
  app.use("/api", apiRouter);
};
export default configRouter;
