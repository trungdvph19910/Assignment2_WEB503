import express from 'express'
import { create, get } from '../controllers/category';
import { checkPermission } from '../middlewares/checkPermission';
const router = express.Router();

router.post("/categories", create)
router.get("/categories/:id", checkPermission, get)

export default router