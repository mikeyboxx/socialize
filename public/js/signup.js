const signupFormHandler = async event => {
    event.preventDefault();

    const firstName = document.querySelector('#first-name-signup').value.trim();
    const lastName = document.querySelector('#last-name-signup').value.trim();
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-login').value.trim();
    console.log(firstName, lastName, username, email, password);

    if (firstName && lastName && username && email && password) {
      try{
        let response = await fetch('/api/users/signup', {
          method: 'POST',
          body: JSON.stringify({firstName, lastName, username, email, password }),
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

  document.querySelector('#signup-submit').addEventListener('click', signupFormHandler);