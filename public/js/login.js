const loginFormHandler = async event => {
    event.preventDefault();

    const email = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
    console.log(email, password);

    if (email && password) {
      try{
        let response = await fetch('/api/users/login', {
          method: 'POST',
          body: JSON.stringify({ email, password }),
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
          document.location.replace('/');
        } else {
          response = await response.json();
          alert(`Failed to log in. ${response.message}`);
        }
      }
      catch (err){
        console.log(err);
      }
    }
  };
//   const el = document.getElementById('login-submit');
// if(el){
//   el.addEventListener('click', loginFormHandler);
// }
  document.querySelector('#login-submit').addEventListener('click', loginFormHandler);