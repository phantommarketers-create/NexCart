const removeGrid = document.getElementById("removeGrid");

const getSavedProducts = () => JSON.parse(localStorage.getItem("products")) || [];
const saveProducts = products => localStorage.setItem("products", JSON.stringify(products));

const buildRemovalCard = (product, index) => {
    const card = document.createElement("article");
    card.className = "product-card";
    card.dataset.category = (product.category || "all").toLowerCase();
    card.innerHTML = `
        <div class="card-image">
            <img src="${product.image || "https://via.placeholder.com/600x400?text=Product"}" alt="${product.name || "Product"}" />
        </div>
        <div class="product-content">
            <h3>${product.name || "Unnamed Product"}</h3>
            <p>${product.desc || "A stored product from NexCart."}</p>
            <p class="price">${product.price || "Price not available"}</p>
            <div class="stars">${product.rating || "★★★★☆"}</div>
            <div class="remove-actions">
                <button type="button" class="secondary-btn remove-btn" data-index="${index}">Remove</button>
            </div>
        </div>
    `;
    return card;
};

const renderRemovals = () => {
    if (!removeGrid) return;
    const products = getSavedProducts();
    removeGrid.innerHTML = "";

    if (!products.length) {
        removeGrid.innerHTML = `<article class="card"><div class="card-header"><h3>No stored products</h3><p>There are currently no admin products saved in local storage.</p></div></article>`;
        return;
    }

    products.forEach((product, index) => {
        const card = buildRemovalCard(product, index);
        const button = card.querySelector(".remove-btn");
        button?.addEventListener("click", () => removeProduct(index));
        removeGrid.appendChild(card);
    });
};

const removeProduct = index => {
    const products = getSavedProducts();
    if (index < 0 || index >= products.length) return;
    products.splice(index, 1);
    saveProducts(products);
    renderRemovals();
};

window.addEventListener("load", renderRemovals);
