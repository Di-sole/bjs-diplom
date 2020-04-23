'use strict';

const userForm = new UserForm();

userForm.loginFormCallback = data => {
    const callback = (response) => {
        if (response.success) {
            location.reload();
        } else {
            userForm.setLoginErrorMessage(response.data);
        }
    }

    ApiConnector.login(data, callback);
}

userForm.registerFormCallback = data => {
    const callback = (response) => {
        if (response.success) {
            location.reload();
        } else {
            userForm.setRegisterErrorMessage(response.data);
        }
    }

    ApiConnector.register(data, callback);
}