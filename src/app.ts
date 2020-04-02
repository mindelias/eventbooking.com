import createError, { HttpError } from 'http-errors';
import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import logger from 'morgan';
import graphQlHTTP from 'express-graphql';
// import { buildSchema } from 'graphql';
import expressBunyan from 'express-bunyan-logger';
// import Event from './model/event';

import indexRouter from './routes/index';
import contactRouter from './routes/contact';
import schema from './schema';

const app = express();

// interface EventType {
//   _id: string;
//   title: string;
//   description: string;
//   price: number;
//   date: string;
// }
// type inputType = Omit<EventType, "id" | "date">
// interface input{
//   eventInput:object<inputType>
// }
// const events: EventType[] = [];


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


// : buildSchema(`
//       type Event {
//         _id: ID!
//         title: String!
//         description: String!
//         price:  Int!
//         date: String!  

//       }
//       input EventInput {   
//         title: String!
//         description: String!
//         price: Int! 
//       }

//       type RootQuery {
//         events: [Event!]!

//       }
//       type RootMutation{
//         createEvent(eventInput: EventInput): Event
//       }
      
//       schema {
//         query: RootQuery
//         mutation: RootMutation
//       }
//     `),
//   rootValue: {
//   events: () => {
//     return Event.find().then(events => {
//       return events
//     }).catch(error => {
//       throw error
//     })
//   },
//     createEvent: (args: any) => {
//       const event = new Event({
//         title: args.eventInput.title,
//         description: args.eventInput.description,
//         price: args.eventInput.price,
//       });
//       return event
//         .save()
//         .then(result => {
//           console.log(result);
//           return result;
//         })
//         .catch(err => console.log(err));
//     }
// }