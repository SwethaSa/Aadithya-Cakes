// export const isLoggedIn = () => {
//     return !!localStorage.getItem('token');
//   };


export const isLoggedIn = () => {
  const token = localStorage.getItem('token');
  if (token) {
    const expirationDate = new Date(new Date().getTime() + 2 * 60 * 60 * 1000);
    const tokenExpirationDate = new Date(JSON.parse(atob(token.split('.')[1])).exp * 1000);
    if (tokenExpirationDate < new Date() || expirationDate < new Date()) {
      alert('Your session has expired. Please log in again.');
      return false;
    }
    return true;
  }
  return false;
};
