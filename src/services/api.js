export async function getCategories() {
  const endpoint = 'https://api.mercadolibre.com/sites/MLB/categories';
  const response = await fetch(endpoint);
  const responseJSON = await response.json();
  return responseJSON;
}

export async function getProductsFromCategoryAndQuery(category, query) {
  const endpoint = `https://api.mercadolibre.com/sites/MLB/search?category=${category}&q=${query}`;
  const response = await fetch(endpoint);
  const responseJSON = await response.json();
  return responseJSON;
}

export async function getProductById(id) {
  const endpoint = `https://api.mercadolibre.com/sites/MLB/search?category=${id}`;
  const response = await fetch(endpoint);
  const responseJSON = await response.json();
  return responseJSON;
}
