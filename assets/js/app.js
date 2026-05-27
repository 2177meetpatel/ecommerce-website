console.log("Website Loaded Successfully");
console.log("E-Commerce Website Loaded");
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});
/* SELECT ELEMENTS */

const productGrid = document.querySelector(".product-grid");
const loading = document.querySelector(".loading");
const errorMessage = document.querySelector(".error-message");

/* FETCH PRODUCTS */

async function fetchProducts(){

    try{

        /* SHOW LOADING */

        loading.style.display = "block";

        /* API REQUEST */

        const response = await fetch(
            "https://fakestoreapi.com/products"
        );

        /* CHECK ERROR */

        if(!response.ok){
            throw new Error("Failed to fetch products");
        }

        /* CONVERT TO JSON */

        const products = await response.json();

        /* HIDE LOADING */

        loading.style.display = "none";

        /* DISPLAY PRODUCTS */

        displayProducts(products);

    }

    catch(error){

        loading.style.display = "none";

        errorMessage.textContent =
        "Unable to load products. Please try again later.";

        console.log(error);
    }
}

/* DISPLAY PRODUCTS */

function displayProducts(products){

    products.forEach(product => {

        const productCard = document.createElement("div");

        productCard.classList.add("product-card");

        productCard.innerHTML = `

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
                    Add to Cart
                </button>

            </div>

        `;

        productGrid.appendChild(productCard);

    });
}

/* CALL FUNCTION */

fetchProducts();