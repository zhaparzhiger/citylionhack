import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import sequelize from './db.js';
import eventsRouter from './events/routers.js';

const app = express();

app.use(express.json());
app.use('/events', eventsRouter);

app.listen(process.env.PORT || 3000, async () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
  try {
    await sequelize.authenticate();
    console.log('Database connected!');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});
