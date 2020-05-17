const paragraphs = [
  "Welcome! Thanks for swinging by. I'm Ryan.",
  "Don't worry, I'm not a computer.",
  "I identify more closely as a software engineer, writer, and human being."
];
let i = 0;
let paragraphIdx = 0;
let currentPTag;
const speed = 50;
const transitionDelay = 500;

function typeWelcomeMessage() {
  const text = paragraphs[paragraphIdx];
  if (i == 0) {
    currentPTag = document.createElement("p");
    document.getElementById('welcome-message').appendChild(currentPTag);
  }

  if (i < text.length) {
    const c = text.charAt(i);
    i++;
    currentPTag.innerHTML += c;
    setTimeout(typeWelcomeMessage, speed);
  } else if (paragraphIdx < paragraphs.length - 1) {
    paragraphIdx++;
    i = 0;
    setTimeout(typeWelcomeMessage, transitionDelay);
  }
  else {
    setTimeout(showLogin, transitionDelay);
  }
}

function showLogin() {
  document.getElementById('login-btn').style.visibility = 'visible';
}

setTimeout(typeWelcomeMessage, transitionDelay);