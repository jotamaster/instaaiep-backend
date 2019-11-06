require('dotenv').config();
const express = require('express');
const app = express();
const indexRouter = require('./routes/index');
const authRoute = require('./routes/auth');
app.use(express.json());

app.use('/', indexRouter);
app.use('/auth', authRoute);

// error 404
app.use((req, res) => {
	res.status(404).send({
		error: 'Not found',
		path: req.url
	});
});

app.listen(process.env.PORT, () => console.log(`API listening on port ${process.env.PORT}`));
