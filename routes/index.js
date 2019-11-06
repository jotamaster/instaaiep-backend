const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
	res.json({ info: 'Hola, como va tu dia?' });
});

module.exports = router;
