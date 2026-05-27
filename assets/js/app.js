console.log("Website Loaded Successfully");
console.log("E-Commerce Website Loaded");
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});
/* FETCH PRODUCTS */

const productGrid = document.querySelector(".product-grid");

/* API CALL */

fetch("https://fakestoreapi.com/products")
    .then(response => response.json())
    .then(data => {

        data.forEach(product => {

            productGrid.innerHTML += `

                <div class="product-card">

                    <img src="${product.image}" 
                    alt="${product.title}"
                    loading="lazy">

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

                </div>

            `;
        });

    })
    .catch(error => {
        console.log("Error fetching products:", error);
    });