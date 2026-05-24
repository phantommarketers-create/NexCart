const menuToggle = document.getElementById("menuToggle");
const navLinks = document.querySelector(".nav-links");
menuToggle?.addEventListener("click", () => {
    navLinks?.classList.toggle("open");
});

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks?.classList.remove("open");
    });
});

const revealElements = document.querySelectorAll(".reveal");
const revealOnScroll = () => {
    revealElements.forEach(el => {
        const top = el.getBoundingClientRect().top;
        if (top < window.innerHeight - 100) {
            el.classList.add("active");
        }
    });
};

const productGrid = document.querySelector(".product-grid");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
let cards = [];

const defaultProducts = [
    {
        name: "Noise-Cancelling Headphones",
        desc: "Premium wireless headphones with deep bass and up to 30 hours of battery life.",
        image: "https://images.unsplash.com/photo-1516728778615-2d590ea1856f?auto=format&fit=crop&w=1200&q=80",
        price: "$119.99",
        category: "tech",
        link: "https://www.amazon.com/",
        rating: "★★★★☆"
    },
    {
        name: "Gaming Keyboard",
        desc: "Mechanical keyboard with RGB lighting and customizable macros for serious gamers.",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
        price: "$79.99",
        category: "gaming",
        link: "https://www.amazon.com/",
        rating: "★★★★★"
    },
    {
        name: "Smart Fitness Tracker",
        desc: "Track workouts, sleep, and heart rate with a sleek fitness wearable.",
        image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=1200&q=80",
        price: "$49.99",
        category: "fitness",
        link: "https://www.amazon.com/",
        rating: "★★★★☆"
    },
    {
        name: "Home Air Purifier",
        desc: "Quiet air purifier with HEPA filtration for fresher indoor air.",
        image: "https://images.unsplash.com/photo-1616627452187-2b7c2a9f979f?auto=format&fit=crop&w=1200&q=80",
        price: "$89.99",
        category: "home",
        link: "https://www.amazon.com/",
        rating: "★★★★☆"
    },
    {
        name: "Premium Kitchen Blender",
        desc: "High-speed blender for smoothies, soups, and kitchen prep.",
        image: "https://images.unsplash.com/photo-1511688878350-19a9f4f9af0b?auto=format&fit=crop&w=1200&q=80",
        price: "$109.99",
        category: "kitchen",
        link: "https://www.amazon.com/",
        rating: "★★★★☆"
    },
    {
        name: "Outdoor Adventure Backpack",
        desc: "Durable pack with multiple compartments for hiking and travel.",
        image: "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?auto=format&fit=crop&w=1200&q=80",
        price: "$64.99",
        category: "outdoors",
        link: "https://www.amazon.com/",
        rating: "★★★★☆"
    },
    {
        name: "Ergonomic Office Chair",
        desc: "Supportive chair built for long work sessions and comfort.",
        image: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1200&q=80",
        price: "$129.99",
        category: "office",
        link: "https://www.amazon.com/",
        rating: "★★★★☆"
    },
    {
        name: "Everyday Skincare Set",
        desc: "Gentle skincare essentials for clean, hydrated skin.",
        image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1200&q=80",
        price: "$39.99",
        category: "beauty",
        link: "https://www.amazon.com/",
        rating: "★★★★☆"
    }
];

const buildProductCard = product => {
    const card = document.createElement("article");
    card.className = "product-card";
    card.dataset.category = (product.category || "all").toLowerCase();
    card.innerHTML = `
        <div class="card-image">
            <img src="${product.image || "https://via.placeholder.com/600x400?text=Product"}" alt="${product.name || "Product"}" />
        </div>
        <div class="product-content">
            <h3>${product.name || "Unnamed Product"}</h3>
            <p>${product.desc || "A featured product added by NexCart."}</p>
            <p class="price">${product.price || "Price not available"}</p>
            <div class="stars">${product.rating || "★★★★☆"}</div>
            <a href="${product.link || "#"}" target="_blank" rel="nofollow sponsored" class="buy-btn">View on Amazon</a>
        </div>
    `;
    return card;
};

const getSavedProducts = () => JSON.parse(localStorage.getItem("products")) || [];

const renderProducts = () => {
    if (!productGrid) {
        return;
    }

    const savedProducts = getSavedProducts();
    const productsToShow = savedProducts.length ? savedProducts : defaultProducts;

    productGrid.innerHTML = "";
    productsToShow.forEach(product => {
        productGrid.appendChild(buildProductCard(product));
    });

    cards = Array.from(productGrid.querySelectorAll(".product-card"));
    filterProducts();
};

const filterProducts = () => {
    const search = searchInput?.value.toLowerCase() || "";
    const category = categoryFilter?.value || "all";

    cards.forEach(card => {
        const title = card.querySelector("h3")?.textContent.toLowerCase() || "";
        const cardCategory = card.dataset.category || "all";
        const matchesText = title.includes(search);
        const matchesCategory = category === "all" || category === cardCategory;
        card.style.display = matchesText && matchesCategory ? "grid" : "none";
    });
};

const initSearch = () => {
    searchInput?.addEventListener("input", filterProducts);
    categoryFilter?.addEventListener("change", filterProducts);
};

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", () => {
    renderProducts();
    revealOnScroll();
    initSearch();
});

const cookiePopup = document.getElementById("cookiePopup");
const acceptCookies = document.getElementById("acceptCookies");
if (cookiePopup && acceptCookies) {
    if (localStorage.getItem("affiliateCookiesAccepted") === "true") {
        cookiePopup.style.display = "none";
    }
    acceptCookies.addEventListener("click", () => {
        localStorage.setItem("affiliateCookiesAccepted", "true");
        cookiePopup.style.display = "none";
    });
}

function underdevelopment() {
    alert("This feature is under development. Please check back later!");
}
