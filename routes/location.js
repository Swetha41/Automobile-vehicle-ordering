const express = require('express');
const router = express.Router();

const { create, locationById, read, update, remove, list } = require('../controllers/location');
const { requireSignin, isAuth, isDealer } = require('../controllers/auth');
const { userById } = require('../controllers/user');

router.get('/location/:locationId', read);
router.post('/location/create/:userId', requireSignin, isAuth, isDealer, create);
router.put('/location/:locationId/:userId', requireSignin, isAuth, isDealer, update);

router.delete('/location/:locationId/:userId', requireSignin, isAuth, isDealer, remove);
router.get('/categories', list);

router.param('locationId', locationById);
router.param('userId', userById);

module.exports = router;
