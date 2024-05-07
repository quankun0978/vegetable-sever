import express from "express";
const configBody = (app) => {
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );
};
export default configBody;
