import { Request, Response } from "express";

export const signup = (req: Request, res: Response) => {
  const { email, password } = req.body;

  // validate input

  // check if user already exists

  // hash password using best hashing algorithm

  // create the user and save to database

  // send verification mail

  // verify the new user

  // send created response
};
