const formatName = (user: { firstName: string; lastName: string }) => {
  let { firstName } = user;
  let { lastName } = user;
  firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
  lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1);
  return `${firstName} ${lastName}`;
};

export { formatName };
