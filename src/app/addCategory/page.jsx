'use client';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import {
  addCategory,
  deleteCategory,
  fetchCategory,
  updateCategory,
} from '../../reducer/categoryReducer';

const CategoryPage = () => {
  
  const { categories } = useSelector((state) => state.category);
  //Local State for input filed
  const [name, setName] = useState('');
  const [editing, setEditing] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategory());
    }
  }, [dispatch, categories]);
  //Function to add category
  const handleAddCategory = async () => {
    try {
      await dispatch(addCategory({ name }));
      setName('');

      //show success message with hook auto-hide
      Swal.fire({
        icon: 'success',
        title: 'Category Added!',
        text: 'The category has been successfully added!',
        timer: 1000,
        timerProgressBar: true,
        allowOutsideClick: false, //prevent dismissing by clicking outside
      });
    } catch (error) {
      console.error('Error adding category', error);
      //show error message

      Swal.fire({
        icon: 'error',
        title: 'Oops....',
        text: 'Something went wrong ! Please try again later.',
        confirmButtonText: 'OK',
        allowOutsideClick: false, //Prevent dimissing by clicking outside
      });
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await dispatch(deleteCategory(id));

      //success message
      Swal.fire({
        title: 'Deleted!',
        text: 'Your category has been Deleted!',
        icon: 'success',
      });
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleEditCategory = (edit) => {
    setName(edit.name);
    setEditing(edit._id);
  };

  const handleUpdateCategory = async () => {
    try {
      await dispatch(
        updateCategory({ categoryId: editing, categoryData: { name } })
      );
      setName('');
      setEditing(null);
      //success message
      Swal.fire({
        title: 'Updated!',
        text: 'Your Category has been updated!',
        icon: 'success',
      });
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };
  return (
    <div className="conatiner mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-6">Category</h1>
      {/* Add/Edit Category */}
      <div className="mb-6">
        <h2 className="text=xl font-semibold mb-2 ">Add/Edit Category </h2>
        <div className="flex flex-col md:flex-row">
          {/* Input field for category name */}
          <input
            type="text"
            placeholder="Enter category name"
            className="border border-gray-300 rounded-md p-2 w-full md:mr-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          {/* Button adding/editing category */}
          {editing ? (
            <button
              onClick={handleUpdateCategory}
              className="bg-blue-500 text-white px-4 py-2 rounded-md md:ml-2"
            >
              Update Category
            </button>
          ) : (
            <button
              onClick={handleAddCategory}
              className="bg-green-500 text-white px-4 py-2 rounded-md md:ml-2"
            >
              AddCategory
            </button>
          )}
        </div>
      </div>

      {/* View Category */}
      <div className="overflow-x-auto">
        <h2 className="text-xl font-semibold mb-2 ">View Category</h2>
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2 font-semibold">
                Name
              </th>
              <th className="border border-gray-300 px-4 py-2 font-semibold">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Mapping through categories to display in a table */}
            {categories?.map((item) => (
              <tr key={item._id}>
                <td className="border border-gray-300 px-4 py-2">
                  {item.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {/* Button for editing and deleting */}
                  <div className="flex flex-wrap">
                    <button
                      onClick={() => handleEditCategory(item)}
                      className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2 mb-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(item._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded-md mb-2 "
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryPage;
