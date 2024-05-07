import configBody from "./configBody";
import configCookie from "./configCookie";
import configCors from "./configCors";
import configRouter from "./configRouter";

const config = (app) => {
  configBody(app);
  configCookie(app);
  configCors(app);
  configRouter(app);
};

export default config;
