const getCartLocal = () => JSON.parse(localStorage.getItem('cart'));

const addCardClick = (product) => {
  if (!JSON.parse(localStorage.getItem('cart'))) {
    localStorage.setItem('cart', JSON.stringify([]));
  }
  const favoritos = getCartLocal();
  localStorage.setItem('cart', JSON.stringify([...favoritos, product]));
};

export default addCardClick;
