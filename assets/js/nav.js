const navbar = document.getElementById('site-nav');

function onScroll() {
  if (window.pageYOffset > 0) {
    navbar.classList.add("nav-shadow");
  } else {
    navbar.classList.remove("nav-shadow");
  }
}

// TODO: add throttling
// const throttledOnScroll = _.throttle(onScroll, 100, {})
window.addEventListener('scroll', onScroll)