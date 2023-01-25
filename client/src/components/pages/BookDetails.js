import React, { useState, useEffect } from "react";
import UpdateBook from "../UpdateBook";
import { toast } from "react-toastify";

import {
  activeInActive,
  getBook,
  deleteBook,
  addImage,
  updateBook,
} from "../../servises/api";
import { useNavigate } from "react-router";

const BookDetails = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [bookId, setBookId] = useState("");
  const [book, setBook] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAPI = async () => {
      //console.log(window.location.pathname.slice(14));
      setBookId(window.location.pathname.slice(14));
      handleFetchBooKDetails();
    };
    fetchAPI();
  });

  /* fetch book details */
  const handleFetchBooKDetails = async () => {
    const { data } = await getBook(bookId);
    setBook(data.book);
    //console.log(book);
  };

  /* book status */
  const UpdateActiveInactive = async (id, status) => {
    try {
      const { data } = await activeInActive(id, status);
      handleFetchBooKDetails();
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleActive = (id) => {
    UpdateActiveInactive(id, true);
  };

  const handleDeActive = (id) => {
    UpdateActiveInactive(id, false);
  };

  /* delete book */
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure delete book?")) {
      return;
    }
    const { data } = await deleteBook(id);
    if (data.status !== "ok") {
      toast.error(data.error);
      return;
    }
    toast.success(data.message);
    navigate("/");
  };

  /* update book details */

  const [formData, setFormData] = useState({
    book_title: "",
    author: "",
    type_of_book: "",
    genre_of_book: "",
    publication: "",
    no_of_pages: "",
    price_of_book: "",
  });

  const [file, setFile] = useState(null);

  const onChangeData = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onChangeImage = (e) => {
    //console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  };

  const handleImageSubmit = async () => {
    const formData = new FormData();
    formData.append("file", file);
    const { data } = await addImage(formData);
    if (data.status !== "ok") {
      toast.error(data.error);
      setIsLoading(false);
      return;
    }
    toast.success(data.message);
    //console.log(data);
    return data;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await handleImageSubmit();
      const { url, public_id } = res;
      //console.log(url, public_id, formData);
      const BookDetails = { url, public_id, formData };
      const { data } = await updateBook(BookDetails, book._id);
      if (data.status !== "ok") {
        toast.error(data.error);
        return;
      }
      toast.success(data.message);
      setIsLoading(false);
      handleFetchBooKDetails();
      // console.log(data.message);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-center align-items-start">
        <div className="d-flex flex-column justify-content-center align-items-center">
          <img
            src={book?.cover_Image?.url}
            alt=""
            className=" shadow m-5"
            style={{ height: "20rem", width: "20rem" }}
          />
          <div className="button-group">
            <button
              className="btn border border-2"
              onClick={() => handleActive(book._id)}
              style={
                book.active === true
                  ? { backgroundColor: "blue", color: "white" }
                  : {}
              }
            >
              Active
            </button>
            <button
              className="btn border border-2"
              onClick={() => handleDeActive(book._id)}
              style={
                book.active === false
                  ? { backgroundColor: "red", color: "white" }
                  : {}
              }
            >
              In-Active
            </button>
          </div>
        </div>

        <div
          className="d-flex flex-column justify-content- align-items-start "
          style={{ height: "30rem", width: "35rem" }}
        >
          <div className="d-flex align-self-end gap-4 me-4 mt-4">
            <span
              className="fs-3 "
              role="button"
              data-bs-toggle="modal"
              data-bs-target="#updateBook"
            >
              <span className="text-primary">
                <ion-icon name="create"></ion-icon>
              </span>
            </span>
            <UpdateBook
              id="updateBook"
              book={book}
              handleSubmit={handleSubmit}
              onChangeImage={onChangeImage}
              onChangeData={onChangeData}
              isLoading={isLoading}
            />
            <span
              className="fs-3 text-danger"
              role="button"
              onClick={() => handleDelete(book._id)}
            >
              <ion-icon name="trash"></ion-icon>
            </span>
          </div>

          <div className=" d-flex flex-column justify-content- align-items-start ">
            <span className="fs-3 fw-bold mt-2 ms-3">
              Book Title :
              <span className=" fw-normal ms-3">{book.book_title}</span>
            </span>
            <span className="fs-3 fw-bold mt-2 ms-3">
              Author : <span className=" fw-normal ms-3">{book.author}</span>
            </span>
            <span className="fs-3 fw-bold mt-2 ms-3">
              Type of Book :
              <span className=" fw-normal ms-3">{book.type_of_book}</span>
            </span>
            <span className="fs-3 fw-bold mt-2 ms-3">
              Genre of Book :
              <span className=" fw-normal ms-3">{book.genre_of_book}</span>
            </span>
            <span className="fs-3 fw-bold mt-2 ms-3">
              Publication :
              <span className=" fw-normal ms-3">{book.publication}</span>
            </span>
            <span className="fs-3 fw-bold mt-2 ms-3">
              No of Pages :
              <span className=" fw-normal ms-3">{book.no_of_pages}</span>
            </span>
            <span className="fs-3 fw-bold mt-2 ms-3">
              Price of book :
              <span className=" fw-normal ms-3">{book.price_of_book}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
