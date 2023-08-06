const truncateText = (text: string | any, length: number) => {
  if (text.length > length) {
    return `${text.substring(0, length)}...`;
  }
  return text;
};

export default truncateText;
