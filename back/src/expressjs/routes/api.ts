import express, { Request, Router } from 'express'

export const apiRouter = Router()

apiRouter.use(express.json());

apiRouter.post<'/triggerShortCat', {}, any, {key: string}> ('/triggerShortCat', async (req, res) => {
  res.status(200).send('OK')

  // TODO: Shortcuts should be read from config file. Passwords should be hashed.
  switch (req.body.key) {
    case 'typeHelloWorld':
        var robot = require("robotjs");

        robot.typeString("Hello");

        robot.typeString(" ");
        // robot.keyTap("tab");

        robot.typeString("World!");

        robot.keyTap("enter");
      break;

    default:
      break;
  }
})
