import { useState } from "react";

export const useProductOptions = () => {
  const [selectedSize, setSelectedSize] = useState<string | undefined>();
  const [selectedColor, setSelectedColor] = useState<string | undefined>();

  const resetOptions = () => {
    setSelectedSize(undefined);
    setSelectedColor(undefined);
  };

  const hasRequiredOptions = (product: {
    size?: string[];
    color?: string[];
  }) => {
    const hasSizeOptions =
      !product.size || product.size.length === 0 || selectedSize;
    const hasColorOptions =
      !product.color || product.color.length === 0 || selectedColor;
    return hasSizeOptions && hasColorOptions;
  };

  return {
    selectedSize,
    setSelectedSize,
    selectedColor,
    setSelectedColor,
    resetOptions,
    hasRequiredOptions,
  };
};
