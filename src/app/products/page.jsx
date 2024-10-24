'use client';
import { useSearchParams } from 'next/navigation';
// import { useRouter } from 'next/router';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Row } from 'react-bootstrap';
import ProductCard from '../../../components/UI/ProductCard';
import { fetchProducts } from '../../reducer/productReducer';
const Products = () => {
  const searchParams = useSearchParams();
    const category = searchParams.get("category");
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.products);

  
  useEffect(() => {

    dispatch(fetchProducts(category || ''));
  }, [dispatch, category]);

  if (loading) {
    return <div className="flex justify-center items-center">Loading...</div>;
  }

  if (error) {
    return <div>Error:{error}</div>;
  }
  return (
    <Container fluid className="relative w-[100%] h-[100%] object-cover">
      <Container className="pt-[3vmax] pb-[5vmax]">
        <Row className="items-center justify-center">
          <Col>
            {products && products.length > 0 && (
              <h1 className="text-center mt-[2vmax] mb-[2vmax] font-bold text-[2.6vmax] underline">
                {products[0].category.name}
              </h1>
            )}
          </Col>
        </Row>
        {products.length === 0 && (
          <div className="text-[1.5vmax] text-center ">No products found</div>
        )}
        {products.length > 0 && (
          <Row
            sm={4}
            xs={2}
            className="flex flex-1 justify-center align-center"
          >
            {products?.map((item) => (
              <ProductCard
                key={item._id}
		 imageUrl={item.imageUrl}
		  name={item.name}
		   price={item.price}
		    description={item.description}
                id={item._id}
               
               
               
               
              />
            ))}
          </Row>
        )}
      </Container>
    </Container>
  );
};

export default Products;
