import express from "express"
import mockSchemaController from "../controller/mockSchemaController"

const router = express.Router();

router.post('/', mockSchemaController);

module.exports = router;