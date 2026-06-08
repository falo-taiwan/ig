// script.js - Sunny廚苑訂餐系統前端邏輯 & 模擬後端橋接器

// --- 1. 初始化資料庫與預設資料 ---
const DEFAULT_PRODUCTS = [
    {
        id: "13058",
        name: "彤緣蔬食便當/蛋奶素/無肉無負擔",
        category: "salad",
        description: "高質感環保可微波餐盒。精心調製時蔬配菜，讓您清爽吃、無負擔！(注意：此餐盒主菜為精選奶蛋素食材，非全素喔)",
        price: 90,
        image: "https://www.slk9898.com.tw/wp-content/uploads/2024/08/LINE_ALBUM_新餐盒🍱_260530_1-300x300.jpg",
        status: "instock"
    },
    {
        id: "11331",
        name: "港式蔥油雞飯",
        category: "main",
        description: "香醇自製港式油蔥，搭配多汁溫體雞肉！經典口味王者回歸！保溫餐盒外送，鎖住熱騰鮮味！",
        price: 110,
        image: "https://www.slk9898.com.tw/wp-content/uploads/2024/08/LINE_ALBUM_新餐盒🍱_260530_18-300x300.jpg",
        status: "instock"
    },
    {
        id: "76512",
        name: "Sunny愛妻招牌手工醃製炸燒肉飯",
        category: "main",
        description: "精選台灣溫體豬五花肉，手工秘方醃製多時後酥炸，外酥內嫩！紙餐盒微波依然美味，人氣熱賣！",
        price: 110,
        image: "https://www.slk9898.com.tw/wp-content/uploads/2025/12/LINE_ALBUM_新餐盒🍱_260530_19-300x300.jpg",
        status: "instock"
    },
    {
        id: "83669",
        name: "紅燒無骨滷排(先炸後滷)",
        category: "main",
        description: "人氣爆棚新品！溫體豬大排先油炸鎖汁，再丟入主廚陳年老滷汁慢火燉煮，完全去骨，大口咬下超滿足！",
        price: 110,
        image: "https://www.slk9898.com.tw/wp-content/uploads/2026/03/S__127344680-300x300.jpg",
        status: "instock"
    },
    {
        id: "87428",
        name: "什錦胡麻水果沙拉 (獨家胡麻風味)",
        category: "salad",
        description: "夏季商品熱力開賣！精選多款季節水果與鮮嫩生菜，淋上特製濃郁胡麻醬，夏日解暑美味！",
        price: 110,
        image: "https://www.slk9898.com.tw/wp-content/uploads/2026/03/LINE_ALBUM_新餐盒🍱_260530_6-300x300.jpg",
        status: "instock"
    },
    {
        id: "87429",
        name: "什錦冰梅水果沙拉 (獨家酸甜冰梅)",
        category: "salad",
        description: "酸甜開胃必點！夏日限定冰梅調醬，將當季清甜水果的鮮美味道再次昇華，清爽健康無負擔！",
        price: 110,
        image: "https://www.slk9898.com.tw/wp-content/uploads/2026/03/LINE_ALBUM_新餐盒🍱_260530_6-300x300.jpg",
        status: "instock"
    },
    {
        id: "91945",
        name: "川味家常肉絲便當 (肉超多飽足款)",
        category: "main",
        description: "正宗川香家常爆炒，肉絲軟嫩、鹹香帶點微辣！配菜豐富，超大肉量絕對滿足食肉大胃王！",
        price: 110,
        image: "https://www.slk9898.com.tw/wp-content/uploads/2026/05/LINE_ALBUM_新餐盒🍱_260530_14-300x300.jpg",
        status: "instock"
    },
    {
        id: "95251",
        name: "椒麻螺絲米線 (香辣爆表)",
        category: "salad",
        description: "特製螺絲米線吸收川味椒麻紅油，搭配脆口黃瓜與花生，辣勁十足，酸爽解熱，辣度爆表！",
        price: 110,
        image: "https://www.slk9898.com.tw/wp-content/uploads/2026/05/LINE_ALBUM_新餐盒🍱_260530_5-300x300.jpg",
        status: "instock"
    },
    {
        id: "76513",
        name: "Sunny主廚客製會議精緻餐盒",
        category: "main",
        description: "針對公司行號會議、貴賓研討會客製的精緻雙主菜餐盒，提供 200元/250元 雙規格供預算調配！(需提早預定)",
        price: 200,
        image: "https://www.slk9898.com.tw/wp-content/uploads/2025/12/LINE_ALBUM_新餐盒🍱_260530_3-300x300.jpg",
        status: "instock"
    },
    {
        id: "38575",
        name: "【特惠公告】感謝銀行電子袁董事長體恤員工補助餐費",
        category: "promo",
        description: "賀！每月伙食津貼外，袁董事長體恤員工辛苦，特額外補貼員工到店食堂點餐 *30元* 餐費！好人一生平安！",
        price: 0,
        image: "https://www.slk9898.com.tw/wp-content/uploads/2025/04/LINE_ALBUM_新餐盒🍱_260530_1-300x300.jpg",
        status: "outofstock"
    },
    {
        id: "38577",
        name: "【季節公告】浪漫六月即將推出夏季商品，敬請期待",
        category: "promo",
        description: "夏季商品預計4/1正式開跑，歡迎老客戶提前使用語音諮詢優惠，另有熟客特別好康唷！",
        price: 0,
        image: "https://www.slk9898.com.tw/wp-content/uploads/2025/04/LINE_ALBUM_新餐盒🍱_260530_7-300x300.jpg",
        status: "outofstock"
    }
];

