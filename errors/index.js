exports.handle404s = (err, req, res, next) => {
    if (err.status === 404){
    res.status(404).send({msg: err.msg})
    } 
    else next(err)
  }

exports.handle500s = (err, req, res, next) => {
    res.status(500).send('Internal server error');
  }