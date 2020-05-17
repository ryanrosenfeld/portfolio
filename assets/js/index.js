const text = `
  Welcome! Thanks for swinging by.
  I'm Ryan. I'm a software engineer... but maybe you could already guess?
`;
let i = 0;
const speed = 50;
const initialDelay = 500;
const showLoginDelay = 500;

function typeWelcomeMessage() {
  if (i < text.length) {
    const c = text.charAt(i);
    i++;
    document.getElementById('welcome-message').innerHTML += c;
    setTimeout(typeWelcomeMessage, speed);
  } else {
    setTimeout(showLogin, showLoginDelay);
  }
}

function showLogin() {
  document.getElementById('login-btn').style.visibility = 'visible';
}

setTimeout(typeWelcomeMessage, initialDelay);