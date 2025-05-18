require("dotenv").config();
const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { Users } = require("../models");

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies.jwt;
  }
  console.log("Token: ", token);
  return token;
};

module.exports.initializePassport = (passport) => {
  passport.use(
    new JWTStrategy(
      {
        jwtFromRequest: cookieExtractor,
        secretOrKey: process.env.JWT_SECRET,
      },
      async (jwtPayload, done) => {
        const user = await Users.findByPk(jwtPayload.sub);
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      }
    )
  );
};
