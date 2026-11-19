/* ============================================================
   LOVA Store — السلّة + إتمام الطلب عبر واتساب
   ============================================================ */

/* 🔧 الإعدادات — بدّل هون معلوماتك الفعلية */
const LOVA_CONFIG = {
  // رقم الواتساب بصيغة دولية بدون + وبدون أصفار أو مسافات.
  // مثال لبنان: 9617XXXXXXX  (961 = لبنان، بعدها الرقم بدون الصفر الأول)
  whatsapp: "9610000000",      // ← ⚠️ بدّل هالرقم برقمك الفعلي
  currency: "$",
  currencyLabel: "دولار",
  deliveryNote: "الدفع عند الاستلام · التوصيل لكل لبنان",
  storeName: "LOVA",
};

/* ---------- حالة السلّة (تُحفظ محلياً بالمتصفح) ---------- */
const CART_KEY = "lova_cart_v1";
let cart = loadCart();

function loadCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || {}; }
  catch { return {}; }
}
function saveCart() { localStorage.setItem(CART_KEY, JSON.stringify(cart)); }
function productById(id) { return window.LOVA_PRODUCTS.find(p => p.id === id); }
function cartCount() { return Object.values(cart).reduce((a, b) => a + b, 0); }
function cartTotal() {
  return Object.entries(cart).reduce((sum, [id, qty]) => {
    const p = productById(id); return sum + (p ? p.price * qty : 0);
  }, 0);
}
function money(n) { return LOVA_CONFIG.currency + n.toLocaleString("en-US"); }

/* ---------- عمليات السلّة ---------- */
function addToCart(id) {
  cart[id] = (cart[id] || 0) + 1;
  saveCart(); renderCart(); bumpCart(); openCart();
}
function setQty(id, qty) {
  qty = Math.max(0, qty);
  if (qty === 0) delete cart[id]; else cart[id] = qty;
  saveCart(); renderCart();
}
function clearCart() { cart = {}; saveCart(); renderCart(); }

/* ---------- عرض المنتجات ---------- */
let activeCategory = "all";

function renderCategories() {
  const wrap = document.getElementById("catFilters");
  wrap.innerHTML = window.LOVA_CATEGORIES.map(c =>
    `<button class="cat-chip${c.id === activeCategory ? " is-active" : ""}" data-cat="${c.id}">
       <img src="${c.icon}" alt="" aria-hidden="true"><span>${c.name}</span>
     </button>`
  ).join("");
  wrap.querySelectorAll(".cat-chip").forEach(btn => {
    btn.addEventListener("click", () => {
      activeCategory = btn.dataset.cat;
      renderCategories(); renderProducts();
      document.getElementById("shop").scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function renderProducts() {
  const grid = document.getElementById("productGrid");
  const list = window.LOVA_PRODUCTS.filter(p => activeCategory === "all" || p.category === activeCategory);
  grid.innerHTML = list.map(p => `
    <article class="product">
      <div class="product-img">
        <img src="${p.img}" alt="${p.name}" loading="lazy">
        ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ""}
      </div>
      <div class="product-body">
        <h3 class="product-name">${p.name}</h3>
        <p class="product-desc">${p.desc || ""}</p>
        <div class="product-foot">
          <span class="product-price">${money(p.price)}</span>
          <button class="lova-button add-btn" data-add="${p.id}">أضيفي للسلّة</button>
        </div>
      </div>
    </article>`).join("");
  grid.querySelectorAll("[data-add]").forEach(b =>
    b.addEventListener("click", () => addToCart(b.dataset.add)));
}

/* ---------- عرض السلّة ---------- */
function renderCart() {
  const body = document.getElementById("cartItems");
  const ids = Object.keys(cart);
  if (ids.length === 0) {
    body.innerHTML = `<p class="cart-empty lova-muted">سلّتك فاضية حالياً.<br>اختاري شي بتحبّيه ♡</p>`;
  } else {
    body.innerHTML = ids.map(id => {
      const p = productById(id); if (!p) return "";
      const qty = cart[id];
      return `<div class="cart-item">
        <img src="${p.img}" alt="">
        <div class="cart-item-info">
          <strong>${p.name}</strong>
          <span class="lova-muted">${money(p.price)}</span>
        </div>
        <div class="qty">
          <button data-dec="${id}" aria-label="تنقيص">−</button>
          <span>${qty}</span>
          <button data-inc="${id}" aria-label="زيادة">+</button>
        </div>
        <button class="cart-remove" data-rm="${id}" aria-label="حذف">✕</button>
      </div>`;
    }).join("");
  }
  document.getElementById("cartTotal").textContent = money(cartTotal());
  document.querySelectorAll(".cart-count").forEach(el => {
    el.textContent = cartCount();
    el.hidden = cartCount() === 0;
  });
  document.getElementById("checkoutBtn").disabled = ids.length === 0;

  body.querySelectorAll("[data-inc]").forEach(b => b.onclick = () => setQty(b.dataset.inc, cart[b.dataset.inc] + 1));
  body.querySelectorAll("[data-dec]").forEach(b => b.onclick = () => setQty(b.dataset.dec, cart[b.dataset.dec] - 1));
  body.querySelectorAll("[data-rm]").forEach(b => b.onclick = () => setQty(b.dataset.rm, 0));
}

/* ---------- فتح/إغلاق السلّة ---------- */
function openCart() {
  document.getElementById("cartDrawer").classList.add("open");
  document.getElementById("cartOverlay").classList.add("show");
  document.body.style.overflow = "hidden";
}
function closeCart() {
  document.getElementById("cartDrawer").classList.remove("open");
  document.getElementById("cartOverlay").classList.remove("show");
  document.body.style.overflow = "";
}
function bumpCart() {
  const el = document.getElementById("cartFab");
  el.classList.remove("bump"); void el.offsetWidth; el.classList.add("bump");
}

/* ---------- إتمام الطلب عبر واتساب ---------- */
function checkout() {
  if (cartCount() === 0) return;
  const name = (document.getElementById("custName").value || "").trim();
  const area = (document.getElementById("custArea").value || "").trim();

  let msg = `*طلب جديد من ${LOVA_CONFIG.storeName}* ♡%0A%0A`;
  if (name) msg += `الاسم: ${name}%0A`;
  if (area) msg += `منطقة التوصيل: ${area}%0A`;
  msg += `%0A*الطلبية:*%0A`;
  Object.entries(cart).forEach(([id, qty]) => {
    const p = productById(id); if (!p) return;
    msg += `• ${p.name} ×${qty} — ${money(p.price * qty)}%0A`;
  });
  msg += `%0A*المجموع: ${money(cartTotal())}*%0A`;
  msg += `(${LOVA_CONFIG.deliveryNote})`;

  const text = encodeURIComponent(decodeURIComponent(msg));
  const url = `https://wa.me/${LOVA_CONFIG.whatsapp}?text=${text}`;
  window.open(url, "_blank");
}

/* ---------- تهيئة ---------- */
document.addEventListener("DOMContentLoaded", () => {
  renderCategories();
  renderProducts();
  renderCart();
  document.getElementById("cartFab").addEventListener("click", openCart);
  document.getElementById("cartClose").addEventListener("click", closeCart);
  document.getElementById("cartOverlay").addEventListener("click", closeCart);
  document.getElementById("checkoutBtn").addEventListener("click", checkout);
  document.querySelectorAll("[data-open-cart]").forEach(b => b.addEventListener("click", openCart));
  document.getElementById("deliveryNote").textContent = LOVA_CONFIG.deliveryNote;
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeCart(); });
});