const DEFAULT_ORDERS = [
    {
        orderId: "SLK-827361",
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        userEmail: "member@slk.com",
        customerName: "測試會員",
        phone: "0912-345678",
        method: "delivery",
        details: "港式蔥油雞飯 x2 ($220), 彤緣蔬食便當/蛋奶素/無肉無負擔 x1 ($90)",
        totalPrice: 310,
        status: "completed",
        remarks: "不要餐具"
    },
    {
        orderId: "SLK-948261",
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        userEmail: "guest",
        customerName: "張大同",
        phone: "0999-111222",
        method: "pickup",
        details: "紅燒無骨滷排(先炸後滷) x3 ($330)",
        totalPrice: 330,
        status: "preparing",
        remarks: "飯少油蔥多"
    },
    {
        orderId: "SLK-182749",
        timestamp: new Date().toISOString(),
        userEmail: "guest",
        customerName: "李小美",
        phone: "0988-777888",
        method: "delivery",
        details: "Sunny主廚客製會議精緻餐盒 x5 ($1000)",
        totalPrice: 1000,
        status: "pending",
        remarks: "需11:45送達銀行電子大門"
    }
];

// Helper: 讀取/儲存 LocalStorage
function getLocalData(key) {
    const data = localStorage.getItem(`slk_poc_${key}`);
    return data ? JSON.parse(data) : null;
}

function setLocalData(key, value) {
    localStorage.setItem(`slk_poc_${key}`, JSON.stringify(value));
}

// 初始化資料庫
function initializeDB() {
    if (!getLocalData('products')) {
        setLocalData('products', DEFAULT_PRODUCTS);
    }
    if (!getLocalData('orders')) {
        setLocalData('orders', DEFAULT_ORDERS);
    }
}
initializeDB();

