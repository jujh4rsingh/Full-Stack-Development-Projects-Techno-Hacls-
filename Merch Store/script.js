let cart = [];

function addToCart(productName, price) {
  const product = { name: productName, price: price };
  cart.push(product);
  showToast(`${productName} added to cart!`);
  updateCartDisplay();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartDisplay();
}

function toggleCart() {
  const cartSection = document.getElementById("cart-section");
  cartSection.classList.toggle("show");
}

function updateCartDisplay() {
  const cartItemsDiv = document.getElementById("cart-items");
  const totalPriceEl = document.getElementById("total-price");

  cartItemsDiv.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "cart-item";

    const itemText = document.createElement("span");
    itemText.textContent = `${item.name} - ₹${item.price}`;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "❌";
    removeBtn.className = "remove-btn";
    removeBtn.onclick = () => removeFromCart(index);

    itemDiv.appendChild(itemText);
    itemDiv.appendChild(removeBtn);
    cartItemsDiv.appendChild(itemDiv);

    total += item.price;
  });

  totalPriceEl.textContent = `Total: ₹${total}`;
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}
