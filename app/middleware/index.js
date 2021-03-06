import thunk from 'redux-thunk';
import logger from 'redux-logger';
import promise from './promise';
import common from './common';
import pending from './pending';
import callback from './callback';
export default [
  thunk,
  promise,
  pending,
  callback,
  common,
  logger
];