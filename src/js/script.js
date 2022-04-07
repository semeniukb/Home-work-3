const slider = tns({
  container: ".carousel__inner",
  items: 1,
  slideBy: "page",
  controls: false,
  autoplay: false,
  speed: 1000,
  responsive: {
    576: {
      nav: true,
    },
    768: {},
    992: {
      items: 1,
      nav: false,
    },
  },
});
document.querySelector(".prev").addEventListener("click", function () {
  slider.goTo("prev");
});
document.querySelector(".next").addEventListener("click", function () {
  slider.goTo("next");
});
