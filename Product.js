class Product {
    constructor(name, price, quantity) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }

    isAvailable() {
        return this.quantity > 0;
    }

    decreaseQuantity() {
        if (this.quantity > 0) {
            this.quantity--;
            return true;
        }
        return false;
    }

    getInfo() {
        return `${this.name} - $${this.price.toFixed(2)} (Stock: ${this.quantity})`;
    }
}

module.exports = Product;
