/* WEBSITE LOADED */

console.log("E-Commerce Website Loaded");

/* =========================
   MOBILE NAVIGATION
========================= */

const hamburger =
    document.querySelector(".hamburger");

const navLinks =
    document.querySelector(".nav-links");

/* TOGGLE MENU */

if (hamburger) {

    hamburger.addEventListener("click", () => {

        navLinks.classList.toggle("active");

    });

}

/* =========================
   SELECT ELEMENTS
========================= */

const productGrid =
    document.querySelector(".product-grid");

const loading =
    document.querySelector(".loading");

const errorMessage =
    document.querySelector(".error-message");

const cartCount =
    document.querySelector(".cart-count");

function updateCartCount() {
    if (!cartCount) return;

    const cart =
        JSON.parse(localStorage.getItem("cart"))
        || [];

    const totalItems = cart.reduce(
        (sum, item) => sum + (item.quantity || 0),
        0
    );

    cartCount.textContent = totalItems;
}

/* =========================
   FETCH PRODUCTS
========================= */

async function fetchProducts() {

    if (!productGrid || !loading || !errorMessage) {
        return;
    }

    try {

        /* SHOW LOADING */

        loading.style.display = "block";

        /* FETCH API */

        const response = await fetch(
            "https://fakestoreapi.com/products"
        );

        /* CHECK RESPONSE */

        if (!response.ok) {

            throw new Error(
                "Failed to fetch products"
            );
        }

        /* CONVERT TO JSON */

        const products =
            await response.json();

        console.log(products);

        /* HIDE LOADING */

        loading.style.display = "none";

        /* DISPLAY PRODUCTS */

        displayProducts(products);

        updateCartCount();
    }
    catch (error) {

        console.log(error);

        loading.style.display = "none";

        errorMessage.textContent =
            "Unable to load products.";
    }
}

/* =========================
   DISPLAY PRODUCTS
========================= */

function displayProducts(products) {

    products.forEach(product => {

        /* CREATE LINK */

        const productLink =
            document.createElement("a");

        /* PRODUCT URL */

        productLink.href =
            `product.html?id=${product.id}`;

        /* ADD CLASS */

        productLink.classList.add(
            "product-link"
        );

        /* PRODUCT CARD */

        productLink.innerHTML = `

            <div class="product-card">

                <img
                    src="${product.image}"
                    alt="${product.title}"
                    loading="lazy"
                >

                <div class="product-info">

                    <h3 class="product-title">
                        ${product.title}
                    </h3>

                    <p class="product-price">
                        $${product.price}
                    </p>

                    <button class="product-btn">
                        View Product
                    </button>

                </div>

            </div>

        `;

        /* APPEND */

        productGrid.appendChild(
            productLink
        );

    });
}

/* =========================
   INITIALIZE
========================= */

updateCartCount();
fetchProducts();