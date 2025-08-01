export const formatCurrency = (value) => {
    const number = parseFloat(value);
    if (isNaN(number)) {
        return 'N/A';
    }
    return `₱${number.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })}`;
};