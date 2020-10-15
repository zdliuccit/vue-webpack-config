import mongoose from 'mongoose'
import UserModel from './../model/UserModel'
import appConfig from './../../app.config'

const NODE_ENV = process.env.NODE_ENV

mongoose.connect(
  appConfig.db.url,
  {
    useNewUrlParser: true,
    bufferCommands: false,
    autoIndex: NODE_ENV === 'development'
  }
);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('db connect success');
});

export default {
  UserModel,
}
