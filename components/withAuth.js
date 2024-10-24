'use client';
import { redirect, usePathname } from 'next/navigation';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../src/reducer/userReducer';

const withAuth = (WrappedComponent) => {
  const Auth = (...props) => {
    const pathName = usePathname();
    const dispatch = useDispatch();
    const { user, loading } = useSelector((state) => state.user);

    const userId =
      typeof window != 'undefined' && localStorage.getItem('userId');

    useEffect(() => {
      if (userId && !user) {
        dispatch(getUser(userId));
      }
    }, [user, userId]);

    useEffect(() => {
      const path = pathName;
      if (
        user != '' &&
        !loading &&
        (path === '/signIn' || path === '/signUp')
      ) {
        return redirect('/');
      } else if (
        user?.role !== 'admin' &&
        !loading &&
        (path == '/addCategory' ||
          path == '/addProducts' ||
          path == '/orders')
      ) {
        return redirect('/');
      }
    }, [loading, pathName, user]);

    if (loading || typeof window === 'undefined') {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return Auth;
};

export default withAuth;
