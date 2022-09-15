const AuthAPI = {
  isAuthenticated: false,
  signin(callback: VoidFunction) {
    AuthAPI.isAuthenticated = true;
    setTimeout(callback, 100);
  },
  signout(callback: VoidFunction) {
    AuthAPI.isAuthenticated = false;
    setTimeout(callback, 100);
  },
};

export { AuthAPI };
