'use client';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategory } from '../../reducer/categoryReducer';
import {
  fetchProducts,
  addProducts,
  updateProduct,
  deleteProduct,
} from '../../reducer/productReducer';
import Swal from 'sweetalert2';
const ProductPage = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const { products } = useSelector((state) => state.products);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState();
  const [imageUrl, setImageUrl] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  useEffect(() => {
    dispatch(fetchCategory());
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddProduct = async () => {
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('price', price);
      formData.append('quantity', quantity);
      formData.append('description', description);
      formData.append('category', category);
      formData.append('imageUrl', imageUrl);
      dispatch(addProducts( formData ));
      resetForm();
      Swal.fire({
        icon: 'success',
        title: 'Product Added',
        text: 'The Product has been successfully added',
        timer: 1000,
        timerProgressBar: true,
        allowOutsideClick: false,
      });
    } catch (error) {
      console.error('Error Adding Product:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops....',
        text: 'Something went wrong, Please try again later',
        confirmButtonText: 'Ok',
        allowOutsideClick: false,
      });
    }
  };

  const handleEditProduct = (product) => {
    setName(product.name);
    setPrice(product.price);
    setQuantity(product.quantity);
    setDescription(product.description);
    setCategory(product.category._id);
    setIsEditing(true);
    setSelectedProductId(product._id);
  };

  const handleUpdateProduct = async () => {
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('price', price);
 formData.append('quantity', quantity);
      formData.append('description', description);
      formData.append('category', category);
      formData.append('imageUrl', imageUrl);

     
     
      dispatch(
        updateProduct({
          productsId: selectedProductId,
          productsData: formData,
        })
      );
      resetForm();
      Swal.fire({
        icon: 'success',
        title: 'Product Updated!',
        text: 'The product has been successfully updated. ',
        timer: 1000,
        timerProgressBar: true,
        allowOutsideClick: false,
      });
    } catch (error) {
      console.error('Error Updating Product!:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something Went Wrong!, Please try agian Later',
        confirmButtonText: 'Ok',
        allowOutsideClick: false,
      });
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      dispatch(deleteProduct(productId));
      Swal.fire({
        icon: 'success',
        title: 'Product Deleted!',
        text: 'The product has been successfully Deleted!',
        timer: 1000,
        timerProgressBar: true,
        allowOutsideClick: false,
      });
    } catch (error) {
      console.error('Error deleting product:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!, Please try again later',
        confirmButtonText: 'Ok',
        allowOutsideClick: 'false',
      });
    }
  };

  const resetForm = () => {
    setName('');
    setPrice('');
    setQuantity('');
    setCategory('');
    setDescription('');
    setImageUrl(null);
    setIsEditing(false);
    setSelectedProductId(null);
  };

  return (
    <div className="container p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="mb-4 grid grid-cols md:grid-cols-2 gap-4">
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2">
            {isEditing ? 'Edit Product' : 'Add Product'}
          </h2>
          <input
            type="text"
            placeholder="Name"
            className="border border-gray-300 rounded-md p-2 mb-2 w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Price"
            className="border border-gray-300 rounded-md p-2 mb-2 w-full"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <input
            type="number"
            placeholder="Quantity"
            className="border border-gray-300 rounded-md p-2 mb-2 w-full"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <textarea
            placeholder="Description"
            value={description}
            className="border border-gray-300 rounded-md p-2 mb-2 w-full"
            onChange={(e) => setDescription(e.target.value)}
          />
          <select
            className="border border-gray-300 rounded-md p-2 mb-2 w-full"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            {categories?.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
          <input
            type="file"
            className="mb-2"
            onChange={(e) => setImageUrl(e.target.files[0])}
          />
          <div className="flex justify-end items-center">
            {isEditing ? (
              <button
                onClick={handleUpdateProduct}
                className="bg-blue-500 text-white px-4 py-2 rounded-md w-full md:w-auto"
              >
                Update Product
              </button>
            ) : (
              <button
                onClick={handleAddProduct}
                className="bg-green-500 text-white px-4 py-2 rounded-md w-full md:w-auto"
              >
                Add Product
              </button>
            )}
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-xl font-bold mb-2 ">Product List</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead className="text-[.9vmax]">
            <tr>
              <th className="border border-gray-300 px-[.4vmax] py-2">Name</th>
              <th className="border border-gray-300 px-[.4vmax] py-2">Price</th>
              <th className="border border-gray-300 px-[.4vmax] py-2">Stock</th>
              <th className="border border-gray-300 px-[.4vmax] py-2">
                Description
              </th>
              <th className="border border-gray-300 px-[.4vmax] py-2">
                Category
              </th>
              <th className="border border-gray-300 px-[.4vmax] py-2">Image</th>
              <th className="border border-gray-300 px-[.4vmax] py-2">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => (
              <tr className="text-[.9vmax]" key={item._id}>
                <td className="border border-gray-300 px-[.4vmax] py-2">
                  {item.name}
                </td>
                <td className="border border-gray-300 px-[.4vmax] py-2">
                  {item.name}
                </td>
                <td className="border border-gray-300 px-[.4vmax] py-2">
                  {item.price}
                </td>
                <td className="border border-gray-300 px-[.4vmax] py-2">
                  {item.quantity}
                </td>
                <td className="border border-gray-300 px-[.4vmax] py-2">
                  {item.description}
                </td>
                <td className="border border-gray-300 px-[.4vmax] py-2">
                  {item.category.name}
                </td>
                <td className="border border-gray-300 px-[.4vmax] py-2">
                  <img
                    src={item.imageUrl}
                    className="h-16 w-16 object-cover"
                    alt="product"
                  />
                </td>
                <td className="border border-gray-300 px-[.4vmax] py-2">
                  <button
                    onClick={() => handleEditProduct(item)}
                    className="bg-blue-500 mt-1 text-white px-[.5vmax] py-1 rounded-md"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(item._id)}
                    className="bg-red-500 text-white mt-1 px-[.5vmax] py-1 rounded-md"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductPage;
