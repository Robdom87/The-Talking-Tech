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
      alert('Failed to log in. Make sure your password is atleast 8 characters in length.');
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

let loginForm = document.querySelector('#loginForm');
let registerForm = document.querySelector('#registerForm');

function showRegister(){
  loginForm.style.display='none';
  registerForm.style.display='block';
}

function showLogin(){
  loginForm.style.display='block';
  registerForm.style.display='none';
}

document
  .querySelector('.loginToggle')
  .addEventListener('click', showLogin);

  document
  .querySelector('.registerToggle')
  .addEventListener('click', showRegister);


loginForm.addEventListener('submit', loginFormHandler);


registerForm.addEventListener('submit', registerFormHandler);