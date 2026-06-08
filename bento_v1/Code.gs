// Code.gs - Sunny廚苑訂餐系統後端 (Google Apps Script)
//
// 📌 教學說明：
// 1. 本檔案為 Google Apps Script 後端代碼，請複製並貼入試算表選單「擴充功能 -> Apps Script」編輯器中。
// 2. 部署時請選擇「網頁應用程式 (Web Application)」，執行身分設定為「我」，存取權限設為「任何人 (Anyone)」。
// 3. 首次執行或部署時，請點選 Apps Script 選單中的「initDatabase」函數執行，以自動在試算表內建立 "Products" 與 "Orders" 兩個頁籤分頁。

// 1. 發布 Web App 進入點
function doGet() {
  return HtmlService.createTemplateFromFile('index')
      .evaluate()
      .setTitle('Sunny廚苑 - 訂餐系統 (AI 教學版)')
      .addMetaTag('viewport', 'width=device-width, initial-scale=1')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// 2. 初始化 Sheet (若不存在則自動創表，並寫入預設示範資料)
function initDatabase() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // A. 建立 Products 頁籤
  var productSheet = ss.getSheetByName("Products");
  if (!productSheet) {
    productSheet = ss.insertSheet("Products");
    // 寫入首列標題
    productSheet.appendRow(["id", "name", "category", "description", "price", "image", "status"]);
    
    // 寫入預設示範商品資料
    productSheet.appendRow(["13058", "彤緣蔬食便當/蛋奶素/無肉無負擔", "salad", "高質感環保可微波餐盒。精心調製時蔬配菜，讓您清爽吃、無負擔！", 90, "https://www.slk9898.com.tw/wp-content/uploads/2024/08/LINE_ALBUM_新餐盒🍱_260530_1-300x300.jpg", "instock"]);
    productSheet.appendRow(["11331", "港式蔥油雞飯", "main", "自製香醇油蔥，蔥香四溢夠滋味！熱賣大推薦！保溫餐盒包裝！", 110, "https://www.slk9898.com.tw/wp-content/uploads/2024/08/LINE_ALBUM_新餐盒🍱_260530_18-300x300.jpg", "instock"]);
    productSheet.appendRow(["76512", "Sunny愛妻招牌手工醃製炸燒肉飯", "main", "選用台灣溫體豬肉，手工獨門醃製，外酥內嫩！王者回歸！", 110, "https://www.slk9898.com.tw/wp-content/uploads/2025/12/LINE_ALBUM_新餐盒🍱_260530_19-300x300.jpg", "instock"]);
    productSheet.appendRow(["83669", "紅燒無骨滷排(先炸後滷)", "main", "人氣爆棚新品！溫體豬大排先油炸鎖汁，再丟入主廚陳年老滷汁慢火燉煮！", 110, "https://www.slk9898.com.tw/wp-content/uploads/2026/03/S__127344680-300x300.jpg", "instock"]);
    productSheet.appendRow(["87428", "什錦胡麻水果沙拉 (獨家胡麻風味)", "salad", "夏季商品熱力開賣！精選多款季節水果與鮮嫩生菜，淋上特製胡麻醬！", 110, "https://www.slk9898.com.tw/wp-content/uploads/2026/03/LINE_ALBUM_新餐盒🍱_260530_6-300x300.jpg", "instock"]);
  }
  
  // B. 建立 Orders 頁籤
  var orderSheet = ss.getSheetByName("Orders");
  if (!orderSheet) {
    orderSheet = ss.insertSheet("Orders");
    // 寫入訂單欄位
    orderSheet.appendRow(["orderId", "timestamp", "userEmail", "customerName", "phone", "method", "details", "totalPrice", "status", "remarks"]);
  }
  
  return "資料庫初始化成功！";
}

// 3. 取得所有商品 (讀取 Products 工作表)
function getProducts() {
  initDatabase();
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Products");
  var data = sheet.getDataRange().getValues();
  var headers = data[0];
  var products = [];
  
  for (var i = 1; i < data.length; i++) {
    var product = {};
    for (var j = 0; j < headers.length; j++) {
      product[headers[j]] = data[i][j];
    }
    products.push(product);
  }
  return products;
}

// 4. 提交新訂單 (寫入 Orders 工作表)
function submitOrder(orderData) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Orders");
  
  // 生成唯一的訂單編號
  var orderId = "SLK-" + new Date().getTime().toString().slice(-6) + Math.floor(10 + Math.random() * 90);
  var timestamp = new Date();
  
  sheet.appendRow([
    orderId,
    timestamp,
    orderData.userEmail,
    orderData.customerName,
    orderData.phone,
    orderData.method,
    orderData.details,
    Number(orderData.totalPrice),
    "pending", // 預設狀態為 待處理
    orderData.remarks || ""
  ]);
  
  return { success: true, orderId: orderId };
}

// 5. 取得所有訂單 (讀取 Orders 工作表)
function getOrders() {
  initDatabase();
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Orders");
  var data = sheet.getDataRange().getValues();
  var headers = data[0];
  var orders = [];
  
  for (var i = 1; i < data.length; i++) {
    var order = {};
    for (var j = 0; j < headers.length; j++) {
      order[headers[j]] = data[i][j];
    }
    orders.push(order);
  }
  return orders;
}

// 6. 更新訂單狀態 (後台更改狀態用)
function updateOrderStatus(orderId, newStatus) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Orders");
  var data = sheet.getDataRange().getValues();
  
  for (var i = 1; i < data.length; i++) {
    if (data[i][0] === orderId) {
      sheet.getRange(i + 1, 9).setValue(newStatus); // 狀態在第 9 欄 (I 欄)
      return { success: true };
    }
  }
  return { success: false, message: "找不到該訂單" };
}

// 7. 更新或新增商品資訊 (後台商品編輯用)
function updateProduct(productData) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Products");
  var data = sheet.getDataRange().getValues();
  
  for (var i = 1; i < data.length; i++) {
    if (data[i][0].toString() === productData.id.toString()) {
      sheet.getRange(i + 1, 2).setValue(productData.name);
      sheet.getRange(i + 1, 3).setValue(productData.category);
      sheet.getRange(i + 1, 4).setValue(productData.description);
      sheet.getRange(i + 1, 5).setValue(Number(productData.price));
      sheet.getRange(i + 1, 6).setValue(productData.image);
      sheet.getRange(i + 1, 7).setValue(productData.status);
      return { success: true };
    }
  }
  
  // 若商品 ID 不存在，則在最後一行新增商品
  sheet.appendRow([
    productData.id || new Date().getTime().toString().slice(-6),
    productData.name,
    productData.category,
    productData.description,
    Number(productData.price),
    productData.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300",
    productData.status || "instock"
  ]);
  return { success: true, isNew: true };
}
