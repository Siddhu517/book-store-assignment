import React, { useState, useEffect, useRef } from "react";
import AddBook from "../AddBook";
import ListBooks from "./../ListBooks";
import {
  bookStoreList,
  addBook,
  addImage,
  bookStoreListActive,
} from "../../servises/api";
import { toast } from "react-toastify";

const Home = () => {
  const [bookData, setBookdata] = useState([]);

  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    fetchALL();
  }, []);

  const formRef = useRef();

  const fetchALL = async () => {
    const { data } = await bookStoreList();
    setBookdata(data.bookList);
    console.log(data.bookList);
  };

  const fetchActive = async () => {
    const { data } = await bookStoreListActive();
    setBookdata(data.bookList);
    console.log(data.bookList);
  };


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
    if (!file) {
      toast.error("All fields are required!");
      return;
    }
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

  const resetData = () => {
    /* reset data */
    formRef.current.reset();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await handleImageSubmit();
      const { url, public_id } = res;
      //console.log(url, public_id, formData);
      const BookDetails = { url, public_id, formData };
      const { data } = await addBook(BookDetails);
      if (data.status !== "ok") {
        toast.error(data.error);
        return;
      }
      /* reset data */
      formRef.current.reset();
      toast.success(data.message);
      setIsLoading(false);
      fetchALL();
      // console.log(data.message);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  return (
    <div className="container-fluid m-0 p-0">
      <div className="d-flex justify-content-start align-items-start">
        <button
          className="btn btn-primary rounded-pill m-4"
          data-bs-toggle="modal"
          data-bs-target="#AddBook"
        >
          Add Book
        </button>
        <button
          className="btn btn-info rounded-pill m-4"
          onClick={fetchActive}
        >
         Filter Active Books
        </button>
        <button className="btn btn-success rounded-pill m-4" onClick={fetchALL}>
          All Books
        </button>
        <AddBook
          id="AddBook"
          handleSubmit={handleSubmit}
          onChangeImage={onChangeImage}
          onChangeData={onChangeData}
          resetData={resetData}
          formRef={formRef}
          isLoading={isLoading}
        />
      </div>

      <ListBooks bookData={bookData} />
    </div>
  );
};

export default Home;
