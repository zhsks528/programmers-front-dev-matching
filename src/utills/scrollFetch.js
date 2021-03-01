import { throttling } from "./throttle.js";

const throttler = throttling();

export function scrollFetch(fetchData) {
  window.addEventListener("scroll", () => {
    throttler.throttle(() => {
      console.log("Activate Scroll Event");
      if (getScrollTop() < getDocumentHeight() - window.innerHeight) return;
      fetchData();
    }, 700);
  });
}

function getScrollTop() {
  return window.pageYOffset !== undefined
    ? window.pageYOffset
    : (document.documentElement || document.body.parentNode || document.body)
        .scrollTop;
}

function getDocumentHeight() {
  const html = document.documentElement;
  const body = document.body;

  return Math.max(
    html.clientHeight,
    html.offsetHeight,
    html.scrollHeight,
    body.offsetHeight,
    body.scrollHeight
  );
}
