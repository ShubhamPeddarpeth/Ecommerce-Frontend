'use client';
import React, { useState } from 'react';
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Swal from 'sweetalert2';
import "sweetalert2/dist/sweetalert2.min.css"; // Import SweetAlert styles
import { useDispatch } from 'react-redux';
import { getUser } from '../../reducer/userReducer';
import withAuth from '../../../components/withAuth';
import axios from 'axios';
import { baseUrl } from '../../config';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);


  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await axios.post(`${baseUrl}/signIn`, {
        email,
        password,
      });

      Swal.fire({
        icon: 'success',
        title: 'Sign In successful! ',
        text: 'Redirecting to Home....',
        timer: 2000,
        showConfirmButton: false,
      }).then(() => {
        // store token and userId in local storage
        localStorage.setItem('token', response?.data?.token || '');
        localStorage.setItem('userId', response?.data?.user?._id || '');

        //dispatch getUser action to update user state
        dispatch(getUser(response?.data?.user?._id));
        router.push('/');
      });
    } catch (error) {
      console.error('Error signing in:', error);
      setError(error.response.data.message || 'Invalid email or password');
    } finally {
      //set loading state to false after completing
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-md p-8">
        <div className="text-center  mb-8">
          <h1 className="text-3xl font-bold text-green-600">
            Login to your Account
          </h1>
        </div>
        <div>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* //email input */}
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {/* Password input */}
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
              />

              {/* Eye button */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                {showPassword ? (
                  <IoEyeOffOutline className="h-6 w-6 text-gray-400" />
                ) : (
                  <IoEyeOutline className="h-6 w-6 text-gray-400" />
                )}
              </button>
            </div>
            {/* Error Message */}
            {error && (
              <div className="bg-red-500 text-white p-3 rounded-md">
                {error}
              </div>
            )}
            {/* Sign in */}
            <button
              type="submit"
              className="bg-green-500 text-white py-3 rounded-md w-full hover:bg-green-600 "
              disabled={loading}
            >
              {loading ? 'Loading...' : 'sign In'}
            </button>
          </form>
        </div>
        {/* Sign Up Link */}
        <div className="text-center mt-4">
          <p className="text-gray-600">
            New Here ?
            <Link href="/signUp" className="text-green-600 underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default withAuth(SignIn);
