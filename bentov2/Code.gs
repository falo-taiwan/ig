// Code.gs - Sunny廚苑訂餐系統後端 v2.1 (Google Apps Script)

// 1. 發布 Web App 進入點
function doGet() {
  return HtmlService.createTemplateFromFile('index')
      .evaluate()
      .setTitle('Sunny廚苑 - 訂餐系統')
      .addMetaTag('viewport', 'width=device-width, initial-scale=1')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// 2. 初始化 Sheet (若不存在則自動創表)
function initDatabase() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // 建立 Products 頁籤
  var productSheet = ss.getSheetByName("Products");
  if (!productSheet) {
    productSheet = ss.insertSheet("Products");
    productSheet.appendRow(["id", "name", "category", "description", "price", "image", "status"]);
    // 寫入預設商品資料
    productSheet.appendRow(["13058", "彤緣蔬食便當/蛋奶素/無肉無負擔", "salad", "高質感紙餐盒，可微波可回收。價格不同、菜色不同！", 90, "https://www.slk9898.com.tw/wp-content/uploads/2024/08/LINE_ALBUM_新餐盒🍱_260530_1-300x300.jpg", "instock"]);
    productSheet.appendRow(["11331", "港式蔥油雞飯", "main", "自製油蔥香醇夠味，熱賣中！更換紙餐盒，更環保保溫！", 110, "https://www.slk9898.com.tw/wp-content/uploads/2024/08/LINE_ALBUM_新餐盒🍱_260530_18-300x300.jpg", "instock"]);
    productSheet.appendRow(["76512", "Sunny愛妻招牌手工醃製炸燒肉飯", "main", "選用台灣溫體豬肉！王者回歸！高質感紙餐盒！", 110, "https://www.slk9898.com.tw/wp-content/uploads/2025/12/LINE_ALBUM_新餐盒🍱_260530_19-300x300.jpg", "instock"]);
    productSheet.appendRow(["83669", "紅燒無骨滷排(先炸後滷)", "main", "人氣商品！選用台灣溫體豬大排，先炸後滷口感紮實！", 110, "https://www.slk9898.com.tw/wp-content/uploads/2026/03/S__127344680-300x300.jpg", "instock"]);
  }
  
  // 建立 Orders 頁籤 (在第 11 欄增加 options 以支援客製化細節)
  var orderSheet = ss.getSheetByName("Orders");
  if (!orderSheet) {
    orderSheet = ss.insertSheet("Orders");
    orderSheet.appendRow(["orderId", "timestamp", "userEmail", "customerName", "phone", "method", "details", "totalPrice", "status", "remarks", "options"]);
  }
  return "資料庫初始化成功！";
}

// 3. 取得所有商品
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

// 4. 提交新訂單
function submitOrder(orderData) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Orders");
  
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
    "pending", 
    orderData.remarks || "",
    orderData.options || ""
  ]);
  
  return { success: true, orderId: orderId };
}

// 5. 取得所有訂單 (後台與會員查詢用)
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

// 6. 更新訂單狀態
function updateOrderStatus(orderId, newStatus) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Orders");
  var data = sheet.getDataRange().getValues();
  
  for (var i = 1; i < data.length; i++) {
    if (data[i][0] === orderId) {
      sheet.getRange(i + 1, 9).setValue(newStatus); 
      return { success: true };
    }
  }
  return { success: false, message: "找不到該訂單" };
}

// 7. 更新商品資訊
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
  
  sheet.appendRow([
    productData.id,
    productData.name,
    productData.category,
    productData.description,
    Number(productData.price),
    productData.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300",
    productData.status || "instock"
  ]);
  return { success: true, isNew: true };
}
