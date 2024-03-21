export const formatAsNaira = (value: string): string => {
  // Remove non-numeric characters
  const numericValue = String(value).replace(/[^0-9]/g, "");

  // Add commas to the string for better readability
  const numberWithCommas = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Return the formatted value with the Naira symbol
  return `₦${numberWithCommas}`;
  // ₦
};
