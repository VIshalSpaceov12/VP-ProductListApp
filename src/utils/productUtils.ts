import {Product, SortOrder} from '../types';

export const filterProducts = (
  products: Product[],
  searchTerm: string,
): Product[] => {
  if (searchTerm?.length < 3) {
    return products;
  }

  const lowerSearch = searchTerm.toLowerCase();

  return products.filter(product => {
    const titleMatch = product?.title.toLowerCase().includes(lowerSearch);
    const tagMatch = product?.tags.some(tag =>
      tag.toLowerCase().includes(lowerSearch),
    );
    return titleMatch || tagMatch;
  });
};

export const sortProducts = (
  products: Product[],
  order: SortOrder,
): Product[] => {
  if (order === 'none') {
    return products;
  }

  return [...products].sort((a, b) => {
    if (order === 'asc') {
      return a.price - b.price;
    }
    return b.price - a.price;
  });
};
