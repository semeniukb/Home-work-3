let slider = tns({
  container: ".carousel__inner",
  items: 1,
  slideBy: "page",
  controls: false,
  autoplay: false,
  speed: 1000,
  nav: false,
  navPosition: "bottom",
  responsive: {
    320: {
      nav: true,
    },
    768: {
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

$(document).ready(function () {
  $("ul.catalog__tabs").on(
    "click",
    "li:not(.catalog__tab_active)",
    function () {
      $(this)
        .addClass("catalog__tab_active")
        .siblings()
        .removeClass("catalog__tab_active")
        .closest("div.container")
        .find("div.catalog__content")
        .removeClass("catalog__content_active")
        .eq($(this).index())
        .addClass("catalog__content_active");
    }
  );

  function toggleSlide(item) {
    $(item).each(function (i) {
      $(this).on("click", function (e) {
        e.preventDefault();
        $(".catalog-item__content")
          .eq(i)
          .toggleClass("catalog-item__content_active");
        $(".catalog-item__list").eq(i).toggleClass("catalog-item__list_active");
      });
    });
  }
  toggleSlide(".catalog-item__link");
  toggleSlide(".catalog-item__back");

  //Modal
  $('[data-modal=consultation]').on('click', function(){
    $('.overlay, #consultation').fadeIn('slow');
  });
  $('.modal__close').on('click', function(){
    $('.overlay, #consultation, #thanks, #order').fadeOut();  
  });
  
  $('.button_mini').each(function(i){
    $(this).on('click', function(){
      $('#order .modal__subheader').text($('.catalog-item__subtitle').eq(i).text());
      $('.overlay, #order').fadeIn('slow');
    });
  });

  const overlay = document.querySelector('.overlay');
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      $('.overlay, #consultation, #thanks, #order').fadeOut();  
    }
  });

  function validateForms(form){
    $(form).validate({
      rules: {
        name: {
          required: true,
          minlength: 2
        },
        phone: 'required',
        email: {
          required: true,
          email: true
        }},
      messages: {
        name: {
          required:"Введіть будь ласка ваше ім'я",
          minlength: jQuery.validator.format("Введіть більше {0} символів")
        },
        phone: "Введіть ваш номер телефону",
        email: {
          required: "Введіть вашу пошту",
          email: "Введіть коректу форму емейл@mail.com"
        }
      }
    });
  };
  validateForms('#consultation-form');
  validateForms('#order form');
  validateForms('#consultation form');

  $('input[name=phone]').mask("+38 (999) 999-99-99");

  $('form').submit(function(e){
    e.preventDefault();

    if(!$(this).valid()) {
      return;
    }

    $.ajax({
      type:'POST',
      url:"mailer/smart.php",
      data: $(this).serialize()
    }).done(function(){
      $(this).find('input').val('')
      $('#consultation, #order').fadeOut()
      $('.overlay, #thanks').fadeIn('slow');

      $('form').trigger('reset');
    });
    return false;
  });

  // PageUP and scroll
  $(window).scroll(function(){
    if ($(this).scrollTop() > 1600){
      $('.pageup').fadeIn();
    } else {
      $('.pageup').fadeOut();
    }
  });

  $("a").on('click', function(event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 100, function(){

        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });

  new WOW().init();
});

