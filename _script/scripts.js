/*-----------------------------------------------------------------------------------*/
/*  OWL CAROUSEL
/*-----------------------------------------------------------------------------------*/
jQuery(document).ready(function($) {
    $('.tv-bn-slider').owlCarousel({
        items: 1,
        nav: true,
        navText: ['<i class="icon-left-open-big"></i>', '<i class="icon-right-open-big"></i>'],
        dots: true,
        autoHeight: false,
        loop: true,
        margin: 0,
        autoplay:true,
        navContainerClass: 'owl-slider-nav',
        navClass: ['owl-slider-prev', 'owl-slider-next'],
        controlsClass: 'owl-slider-controls'
    });
});

