import express from 'express'
import { create, get, getAll, remove, update } from '../controllers/product';
import { checkPermission } from '../middlewares/checkPermission';
const router = express.Router();

router.post("/products", checkPermission, create)
router.get("/products", getAll)
router.get("/products/:id", get)
router.delete("/products/:id", checkPermission, remove)
router.put("/products:id", checkPermission, update)
export default router