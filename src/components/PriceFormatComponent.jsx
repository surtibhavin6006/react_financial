const PriceFormatComponent = ({ amount }) => {
    const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 2,
    }).format(amount);

    return <span>{formatted}</span>;
};

export default PriceFormatComponent;