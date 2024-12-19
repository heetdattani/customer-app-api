import bodyParser from 'body-parser';
import cors from 'cors';
import * as dotenv from 'dotenv';
import express from 'express';
import useragent from 'express-useragent';
import AppDataSource from './config/ormconfig';
import loggingMiddleware from './middlewares/loggingMiddleware';
import apiRoutes from './routes/api/index';

dotenv.config();

const app = express();
app.disable('x-powered-by');
const PORT = process.env.PORT ?? 3001;

// Use the useragent middleware
app.use(useragent.express());

app.use(cors());
// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(loggingMiddleware);



// app.use(express.static(join(__directoryname, 'dist')));

app.use('/api', apiRoutes);

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error during Data Source initialization:', error);
  });
