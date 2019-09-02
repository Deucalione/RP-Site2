$('.fa-check-circle').on('mouseover', function (e) {
    $('.fa-check-circle').addClass('animated');
    $('.fa-check-circle').addClass('pulse');
    $('.fa-check-circle').addClass('makkord-color');
});

$('.fa-check-circle').on('mouseout', function (e) {
    $('.fa-check-circle').removeClass('animated');
    $('.fa-check-circle').removeClass('pulse');
    $('.fa-check-circle').removeClass('makkord-color');
});