const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
require('dotenv').config();
const app = express();

app.listen(process.env.PORT, () => {
	console.log(`Server started on port ${process.env.PORT}`);
});

// connect to database
mongoose
	.connect(process.env.MONGO_URI)
	.then(() => console.log('MongoDB Connected...'))
	.catch((err) => console.log(err));

// routes
app.get('/', (req, res) => {
	res.json({ mssg: 'Hello World!' });
});

app.use(express.json());

const corsOptions = {
	origin: 'http://localhost:5173',
  };
  
  app.use(cors(corsOptions));


app.use('/business', require('./routes/business'));
app.use('/donors', require('./routes/donors'));
app.use('/requests', require('./routes/request'));
app.use('/stocks', require('./routes/stocks'));
app.use('/users', require('./routes/users'));
app.use('/api/posts', require('./routes/post'));

app.use((req, res, next) => {
	console.log(req.path, req.method);
	next();
});


mongoose.connection.on('error', (err) => {
	console.log('error', err);
});
