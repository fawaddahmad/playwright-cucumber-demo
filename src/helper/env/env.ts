import "dotenv/config";

export const getEnv = () => {
  require("dotenv").config({
    path: `src/helper/env/.env.${process.env.ENV}`,
  });
};
