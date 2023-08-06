const paginate = (arr: any[], itemsPerPage: number) => {
  const numberOfPages = Math.ceil(arr.length / itemsPerPage);

  const newArr = Array.from({ length: numberOfPages }, (_, index) => {
    const start = index * itemsPerPage;
    return arr.slice(start, start + itemsPerPage);
  });

  return newArr;
};

export default paginate;
