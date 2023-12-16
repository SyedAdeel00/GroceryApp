// productDetails.js
const getProductDetails = async (productId) => {
    const response = await fetch(`https://dummyjson.com/products/${productId}`);
    const data = await response.json();
    return data;
  };
  
  export default getProductDetails;
  