import Book from "../Models/bookStore";

import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: "dbrilpskh",
  api_key: "157783874915518",
  api_secret: "o7ZmYfiR2qRo1OJ0uOt374Tt5X4",
});

/* cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
}); */

export const bookStoreList = async (req, res) => {
  try {
    const bookList = await Book.find({});
    // console.log(bookList);
    res.json({
      bookList,
      status: "ok",
    });
  } catch (err) {
    res.json({
      error: err,
    });
    console.log(err);
  }
};

export const bookStoreListActive = async (req, res) => {
  try {
    const bookList = await Book.find({ active: true });
    // console.log(bookList);
    res.json({
      bookList,
      status: "ok",
    });
  } catch (err) {
    res.json({
      error: err,
    });
    console.log(err);
  }
};

export const addBook = async (req, res) => {
  try {
    //console.log(req.body);
    const {
      book_title,
      author,
      type_of_book,
      genre_of_book,
      publication,
      no_of_pages,
      price_of_book,
    } = req.body.formData;
    const { url, public_id } = req.body;

    const book = new Book({
      book_title,
      author,
      type_of_book,
      genre_of_book,
      publication,
      no_of_pages,
      price_of_book,
      cover_Image: {
        url,
        public_id,
      },
      active: true,
    });

    await book.save();

    res.status(200).json({
      status: "ok",
      message: "Successfully add Book",
    });
  } catch (err) {
    res.json({
      error: err,
    });
    console.log(err);
  }
};

export const getBook = async (req, res) => {
  try {
    //console.log(req.params.id);
    const book = await Book.findById({ _id: req.params.id });
    res.json({
      status: "ok",
      book,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateBook = async (req, res) => {
  try {
    //console.log(req.body);
    const {
      book_title,
      author,
      type_of_book,
      genre_of_book,
      publication,
      no_of_pages,
      price_of_book,
    } = req.body.formData;

    const { url, public_id } = req.body;

    const data = {};

    if (book_title) {
      data.book_title = book_title;
    }

    if (author) {
      data.author = author;
    }

    if (type_of_book) {
      data.type_of_book = type_of_book;
    }

    if (genre_of_book) {
      data.genre_of_book = genre_of_book;
    }

    if (publication) {
      data.publication = publication;
    }

    if (no_of_pages) {
      data.no_of_pages = no_of_pages;
    }

    if (price_of_book) {
      data.price_of_book = price_of_book;
    }

    if (url && public_id) {
      data.cover_Image = {
        url: url,
        public_id: public_id,
      };
    }

    const book = await Book.findByIdAndUpdate({ _id: req.params.id }, data, {
      new: true,
    });

    res.json({
      message: "Successfully book details updated",
      status: "ok",
    });
  } catch (err) {
    console.log(err);
  }
};

export const activeInActive = async (req, res) => {
  try {
    const { status } = req.body;
    //console.log(status, req.params.id);

    const book = await Book.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: { active: status },
      },
      { new: true }
    );
    res.json({
      status: "ok",
      message: "Success",
    });
  } catch (err) {
    res.json({ err: err });
    console.log(err);
  }
};

export const addImage = async (req, res) => {
  // console.log("req files => ", req.files);
  try {
    if (!req.files.file) {
      return res.json({ status: "ok" });
    }
    const result = await cloudinary.uploader.upload(req.files.file.path);
    //console.log("uploaded image url => ", result);
    res.json({
      status: "ok",
      message: "Success",
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (err) {
    res.json({
      error: err,
    });
    console.log(err);
  }
};

export const deleteBook = async (req, res) => {
  // console.log(req.params.id);
  const book = await Book.findById({ _id: req.params.id });
  try {
    if (book) {
      await cloudinary.uploader.destroy(book.cover_Image.public_id);
    }

    await Book.findByIdAndDelete({ _id: req.params.id });

    res.json({
      status: "ok",
      message: "Successfully Deleted Book",
    });
  } catch (err) {
    res.jason({ error: err });
    console.log(err);
  }
};
