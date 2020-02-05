import createError, { HttpError } from 'http-errors';
import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import logger from 'morgan';
import graphQlHTTP from 'express-graphql';
import expressBunyan from 'express-bunyan-logger';

import indexRouter from './routes/index';
import contactRouter from './routes/contact';
import schema from './schema';

const app = express();

// view engine setup
app.set('views', path.join(__dirname, '../', 'views'));
app.set('view engine', 'ejs');

app.disable('x-powered-by');
app.use(logger('dev'));
app.use(expressBunyan());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../', 'public')));

app.use('/', indexRouter);
app.use('/api', contactRouter);

app.use(
  '/graphql',
  graphQlHTTP({
    schema,
    graphiql: true,
  })
);

// catch 404 and forward to error handler
app.use(function(_req, _res, next) {
  next(createError(404));
});

// error handler
app.use(function(
  err: HttpError,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
