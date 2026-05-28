/* GET PRODUCT ID FROM URL */

const params = new URLSearchParams(window.location.search);

const productId = params.get("id");

let currentProduct = null;

/* SELECT CONTAINER */

const productContainer =
    document.querySelector(".product-container");

/* FETCH PRODUCT */

async function fetchProduct() {

    if (!productId || !productContainer) {
        if (productContainer) {
            productContainer.innerHTML = "<h2>Product not found.</h2>";
        }
        return;
    }

    try {

        const response = await fetch(
            `https://fakestoreapi.com/products/${productId}`
        );

        if (!response.ok) {
            throw new Error("Product not found.");
        }

        const product = await response.json();

        currentProduct = product;

        displayProduct(product);

    }

    catch (error) {

        console.log(error);

        productContainer.innerHTML = `
            <h2>Failed to load product.</h2>
        `;
    }
}

/* DISPLAY PRODUCT */

function displayProduct(product) {

    productContainer.innerHTML = `

        <div class="product-detail-card">

            <div class="product-image">

                <img 
                    src="${product.image}" 
                    alt="${product.title}"
                >

            </div>

            <div class="product-detail-info">

                <h1>${product.title}</h1>

                <h2>$${product.price}</h2>

                <p>${product.description}</p>
                <!-- SIZE -->

<div class="variation">

    <label>Size:</label>

    <select id="size">

        <option>S</option>
        <option>M</option>
        <option>L</option>
        <option>XL</option>

    </select>

</div>

<!-- COLOR -->

<div class="variation">

    <label>Color:</label>

    <select id="color">

        <option>Black</option>
        <option>White</option>
        <option>Blue</option>

    </select>

</div>

                <div class="variation">
                    <label>Quantity:</label>
                    <input type="number" id="quantity" value="1" min="1" />
                </div>

                <button 
                    class="hero-btn"
                    onclick="addToCart(${product.id})"
                >
                    Add To Cart
                </button>

            </div>

        </div>

    `;
}

/* ADD TO CART */

function addToCart(id) {

    /* GET EXISTING CART */

    let cart =
        JSON.parse(localStorage.getItem("cart"))
        || [];

    /* GET SELECTED OPTIONS */

    const size =
        document.querySelector("#size").value;

    const color =
        document.querySelector("#color").value;

    const productTitle =
        document.querySelector(".product-detail-info h1")
            .textContent;

    const productPrice =
        parseFloat(currentProduct?.price) || 0;

    const productImage =
        document.querySelector(".product-image img")
            .src;

    const quantity =
        parseInt(
            document.querySelector("#quantity").value,
            10
        ) || 1;

    /* CHECK QUANTITY */

    if (quantity < 1) {

        alert("Invalid quantity");

        return;
    }

    /* CHECK IF PRODUCT EXISTS */

    const existingProduct =
        cart.find(item =>

            item.id === id &&
            item.size === size &&
            item.color === color
        );

    /* IF EXISTS */

    if (existingProduct) {

        existingProduct.quantity += quantity;
    }

    /* NEW PRODUCT */

    else {

        const cartItem = {

            id: id,

            title: productTitle,

            price: productPrice,

            image: productImage,

            size: size,

            color: color,

            quantity: quantity
        };

        cart.push(cartItem);
    }

    /* SAVE TO LOCAL STORAGE */

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    /* UPDATE COUNT */

    updateCartCount();

    showNotification(
        "Item added to cart!"
    );

    console.log(cart);
}
/* NOTIFICATION */

function showNotification(message) {

    const notification =
        document.createElement("div");

    notification.classList.add(
        "notification"
    );

    notification.textContent = message;

    document.body.appendChild(
        notification
    );

    /* REMOVE AFTER 3 SECONDS */

    setTimeout(() => {

        notification.remove();

    }, 3000);
}

/* UPDATE CART COUNT */

function updateCartCount() {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    const totalItems = cart.reduce(
        (sum, item) => sum + (item.quantity || 0),
        0
    );

    const cartCount =
        document.querySelector(".cart-count");

    if (cartCount) {
        cartCount.textContent = totalItems;
    }
}

/* INITIAL LOAD */

updateCartCount();

fetchProduct();