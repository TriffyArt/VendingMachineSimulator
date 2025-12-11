const VendingMachine = require('./VendingMachine');
const Product = require('./Product');

// Create a vending machine
const vendingMachine = new VendingMachine();

// Add products
vendingMachine.addProduct(new Product('Coke', 1.50, 5));
vendingMachine.addProduct(new Product('Pepsi', 1.50, 3));
vendingMachine.addProduct(new Product('Water', 1.00, 10));
vendingMachine.addProduct(new Product('Chips', 2.00, 7));
vendingMachine.addProduct(new Product('Candy', 0.75, 0)); // Out of stock

// Display products
vendingMachine.displayProducts();

// Simulate a purchase
console.log('--- Purchase Example 1: Buying Coke ---');
vendingMachine.insertMoney(2.00);
vendingMachine.selectProduct(0); // Buy Coke

console.log('\n--- Purchase Example 2: Insufficient funds ---');
vendingMachine.insertMoney(0.50);
vendingMachine.selectProduct(3); // Try to buy Chips
vendingMachine.returnChange();

console.log('\n--- Purchase Example 3: Out of stock ---');
vendingMachine.insertMoney(1.00);
vendingMachine.selectProduct(4); // Try to buy Candy (out of stock)
vendingMachine.returnChange();

console.log('\n--- Updated inventory ---');
vendingMachine.displayProducts();
