import express from "express";
import formidable from "express-formidable";
import {
  addBook,
  bookStoreList,
  getBook,
  updateBook,
  activeInActive,
  addImage,
  deleteBook,
  bookStoreListActive,
} from "../controllers/index";

const router = express.Router();

router.get("/books-list", bookStoreList);
router.get("/books-list-active", bookStoreListActive);
router.get("/get-book/:id", getBook);
router.post("/add-book", addBook);
router.put("/update-book/:id", updateBook);
router.put("/active-inactive/:id", activeInActive);
router.post(
  "/add-image",
  formidable({ maxFileSize: 5 * 1024 * 1024 }),
  addImage
);
router.delete("/delete-book/:id", deleteBook);

export default router;
