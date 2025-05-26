
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const formRoute = require('./routes/formRoute');



const app = express();
app.use(cors());
app.use(express.json());

connectDB();
app.use('/api', formRoute);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


