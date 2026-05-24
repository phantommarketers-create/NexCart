const ADMIN_PASSWORD = "NexCartAdmin123";
const loginBtn = document.getElementById("loginBtn");

loginBtn?.addEventListener("click", () => {
    const password = document.getElementById("adminPassword")?.value || "";
    if (password === ADMIN_PASSWORD) {
        sessionStorage.setItem("admin", "true");
        window.location.href = "dashboard.html";
    } else {
        alert("Wrong Password");
    }
});
