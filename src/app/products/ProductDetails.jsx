'use client';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addReview, fetchReviews } from '../../reducer/reviewsReducer';
import { addItemToCart } from '../../reducer/cartReducer';
import { Container, Row } from 'react-bootstrap';
import ReviewsCard from '../../../components/UI/ReviewsCard';
import Swal from 'sweetalert2';
import { BsCart } from 'react-icons/bs';
import { fetchProduct } from '../../reducer/singleProductReducer';
import withAuth from '../../../components/withAuth';

const ProductDetails = ( productId ) => {
  const { push } = useRouter()
  

  const productData = productId[0].productId._id;

  // Redux hooks
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector((state) => state.product);
  const { reviews } = useSelector((state) => state.reviews);
  const { user } = useSelector((state) => state.user);
 
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const [cartQuantity, setCartQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch product details and reviews on component mount
  useEffect(() => {
    dispatch(fetchProduct(productData));
    dispatch(fetchReviews(productData));
  }, [dispatch, productData]);

  const handleIncrement = () => {
    setCartQuantity(cartQuantity + 1);
    onChange(cartQuantity + 1);
  };

  const handleDecrement = () => {
    if (cartQuantity > 1) {
      setCartQuantity(cartQuantity - 1);
      onChange(cartQuantity - 1);
    }
  };

  const handleAddToCart = async () => {
    try {
      dispatch(
        addItemToCart({
          productId: productData,
          userId: user._id,
          cartQuantity,
        })
      );
      setCartQuantity(1);
      Swal.fire({
        icon: 'success',
        title: 'Successfully Added to cart ',
        text: 'Thank you!',
        confirmButtonText: 'Ok',
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong! Please try again later.',
        confirmButtonText: 'Ok',
      });
    }
  };

  const handleAddReview = async () => {
    try {
      dispatch(
        addReview({
          rating,
          comment,
          productId: productData,
          userId: user._id,
        })
      );
      setRating('');
      setComment('');
      closeReviewModal();
      Swal.fire({
        icon: 'success',
        title: 'Review submitted!',
        text: 'Thank you for your review',
        confirmButtonText: 'Ok',
      });
    } catch (error) {
      console.error('Error adding review:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong! Please try again later.',
        confirmButtonText: 'Ok',
      });
    }
  };

  const openReviewModal = () => {
    setIsModalOpen(true);
  };

  const closeReviewModal = () => {
    setIsModalOpen(false);
  };

  if (loading) {
    return <div className="flex justify-center items-center ">Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Container fluid>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-center items-center lg:justify-start">
          <div className="w-full lg:w-1/2 lg:pr-8 mb-4 lg:mb-0">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full rounded-lg border-1 border-gray-400"
            />
          </div>
          <div className="w-full lg:w-1/2 lg:pl-8">
            <h2 className="text-[2.1vmax] font-bold mb-4">{product.name}</h2>
            <p className="text-[1.1vmax] mb-4">
              <strong>Price:</strong> Rs. {product.price}
            </p>
            <p className="mb-4 text-[1vmax] text-justify">
              <strong>Description:</strong> {product.description}
            </p>
            <div className="mb-3">
              <button
                className={`bg-gray-200 py-2 px-3 ${
                  cartQuantity === 1 ? 'bg-gray-50' : 'hover:bg-gray-300 '
                } text-1`}
                onClick={handleDecrement}
                disabled={cartQuantity === 1}
              >
                -
              </button>
              <span className="px-3 text-1">{cartQuantity}</span>
              <button
                className="bg-gray-200 py-2 px-3 hover:bg-gray-300 text-1 "
                onClick={handleIncrement}
              >
                +
              </button>
            </div>
            {user ? (
              <button
                className="bg-orange-600 hover:bg-orange-700 mr-2 text-white font-bold py-2 px-2 shadow-md"
                onClick={handleAddToCart}
              >
                Add to Cart <BsCart className="inline justify-center" />
              </button>
            ) : (
              <button
                className="bg-orange-600 hover:bg-orange-700 mr-2 text-white font-bold py-2 px-6 shadow-md"
                onClick={() => push('/signIn')}
              >
                Add to Cart
              </button>
            )}
            {user && (
              <button
                onClick={openReviewModal}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 shadow-md mt-2"
              >
                Add Review
              </button>
            )}
            {!user && (
              <button
                onClick={() => push('/signIn')}
                className="bg-blue-500  hover:bg-blue-700 text-white font-bold py-2 px-6 shadow-md mt-2"
              >
                Add Review
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Review section */}
      <Container className="pb-3">
        <Row sm={4} xs={2} className="text-center items-center justify-center">
          {reviews?.map((review) => (
            <ReviewsCard
              key={review._id}
              firstName={review.userId.firstName}
              date={review.createdAt}
              comment={review.comment}
              rating={review.rating}
            />
          ))}
          {reviews.length === 0 && (
            <h1 className="text-[2vmax]">No Review Yet.</h1>
          )}
        </Row>
      </Container>

      {/* Add review modal */}
      {isModalOpen && (
        <div className="fixed z-100000 top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Add Review</h2>
            <div className="flex items-center mb-4">
              <span className="text-lg mr-2">Rating:</span>
              {[1, 2, 3, 4, 5].map((index) => (
                <span
                  key={index}
                  className={`cursor-pointer text-2xl ${
                    index <= rating ? 'text-yellow-500' : 'text-gray-300'
                  }`}
                  onClick={() => setRating(index)}
                >
                  ★
                </span>
              ))}
            </div>
            <textarea
              placeholder="Comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="border border-gray-300 rounded-md p-2 mb-2 w-full"
            />
            <div className="flex justify-end">
              <button
                onClick={handleAddReview}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mr-2"
              >
                Submit
              </button>
              <button
                onClick={closeReviewModal}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default withAuth(ProductDetails);
