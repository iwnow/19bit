import * as express from 'express';

const router =  express.Router();

router.get('/user', (req, res) => {
	res.json({
		user: 'test'
	});
});

router.get('/file', (req, res) => {
	res.send({
		data: 'test'
	});
});
router.post('/generate-file', (req, res) => {
	 res.send({
		data: 'test'
	});
});

const v1 = express.Router();
v1.use('/v1', router);

export default v1;
