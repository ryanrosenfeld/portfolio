const navbar = document.getElementById('site-nav');
const minHeightForShadow = 30;

function onScroll() {
  if (window.pageYOffset > minHeightForShadow) {
    navbar.classList.add("nav-shadow");
  } else {
    navbar.classList.remove("nav-shadow");
  }
}

// TODO: add throttling
// const throttledOnScroll = _.throttle(onScroll, 100, {})
window.addEventListener('scroll', onScroll)
onScroll();