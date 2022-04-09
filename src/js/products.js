const products = [
    {
        id : 0,
        img : "vehicle1.svg",
        vehicleName : "NIO ET5",
        price : 51.540,
        stock : 6,
    },
    {
        id : 1,
        img : "vehicle2.svg",
        vehicleName : "NIO ET7",
        price : 70.000,
        stock : 3,
    },
    {
        id : 2,
        img : "vehicle3.svg",
        vehicleName : "NIO EC6",
        price : 54.000,
        stock : 12,
    },
    {
        id : 3,
        img : "vehicle4.svg",
        vehicleName : "NIO ES6",
        price : 55.000,
        stock : 8,
    },
    {
        id : 4,
        img : "vehicle5.svg",
        vehicleName : "NIO ES8",
        price : 59.463,
        stock : 5,
    },
    {
        id : 5,
        img : "vehicle6.svg",
        vehicleName : "Canoo Lifestyle (Base)",
        price : 34.000,
        stock : 9,
    },
];

//SELECTOR FAILED
const cardEl = document.querySelector('.vehicles-contain');
const cartEl = document.querySelector('#list');
const totalItemsEl = document.querySelector('.subtotal');
const totalPriceEl = document.querySelector('.total-price');
const counterEl = document.querySelector('.counter');
const minusEl = document.querySelector('.minus')
const plusEl = document.querySelector('.plus')
const btnRemoveEl = document.querySelector('.remove')

const cartIcon = document.querySelector('.cart-icon');
const cartList = document.querySelector('.cart-section');
const cartSection = document.querySelector('.cart-section');
const menuIcon = document.querySelector('.navbar-toggler');

// TOGGLE ICON 
cartIcon.addEventListener('click', () => {
    if(cartSection.style.display === "none") {
        
        cartList.style.display = "block"
    } else {
        
        cartList.style.display = "none"
    }
});
// HIDE CART LIST WHEN CLOSE MENU ICON 
menuIcon.addEventListener('click', () => {
    cartList.style.display = "none"
})

const load = () => {
    products.forEach((product) => {
        cardEl.innerHTML += `
            <div class="card col-4" style="width: 400px; height: 500px;">
                <img src="./src/images/vehicles/${product.img}" class="card-img-top" alt="${product.vehicleName}">
                <div class="card-body">
                    <h5 class="card-title">${product.vehicleName}</h5>
                    <h1 class="card-text mb-5 mt-3 display-6">$${product.price}</h1>
                    <a href="#" class="btn btn-primary mx-4 w-25  text-white" onclick="addToCart(${product.id})">BUY</a>
                    <a href="#" class="btn btn-outline-dark w-20">Customize</a>
                </div>
            </div>
        `
    })
}
load()

// CART ARRAY 
let cart = [];

// LOCAL STORAGE RENDER ON BROWSER
const localData = () => {
    if(localStorage.getItem('CART') === null) {
        cart = []
    } else {
        cart = JSON.parse(localStorage.getItem('CART'))
    }
    updateCart();
}
document.addEventListener('DOMContentLoaded', localData);

// ADD TO CART 
const addToCart = (id) => {
    
    if(cart.some((product) => product.id === id)) {
        changeUnitNumber('plus', id)
    } else {
        const item = products.find((product) => product.id === id);
        cart.push({
            ...item,
            unit: 1,
        });
        console.log(cart);
    }
    updateCart();
}

// UPDATE CART 
const updateCart = (event) => {
    
    renderCart();
    calculateItems();

    localStorage.setItem('CART', JSON.stringify(cart));
}

// RENDER CART 
const renderCart = () => {

    cartEl.innerHTML = ""
    cart.forEach((product) => {
        cartEl.innerHTML += `
            <div class="col">
                <div class="card shadow">
                    <img src="/src/images/vehicles/${product.img}" class="card-img-top" alt="${product.vehicleName}">
                    <div class="card-body d-flex flex-column justify-content-around">
                    <h5 class="card-title">${product.vehicleName}</h5>
                    <p class="card-text">$${product.price}</p>
                    <div class="calculate-failed text-center">
                        <button class="btn btn-group btn-group-lg minus" role="group" onclick= "changeUnitNumber('minus', ${product.id})">-</button>
                        <div class="btn-group unit-number" role="group">${product.unit}</div>
                        <button class="btn btn-group btn-group-sm plus" role="group" onclick= "changeUnitNumber('plus', ${product.id})">+</button>
                    </div>
                    <button class=" btn btn-danger remove" onclick= "removeItem(${product.id})">Remove</button>
                    </div>
                </div>
            </div>
        `
    });
};

// CALCULATE PRICE & PRODUCTS FOR ITEMS IN CART 
const calculateItems = () => {
    let totalItems = 0,
    totalPrice = 0

    cart.forEach((item) => {
        totalItems += item.unit;
        totalPrice += item.unit * item.price;
    });
    if(totalItems <= 1) {
        totalItemsEl.innerHTML = `Total: ${totalItems} Item`
        
    }else {
        totalItemsEl.innerHTML = `Total: ${totalItems} Items`

    }
    counterEl.innerHTML = `${totalItems}`
    totalPriceEl.innerHTML = `Total Price: $${totalPrice.toFixed(3)}`
};

// REMOVE ITEM FROM CART 
const removeItem = (id) => {
    cart = cart.filter((product) => product.id !== id);
    updateCart();
};

// INCREASE & DECREASE UNIT IN CART 
const changeUnitNumber = (action, id) => {
    cart = cart.map((item) => {
        let oldNumber = item.unit;

        if (item.id === id) {
            if (action === "plus" && oldNumber < item.stock) {
                oldNumber++
            } else if (action === "minus" && oldNumber > 1) {
                oldNumber--
            }
        }
        return {
            ...item,
            unit: oldNumber,
        }
    });
    updateCart()
};
