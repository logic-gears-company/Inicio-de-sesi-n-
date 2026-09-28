const validUser = 'admin';
const validPass = '1234';

document.getElementById('loginForm').addEventListener('submit', e => {
  e.preventDefault();

  const user = document.getElementById('user').value.trim();
  const pass = document.getElementById('pass').value;

  const msgEl = document.getElementById('msg');

  if (user === validUser && pass === validPass) {
    msgEl.style.color = '#28a745';
    msgEl.textContent = '¡Inicio de sesión correcto!';
  } else {
    msgEl.style.color = '#d9534f';
    msgEl.textContent = 'Usuario o contraseña inválidos.';
  }
});