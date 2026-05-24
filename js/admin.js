const form = document.getElementById("productForm");
const productCount = document.getElementById("productCount");
const productList = document.getElementById("productList");
let imageUpload = null;
let imageField = null;
let editingIndex = null;

const getSavedProducts = () => JSON.parse(localStorage.getItem("products")) || [];
const saveProducts = products => localStorage.setItem("products", JSON.stringify(products));

const convertImageToDataURL = file => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(file);
    });
};

const updateProductCount = () => {
    if (!productCount) return;
    const products = getSavedProducts();
    productCount.textContent = `${products.length} product${products.length === 1 ? "" : "s"} stored`;
};

const renderStoredProducts = () => {
    if (!productList) return;
    const products = getSavedProducts();
    productList.innerHTML = "";

    if (!products.length) {
        productList.innerHTML = "<p class='empty-list'>No stored products yet. Add one to manage it here.</p>";
        return;
    }

    products.forEach((product, index) => {
        const item = document.createElement("div");
        item.className = "product-item";
        item.innerHTML = `
            <div class="product-item-details">
                <strong>${product.name || "Unnamed product"}</strong>
                <span>${product.category || "Uncategorized"}</span>
                <p>${product.price || "Price not set"}</p>
            </div>
            <div class="product-item-actions">
                <button type="button" class="edit-btn" data-index="${index}">Edit</button>
                <button type="button" class="delete-btn" data-index="${index}">Remove</button>
            </div>
        `;

        item.querySelector(".edit-btn")?.addEventListener("click", () => {
            editProduct(index);
        });

        item.querySelector(".delete-btn")?.addEventListener("click", () => {
            removeProduct(index);
        });

        productList.appendChild(item);
    });
};

const editProduct = index => {
    const products = getSavedProducts();
    if (index < 0 || index >= products.length) return;
    const product = products[index];
    
    editingIndex = index;
    document.getElementById("name").value = product.name || "";
    document.getElementById("desc").value = product.desc || "";
    document.getElementById("image").value = product.image || "";
    document.getElementById("price").value = product.price || "";
    document.getElementById("category").value = product.category || "";
    document.getElementById("rating").value = product.rating || "";
    document.getElementById("link").value = product.link || "";
    
    const submitBtn = form.querySelector("button[type='submit']");
    submitBtn.textContent = "Update Product";
    
    window.scrollTo({ top: form.offsetTop - 100, behavior: "smooth" });
};

const removeProduct = index => {
    const products = getSavedProducts();
    if (index < 0 || index >= products.length) return;
    products.splice(index, 1);
    saveProducts(products);
    updateProductCount();
    renderStoredProducts();
    alert("Product removed successfully.");
};

const initImageUpload = () => {
    imageUpload = document.getElementById("imageUpload");
    imageField = document.getElementById("image");
    
    if (imageUpload) {
        imageUpload.addEventListener("change", async e => {
            const file = e.target.files[0];
            if (file) {
                try {
                    const dataURL = await convertImageToDataURL(file);
                    if (imageField) {
                        imageField.value = dataURL;
                    }
                    alert("Image uploaded successfully!");
                } catch (error) {
                    console.error("Error converting image:", error);
                    alert("Failed to upload image. Please try again or use an image URL.");
                }
            }
        });
    }
};

if (form) {
    form.addEventListener("submit", e => {
        e.preventDefault();

        const product = {
            name: document.getElementById("name").value,
            desc: document.getElementById("desc").value,
            image: document.getElementById("image").value,
            price: document.getElementById("price").value,
            category: document.getElementById("category").value,
            rating: document.getElementById("rating").value,
            link: document.getElementById("link").value
        };

        const products = getSavedProducts();
        
        if (editingIndex !== null) {
            products[editingIndex] = product;
            alert("Product updated successfully!");
            editingIndex = null;
            const submitBtn = form.querySelector("button[type='submit']");
            submitBtn.textContent = "Add Product";
        } else {
            products.push(product);
            alert("Product Added");
        }
        
        saveProducts(products);
        form.reset();
        if (imageUpload) imageUpload.value = "";
        updateProductCount();
        renderStoredProducts();
    });
}

window.addEventListener("load", () => {
    initImageUpload();
    updateProductCount();
    renderStoredProducts();
});