// --- 2. Google Apps Script Bridge (模擬 GAS `google.script.run`) ---
// 如果在真實 GAS 中，google.script.run 會被 Google 自動注入，
// 下面程式碼做安全攔截：在本地瀏覽器運行時自動掛載 mock 邏輯，避免噴 Exception
if (typeof google === 'undefined' || !google.script) {
    window.google = {
        script: {
            run: {
                withSuccessHandler: function(onSuccess) {
                    this._successHandler = onSuccess;
                    return this;
                },
                withFailureHandler: function(onFailure) {
                    this._failureHandler = onFailure;
                    return this;
                },
                getProducts: function() {
                    setTimeout(() => {
                        const products = getLocalData('products');
                        this._successHandler(products);
                    }, 200);
                },
                getOrders: function() {
                    setTimeout(() => {
                        const orders = getLocalData('orders');
                        this._successHandler(orders);
                    }, 200);
                },
                submitOrder: function(orderData) {
                    setTimeout(() => {
                        const orders = getLocalData('orders');
                        const orderId = "SLK-" + new Date().getTime().toString().slice(-6) + Math.floor(10 + Math.random() * 90);
                        const newOrder = {
                            orderId: orderId,
                            timestamp: new Date().toISOString(),
                            userEmail: orderData.userEmail,
                            customerName: orderData.customerName,
                            phone: orderData.phone,
                            method: orderData.method,
                            details: orderData.details,
                            totalPrice: Number(orderData.totalPrice),
                            status: 'pending',
                            remarks: orderData.remarks || ""
                        };
                        orders.unshift(newOrder); // 最新訂單排在最前
                        setLocalData('orders', orders);
                        this._successHandler({ success: true, orderId: orderId });
                    }, 300);
                },
                updateOrderStatus: function(orderId, status) {
                    setTimeout(() => {
                        const orders = getLocalData('orders');
                        const idx = orders.findIndex(o => o.orderId === orderId);
                        if (idx !== -1) {
                            orders[idx].status = status;
                            setLocalData('orders', orders);
                            this._successHandler({ success: true });
                        } else {
                            if (this._failureHandler) this._failureHandler("找不到訂單");
                        }
                    }, 150);
                },
                updateProduct: function(productData) {
                    setTimeout(() => {
                        const products = getLocalData('products');
                        const idx = products.findIndex(p => p.id.toString() === productData.id.toString());
                        if (idx !== -1) {
                            products[idx] = { 
                                ...products[idx], 
                                name: productData.name,
                                category: productData.category,
                                description: productData.description,
                                price: Number(productData.price),
                                image: productData.image,
                                status: productData.status
                            };
                            setLocalData('products', products);
                            this._successHandler({ success: true });
                        } else {
                            // 新增
                            const newProd = {
                                id: productData.id || new Date().getTime().toString().slice(-6),
                                name: productData.name,
                                category: productData.category,
                                description: productData.description,
                                price: Number(productData.price),
                                image: productData.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300",
                                status: productData.status || "instock"
                            };
                            products.push(newProd);
                            setLocalData('products', products);
                            this._successHandler({ success: true, isNew: true });
                        }
                    }, 200);
                }
            }
        }
    };
}

// --- 3. 全域變數與資料狀態 ---
let currentRole = 'guest'; // guest, member, admin
let allProducts = [];
let shoppingCart = [];
let currentCategoryFilter = 'all';

// --- 4. 網頁初始化與導航視角切換 ---
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    updateNavbarUserBadge();
});

// 切換主頁面 Tabs
function switchView(viewName) {
    // 移除所有 Tab Active 樣式
    document.querySelectorAll('.nav-item').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.view-panel').forEach(panel => panel.classList.remove('active'));

    // 套用特定 Tab Active
    document.getElementById(`view-${viewName}`).classList.add('active');
    const navBtn = document.getElementById(`nav-${viewName}`);
    if (navBtn) navBtn.classList.add('active');

    // 進入該視角時的額外觸發
    if (viewName === 'member') {
        loadMemberOrders();
    } else if (viewName === 'admin') {
        loadAdminData();
    }
}

// 切換管理員後台的內部子 Tabs (營業概況, 訂單管理, 商品管理)
function switchAdminTab(tabName) {
    document.querySelectorAll('.admin-menu-item').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.admin-tab-panel').forEach(panel => panel.classList.remove('active'));

    document.getElementById(`admin-tab-${tabName}`).classList.add('active');
    document.getElementById(`admin-tab-btn-${tabName}`).classList.add('active');

    if (tabName === 'dashboard') {
        renderSalesChart();
    }
}

// --- 5. 商品資料載入與渲染 (選單前端) ---
function loadProducts() {
    google.script.run.withSuccessHandler(products => {
        allProducts = products;
        renderProductGrid(products);
        // 如果後台打開，同步更新後台產品表
        if (document.getElementById('view-admin').classList.contains('active')) {
            renderAdminProductsTable();
        }
    }).getProducts();
}

