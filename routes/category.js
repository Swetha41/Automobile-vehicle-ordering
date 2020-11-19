const express = require('express');
const router = express.Router();

const { create, categoryById, read, update, remove, list } = require('../controllers/category');
const { requireSignin, isAuth, isDealer } = require('../controllers/auth');
const { userById } = require('../controllers/user');

router.get('/category/:categoryId', read);
router.post('/category/create/:userId', requireSignin, isAuth, isDealer, create);
router.put('/category/:categoryId/:userId', requireSignin, isAuth, isDealer, update);

router.delete('/category/:categoryId/:userId', requireSignin, isAuth, isDealer, remove);
router.get('/categories', list);

router.param('categoryId', categoryById);
router.param('userId', userById);

module.exports = router;
