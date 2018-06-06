var thumbailLength = 3; // Конечная позиция вывода миниатюр в каруселе
var i = 0; // Начальная позиция вывода миниатюр в каруселе
var price = 0; //Общая сумма
var numberProd = []; // массив для кол-ва товара в корзине
var summProd = []; //массив для передачи суммы товара по id

function Carousel(image, price) {
    this.image = image;
    this.price = price;
}

Carousel.prototype.basketRender = function(){
    for (j=0; j<this.price.length; j++) {
        numberProd.push(1);
        summProd.push(0);
    }

    $('<div/>', {
        html: '<h4>Просто перетащите товар мышью</h4>',
        class: 'basket'
    }).appendTo($('#basket'));

    return {numberProd:numberProd, summProd:summProd};
};

Carousel.prototype.basketRefresh = function (id) {
    $('#basket').droppable({
        drop: function () {

            if($('.basket').children('#basketDiv' + id).length >= 1) {
                ++numberProd[id];
                summProd[id] = +carousel.price[id] * numberProd[id];
                $('#text' + id).text('Кол-во: ' + numberProd[id] + '; Cтоимость: ' + summProd[id]  + ' рублей');
            }
            else {
                summProd[id] = +carousel.price[id] * numberProd[id];

                var $basketProduct = $('<div/>', {
                    id: 'basketDiv' + id,
                    class: 'basket__product'
                }).appendTo($('.basket'));
    
                $('<img/>', {
                    class: 'basket__image',
                    src: carousel.image[id]
                }).appendTo($basketProduct);
    
                $('<p/>', {
                    id: 'text' + id,
                    text: 'Кол-во: ' + numberProd[id] + '; Cтоимость: ' + summProd[id]  + ' рублей',
                }).appendTo($basketProduct);
    
                $('<button/>', {
                    id: 'btn' + id,
                    onclick: 'carousel.basketRemove("' + id + '")',
                    class: 'btn-small',
                    text: 'удалить'
                }).appendTo($basketProduct);

                $basketProduct.effect('bounce');
            }

            price += +carousel.price[id];
            $('#summ').html(price);

            return {price:price, numberProd:numberProd, summProd:summProd};
        }
    });
};

Carousel.prototype.basketRemove = function(id) {
    if($('.basket').children('#basketDiv' + id).length >= 1) {
        price -= +carousel.price[id];
        summProd[id] -= carousel.price[id];
        --numberProd[id];

        $('#summ').html(price);
        $('#text' + id).text('Кол-во: ' + numberProd[id] + '; Cтоимость: ' + summProd[id] + ' рублей');
    }
    if (!numberProd[id]) {
        $('#btn' + id).prop('disabled', true);
        $('#basketDiv' + id).effect('clip', 500, function() {
            $(this).remove();
        });
        numberProd[id] = 1;
    }
};

Carousel.prototype.render = function(i, thumbailLength) {

    var $carouselDiv = $('#carousel');
    $carouselDiv.empty();

    for(i; i<thumbailLength; i++) {

        var $element = $('<div/>', {
            id: i,
            class: 'element'
        }).appendTo($carouselDiv);

        $('<img/>', {
            id: i,
            src: this.image[i]
        }).appendTo($element);

        $('<p/>', {
            text: 'Стоимость: ' + this.price[i] + ' рублей',
            class: 'summ'
        }).appendTo($element);

        $('.element').draggable({
            revert: true,
            start: function () {
                carousel.basketRefresh(this.id);
            }
        });

        $('<div/>', {
            html: '<p class="helper__text">Добавить в корзину</p>',
            class: 'helper'
        }).appendTo($element);
    }


    var $arrowDiv = $('<div/>', {
    }).appendTo($carouselDiv);

    $('<div/>',{
        class: 'arrow',
        id: 'left',
        html:'<i class="fa fa-arrow-left fa-5x" aria-hidden="true"></i>'
    }).appendTo($arrowDiv);

    $('<div/>',{
        class: 'arrow',
        id: 'right',
        html:'<i class="fa fa-arrow-right fa-5x" aria-hidden="true"></i>'
    }).appendTo($arrowDiv);

    carousel.arrow();
};