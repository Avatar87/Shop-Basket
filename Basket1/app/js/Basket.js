function Basket(id) {
    this.id = id;
    this.countGoods = 0; // Количество товаров в корзине
    this.amount = 0; // Общая стоимость товаров
    this.basketItems = []; // Товары, которые находятся в корзине

    this.getBasket()
}

/**
 * Отрисовка корзины
 * @param root - Контейнер под корзину
 */
Basket.prototype.render = function(root) {
    var basketDiv = $('<div />', {
        id: this.id,
        text: 'Корзина'
    });

    var basketItemsDiv = $('<div />', {
        id: this.id + '_items'
    });


    basketItemsDiv.appendTo(basketDiv);

    basketDiv.appendTo(root);
};

/**
 * Получение товаров с сервера (из JSON файла)
 */
Basket.prototype.getBasket = function() {
    var appendId = '#' + this.id + '_items';

    // Способ 1
    // var self = this;

    $.get({
        url: './basket.json',
        dataType: 'json',
        context: this, // Способ 2
        success: function(data) {
            // console.log(this); // Что здесь выведется?
            var basketData = $('<div />', {
                id: 'basket_data'
            });

            this.countGoods = data.basket.length;
            this.amount = data.amount;
            this.basketItems = data.basket;

            // Вывод информации в DOM
            basketData.appendTo(appendId);

            // Перерисовка корзины
            this.refresh();
        },
        error: function(error) {
            console.error('Ошибка получения корзины', error.status, error.statusText);
        }
    });
};

/**
 * Метод добавления товара в корзину
 * @param idProduct - ID товара
 * @param price - Цена товара
 */
Basket.prototype.add = function(name, idProduct, price) {
    var basketItem = {
        name: name,
        id_product: idProduct,
        price: price
    };

    this.countGoods++;
    this.amount += price;
    this.basketItems.push(basketItem);

    // Перерисовка корзины
    this.refresh();
};

Basket.prototype.delete = function(idProduct) {
    for (var i in this.basketItems) {
        console.log(this.basketItems);
        if (this.basketItems[i].id_product == idProduct) {
            var removed = this.basketItems[i].price;
            this.basketItems.splice(i, 1);
            this.countGoods > 0 ? this.countGoods-- : console.log('В корзине нет товаров!');
            this.amount -= removed;
            break;
        }
    }
    this.refresh();
};

/**
 * Метод перерисовки корзины
 */
Basket.prototype.refresh = function() {
    var basketDataDiv = $('#basket_data');
    basketDataDiv.empty();
    basketDataDiv.append('<p>Всего товаров: ' + this.countGoods + '</p>');
    for (var i of this.basketItems) {
        basketDataDiv.append('<p>' + i.name + '</p>');
        var basketdelete = $('<button />', {
            class: "deleteitem",
            dataid: i.id_product,
            text: 'Удалить товар'
        });
        basketDataDiv.append(basketdelete);
    }

    basketDataDiv.append('<p>Сумма: ' + this.amount + ' руб.</p>');
    if (this.basketItems.length > 0)
        basketDataDiv.append('<input type = "submit" id = "submit" value = "Оформить заказ">');
};