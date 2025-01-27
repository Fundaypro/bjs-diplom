const testUser1 = { login: "oleg@demo.ru", password: "demo" },
  testUser2 = { login: "1", password: 1234 };
const userForm = new UserForm();
//login
userForm.loginFormCallback = (data) => {
  ApiConnector.login(data, (r) => {

    if (r.success) location.reload();
    else userForm.setLoginErrorMessage(r.error);
  });
};
//register
userForm.registerFormCallback = (data) => {
  ApiConnector.register(data, (responseBody) => {
    if (responseBody.success) {
      location.reload();
    } else {
      userForm.setRegisterErrorMessage(responseBody.error);
    }
  })
}

