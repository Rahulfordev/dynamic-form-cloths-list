export const getClothFormLocalstorage = () => {
  const data = localStorage.getItem("cloth");
  return data ? JSON.parse(data) : [];
};
