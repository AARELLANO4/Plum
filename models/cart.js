module.exports = function Cart(oldCart) {
    this.items = oldCart.items || {};
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0;

    this.add = function(item, id) {
        let storedItem = this.items[id];
        if (!storedItem) {
            storedItem = this.items[id] = {
                item: item,
                qty: 0,
                prodPrice: 0,
            }
        }

        storedItem.qty++;
        storedItem.prodPrice = storedItem.item.prodPrice * storedItem.qty; 
        this.totalQty++;
        this.totalPrice += storedItem.prodPrice;
    }
    this.generateArray =  function() {
        var arr = [];
        for (var id in this.items) {
            arr.push(this.items[id]);
        }
        return arr;
    }

    this.empty = function () {
        this.items = {};
        this.totalQty = 0;
        this.totalPrice = 0;
    }
};