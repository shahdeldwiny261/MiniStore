const params = new URLSearchParams(window.location.search);
const productId = parseInt(params.get("id"));

const xhr = new XMLHttpRequest();
xhr.open("GET", "products.json");

xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        const product = data.find(p => p.id === productId);
        const container = document.getElementById('product-detail');

        if (!product) {
            container.innerHTML = '<p>Product not found.</p>';
            return;
        }

        container.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p>${product.desc}</p>
            <p class="long-desc">${product.longDesc || ""}</p>
            <p class="price">$${product.price}</p>
            <div class="btns">
                <button class="add-to-cart-btn">Add to Cart</button>
                <button onclick="location.href='checkout.html?id=${product.id}'">Buy Now</button>
            </div>
        `;

        document.querySelector(".add-to-cart-btn").addEventListener("click", function () {
            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            cart.push(product);
            localStorage.setItem("cart", JSON.stringify(cart));
            alert(`${product.name} added to cart!`);
        });
    }
};

xhr.send();
