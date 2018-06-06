Carousel.prototype.arrow = function () {
    $('#right').on('click', function () {
        if(thumbailLength == carousel.image.length) {
            i=0;
            thumbailLength = 3;
            carousel.render(i, thumbailLength);
        }
        else
        {
            thumbailLength++;
            i++;
            carousel.render(i, thumbailLength);
        }
    });

    $('#left').on('click', function () {
        if(i==0) {
            i = carousel.image.length - thumbailLength;
            thumbailLength = carousel.image.length;
            carousel.render(i, thumbailLength);
        }
        else {
            thumbailLength--;
            i--;
            carousel.render(i, thumbailLength);
        }
    });
};

var carousel = new Carousel([
    'images/el1.jpg',
    'images/el2.jpg',
    'images/el3.jpg',
    'images/el4.jpg',
    'images/el5.jpg'
],[
    '1000',
    '2000',
    '3000',
    '4000',
    '5000'
]);

carousel.basketRender();
carousel.render(i, thumbailLength);
