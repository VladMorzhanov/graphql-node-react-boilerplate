import passport from 'passport';
import { Request, Response } from "express";
import { User } from "../entities";

const ExpressGraphQL = require('express-graphql');
import { RootQuery } from "../graphql";

export const GraphQLMiddleware = ((req: Request, res: Response) => {
  const next = (user: User) => ExpressGraphQL({
    schema: RootQuery,
    graphiql: true,
    context: {
      user: user || null
    }
  })(req, res);

  try {
    passport.authenticate(
      'bearer',
      { session: false },
      function (err: Error, user: User, info: any) {
        console.log(user);
        next(user)
      }
    )(req, res, next)
  } catch (e) {
    next(e)
  }
});