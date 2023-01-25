import React from "react";
import { useNavigate } from "react-router";

const ListBooks = ({ bookData }) => {
  const router = useNavigate();
  return (
    <div className="h-100 w-100 bg-light bg-opacity-50 p-4">
      {bookData && bookData.length > 0 ? (
        <table className="table table-hover ">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Img</th>
              <th scope="col">Book Title</th>
              <th scope="col">Author</th>
              <th scope="col">Type of Book</th>
              <th scope="col">Genre of Book</th>
              <th scope="col">Publication</th>
              <th scope="col">No of Pages</th>
              <th scope="col">Status</th>
              <th scope="col">Price of book</th>

            </tr>
          </thead>
          <tbody>
            {bookData &&
              bookData.map((book, i) => (
                <tr
                  key={book._id}
                  onClick={() => router(`/book-details/${book._id}`)}
                  role="button"
                >
                  <th scope="row">{i+1}</th>
                  <th scope="col" className="">
                    <img
                      src={book?.cover_Image?.url}
                      alt={book.cover_Image.public_id}
                      className="img-fluid"
                      style={{ height: "50px", width: "70px" }}
                    />
                  </th>
                  <th scope="col"> {book.book_title}</th>
                  <th scope="col"> {book.author}</th>
                  <th scope="col"> {book.type_of_book}</th>
                  <th scope="col"> {book.genre_of_book}</th>
                  <th scope="col"> {book.publication}</th>
                  <th scope="col"> {book.no_of_pages}</th>
                  <th scope="col"> {book.active?"Active":"In-active"}</th>
                  <th scope="col"> $ {book.price_of_book}</th>
                </tr>
              ))}
          </tbody>
        </table>
      ) : (
        ""
      )}
    </div>
  );
};

export default ListBooks;