function renderProductGrid(products) {
    const container = document.getElementById('product-list-container');
    container.innerHTML = '';

    // 篩選與搜尋
    let filtered = products;
    if (currentCategoryFilter !== 'all') {
        filtered = filtered.filter(p => p.category === currentCategoryFilter);
    }

    if (filtered.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-muted);">
                <i class="fa-solid fa-cookie-bite" style="font-size: 3rem; margin-bottom: 15px; opacity: 0.3;"></i>
                <p>沒有找到符合該分類的商品餐盒</p>
            </div>
        `;
        return;
    }

    filtered.forEach(p => {
        const isOutOfStock = p.status === 'outofstock';
        const card = document.createElement('div');
        card.className = 'product-card';
        
        // 如果是公告，做不同的樣式高亮
        const isPromo = p.category === 'promo';
        const priceDisplay = isPromo ? '最新公告' : `$${p.price}`;

        card.innerHTML = `
            ${isOutOfStock ? `<span class="product-badge out-of-stock">已售罄</span>` : ''}
            ${p.category === 'promo' ? `<span class="product-badge" style="background-color: var(--primary)">熱門資訊</span>` : ''}
            <div class="product-img-wrapper">
                <img src="${p.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300'}" class="product-img" alt="${p.name}">
            </div>
            <div class="product-info">
                <span class="product-meta">${p.category === 'main' ? '主餐便當' : p.category === 'salad' ? '沙拉米線' : '餐廳公告'}</span>
                <h4 class="product-title" title="${p.name}">${p.name}</h4>
                <p class="product-desc">${p.description}</p>
                <div class="product-action-row">
                    <div class="product-price-box">
                        ${isPromo ? '' : '<span class="product-price-currency">單價</span>'}
                        <span class="${isPromo ? 'product-meta' : 'product-price-amount'}" style="${isPromo ? 'font-size: 1rem; font-weight:700;' : ''}">${isPromo ? '特惠諮詢' : p.price}</span>
                    </div>
                    ${isPromo ? 
                      `<button class="order-btn" style="background-color:#64748b" onclick="showToast('請撥打語音詢問此公告細節', 'info')"><i class="fa-solid fa-phone"></i>聯絡</button>` :
                      `<button class="order-btn" ${isOutOfStock ? 'disabled' : ''} onclick="addToCart('${p.id}')">
                            <i class="fa-solid fa-plus"></i>點餐
                       </button>`
                    }
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// 搜尋過濾
function filterProducts() {
    const query = document.getElementById('search-box').value.toLowerCase().trim();
    if (query === '') {
        renderProductGrid(allProducts);
        return;
    }
    const filtered = allProducts.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.description.toLowerCase().includes(query)
    );
    renderProductGrid(filtered);
}

// 分類切換
function filterCategory(cat, btnElement) {
    document.querySelectorAll('.cat-tab').forEach(b => b.classList.remove('active'));
    btnElement.classList.add('active');
    currentCategoryFilter = cat;
    renderProductGrid(allProducts);
}

// --- 6. 購物車核心引擎 ---
function toggleCart(isOpen) {
    const drawer = document.getElementById('cart-drawer');
    const overlay = document.getElementById('cart-overlay');
    if (isOpen) {
        drawer.classList.add('open');
        overlay.classList.add('open');
    } else {
        drawer.classList.remove('open');
        overlay.classList.remove('open');
    }
}

function addToCart(productId) {
    const product = allProducts.find(p => p.id === productId);
    if (!product || product.status === 'outofstock') return;

    const existing = shoppingCart.find(item => item.product.id === productId);
    if (existing) {
        existing.quantity += 1;
    } else {
        shoppingCart.push({ product, quantity: 1 });
    }

    updateCartUI();
    showToast(`已新增 ${product.name} 至點餐籃`, 'success');
}

function updateCartQuantity(productId, delta) {
    const item = shoppingCart.find(item => item.product.id === productId);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
        shoppingCart = shoppingCart.filter(item => item.product.id !== productId);
    }
    updateCartUI();
}

function removeFromCart(productId) {
    shoppingCart = shoppingCart.filter(item => item.product.id !== productId);
    updateCartUI();
    showToast('已移除餐點', 'info');
}

