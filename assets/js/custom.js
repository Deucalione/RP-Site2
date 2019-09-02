var WOW = new WOW().init();


$('.home-anim-img-cop').on('mouseover', function (e) {
    $('.home-anim-img-cop').addClass('animated');
    $('.home-anim-img-cop').addClass('pulse');
});

$('.home-anim-img-cop').on('mouseout', function (e) {
    $('.home-anim-img-cop').removeClass('animated');
    $('.home-anim-img-cop').removeClass('pulse');
});
$('.home-anim-img-bandit').on('mouseover', function (e) {
    $('.home-anim-img-bandit').addClass('animated');
    $('.home-anim-img-bandit').addClass('pulse');
});

$('.home-anim-img-bandit').on('mouseout', function (e) {
    $('.home-anim-img-bandit').removeClass('animated');
    $('.home-anim-img-bandit').removeClass('pulse');
});

$('.fa-laptop').on('mouseover', function (e) {
    $('.fa-laptop').addClass('animated');
    $('.fa-laptop').addClass('pulse');
    $('.fa-laptop').addClass('makkord-color');
});

$('.fa-laptop').on('mouseout', function (e) {
    $('.fa-laptop').removeClass('animated');
    $('.fa-laptop').removeClass('pulse');
    $('.fa-laptop').removeClass('makkord-color');
});
$('.fa-users').on('mouseover', function (e) {
    $('.fa-users').addClass('animated');
    $('.fa-users').addClass('pulse');
    $('.fa-users').addClass('makkord-color');
});

$('.fa-users').on('mouseout', function (e) {
    $('.fa-users').removeClass('animated');
    $('.fa-users').removeClass('pulse');
    $('.fa-users').removeClass('makkord-color');
});
$('.fa-car').on('mouseover', function (e) {
    $('.fa-car').addClass('animated');
    $('.fa-car').addClass('pulse');
    $('.fa-car').addClass('makkord-color');
});

$('.fa-car').on('mouseout', function (e) {
    $('.fa-car').removeClass('animated');
    $('.fa-car').removeClass('pulse');
    $('.fa-car').removeClass('makkord-color');
});
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

let btnAvatar = $('#btnAvatar');

btnAvatar.on('click', (e) => {
    let avatars = ['woman-1.png', 'woman-2.png','woman-3.png','woman-4.png','woman-5.png','man-3.png', 'man-4.png','man-5.png','man-6.png', 'man-7.png', 'man-8.png'];
    let count = avatars.length;
    let avatarRand = getRandomInt(0, count-1);
    const avatar = avatars[avatarRand];
    $.ajax({
        url: 'account/avatar',
        type: 'POST',
        headers: {
            "content-type": "application/json",
            "dataType": "json"
        },
        data: JSON.stringify({"avatar": avatar}),
        cache: false,
        success: function(){
            $(".avatar_").attr("src", "/assets/images/avatar/"+ avatar);
        }

    });
});