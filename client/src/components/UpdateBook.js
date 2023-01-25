import React from "react";

const UpdateBook = ({
  id,
  book,
  handleSubmit,
  onChangeImage,
  onChangeData,
  isLoading,
}) => {
  return (
    <div
      className="modal fade"
      id={id}
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex={-1}
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">
              Add Book Details
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body d-flex justify-content-center align-items-center">
            <form
              className="form w-100 p-2 "
              onSubmit={handleSubmit}
            >
              <div className="form-group">
                <label className="form-label">Book Title</label>
                <input
                  type="text"
                  name="book_title"
                  onChange={onChangeData}
                  className="form-control"
                  defaultValue={book.book_title}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Author</label>
                <input
                  type="text"
                  name="author"
                  onChange={onChangeData}
                  className="form-control"
                  defaultValue={book.author}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Type of Book</label>
                <input
                  type="text"
                  name="type_of_book"
                  onChange={onChangeData}
                  className="form-control"
                  defaultValue={book.type_of_book}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Genre of Book</label>
                <input
                  type="text"
                  name="genre_of_book"
                  onChange={onChangeData}
                  className="form-control"
                  defaultValue={book.genre_of_book}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Publication</label>
                <input
                  type="text"
                  name="publication"
                  onChange={onChangeData}
                  className="form-control"
                  defaultValue={book.publication}
                />
              </div>
              <div className="form-group">
                <label className="form-label">No of pages</label>
                <input
                  type="number"
                  name="no_of_pages"
                  onChange={onChangeData}
                  className="form-control"
                  defaultValue={book.no_of_pages}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Price of book</label>
                <input
                  type="number"
                  name="price_of_book"
                  onChange={onChangeData}
                  className="form-control"
                  defaultValue={book.price_of_book}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Cover Image</label>
                <input
                  type="file"
                  onChange={onChangeImage}
                  className="form-control"
                />
              </div>
              <div className="d-flex justify-content-end align-items-center m-3 gap-3">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span
                      className="spinner-border spinner-border-sm me-3 fs-4"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  ) : null}
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateBook;
