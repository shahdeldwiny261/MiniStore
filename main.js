let products = [];
let container = document.getElementById("product-list");
let searchInput = document.querySelector(".search-input");

let xhr = new XMLHttpRequest();
xhr.open("GET", "products.json");
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        products = JSON.parse(xhr.responseText);
        displayProducts(products);
    }
};
xhr.send();


function displayProducts(productList) {
    container.innerHTML = "";

    if (productList.length === 0) {
        container.innerHTML = `
            <div class="not-found">
                <img src="images/search-not-found.png" alt="Not Found" class="not-found-img" />
                <h4>Product Not Found</h4>
            </div>
        `;
        return;
    }

    for (let p of productList) {
        container.innerHTML += `
        <a href="product.html?id=${p.id}" class="product-card">
            <img src="${p.img}" alt="${p.name}" />
            <h3>${p.name}</h3>
            <p>${p.desc}</p>
            <p class="price">$${p.price}</p>
        </a>
        `;
    }
}


searchInput.addEventListener("input", function () {
    let searchValue = this.value.toLowerCase().trim();

    let filtered = products.filter(p =>
        p.name.toLowerCase().includes(searchValue)
    );

    displayProducts(filtered);
});

