const jwt = require('jsonwebtoken');
const { CreateError } = require('./error');


const VerifyToken = (req,res,next,cb) => {
  // const token = req.cookies['access_token'];

  const token = req.headers['authorization'];

  if(!token) {
    return next(CreateError(401,`Your are not authenticated`));
  }

  jwt.verify(token,'hasbacfsv',(err,user) => {
    
    if(err){
      return next(CreateError(403, 'Token not valid'));
    }
    req.user = user;
    cb();
  })
}

const VerifyUser = (req,res,next) => {

  VerifyToken(req,res,next,() => {

    if(req.user.id === req.params.id){
      next();
    }else{
      next(CreateError(403, `You are not authorized`));
    }

  })
}

module.exports = {
  VerifyUser
}