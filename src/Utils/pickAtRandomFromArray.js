export const pickAtRandomFromArray = (array) => {
  const { length } = array;
  const index = Math.floor(Math.random() * length);
  return array[index];
};
