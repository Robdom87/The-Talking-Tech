const loginFormHandler = async (event) => {
  event.preventDefault();

  //add to check to make sure the two passwords match

  const username = document.querySelector('#username').value.trim();
  const password = document.querySelector('#password').value.trim();

  if (username && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to log in');
    }
  }
};

const registerFormHandler = async (event) => {
  event.preventDefault();

  //add to check to make sure the two passwords match

  const username = document.querySelector('#regUsername').value.trim();
  const password = document.querySelector('#regPassword').value.trim();
  const repassword = document.querySelector('#regRePassword').value.trim();

  if (!password===repassword){
    alert('Passwords must match.');
    return;
  }

  if (username && password) {
    const response = await fetch('/api/users/', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to log in');
    }
  }
};

document
  .querySelector('#loginForm')
  .addEventListener('submit', loginFormHandler);

  document
  .querySelector('#registerForm')
  .addEventListener('submit', registerFormHandler);