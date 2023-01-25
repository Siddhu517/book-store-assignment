import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
  {
    book_title: { type: String },
    author: { type: String },
    type_of_book: { type: String },
    genre_of_book: { type: String },
    publication: { type: String },
    no_of_pages: { type: Number },
    price_of_book: { type: Number },
    cover_Image: { url: String, public_id: String },
    active: { type: Boolean },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model("Book", bookSchema);
export default Book;