function updateCartUI() {
    const container = document.getElementById('cart-items-container');
    const checkoutForm = document.getElementById('checkout-form-container');
    const totalPriceDisplay = document.getElementById('cart-total-price');
    const cartCountDisplay = document.getElementById('cart-count');
    const submitBtn = document.getElementById('submit-order-btn');

    container.innerHTML = '';
    
    // 計算總數與金額
    let totalItems = 0;
    let totalPrice = 0;

    if (shoppingCart.length === 0) {
        container.innerHTML = `
            <div class="empty-cart-message">
                <i class="fa-solid fa-cart-shopping"></i>
                <p>您的點餐籃空空如也<br>快去挑選好吃的餐盒吧！</p>
            </div>
        `;
        checkoutForm.style.display = 'none';
        totalPriceDisplay.textContent = '0';
        cartCountDisplay.textContent = '0';
        submitBtn.disabled = true;
        return;
    }

    // 有商品，顯示結帳表單
    checkoutForm.style.display = 'block';
    submitBtn.disabled = false;

    shoppingCart.forEach(item => {
        totalItems += item.quantity;
        totalPrice += item.product.price * item.quantity;

        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <img src="${item.product.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300'}" class="cart-item-img" alt="${item.product.name}">
            <div class="cart-item-details">
                <span class="cart-item-title">${item.product.name}</span>
                <span class="cart-item-price">NT$ ${item.product.price} / 個</span>
                <div class="cart-item-controls">
                    <div class="quantity-control">
                        <button class="qty-btn" onclick="updateCartQuantity('${item.product.id}', -1)">-</button>
                        <span class="qty-val">${item.quantity}</span>
                        <button class="qty-btn" onclick="updateCartQuantity('${item.product.id}', 1)">+</button>
                    </div>
                    <button class="remove-item-btn" onclick="removeFromCart('${item.product.id}')">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
            </div>
        `;
        container.appendChild(div);
    });

    totalPriceDisplay.textContent = totalPrice.toString();
    cartCountDisplay.textContent = totalItems.toString();
}

function toggleMethodFields() {
    const method = document.getElementById('checkout-method').value;
    const addressGroup = document.getElementById('address-group');
    const deptGroup = document.getElementById('dept-group');

    if (method === 'pickup') {
        addressGroup.style.display = 'none';
        deptGroup.style.display = 'none';
    } else {
        addressGroup.style.display = 'block';
        deptGroup.style.display = 'block';
    }
}

// 結帳送出訂單
function submitOrder() {
    const name = document.getElementById('checkout-name').value.trim();
    const phone = document.getElementById('checkout-phone').value.trim();
    const method = document.getElementById('checkout-method').value;
    const dept = document.getElementById('checkout-dept').value.trim();
    const address = document.getElementById('checkout-address').value.trim();
    const remarks = document.getElementById('checkout-remarks').value.trim();

    if (!name || !phone) {
        showToast('請填寫收件人姓名與電話！', 'error');
        return;
    }

    if (method === 'delivery' && !address) {
        showToast('外送模式下請填寫完整地址！', 'error');
        return;
    }

    const totalPrice = Number(document.getElementById('cart-total-price').textContent);

    // 彙整明細文字
    const details = shoppingCart.map(item => `${item.product.name} x${item.quantity} ($${item.product.price * item.quantity})`).join(', ');

    // 禁用送出按鈕
    const submitBtn = document.getElementById('submit-order-btn');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> 送出中...';

    const orderData = {
        userEmail: currentRole === 'member' ? 'member@slk.com' : 'guest',
        customerName: name,
        phone: phone + (dept ? ` (${dept})` : ''),
        method: method === 'delivery' ? `外送 (${address})` : '店面自取',
        details: details,
        totalPrice: totalPrice,
        remarks: remarks
    };

    google.script.run.withSuccessHandler(res => {
        if (res.success) {
            showToast(`訂單送出成功！您的訂單編號是 ${res.orderId}`, 'success');
            // 清空購物車
            shoppingCart = [];
            updateCartUI();
            toggleCart(false);
            
            // 重置結帳欄位
            document.getElementById('checkout-name').value = '';
            document.getElementById('checkout-phone').value = '';
            document.getElementById('checkout-dept').value = '';
            document.getElementById('checkout-address').value = '';
            document.getElementById('checkout-remarks').value = '';

            // 如果是會員，直接跳至會員專區看訂單
            if (currentRole === 'member') {
                switchView('member');
            }
        }
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fa-solid fa-circle-check"></i> 送出訂單';
    }).submitOrder(orderData);
}

// --- 7. 會員訂單專區 ---
function loadMemberOrders() {
    const container = document.getElementById('member-orders-container');
    const orderCountBadge = document.getElementById('stat-order-count');
    const totalSpentBadge = document.getElementById('stat-total-spent');
    container.innerHTML = '<div style="text-align:center; padding: 20px;"><i class="fa-solid fa-spinner fa-spin"></i> 載入訂單中...</div>';

    google.script.run.withSuccessHandler(orders => {
        // 只過濾出本測試會員 (member@slk.com) 且排除其他
        const myOrders = orders.filter(o => o.userEmail === 'member@slk.com');
        container.innerHTML = '';
        
        orderCountBadge.textContent = myOrders.length.toString();
        const total = myOrders.reduce((sum, o) => sum + (o.status !== 'cancelled' ? Number(o.totalPrice) : 0), 0);
        totalSpentBadge.textContent = `NT$ ${total}`;

        if (myOrders.length === 0) {
            container.innerHTML = `
                <div style="text-align: center; padding: 40px; color: var(--text-muted);">
                    <i class="fa-solid fa-receipt" style="font-size: 3rem; margin-bottom: 15px; opacity: 0.2;"></i>
                    <p>尚無任何點餐訂單紀錄</p>
                </div>
            `;
            return;
        }

        myOrders.forEach(o => {
            const dateStr = new Date(o.timestamp).toLocaleString();
            const div = document.createElement('div');
            div.className = 'order-item-card';
            div.innerHTML = `
                <div class="order-item-header">
                    <span class="order-item-id"><i class="fa-solid fa-hashtag"></i> ${o.orderId}</span>
                    <span class="order-item-date">${dateStr}</span>
                    <span class="status-badge ${o.status}">${translateStatus(o.status)}</span>
                </div>
                <div class="order-item-body">
                    <div class="order-item-details"><strong>餐點明細:</strong> ${o.details}</div>
                    <div class="order-item-meta"><strong>取餐方式:</strong> ${o.method}</div>
                    ${o.remarks ? `<div class="order-item-meta"><strong>餐點備註:</strong> <span style="color:var(--accent); font-weight:600;">${o.remarks}</span></div>` : ''}
                    <div class="order-item-total">合計: NT$ ${o.totalPrice}</div>
                </div>
            `;
            container.appendChild(div);
        });
    }).getOrders();
}

function translateStatus(status) {
    switch(status) {
        case 'pending': return '待處理';
        case 'preparing': return '準備中';
        case 'completed': return '已完成';
        case 'cancelled': return '已取消';
        default: return status;
    }
}

// --- 8. 後台管理系統核心 (Admin Panel) ---
function loadAdminData() {
    loadAdminMetrics();
    renderAdminOrdersTable();
    renderAdminProductsTable();
}

function loadAdminMetrics() {
    google.script.run.withSuccessHandler(orders => {
        const totalOrders = orders.length;
        const totalRevenue = orders.reduce((sum, o) => sum + (o.status === 'completed' ? Number(o.totalPrice) : 0), 0);
        const activeOrders = orders.filter(o => o.status !== 'cancelled').length;
        const avgValue = activeOrders > 0 ? Math.round(orders.reduce((sum, o) => sum + (o.status !== 'cancelled' ? Number(o.totalPrice) : 0), 0) / activeOrders) : 0;

        document.getElementById('admin-metric-revenue').textContent = `NT$ ${totalRevenue.toLocaleString()}`;
        document.getElementById('admin-metric-orders').textContent = `${totalOrders} 筆`;
        document.getElementById('admin-metric-aov').textContent = `NT$ ${avgValue}`;

        renderSalesChart(orders);
    }).getOrders();
}

// 模擬動態繪製業績報表
function renderSalesChart(orders = []) {
    const container = document.getElementById('orders-chart-container');
    container.innerHTML = '';

    // 製造 5 個長條圖柱子代表近日業績
    const chartData = [
        { label: '6/4', value: 800 },
        { label: '6/5', value: 1200 },
        { label: '6/6', value: 950 },
        { label: '6/7', value: 1600 },
        { label: '今日', value: 0 }
    ];

    // 加總今日成交額
    const todayStr = new Date().toDateString();
    const todayRevenue = orders
        .filter(o => new Date(o.timestamp).toDateString() === todayStr && o.status === 'completed')
        .reduce((sum, o) => sum + Number(o.totalPrice), 0);

    chartData[4].value = todayRevenue || 500; // 最少給500好展示

    const maxVal = Math.max(...chartData.map(d => d.value)) || 1000;

    chartData.forEach(d => {
        const pct = (d.value / maxVal) * 80 + 10; // 保留一些最高高度比例
        const wrapper = document.createElement('div');
        wrapper.className = 'chart-bar-wrapper';
        wrapper.innerHTML = `
            <div class="chart-bar" style="height: ${pct}%;">
                <span class="chart-bar-tooltip">NT$ ${d.value}</span>
            </div>
            <span class="chart-label">${d.label}</span>
        `;
        container.appendChild(wrapper);
    });
}

// 渲染後台訂單表
function renderAdminOrdersTable() {
    const tbody = document.getElementById('admin-orders-table-body');
    tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;"><i class="fa-solid fa-spinner fa-spin"></i> 載入中...</td></tr>';

    google.script.run.withSuccessHandler(orders => {
        tbody.innerHTML = '';
        if (orders.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; color:var(--text-muted);">暫無點單訂單</td></tr>';
            return;
        }

        orders.forEach(o => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><strong>${o.orderId}</strong></td>
                <td>
                    <strong>${o.customerName}</strong><br>
                    <span style="font-size:0.75rem; color:var(--text-muted);">${o.phone}</span>
                </td>
                <td style="max-width:200px; font-size:0.82rem; word-break:break-all;">${o.details}</td>
                <td style="font-size:0.8rem;">${o.method}</td>
                <td><strong>$${o.totalPrice}</strong></td>
                <td><span class="status-badge ${o.status}">${translateStatus(o.status)}</span></td>
                <td>
                    <select class="form-control" style="width:110px; padding:4px 8px; font-size:0.8rem;" onchange="changeOrderStatus('${o.orderId}', this.value)">
                        <option value="pending" ${o.status === 'pending' ? 'selected' : ''}>待處理</option>
                        <option value="preparing" ${o.status === 'preparing' ? 'selected' : ''}>準備中</option>
                        <option value="completed" ${o.status === 'completed' ? 'selected' : ''}>已完成</option>
                        <option value="cancelled" ${o.status === 'cancelled' ? 'selected' : ''}>已取消</option>
                    </select>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }).getOrders();
}

function changeOrderStatus(orderId, newStatus) {
    google.script.run.withSuccessHandler(res => {
        if (res.success) {
            showToast(`訂單 ${orderId} 狀態已變更為 ${translateStatus(newStatus)}`, 'success');
            loadAdminMetrics(); // 同步更新營業額指標
        }
    }).updateOrderStatus(orderId, newStatus);
}

// 渲染後台商品表
function renderAdminProductsTable() {
    const tbody = document.getElementById('admin-products-table-body');
    tbody.innerHTML = '';

    allProducts.forEach(p => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><img src="${p.image}" style="width:40px; height:40px; object-fit:cover; border-radius:4px;" alt=""></td>
            <td><strong>${p.name}</strong></td>
            <td><span class="product-meta">${p.category === 'main' ? '主餐便當' : p.category === 'salad' ? '沙拉米線' : '公告'}</span></td>
            <td>$${p.price}</td>
            <td>
                <span class="status-badge ${p.status === 'instock' ? 'completed' : 'cancelled'}">
                    ${p.status === 'instock' ? '供餐中' : '已售罄'}
                </span>
            </td>
            <td>
                <button class="action-btn edit" onclick="openProductModal('${p.id}')">
                    <i class="fa-solid fa-pen-to-square"></i> 編輯
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// --- 9. 商品管理彈出編輯視窗 (Modal) ---
function openProductModal(productId = null) {
    const modal = document.getElementById('product-modal');
    const title = document.getElementById('modal-title');
    
    // 清空 / 預設
    document.getElementById('modal-prod-id').value = '';
    document.getElementById('modal-prod-name').value = '';
    document.getElementById('modal-prod-category').value = 'main';
    document.getElementById('modal-prod-price').value = '110';
    document.getElementById('modal-prod-desc').value = '';
    document.getElementById('modal-prod-image').value = '';
    document.getElementById('modal-prod-status').value = 'instock';

    if (productId) {
        title.textContent = '修改餐點資訊';
        const p = allProducts.find(prod => prod.id === productId);
        if (p) {
            document.getElementById('modal-prod-id').value = p.id;
            document.getElementById('modal-prod-name').value = p.name;
            document.getElementById('modal-prod-category').value = p.category;
            document.getElementById('modal-prod-price').value = p.price;
            document.getElementById('modal-prod-desc').value = p.description;
            document.getElementById('modal-prod-image').value = p.image;
            document.getElementById('modal-prod-status').value = p.status;
        }
    } else {
        title.textContent = '新增上架餐點';
    }

    modal.classList.add('open');
}

function closeProductModal() {
    document.getElementById('product-modal').classList.remove('open');
}

function saveProduct() {
    const id = document.getElementById('modal-prod-id').value;
    const name = document.getElementById('modal-prod-name').value.trim();
    const category = document.getElementById('modal-prod-category').value;
    const price = Number(document.getElementById('modal-prod-price').value);
    const description = document.getElementById('modal-prod-desc').value.trim();
    const image = document.getElementById('modal-prod-image').value.trim();
    const status = document.getElementById('modal-prod-status').value;

    if (!name || isNaN(price)) {
        showToast('請填寫完整名稱與合法價格！', 'error');
        return;
    }

    const prodData = { id, name, category, price, description, image, status };

    google.script.run.withSuccessHandler(res => {
        if (res.success) {
            closeProductModal();
            showToast('上架餐點資料已儲存更新！', 'success');
            loadProducts(); // 重新讀取渲染前端
        }
    }).updateProduct(prodData);
}

// --- 10. 角色切換控制列 ---
function changeUserRole(role) {
    currentRole = role;
    
    // 更新 switcher buttons 狀態
    document.querySelectorAll('.role-switcher-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`.role-switcher-btn.${role}`).classList.add('active');

    // 修改 navbar UI 與權限控制
    const navAdmin = document.getElementById('nav-admin');
    if (role === 'admin') {
        navAdmin.style.display = 'flex';
        showToast('已切換至「後台管理員」權限！可查看與管理所有訂單及上架餐點。', 'info');
    } else {
        navAdmin.style.display = 'none';
        // 如果目前停留在 admin 視角，切換回首頁選單
        if (document.getElementById('view-admin').classList.contains('active')) {
            switchView('menu');
        }
        if (role === 'member') {
            showToast('已切換至「測試會員 (member@slk.com)」。此模式下送出的訂單將存入會員專區中。', 'success');
        } else {
            showToast('已切換至「訪客模式」。無須登入即可進行購物籃點餐結帳。', 'info');
        }
    }
    
    updateNavbarUserBadge();
    
    // 如果目前在會員視角，重新加載該視角資料
    if (document.getElementById('view-member').classList.contains('active')) {
        loadMemberOrders();
    }
}

function updateNavbarUserBadge() {
    const userDisplay = document.getElementById('navbar-user-display');
    const label = userDisplay.querySelector('span');

    if (currentRole === 'admin') {
        label.textContent = '管理員 (admin@slk.com)';
        userDisplay.style.backgroundColor = '#fef3c7';
        userDisplay.style.color = '#d97706';
    } else if (currentRole === 'member') {
        label.textContent = '測試會員 (學生)';
        userDisplay.style.backgroundColor = '#e0f2fe';
        userDisplay.style.color = '#0284c7';
    } else {
        label.textContent = '訪客模式';
        userDisplay.style.backgroundColor = '#f1f5f9';
        userDisplay.style.color = '#64748b';
    }
}

// --- 11. Toast 訊息彈窗 ---
function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    let icon = 'fa-info-circle';
    if (type === 'success') icon = 'fa-check-circle';
    if (type === 'error') icon = 'fa-triangle-exclamation';

    toast.innerHTML = `
        <i class="fa-solid ${icon} toast-icon ${type}"></i>
        <span>${message}</span>
    `;

    container.appendChild(toast);
    
    // 動態進入
    setTimeout(() => toast.classList.add('show'), 50);
    
    // 3秒後消退
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400);
    }, 3500);
}

// 複製 GAS 代碼輔助函數
function copyGasCode() {
    const code = document.getElementById('gas-code-content').textContent.trim();
    navigator.clipboard.writeText(code).then(() => {
        showToast('GAS 代碼已成功複製至剪貼簿！', 'success');
    }).catch(err => {
        showToast('複製失敗，請手動複製代碼框內容。', 'error');
    });
}
