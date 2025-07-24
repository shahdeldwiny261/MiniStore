const params = new URLSearchParams(window.location.search);
const productId = parseInt(params.get("id"));
const backBtn = document.getElementById("back-btn");
if (backBtn) {
    backBtn.href = `product.html?id=${productId}`;
}


const xhr = new XMLHttpRequest();
xhr.open("GET", "products.json");

xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        const products = JSON.parse(xhr.responseText);
        const product = products.find((p) => p.id === productId);
        const container = document.getElementById("product-info");

        if (product) {
            container.innerHTML = `
                <h2>${product.name}</h2>
                <img src="${product.img}" alt="${product.name}" width="200">
                <p>${product.desc}</p>
                <p class="price">$${product.price}</p>
            `;
        } else {
            container.innerHTML = "<p>Product not found</p>";
        }
    }
};

xhr.send();

const form = document.getElementById("checkout-form");
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const address = document.getElementById("address").value;

    
    const shipping = document.querySelector('input[name="shipping"]:checked')?.value;
    const payment = document.querySelector('input[name="payment"]:checked')?.value;
    const country = document.getElementById("country").value;

    if (!name || !email || !address || !shipping || !payment || !country) {
    alert("Please fill all the required fields.");
    return;
}




    const checkoutData = {
        name: name,
        email: email,
        address: address,
        country: country,
        shippingMethod: shipping,
        paymentMethod: payment,
        productId: productId
    };

    localStorage.setItem("checkoutInfo", JSON.stringify(checkoutData));

    form.style.display = "none";
    document.getElementById("success-msg").style.display = "block";
});
