const passport = require("passport");
module.exports = {
  appendRedirectionPath: (req, res, next) => {
    // console.log('req',req.query)
    if (req.query.return) {
      req.session.oauth2return = req.query.return;
    }
    if (req.query.errCallbackUrl) {
      req.session.errCallbackUrl = req.query.errCallbackUrl;
    }
    next();
  },

  jwtAuth: (req, res, next) => {
    try {
      if (!req.headers.authorization) {
        return res.status(401).json({
          code: "E_UNAUTHORIZED",
          data: null,
          message: "Please Provide Token"
        });
      }
      passport.authenticate("jwt", { session: false }, (err, user, info) => {
        if (err || !user) {
          // console.log("info", info);
          if (info.name == "TokenExpiredError") {
            //code for logout
            // AuthService.logout(req, res);
          } else {
            return res.status(401).json({
              code: "E_UNAUTHORIZED",
              data: null,
              message: "Invalid Request Please try again."
            });
          }
        } else {
          req.user = user;
          next();
          console.log("-----------true");
        }
      })(req, res, next);
    } catch (e) {
      console.log("e", e);
      return res.status(500).json({
        code: "E_SERVER_ERROR",
        data: null,
        message: "Something bad happened to server. Please try again."
      });
    }
  }
};
