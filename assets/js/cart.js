/* SELECT ELEMENTS */

const cartContainer =
    document.querySelector(".cart-container");

const cartTotal =
    document.querySelector("#cart-total");

const cartCount =
    document.querySelector(".cart-count");

const checkoutBtn =
    document.querySelector("#checkout-btn");

/* GET CART */

let cart =
    JSON.parse(localStorage.getItem("cart"))
    || [];

/* DISPLAY CART */

function displayCart() {

    /* CLEAR OLD CONTENT */

    cartContainer.innerHTML = "";

    let total = 0;

    /* EMPTY CART */

    if (cart.length === 0) {

        cartContainer.innerHTML =
            "<h2>Your cart is empty.</h2>";

        cartTotal.textContent =
            "Total: $0";

        checkoutBtn.disabled = true;

        cartCount.textContent = 0;

        return;
    }

    /* ENABLE BUTTON */

    checkoutBtn.disabled = false;

    /* LOOP THROUGH CART */

    cart.forEach((item, index) => {

        total += item.price * item.quantity;

        cartContainer.innerHTML += `

            <div class="cart-item">

                <img
                    src="${item.image}"
                    alt="${item.title}"
                >

                <div class="cart-info">

                    <h3>${item.title}</h3>

                    <p>
                        Size: ${item.size}
                    </p>

                    <p>
                        Color: ${item.color}
                    </p>

                    <p>
                        Price: $${item.price}
                    </p>

                    <!-- QUANTITY -->

                    <div class="quantity-box">

                        <button
                        onclick="decreaseQuantity(${index})">
                            −
                        </button>

                        <span>
                            ${item.quantity}
                        </span>

                        <button
                        onclick="increaseQuantity(${index})">
                            +
                        </button>

                    </div>

                    <!-- REMOVE -->

                    <button
                    class="remove-btn"
                    onclick="removeItem(${index})">

                        Remove

                    </button>

                </div>

            </div>

        `;
    });

    /* UPDATE TOTAL */

    cartTotal.textContent =
        `Total: $${total.toFixed(2)}`;

    /* UPDATE COUNT */

    updateCartCount();
}

/* UPDATE COUNT */

function updateCartCount() {

    let totalItems = 0;

    cart.forEach(item => {

        totalItems += item.quantity;
    });

    cartCount.textContent =
        totalItems;
}

/* INCREASE QUANTITY */

function increaseQuantity(index) {

    cart[index].quantity++;

    saveCart();
}

/* DECREASE QUANTITY */

function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

        saveCart();
    }
}

/* REMOVE ITEM */

function removeItem(index) {

    cart.splice(index, 1);

    saveCart();
}

/* SAVE CART */

function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    displayCart();
}

/* CHECKOUT BUTTON */

checkoutBtn.addEventListener("click", () => {

    alert(
        "Proceeding to checkout!"
    );
});

/* INITIAL LOAD */

displayCart();