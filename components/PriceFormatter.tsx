// src/components/PriceFormatter.js


const PriceFormatter = ({ amount }) => {
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD', // change to 'NPR' for Nepali Rupees
  }).format(amount);

  return <span>{formattedPrice}</span>;
};

export default PriceFormatter;
