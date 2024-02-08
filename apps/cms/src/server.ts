import express from "express";
import payload from "payload";

require("dotenv").config();
const app = express();

// Redirect root to Admin panel
app.get("/", (_, res) => {
  res.redirect("/admin");
});

const throwWhenMissingEnv = (env: string) => {
  if (!process.env[env]) throw new Error(`Missing environment variable: ${env}`);
};

const start = async () => {
  throwWhenMissingEnv("DATABASE_URI");
  throwWhenMissingEnv("PAYLOAD_SECRET");

  // Initialize Payload
  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    express: app,
    onInit: async () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
    },
  });

  // Add your own express routes here

  app.listen(3000);
};

start();
