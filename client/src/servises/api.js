import axios from "axios";
const url = process.env.REACT_APP_PUBLIC_API;

export const bookStoreList = async () => {
  try {
    return await axios.get(`${url}/books-list`);
  } catch (err) {
    console.log(err);
  }
};

export const bookStoreListActive = async () => {
  try {
    return await axios.get(`${url}/books-list-active`);
  } catch (err) {
    console.log(err);
  }
};

export const getBook = async (id) => {
  try {
    return await axios.get(`${url}/get-book/${id}`);
  } catch (err) {
    console.log(err);
  }
};

export const addBook = async (BookDetails) => {
  try {
    return await axios.post(`${url}/add-book`, BookDetails);
  } catch (err) {
    console.log(err);
  }
};

export const updateBook = async (BookDetails, id) => {
  try {
    return await axios.put(`${url}/update-book/${id}`, BookDetails);
  } catch (err) {
    console.log(err);
  }
};

export const activeInActive = async (id, status) => {
  try {
    return await axios.put(`${url}/active-inactive/${id}`, { status });
  } catch (err) {
    console.log(err);
  }
};

export const addImage = async (formData) => {
  try {
    return await axios.post(`${url}/add-image`, formData);
  } catch (err) {
    console.log(err);
  }
};

export const deleteBook = async (id) => {
  try {
    return await axios.delete(`${url}/delete-book/${id}`);
  } catch (err) {
    console.log(err);
  }
};
