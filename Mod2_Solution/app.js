(function () {
'use strict';



angular.module('ShoppingListCheckOff', [])
.controller('ToBuyShoppingController', ToBuyShoppingController)
.controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyShoppingController.$inject = ['ShoppingListCheckOffService'];
function ToBuyShoppingController(ShoppingListCheckOffService) {
  var itemBuy = this;
  itemBuy.itens = ShoppingListCheckOffService.getBuy();

  itemBuy.addItem = function (itemIndex) {
    ShoppingListCheckOffService.addItemBought(itemIndex);
    try{
      ShoppingListCheckOffService.removeBuy(itemIndex);
    } catch (error) {
      itemBuy.errorMessage = error.message;
    }
  }
}


AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtShoppingController(ShoppingListCheckOffService) {
  var itemBought = this;
  itemBought.itens = ShoppingListCheckOffService.getBought();
}


function ShoppingListCheckOffService() {
  var service = this;

  var buyList = [
    {
      name: "Milk",
      quantity: "3"
    },
    {
      name: "Donuts",
      quantity: "10"
    },
    {
      name: "Cookies",
      quantity: "30"
    },
    {
      name: "Chocolate",
      quantity: "2"
    },
    {
      name: "Snaks",
      quantity: "10"
    }
  ];

  var maxItems = buyList.length;
  // List of shopping items
  var buy = buyList;

  var maxItemBuy = buy.length;

  var bought = [];
  var maxItemBought = 0;

  service.addItemBought = function (itemIndex) {
    var item = buy[itemIndex];
    bought.push(item);
    maxItemBought = bought.length;
  };

  service.addItemBuy = function (itemIndex) {
    maxItemBuy = maxItemBuy  + 1;
    var item = bought[itemIndex];
    buy.push(item);
  };

  service.removeBuy = function (itemIndex) {
    buy.splice(itemIndex, 1);
    maxItemBuy = buy.length;
    if (maxItemBuy == 0) {
      throw new Error("Everything is bought!");
    }
  };

  service.removeBought = function (itemIdex) {
    maxItemBought = maxItemBought -1;
    bought.splice(itemIdex, 1);
  };

  service.getBuy = function () {
    return buy;
  };

  service.getBought = function () {
    return bought;
  };
}

})();
