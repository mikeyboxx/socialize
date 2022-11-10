const loginFormHandler = async event => {
    event.preventDefault();

    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
    console.log(email, password);


  document.querySelector('.login-form').addEventListener('submit', loginFormHandler);