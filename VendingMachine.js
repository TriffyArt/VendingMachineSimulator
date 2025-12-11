const Product = require('./Product');

class VendingMachine {
    constructor() {
        this.products = [];
        this.balance = 0;
    }

    addProduct(product) {
        this.products.push(product);
    }

    displayProducts() {
        console.log('\n=== Available Products ===');
        this.products.forEach((product, index) => {
            console.log(`${index + 1}. ${product.getInfo()}`);
        });
        console.log('=========================\n');
    }

    insertMoney(amount) {
        if (amount > 0) {
            this.balance += amount;
            console.log(`Inserted: $${amount.toFixed(2)} | Current Balance: $${this.balance.toFixed(2)}`);
            return true;
        }
        console.log('Invalid amount!');
        return false;
    }

    selectProduct(index) {
        if (index < 0 || index >= this.products.length) {
            console.log('Invalid selection!');
            return false;
        }

        const product = this.products[index];

        if (!product.isAvailable()) {
            console.log(`Sorry, ${product.name} is out of stock!`);
            return false;
        }

        if (this.balance < product.price) {
            console.log(`Insufficient balance! Need $${(product.price - this.balance).toFixed(2)} more.`);
            return false;
        }

        // Dispense product
        product.decreaseQuantity();
        this.balance -= product.price;
        console.log(`\n✓ Dispensing ${product.name}...`);
        
        // Return change if any
        if (this.balance > 0) {
            console.log(`Change: $${this.balance.toFixed(2)}`);
            this.balance = 0;
        }
        
        return true;
    }

    returnChange() {
        if (this.balance > 0) {
            console.log(`Returning: $${this.balance.toFixed(2)}`);
            this.balance = 0;
        } else {
            console.log('No balance to return.');
        }
    }

    getBalance() {
        return this.balance;
    }
}

module.exports = VendingMachine;
