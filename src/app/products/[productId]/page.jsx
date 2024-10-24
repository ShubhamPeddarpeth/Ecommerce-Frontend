import { baseUrl } from '../../../config';
import ProductDetails from '../ProductDetails';
export async function generateParams(id) {
  // Fetch all products from the API
  const response = await fetch(`${baseUrl}/products/${id}`).then((res) =>
    res.json()
  );

  return response;
}

export async function generateStaticParams() {
  // Fetch all products from the API
  const response = await fetch(`${baseUrl}/products`).then((res) => res.json());
  return response.map((product) => ({
    productId: product._id.toString(), // Ensure productId is returned as a string
  }));
}
const ProductPage = async ({ params }) => {
  const product_Id = await generateParams(params.productId);

  return <ProductDetails productId={product_Id} />;
};

export default ProductPage;
