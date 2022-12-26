import '@babel/polyfill';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import routes from './routes';

const app = express();
app.use(cors());
app.use(cookieParser());

app.use(morgan('dev'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set('trust proxy', 1);

app.use('/dispatch/v1.0/api', routes);

export default app;
