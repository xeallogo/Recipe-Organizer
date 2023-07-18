/* eslint-disable no-console */
/* eslint-disable import/extensions */
import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import { resolve } from 'path';
import passport from 'passport';
import MongoStore from 'connect-mongo';
import dotenv from 'dotenv';
import User from './models/user.js';
import router from './routes/index.js';

const { connect, connection } = mongoose;
dotenv.config();

const PORT = process.env.PORT || 3001;
const app = express();

mongoose.set('strictQuery', false);
connect(process.env.MONGODB_URI, {});
connection.once('open', () => {
  console.log('Connected to the Database.');
});
connection.on('error', (error) => {
  console.log(`Mongoose Connection Error: ${error}`);
});

// More Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  secret: 'r8q,+&1LM3)CD*zAGpx1xm{NeQhc;#',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 60 * 60 * 1000 }, // 1 hour
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    collectionName: 'Sessions',
  }),
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/api', router);

// Passport
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});
