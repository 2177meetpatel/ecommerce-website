/* GET PRODUCT ID FROM URL */

const params = new URLSearchParams(window.location.search);

const productId = params.get("id");

/* SELECT CONTAINER */

const productContainer =
    document.querySelector(".product-container");

/* FETCH PRODUCT */

async function fetchProduct() {

    try {

        const response = await fetch(
            `https://fakestoreapi.com/products/${productId}`
        );

        const product = await response.json();

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

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    cart.push(id);

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateCartCount();

    alert("Product Added To Cart");
}

/* UPDATE CART COUNT */

function updateCartCount() {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    document.querySelector(".cart-count")
        .textContent = cart.length;
}

/* INITIAL LOAD */

updateCartCount();

fetchProduct();