import React from "react";

interface CurrencyProps {
  quantity: number;
  currency?: string;
}

const Currency: React.FC<CurrencyProps> = ({ quantity, currency = "USD" }) => {
  const formatCurrency = (amount: number, currencyCode: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currencyCode,
    }).format(amount);
  };

  return <span>{formatCurrency(quantity, currency)}</span>;
};

export default Currency;
