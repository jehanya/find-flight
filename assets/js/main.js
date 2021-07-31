var swiper = new Swiper('.home--slide', {
    slidesPerView: 2,
    centeredSlides: true,
    spaceBetween: 30,
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        dynamicBullets: true,
    },
});

var swiper = new Swiper('.recommendation--slide2', {
    slidesPerView: 1,
    centeredSlides: true,
    loop: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});


$('.input-group').datepicker({
    format: "yyyy M dd D"
});
