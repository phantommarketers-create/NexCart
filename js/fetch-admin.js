// Amazon product fetcher for admin dashboard

const fetchForm = document.getElementById("fetchForm");
const asinInput = document.getElementById("asinInput");
const fetchResult = document.getElementById("fetchResult");
const imageField = document.getElementById("image");
const nameField = document.getElementById("name");
const priceField = document.getElementById("price");

if (fetchForm) {
    fetchForm.addEventListener("submit", async e => {
        e.preventDefault();
        
        const asin = asinInput.value.trim();
        if (!asin) return;
        
        fetchResult.style.display = "block";
        fetchResult.innerHTML = "<p>Fetching product data...</p>";
        
        try {
            const response = await fetch("/api/fetch-amazon", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ asin })
            });
            
            const result = await response.json();
            
            if (result.success) {
                // Fill form with fetched data
                nameField.value = result.name || "";
                priceField.value = result.price || "";
                imageField.value = result.image || "";
                
                // Set affiliate link
                document.getElementById("link").value = result.link || "";
                
                fetchResult.innerHTML = `
                    <div class="success-message">
                        <p>✓ Product fetched successfully!</p>
                        <p><strong>${result.name}</strong></p>
                        <p>Price: ${result.price}</p>
                        <p class="hint">Review and adjust details below, then add to your catalog.</p>
                    </div>
                `;
                
                // Scroll to form
                document.getElementById("productForm").scrollIntoView({ behavior: "smooth" });
            } else {
                fetchResult.innerHTML = `
                    <div class="error-message">
                        <p>✗ Error: ${result.error}</p>
                        <p>${result.hint || ""}</p>
                        <p class="hint">Try entering the product details manually instead.</p>
                    </div>
                `;
            }
        } catch (error) {
            fetchResult.innerHTML = `
                <div class="error-message">
                    <p>✗ Network error: ${error.message}</p>
                    <p class="hint">Make sure the Flask server is running: <code>python server.py</code></p>
                </div>
            `;
        }
    });
}
