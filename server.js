const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const userRouter = require('./routes/User');
// const statesRouter = require('./routes/State');
const CityRouter = require('./routes/City');
const StateRouter = require('./routes/State');
const WarehouseRouter = require('./routes/Warehouse');
// const router = require('./routes/State');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5006;

app.use(cors());
app.use(express.json());

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

connectDB();

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use('/api/users', userRouter);
app.use('/api/states', StateRouter);
app.use('/api/cities', CityRouter);
app.use('/api/warehouses', WarehouseRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
