const express = require("express");
const router = express.Router();

const {
    create,
    productById,
    read,
    remove,
    update,
    list,
    listRelated,
    listCategories,
    listBrands,
    listLocations,
    listBySearch,
    photo,
    listSearch
} = require("../controllers/product");
const { requireSignin, isAuth, isDealer } = require("../controllers/auth");
const { userById } = require("../controllers/user");

router.get("/product/:productId", read);
router.post("/product/create/:userId", requireSignin, isAuth, isDealer, create);
router.delete(
    "/product/:productId/:userId",
    requireSignin,
    isAuth,
    isDealer,
    remove
);
router.put(
    "/product/:productId/:userId",
    requireSignin,
    isAuth,
    isDealer,
    update
);

router.get("/products", list);
router.get("/products/search", listSearch);
router.get("/products/related/:productId", listRelated);
router.get("/products/categories", listCategories);
router.get("/products/brands", listBrands);
router.get("/products/locations", listLocations);
router.post("/products/by/search", listBySearch);
router.get("/product/photo/:productId", photo);

router.param("userId", userById);
router.param("productId", productById);

module.exports = router;
