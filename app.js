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
}

class VendingMachine {
    constructor() {
        this.products = [];
        this.balance = 0;
    }

    addProduct(product) {
        this.products.push(product);
    }

    insertMoney(amount) {
        if (amount > 0) {
            this.balance += amount;
            return true;
        }
        return false;
    }

    selectProduct(index) {
        if (index < 0 || index >= this.products.length) {
            return { success: false, message: 'Invalid selection!' };
        }

        const product = this.products[index];

        if (!product.isAvailable()) {
            return { success: false, message: `${product.name} is out of stock!` };
        }

        if (this.balance < product.price) {
            const needed = (product.price - this.balance).toFixed(2);
            return { success: false, message: `Insufficient balance! Need $${needed} more.` };
        }

        // Dispense product
        product.decreaseQuantity();
        this.balance -= product.price;
        const change = this.balance;
        this.balance = 0;
        
        return { 
            success: true, 
            message: `Dispensing ${product.name}!`, 
            change: change 
        };
    }

    returnChange() {
        const amount = this.balance;
        this.balance = 0;
        return amount;
    }

    getBalance() {
        return this.balance;
    }
}

// Initialize vending machine
const vendingMachine = new VendingMachine();

// Add products
vendingMachine.addProduct(new Product('Coke', 1.50, 5));
vendingMachine.addProduct(new Product('Pepsi', 1.50, 3));
vendingMachine.addProduct(new Product('Water', 1.00, 10));
vendingMachine.addProduct(new Product('Chips', 2.00, 7));
vendingMachine.addProduct(new Product('Candy', 0.75, 4));
vendingMachine.addProduct(new Product('Juice', 1.75, 0)); // Out of stock

// UI Functions
function updateBalance() {
    document.getElementById('balance').textContent = vendingMachine.getBalance().toFixed(2);
}

function showMessage(message, type = 'info') {
    const messageEl = document.getElementById('message');
    messageEl.textContent = message;
    messageEl.className = type;
    
    setTimeout(() => {
        messageEl.textContent = '';
        messageEl.className = '';
    }, 3000);
}

function insertMoney(amount) {
    vendingMachine.insertMoney(amount);
    updateBalance();
    showMessage(`Inserted $${amount.toFixed(2)}`, 'success');
}

function returnMoney() {
    const amount = vendingMachine.returnChange();
    updateBalance();
    if (amount > 0) {
        showMessage(`Returned $${amount.toFixed(2)}`, 'info');
    } else {
        showMessage('No balance to return', 'info');
    }
}

function selectProduct(index) {
    const result = vendingMachine.selectProduct(index);
    updateBalance();
    renderProducts();
    
    if (result.success) {
        let message = result.message;
        if (result.change > 0) {
            message += ` Change: $${result.change.toFixed(2)}`;
        }
        showMessage(message, 'success');
    } else {
        showMessage(result.message, 'error');
    }
}

function renderProducts() {
    const grid = document.getElementById('products-grid');
    grid.innerHTML = '';
    
    vendingMachine.products.forEach((product, index) => {
        const card = document.createElement('div');
        card.className = 'product-card';
        
        if (!product.isAvailable()) {
            card.classList.add('out-of-stock');
        } else {
            card.onclick = () => selectProduct(index);
        }
        
        card.innerHTML = `
            <div class="product-name">${product.name}</div>
            <div class="product-price">$${product.price.toFixed(2)}</div>
            <div class="product-stock">
                ${product.isAvailable() ? `Stock: ${product.quantity}` : 'OUT OF STOCK'}
            </div>
        `;
        
        grid.appendChild(card);
    });
}

// Initialize the UI
renderProducts();
updateBalance();
