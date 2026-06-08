// script.js - Sunny廚苑訂餐系統 v2.1 前端邏輯 (i18n & 客製化點餐版)

// --- 1. 多國語言對照翻譯庫 (i18n Dictionary) ---
const I18N_DICT = {
    "zh-TW": {
        web_title: "Sunny廚苑 - 訂餐系統 POC (AI 教學示範版)",
        logo_subtitle: "精緻外送訂餐系統",
        nav_menu: "超值美味餐點",
        nav_member: "訂餐查詢",
        nav_admin: "後台管理",
        nav_guide: "鼓勵與反饋",
        nav_cart: "購物車",
        nav_cart_link: "購物車",
        nav_checkout_link: "結帳",
        woo_breadcrumbs: "首頁 / 主餐",
        woo_page_title: "主餐",
        woo_result_count: "顯示所有 11 個結果",
        user_guest: "訪客模式",
        user_member: "測試會員 (學生)",
        user_admin: "管理員 (admin@slk.com)",
        hero_title: "Sunny主廚推薦精緻餐盒",
        hero_subtitle: "自製油蔥港式蔥油雞飯、招牌炸燒肉便當、紅燒無骨滷排！安心多一點，食材好一點，為您訂做而製的極致美味！",
        feat_pork: "100% 台灣溫體豬",
        feat_box: "高質感紙餐盒可微波",
        feat_delivery: "外送自取超便利",
        search_placeholder: "搜尋主餐、便當、沙拉...",
        cat_all: "全部商品",
        cat_main: "主餐便當",
        cat_salad: "沙拉米線",
        cat_promo: "最新公告",
        no_products: "沒有找到符合該分類的商品餐盒",
        btn_order: "點餐",
        btn_contact: "聯絡",
        toast_contact_info: "請撥打語音詢問此公告細節",
        toast_add_cart: "已新增 {name} 至點餐籃",
        toast_remove_cart: "已移除餐點",
        toast_order_success: "訂單送出成功！您的訂單編號是 {id}",
        toast_profile_saved: "會員地址設定儲存成功！結帳將自動預填此資訊。",
        toast_status_changed: "訂單 {id} 狀態已變更為 {status}",
        toast_role_admin: "已切換至「後台管理員」權限！可查看與管理所有訂單及上架餐點。",
        toast_role_member: "已切換至「測試會員 (member@slk.com)」。此模式下送出的訂單將存入會員專區中。",
        toast_role_guest: "已切換至「訪客模式」。無須登入即可進行購物籃點餐結帳。",
        cart_drawer_title: "您的點餐籃",
        cart_empty: "您的點餐籃空空如也\n快去挑選好吃的餐盒吧！",
        chk_shipping_title: "填寫配送明細",
        chk_name: "收件人姓名 *",
        chk_name_placeholder: "請輸入收件姓名",
        chk_phone: "聯絡電話 *",
        chk_phone_placeholder: "請輸入手機或分機",
        chk_method: "取餐方式 *",
        chk_method_pickup: "自取 (廚苑)",
        chk_method_delivery: "外送 (指定地點)",
        chk_dept: "公司/部門 *",
        chk_address: "外送地址 *",
        chk_address_placeholder: "請填寫完整外送大樓或樓層資訊",
        chk_remarks: "備註 (如: 飯少、不要辣、不要餐具)",
        chk_remarks_placeholder: "備註其他特殊餐點需求...",
        chk_total: "總計金額:",
        btn_submit_order: "送出訂單",
        btn_submit_ordering: "送出中...",
        label_stat_count: "訂單數量",
        label_stat_spent: "消費累計",
        label_member_menu_orders: "訂單紀錄",
        label_member_menu_profile: "帳號設定 / 地址簿",
        label_my_orders_title: "您的歷史訂單紀錄",
        label_profile_title: "基本資料與送餐地址簿",
        label_prof_name: "姓名 *",
        label_prof_phone: "聯絡電話 *",
        label_prof_dept: "公司/部門名稱",
        label_prof_address: "常用外送地址 *",
        btn_save_profile: "儲存地址資料",
        label_admin_menu_dashboard: "營業概況",
        label_admin_menu_orders: "訂單管理",
        label_admin_menu_products: "商品管理",
        label_metric_revenue: "累計營業額",
        label_metric_orders: "總訂單數",
        label_metric_aov: "平均單價 (AOV)",
        label_chart_trend: "每日訂單統計趨勢 (模擬數據)",
        label_chart_rank: "暢銷商品排行",
        label_admin_orders_title: "所有訂單列表",
        label_admin_products_title: "上架商品清單",
        btn_add_product: "新增商品",
        th_order_id: "訂單 ID",
        th_customer: "顧客資訊",
        th_details: "餐點與客製明細",
        th_method: "配送方式",
        th_total: "合計金額",
        th_status: "訂單狀態",
        th_action: "狀態更改",
        th_prod_img: "縮圖",
        th_prod_name: "名稱",
        th_prod_cat: "分類",
        th_prod_price: "單價 (TWD)",
        th_prod_status: "狀態",
        th_prod_edit: "操作",
        status_pending: "待處理",
        status_preparing: "準備中",
        status_completed: "已完成",
        status_cancelled: "已取消",
        opt_rice_title: "米飯份量",
        opt_rice_normal: "標準份量",
        opt_rice_extra: "米飯加量",
        opt_rice_less: "米飯減半",
        opt_custom_title: "客製化偏好",
        opt_no_scallion: "不要油蔥",
        opt_add_chili: "加生辣椒",
        opt_no_utensils: "免洗餐具",
        opt_catering_title: "會議餐盒預算級別",
        opt_catering_200: "精緻雙主菜餐盒 200元款",
        opt_catering_250: "豪華雙主菜餐盒 250元款",
        opt_required: "必選",
        btn_cancel: "取消",
        btn_add_cart: "加入點餐籃",
        admin_search_placeholder: "搜尋姓名、電話、訂單ID...",
        label_switcher_title: "教學帳號切換:",
        label_switcher_guest: "訪客",
        label_switcher_member: "會員(學生)",
        label_switcher_admin: "管理員(後台)",
        nav_gas: "GAS 部署",
        feedback_title: "鼓勵與反饋 (留言板)",
        feedback_worker_no: "留言工號 *",
        feedback_content: "鼓勵與反饋 *",
        feedback_clear: "清空",
        feedback_submit: "送出",
        alert_invalid_worker_no: "請輸入正確工號!!",
        alert_empty_feedback: "請填寫工號及回饋內容！",
        toast_feedback_success: "留言成功！",
        opt_feedback_status_all: "所有狀態",
        opt_feedback_status_unread: "未讀",
        opt_feedback_status_read: "已讀",
        btn_feedback_mark_read: "標示為已讀",
        btn_feedback_mark_unread: "標示為未讀",
        th_fb_seq: "項次",
        th_fb_status: "狀態",
        th_fb_worker_no: "留言工號",
        th_fb_dept: "部門",
        th_fb_name: "姓名",
        th_fb_content: "留言內容",
        th_fb_time: "留言時間",
        th_fb_action: "操作",
        alert_confirm_delete_fb: "確定要刪除這筆留言嗎？",
        alert_select_fb: "請先勾選要處理的留言",
        alert_save_success: "儲存成功！"
    },
    "en": {
        web_title: "Sunny Kitchen - Ordering System POC (AI Education)",
        logo_subtitle: "Premium Delivery & Takeout System",
        nav_menu: "Special Menu",
        nav_member: "Order Inquiry",
        nav_admin: "Admin Panel",
        nav_guide: "Feedback & Support",
        nav_cart: "Cart",
        nav_cart_link: "Cart",
        nav_checkout_link: "Checkout",
        woo_breadcrumbs: "Home / Main Entree",
        woo_page_title: "Main Entree",
        woo_result_count: "Showing all 11 results",
        user_guest: "Guest Mode",
        user_member: "Test Member (Student)",
        user_admin: "Administrator (admin@slk.com)",
        hero_title: "Sunny Chef's Premium Bento",
        hero_subtitle: "Special Scallion Chicken, Signature Crispy Pork & Red-Braised Pork Chop! High quality ingredients, customized bento made just for you!",
        feat_pork: "100% Fresh Taiwanese Pork",
        feat_box: "Premium Microwaveable Box",
        feat_delivery: "Convenient Delivery/Takeout",
        search_placeholder: "Search bento, salad, noodle...",
        cat_all: "All Items",
        cat_main: "Main Bento",
        cat_salad: "Salads & Noodles",
        cat_promo: "Announcements",
        no_products: "No bento box matches this category.",
        btn_order: "Order",
        btn_contact: "Contact",
        toast_contact_info: "Please dial phone inquiry for announcement details.",
        toast_add_cart: "Added {name} to cart",
        toast_remove_cart: "Item removed",
        toast_order_success: "Order submitted! Your order ID is {id}",
        toast_profile_saved: "Member profile saved successfully! Will autofill at checkout.",
        toast_status_changed: "Order {id} status changed to {status}",
        toast_role_admin: "Switched to 'Admin' credentials! You can manage all orders and products.",
        toast_role_member: "Switched to 'Test Member (member@slk.com)'. Orders will save to your account.",
        toast_role_guest: "Switched to 'Guest Mode'. Checkout directly without logging in.",
        cart_drawer_title: "Your Basket",
        cart_empty: "Your basket is empty.\nGo pick some delicious bento!",
        chk_shipping_title: "Delivery Details",
        chk_name: "Receiver Name *",
        chk_name_placeholder: "Enter receiver's name",
        chk_phone: "Contact Phone *",
        chk_phone_placeholder: "Enter phone or extension",
        chk_method: "Pickup Method *",
        chk_method_pickup: "Takeout (Kitchen)",
        chk_method_delivery: "Delivery (Address)",
        chk_dept: "Company/Department *",
        chk_address: "Delivery Address *",
        chk_address_placeholder: "Enter full building, floor, or room details",
        chk_remarks: "Remarks (e.g. less rice, no utensils)",
        chk_remarks_placeholder: "Other special preparation requests...",
        chk_total: "Total Price:",
        btn_submit_order: "Submit Order",
        btn_submit_ordering: "Submitting...",
        label_stat_count: "Orders Count",
        label_stat_spent: "Spent Accumulation",
        label_member_menu_orders: "Order History",
        label_member_menu_profile: "Account Profile",
        label_my_orders_title: "Your Order History",
        label_profile_title: "Profile & Delivery Address Book",
        label_prof_name: "Name *",
        label_prof_phone: "Phone *",
        label_prof_dept: "Company / Dept Name",
        label_prof_address: "Default Delivery Address *",
        btn_save_profile: "Save Profile Address",
        label_admin_menu_dashboard: "Overview",
        label_admin_menu_orders: "Orders Admin",
        label_admin_menu_products: "Products Admin",
        label_metric_revenue: "Total Sales",
        label_metric_orders: "Total Orders",
        label_metric_aov: "Average Order Value",
        label_chart_trend: "Daily Order Trends (Simulated)",
        label_chart_rank: "Top Selling Bento",
        label_admin_orders_title: "All Orders List",
        label_admin_products_title: "Bento Catalog Management",
        btn_add_product: "Add Product",
        th_order_id: "Order ID",
        th_customer: "Customer Info",
        th_details: "Bento & Customizations",
        th_method: "Logistics",
        th_total: "Amount",
        th_status: "Status",
        th_action: "Change Status",
        th_prod_img: "Image",
        th_prod_name: "Bento Name",
        th_prod_cat: "Category",
        th_prod_price: "Price (TWD)",
        th_prod_status: "Stock Status",
        th_prod_edit: "Edit",
        status_pending: "Pending",
        status_preparing: "Preparing",
        status_completed: "Completed",
        status_cancelled: "Cancelled",
        opt_rice_title: "Rice Portion",
        opt_rice_normal: "Standard Portion",
        opt_rice_extra: "Extra Rice",
        opt_rice_less: "Less Rice",
        opt_custom_title: "Preferences",
        opt_no_scallion: "No Scallion Oil",
        opt_add_chili: "Add Chili",
        opt_no_utensils: "No Utensils",
        opt_catering_title: "Catering Budget Tier",
        opt_catering_200: "Premium Box (TWD 200)",
        opt_catering_250: "Luxury Box (TWD 250)",
        opt_required: "Required",
        btn_cancel: "Cancel",
        btn_add_cart: "Add to Basket",
        admin_search_placeholder: "Search name, phone, order ID...",
        label_switcher_title: "Account Switcher:",
        label_switcher_guest: "Guest",
        label_switcher_member: "Student Member",
        label_switcher_admin: "Admin (Backend)",
        nav_gas: "GAS Deploy",
        feedback_title: "Feedback & Support (Message Board)",
        feedback_worker_no: "Employee ID *",
        feedback_content: "Feedback & Message *",
        feedback_clear: "Clear",
        feedback_submit: "Submit",
        alert_invalid_worker_no: "Please enter correct Employee ID!!",
        alert_empty_feedback: "Please enter Employee ID and message content!",
        toast_feedback_success: "Feedback submitted successfully!",
        opt_feedback_status_all: "All Status",
        opt_feedback_status_unread: "Unread",
        opt_feedback_status_read: "Read",
        btn_feedback_mark_read: "Mark Read",
        btn_feedback_mark_unread: "Mark Unread",
        th_fb_seq: "No.",
        th_fb_status: "Status",
        th_fb_worker_no: "Employee ID",
        th_fb_dept: "Dept",
        th_fb_name: "Name",
        th_fb_content: "Message Content",
        th_fb_time: "Submitted Time",
        th_fb_action: "Action",
        alert_confirm_delete_fb: "Are you sure you want to delete this message?",
        alert_select_fb: "Please check at least one message first",
        alert_save_success: "Saved successfully!"
    },
    "th": {
        web_title: "Sunny Kitchen - ระบบสั่งอาหารกล่อง POC",
        logo_subtitle: "ระบบจัดส่งปิ่นโตพรีเมียม",
        nav_menu: "เมนูสุดคุ้ม",
        nav_member: "ตรวจสอบรายการสั่งซื้อ",
        nav_admin: "จัดการหลังบ้าน",
        nav_guide: "ข้อเสนอแนะและเสียงตอบรับ",
        nav_cart: "ตะกร้า",
        nav_cart_link: "รถเข็น",
        nav_checkout_link: "ชำระเงิน",
        woo_breadcrumbs: "หน้าแรก / อาหารจานหลัก",
        woo_page_title: "อาหารจานหลัก",
        woo_result_count: "แสดงผลลัพธ์ทั้งหมด 11 รายการ",
        user_guest: "โหมดผู้มาเยือน",
        user_member: "บัญชีทดสอบ (นักเรียน)",
        user_admin: "ผู้ดูแลระบบ (admin@slk.com)",
        hero_title: "ข้าวกล่องพรีเมียมโดยเชฟซันนี่",
        hero_subtitle: "ข้าวหน้าไก่ซอสต้นหอมฮ่องกง, ข้าวหมูทอดสูตรพิเศษ, พอร์คชอปอบซอสแดง! วัตถุดิบสดใหม่เพื่อสุขภาพที่ดีของคุณ!",
        feat_pork: "หมูสดใหม่ไต้หวัน 100%",
        feat_box: "กล่องกระดาษเข้าไมโครเวฟได้",
        feat_delivery: "บริการส่งถึงที่/รับเองสะดวก",
        search_placeholder: "ค้นหาข้าวกล่อง สลัด หรือเส้น...",
        cat_all: "อาหารทั้งหมด",
        cat_main: "เมนูหลัก",
        cat_salad: "สลัดและเส้น",
        cat_promo: "ประกาศสำคัญ",
        no_products: "ไม่พบข้อมูลรายการอาหารในหมวดหมู่นี้",
        btn_order: "สั่งอาหาร",
        btn_contact: "ติดต่อ",
        toast_contact_info: "โปรดโทรติดต่อเบอร์ภายในเพื่อสอบถามข้อมูลประกาศ",
        toast_add_cart: "เพิ่ม {name} ลงตะกร้าแล้ว",
        toast_remove_cart: "นำรายการอาหารออกแล้ว",
        toast_order_success: "ส่งคำสั่งซื้อสำเร็จ! หมายเลขใบสั่งซื้อคือ {id}",
        toast_profile_saved: "บันทึกที่อยู่การจัดส่งสำเร็จ! ระบบจะกรอกข้อมูลนี้ให้โดยอัตโนมัติเมื่อชำระเงิน",
        toast_status_changed: "อัปเดตใบสั่งซื้อ {id} เป็น {status}",
        toast_role_admin: "สลับเป็นสิทธิ์ผู้ดูแลระบบหลังบ้าน! คุณสามารถจัดการคำสั่งซื้อและรายการอาหารได้",
        toast_role_member: "สลับเป็นบัญชีทดสอบ (member@slk.com). คำสั่งซื้อจะถูกบันทึกในหน้าสมาชิกของคุณ",
        toast_role_guest: "สลับเป็นโหมดผู้มาเยือน สามารถกดสั่งซื้อได้โดยไม่ต้องเข้าสู่ระบบ",
        cart_drawer_title: "ตะกร้าสินค้าของคุณ",
        cart_empty: "ไม่มีรายการอาหารในตะกร้า\nเลือกเมนูแสนอร่อยได้เลย!",
        chk_shipping_title: "ข้อมูลการจัดส่ง",
        chk_name: "ชื่อผู้รับ *",
        chk_name_placeholder: "กรุณากรอกชื่อผู้รับ",
        chk_phone: "เบอร์โทรศัพท์ติดต่อ *",
        chk_phone_placeholder: "กรุณากรอกเบอร์มือถือหรือเบอร์ต่อภายใน",
        chk_method: "วิธีรับอาหาร *",
        chk_method_pickup: "รับเองที่ร้าน",
        chk_method_delivery: "จัดส่ง (ระบุสถานที่)",
        chk_dept: "บริษัท/แผนก *",
        chk_address: "ที่อยู่สำหรับจัดส่ง *",
        chk_address_placeholder: "กรุณากรอกอาคาร ชั้น หรือห้องส่งให้ละเอียด",
        chk_remarks: "หมายเหตุ (เช่น ข้าวน้อย, เผ็ด, ไม่รับช้อนส้อม)",
        chk_remarks_placeholder: "ความต้องการเพิ่มเติมพิเศษ...",
        chk_total: "ยอดรวมทั้งหมด:",
        btn_submit_order: "ยืนยันการสั่งซื้อ",
        btn_submit_ordering: "กำลังส่ง...",
        label_stat_count: "จำนวนใบสั่งซื้อ",
        label_stat_spent: "ยอดใช้จ่ายสะสม",
        label_member_menu_orders: "ประวัติใบสั่งซื้อ",
        label_member_menu_profile: "การตั้งค่าบัญชี",
        label_my_orders_title: "ประวัติการสั่งซื้อของคุณ",
        label_profile_title: "ข้อมูลส่วนตัวและที่อยู่หลัก",
        label_prof_name: "ชื่อ-นามสกุล *",
        label_prof_phone: "เบอร์ติดต่อ *",
        label_prof_dept: "ชื่อบริษัท / แผนก",
        label_prof_address: "ที่อยู่จัดส่งเริ่มต้น *",
        btn_save_profile: "บันทึกที่อยู่",
        label_admin_menu_dashboard: "สถิติร้านค้า",
        label_admin_menu_orders: "จัดการใบสั่งซื้อ",
        label_admin_menu_products: "จัดการสินค้า",
        label_metric_revenue: "ยอดขายรวม",
        label_metric_orders: "จำนวนออเดอร์ทั้งหมด",
        label_metric_aov: "ยอดใช้จ่ายเฉลี่ยต่อออเดอร์",
        label_chart_trend: "แนวโน้มยอดสั่งซื้อรายวัน (จำลอง)",
        label_chart_rank: "อันดับข้าวกล่องขายดี",
        label_admin_orders_title: "รายการใบสั่งซื้อทั้งหมด",
        label_admin_products_title: "จัดการแคตตาล็อกเมนูอาหาร",
        btn_add_product: "เพิ่มสินค้าใหม่",
        th_order_id: "เลขออเดอร์",
        th_customer: "ข้อมูลลูกค้า",
        th_details: "เมนูอาหารและตัวเลือกพิเศษ",
        th_method: "การจัดส่ง",
        th_total: "ยอดเงิน",
        th_status: "สถานะ",
        th_action: "เปลี่ยนสถานะ",
        th_prod_img: "รูปภาพ",
        th_prod_name: "ชื่ออาหาร",
        th_prod_cat: "หมวดหมู่",
        th_prod_price: "ราคา (TWD)",
        th_prod_status: "สถานะครัว",
        th_prod_edit: "แก้ไข",
        status_pending: "รอคิว",
        status_preparing: "กำลังทำ",
        status_completed: "สำเร็จ",
        status_cancelled: "ยกเลิก",
        opt_rice_title: "ปริมาณข้าว",
        opt_rice_normal: "ข้าวปกติ",
        opt_rice_extra: "เพิ่มข้าว",
        opt_rice_less: "ข้าวน้อยครึ่งหนึ่ง",
        opt_custom_title: "ความชอบพิเศษ",
        opt_no_scallion: "ไม่ใส่ต้นหอม",
        opt_add_chili: "ใส่พริกสด",
        opt_no_utensils: "ไม่รับช้อนส้อม",
        opt_catering_title: "ระดับงบประมาณออเดอร์จัดเลี้ยง",
        opt_catering_200: "กล่องหรูพรีเมียม (200 TWD)",
        opt_catering_250: "กล่องหรูหราพิเศษ (250 TWD)",
        opt_required: "จำเป็น",
        btn_cancel: "ยกเลิก",
        btn_add_cart: "ใส่ตะกร้า",
        admin_search_placeholder: "ค้นหาชื่อ เบอร์ หรือรหัสสั่งซื้อ...",
        label_switcher_title: "เปลี่ยนผู้ใช้งาน:",
        label_switcher_guest: "ทั่วไป",
        label_switcher_member: "นักเรียนทดสอบ",
        label_switcher_admin: "แอดมิน (หลังบ้าน)",
        nav_gas: "การติดตั้ง GAS",
        feedback_title: "คำร้องเรียนและข้อคิดเห็น (กระดานข้อความ)",
        feedback_worker_no: "รหัสพนักงาน *",
        feedback_content: "ข้อเสนอแนะและคำแนะนำ *",
        feedback_clear: "ล้าง",
        feedback_submit: "ส่งข้อความ",
        alert_invalid_worker_no: "กรุณาป้อนรหัสพนักงานที่ถูกต้อง!!",
        alert_empty_feedback: "กรุณากรอกรหัสพนักงานและข้อความข้อเสนอแนะ!",
        toast_feedback_success: "ส่งข้อเสนอแนะสำเร็จ!",
        opt_feedback_status_all: "ทุกสถานะ",
        opt_feedback_status_unread: "ยังไม่ได้อ่าน",
        opt_feedback_status_read: "อ่านแล้ว",
        btn_feedback_mark_read: "ทำเป็นอ่านแล้ว",
        btn_feedback_mark_unread: "ทำเป็นยังไม่ได้อ่าน",
        th_fb_seq: "ลำดับ",
        th_fb_status: "สถานะ",
        th_fb_worker_no: "รหัสพนักงาน",
        th_fb_dept: "แผนก",
        th_fb_name: "ชื่อ",
        th_fb_content: "ข้อความ",
        th_fb_time: "เวลาที่ส่ง",
        th_fb_action: "ดำเนินการ",
        alert_confirm_delete_fb: "คุณแน่ใจหรือไม่ที่จะลบข้อความนี้?",
        alert_select_fb: "กรุณาเลือกข้อความอย่างน้อยหนึ่งรายการ",
        alert_save_success: "บันทึกสำเร็จ!"
    },
    "vi": {
        web_title: "Sunny Kitchen - Hệ Thống Đặt Cơm Hộp POC",
        logo_subtitle: "Hệ Thống Giao Cơm Hộp Văn Phòng",
        nav_menu: "Món ngon giá trị",
        nav_member: "Tra cứu đơn hàng",
        nav_admin: "Trang Quản Trị",
        nav_guide: "Khích lệ & Phản hồi",
        nav_cart: "Giỏ Hàng",
        nav_cart_link: "Giỏ hàng",
        nav_checkout_link: "Thanh toán",
        woo_breadcrumbs: "Trang chủ / Món chính",
        woo_page_title: "Món chính",
        woo_result_count: "Hiển thị tất cả 11 kết quả",
        user_guest: "Khách Vãng Lai",
        user_member: "Học Viên Thử Nghiệm",
        user_admin: "Quản Trị Viên (admin@slk.com)",
        hero_title: "Cơm Hộp Thượng Hạng Chef Sunny",
        hero_subtitle: "Cơm gà hấp sốt hành Hồng Kông, cơm thịt heo chiên giòn đặc sản, sườn sốt hồng xíu! Nguyên liệu cao cấp chuẩn vị văn phòng!",
        feat_pork: "100% Thịt Heo Tươi Đài Loan",
        feat_box: "Hộp giấy cao cấp dùng được lò vi sóng",
        feat_delivery: "Giao tận nơi hoặc nhận tại bếp",
        search_placeholder: "Tìm cơm hộp, salad hoặc bún...",
        cat_all: "Tất Cả",
        cat_main: "Cơm Văn Phòng",
        cat_salad: "Salad & Bún Sợi",
        cat_promo: "Thông Báo Mới",
        no_products: "Không tìm thấy hộp cơm nào thuộc danh mục này.",
        btn_order: "Đặt Món",
        btn_contact: "Liên Hệ",
        toast_contact_info: "Vui lòng gọi tổng đài tư vấn để biết chi tiết thông báo.",
        toast_add_cart: "Đã thêm {name} vào giỏ hàng",
        toast_remove_cart: "Đã xóa món ăn khỏi giỏ hàng",
        toast_order_success: "Đặt hàng thành công! Mã đơn hàng của bạn là {id}",
        toast_profile_saved: "Đã lưu địa chỉ thành viên! Thông tin sẽ tự động điền khi thanh toán.",
        toast_status_changed: "Đơn hàng {id} chuyển sang trạng thái {status}",
        toast_role_admin: "Đã chuyển sang tài khoản Admin! Bạn có thể quản trị đơn hàng và sản phẩm.",
        toast_role_member: "Đã chuyển sang Học Viên Thử Nghiệm. Đơn đặt hàng sẽ lưu vào lịch sử tài khoản.",
        toast_role_guest: "Đã chuyển sang Khách Vãng Lai. Đặt món và thanh toán không cần đăng nhập.",
        cart_drawer_title: "Giỏ Hàng Của Bạn",
        cart_empty: "Giỏ hàng đang trống.\nHãy chọn những hộp cơm ngon nhé!",
        chk_shipping_title: "Thông Tin Giao Hàng",
        chk_name: "Tên Người Nhận *",
        chk_name_placeholder: "Nhập tên người nhận",
        chk_phone: "Số Điện Thoại Liên Hệ *",
        chk_phone_placeholder: "Nhập số di động hoặc số nội bộ",
        chk_method: "Hình Thức Nhận *",
        chk_method_pickup: "Nhận tại bếp",
        chk_method_delivery: "Giao tận nơi (Địa chỉ)",
        chk_dept: "Công Ty / Phòng Ban *",
        chk_address: "Địa Chỉ Giao Hàng *",
        chk_address_placeholder: "Ghi rõ tên tòa nhà, số tầng, số phòng",
        chk_remarks: "Ghi Chú (Ví dụ: ít cơm, không hành, không thìa đũa)",
        chk_remarks_placeholder: "Yêu cầu chuẩn bị món ăn đặc biệt khác...",
        chk_total: "Tổng cộng:",
        btn_submit_order: "Xác Nhận Đặt Hàng",
        btn_submit_ordering: "Đang gửi...",
        label_stat_count: "Số Lượng Đơn",
        label_stat_spent: "Tổng Chi Tiêu",
        label_member_menu_orders: "Lịch Sử Đơn Hàng",
        label_member_menu_profile: "Thiết Lập Tài Khoản",
        label_my_orders_title: "Lịch Sử Đơn Hàng Của Bạn",
        label_profile_title: "Thông Tin Cá Nhân & Sổ Địa Chỉ Giao",
        label_prof_name: "Họ và Tên *",
        label_prof_phone: "Điện thoại *",
        label_prof_dept: "Tên công ty / Phòng ban",
        label_prof_address: "Địa chỉ giao hàng mặc định *",
        btn_save_profile: "Lưu Địa Chỉ",
        label_admin_menu_dashboard: "Số Liệu Bán Hàng",
        label_admin_menu_orders: "Quản Lý Đơn Hàng",
        label_admin_menu_products: "Quản Lý Món Ăn",
        label_metric_revenue: "Tổng Doanh Thu",
        label_metric_orders: "Tổng Đơn Đã Đặt",
        label_metric_aov: "Trị Giá Đơn Trung Bình",
        label_chart_trend: "Biểu Đồ Xu Hướng Đơn Hàng Ngày (Mô Phỏng)",
        label_chart_rank: "Món Ăn Bán Chạy Nhất",
        label_admin_orders_title: "Danh Sách Tất Cả Đơn Hàng",
        label_admin_products_title: "Quản Lý Danh Mục Món Ăn",
        btn_add_product: "Thêm Món Mới",
        th_order_id: "Mã Đơn",
        th_customer: "Thông Tin Khách",
        th_details: "Chi Tiết Món Ăn & Tùy Chọn",
        th_method: "Hình Thức Giao",
        th_total: "Thành Tiền",
        th_status: "Trạng Thái",
        th_action: "Sửa Trạng Thái",
        th_prod_img: "Ảnh Món",
        th_prod_name: "Tên Món Ăn",
        th_prod_cat: "Danh Mục",
        th_prod_price: "Giá bán (TWD)",
        th_prod_status: "Nhà Bếp",
        th_prod_edit: "Sửa",
        status_pending: "Chờ duyệt",
        status_preparing: "Đang nấu",
        status_completed: "Đã xong",
        status_cancelled: "Đã hủy",
        opt_rice_title: "Định Lượng Cơm",
        opt_rice_normal: "Cơm bình thường",
        opt_rice_extra: "Thêm cơm",
        opt_rice_less: "Giảm một nửa cơm",
        opt_custom_title: "Yêu Cầu Riêng",
        opt_no_scallion: "Không mỡ hành",
        opt_add_chili: "Thêm ớt tươi",
        opt_no_utensils: "Không lấy đũa thìa",
        opt_catering_title: "Mức Ngân Sách Suất Ăn Hội Nghị",
        opt_catering_200: "Hộp Tinh Tế (200 TWD)",
        opt_catering_250: "Hộp Sang Trọng (250 TWD)",
        opt_required: "Bắt buộc",
        btn_cancel: "Hủy",
        btn_add_cart: "Thêm Vào Giỏ",
        admin_search_placeholder: "Tìm theo tên, điện thoại, mã đơn...",
        label_switcher_title: "Đổi vai trò tài khoản:",
        label_switcher_guest: "Khách",
        label_switcher_member: "Học Viên",
        label_switcher_admin: "Admin (Sau bếp)",
        nav_gas: "Triển khai GAS",
        feedback_title: "Khích lệ & Phản hồi (Bảng tin nhắn)",
        feedback_worker_no: "Mã số nhân viên *",
        feedback_content: "Ý kiến phản hồi *",
        feedback_clear: "Xóa sạch",
        feedback_submit: "Gửi phản hồi",
        alert_invalid_worker_no: "Vui lòng nhập mã số nhân viên chính xác!!",
        alert_empty_feedback: "Vui lòng nhập mã nhân viên và nội dung phản hồi!",
        toast_feedback_success: "Gửi phản hồi thành công!",
        opt_feedback_status_all: "Tất cả trạng thái",
        opt_feedback_status_unread: "Chưa đọc",
        opt_feedback_status_read: "Đã đọc",
        btn_feedback_mark_read: "Đánh dấu đã đọc",
        btn_feedback_mark_unread: "Đánh dấu chưa đọc",
        th_fb_seq: "STT",
        th_fb_status: "Trạng thái",
        th_fb_worker_no: "Mã nhân viên",
        th_fb_dept: "Bộ phận",
        th_fb_name: "Họ tên",
        th_fb_content: "Nội dung",
        th_fb_time: "Thời gian",
        th_fb_action: "Thao tác",
        alert_confirm_delete_fb: "Bạn có chắc chắn muốn xóa phản hồi này?",
        alert_select_fb: "Vui lòng chọn ít nhất một phản hồi",
        alert_save_success: "Lưu thành công!"
    }
};

// 4國語言商品名稱與描述對照庫 (預設內建商品 i18n)
const PRODUCT_I18N = {
    "13058": {
        "zh-TW": { name: "彤緣蔬食便當/蛋奶素/無肉無負擔", desc: "高質感環保可微波餐盒。精心調製時蔬配菜，讓您清爽吃、無負擔！(注意：此餐盒主菜為精選奶蛋素食材，非全素喔)" },
        "en": { name: "Tongyuan Veggie Bento (Egg-Milk Veggie)", desc: "Microwaveable eco-box. Chef's selection of fresh seasonal vegetables. Healthy and zero burden." },
        "th": { name: "กล่องข้าวผักถงหยวน (มังสวิรัติไข่-นม)", desc: "กล่องกระดาษพรีเมียมเข้าไมโครเวฟได้ ผักสดปรุงพิเศษสำหรับคนรักสุขภาพ (มังสวิรัติทานไข่และนม)" },
        "vi": { name: "Cơm Hộp Chay Đồng Duyên (Trứng-Sữa)", desc: "Hộp cơm thân thiện môi trường. Rau củ tươi ngon tuyển chọn tốt cho sức khỏe, không lo chất béo." }
    },
    "11331": {
        "zh-TW": { name: "港式蔥油雞飯", desc: "香醇自製港式油蔥，搭配多汁溫體雞肉！經典口味王者回歸！保溫餐盒外送，鎖住熱騰鮮味！" },
        "en": { name: "Hong Kong Scallion Chicken Rice", desc: "Juicy chicken topped with savory house-made ginger scallion oil. Delivered in insulated warm bento boxes." },
        "th": { name: "ข้าวหน้าไก่ซอสต้นหอมฮ่องกง", desc: "ไก่เนื้อนุ่มชุ่มฉ่ำราดด้วยซอสขิงต้นหอมสูตรโฮมเมดหอมกรุ่น บรรจุในกล่องเก็บความร้อนพร้อมส่ง!" },
        "vi": { name: "Cơm Gà Sốt Mỡ Hành Hồng Kông", desc: "Thịt gà hấp mọng nước kết hợp sốt hành gừng tự làm đậm đà. Đóng hộp giữ nhiệt giao tận nơi nóng hổi." }
    },
    "76512": {
        "zh-TW": { name: "<span class=\"highlight-new\">Sunny</span>愛妻招牌手工醃製炸燒肉飯", desc: "精選台灣溫體豬五花肉，手工秘方醃製多時後酥炸，外酥內嫩！紙餐盒微波依然美味，人氣熱賣！" },
        "en": { name: "<span class=\"highlight-new\">Sunny</span> Signature Crispy Fried Pork Rice", desc: "Fresh Taiwanese pork belly marinated with secret family spices then deep-fried. Crispy outside, tender inside!" },
        "th": { name: "ข้าวหน้าหมูสามชั้นทอดกรอบ<span class=\"highlight-new\">ซันนี่</span>", desc: "หมูสามชั้นไต้หวันคัดพิเศษหมักเครื่องเทศสูตรลับเฉพาะแล้วนำไปทอดจนกรอบนอกนุ่มใน เมนูยอดฮิตประจำร้าน!" },
        "vi": { name: "Cơm Thịt Heo Quay Chiên Giòn <span class=\"highlight-new\">Sunny</span>", desc: "Ba chỉ heo tươi Đài Loan ướp gia vị gia truyền rồi chiên giòn rụm. Vỏ ngoài giòn tan, thịt bên trong mềm ngọt!" }
    },
    "83669": {
        "zh-TW": { name: "紅燒無骨滷排(先炸後滷)", desc: "人氣爆棚新品！溫體豬大排先油炸鎖汁，再丟入主廚陳年老滷汁慢火燉煮，完全去骨，大口咬下超滿足！" },
        "en": { name: "Red-Braised Boneless Pork Chop", desc: "Boneless pork chop deep-fried to lock in juices, then stewed in signature aged soy broth. Soft and highly flavorful!" },
        "th": { name: "พอร์คชอปไร้กระดูกตุ๋นน้ำแดง (ทอดแล้วตุ๋น)", desc: "พอร์คชอปรสเลิศไร้กระดูก ชุบแป้งทอดบางๆ เพื่อกักเก็บความชุ่มฉ่ำ แล้วนำไปตุ๋นในน้ำพะโล้เคี่ยวรสกลมกล่อม" },
        "vi": { name: "Sườn Cốt Lết Rút Xương Sốt Hồng Xíu", desc: "Sườn heo được chiên sơ để khóa nước thịt, sau đó om liu riu trong nước tương ngâm lâu năm của đầu bếp." }
    },
    "87428": {
        "zh-TW": { name: "什錦胡麻水果沙拉 (獨家胡麻風味)", desc: "夏季商品熱力開賣！精選多款季節水果與鮮嫩生菜，淋上特製濃郁胡麻醬，夏日解暑美味！" },
        "en": { name: "Seasonal Mixed Fruit Salad (Roasted Sesame)", desc: "Refreshing summer salad featuring fresh fruits and crisp greens with aromatic roasted sesame dressing." },
        "th": { name: "สลัดผลไม้รวมราดซอสงาน้ำลึก", desc: "เมนูคลายร้อนต้อนรับซัมเมอร์! ผลไม้สดตามฤดูกาลและผักกรอบ ราดด้วยน้ำสลัดงาคั่วสไตล์ญี่ปุ่นเข้มข้น" },
        "vi": { name: "Salad Hoa Quả Trộn Sốt Mè Rang", desc: "Thực đơn giải nhiệt mùa hè! Trái cây tươi cắt miếng kết hợp sốt mè rang béo ngậy thơm nức mũi." }
    },
    "87429": {
        "zh-TW": { name: "什錦冰梅水果沙拉 (獨家酸甜冰梅)", desc: "酸甜開胃必點！夏日限定冰梅調醬，將當季清甜水果的鮮美味道再次昇華，清爽健康無負擔！" },
        "en": { name: "Seasonal Mixed Fruit Salad (Sweet Plum)", desc: "Tangy and sweet! Seasonal fruits tossed in chef's signature iced plum syrup. A perfect appetite trigger." },
        "th": { name: "สลัดผลไม้รวมราดซอสบ๊วยเปรี้ยวหวาน", desc: "รสชาติเปรี้ยวหวานกลมกล่อมช่วยกระตุ้นความอยากอาหาร! ซอสบ๊วยเย็นชื่นใจคลุกเคล้าผลไม้หวานฉ่ำ" },
        "vi": { name: "Salad Hoa Quả Trộn Sốt Xí Muội Chua Ngọt", desc: "Món khai vị chua ngọt kích thích vị giác! Sốt xí muội đá kết hợp hoa quả thanh mát, bổ dưỡng." }
    },
    "91945": {
        "zh-TW": { name: "川味家常肉絲便當 (肉超多飽足款)", desc: "正宗川香家常爆炒，肉絲軟嫩、鹹香帶點微辣！配菜豐富，超大肉量絕對滿足食肉大胃王！" },
        "en": { name: "Szechuan Shredded Pork Bento (Heavy Portion)", desc: "Stir-fried tender pork strips in savory, slightly spicy Szechuan sauce. Generous portion for meat lovers!" },
        "th": { name: "กล่องข้าวหมูเส้นผัดพริกเสฉวน (จานโตจุใจ)", desc: "หมูเส้นนุ่มผัดซอสเสฉวนรสเข้มข้นเผ็ดน้อยเค็มมัน ครบเครื่องกับผักเคียงและปริมาณเนื้อเน้นๆ!" },
        "vi": { name: "Hộp Cơm Thịt Heo Xé Sợi Xào Tứ Xuyên", desc: "Thịt heo xé sợi xào cay cay đậm đà chuẩn vị Tứ Xuyên. Suất cơm đầy đặn đáp ứng nhu cầu năng lượng cao." }
    },
    "95251": {
        "zh-TW": { name: "椒麻螺絲米線 (香辣爆表)", desc: "特製螺絲米線吸收川味椒麻紅油，搭配脆口黃瓜與花生，辣勁十足，酸爽解熱，辣度爆表！" },
        "en": { name: "Spicy & Numbing Rice Noodles (Extra Hot)", desc: "Spiral rice noodles soaked in Szechuan chili oil and Sichuan peppercorn sauce, garnished with cucumber and peanuts." },
        "th": { name: "ขนมจีนเสฉวนซอสเผ็ดชาล่ากึ่งเปรี้ยว", desc: "เส้นขนมจีนนุ่มหนึบซับน้ำมันพริกเผ็ดชาสไตล์เสฉวน โรยหน้าด้วยแตงกวากรอบและถั่วลิสงคั่ว เผ็ดซี้ดถึงใจ!" },
        "vi": { name: "Bún Sợi Tròn Sốt Tiêu Tứ Xuyên Siêu Cay", desc: "Bún sợi tròn dai dai ngấm đẫm sốt sa tế cay tê, ăn kèm dưa chuột giòn và lạc rang. Cay cay kích thích!" }
    },
    "76513": {
        "zh-TW": { name: "<span class=\"highlight-new\">Sunny</span>主廚客製會議精緻餐盒", desc: "針對公司行號會議、貴賓研討會客製的精緻雙主菜餐盒，提供 200元/250元 雙規格供預算調配！(需提早預定)" },
        "en": { name: "<span class=\"highlight-new\">Sunny</span> Chef's Customized Catering Box", desc: "Premium double-entree lunchbox tailored for business meetings and VIP workshops. TWD 200 / 250 tiers available." },
        "th": { name: "กล่องอาหารจัดประชุมของเชฟ<span class=\"highlight-new\">ซันนี่</span>", desc: "กล่องข้าวอาหารกล่องสองหน้าคัดเกรด VIP สำหรับงานประชุมและงานสัมมนา เลือกราคาได้ระหว่าง 200/250 TWD" },
        "vi": { name: "Hộp Cơm Hội Nghị Cao Cấp Chef <span class=\"highlight-new\">Sunny</span>", desc: "Hộp cơm 2 món chính cao cấp thiết kế cho hội nghị doanh nghiệp và hội thảo VIP. Tùy chọn phân khúc 200 / 250 TWD." }
    },
    "38575": {
        "zh-TW": { name: "【特惠公告】感謝<span class=\"highlight-new\">銀行電子</span>袁董事長體恤員工補助餐費", desc: "賀！每月伙食津貼外，袁董事長體恤員工辛苦，特額外補貼員工到店食堂點餐 *30元* 餐費！好人一生平安！" },
        "en": { name: "【Benefit Notice】Thanks to <span class=\"highlight-new\">Bank Electronics</span> Chairman for Subsidy", desc: "Bonus! Chairman subsidized TWD 30 for employee cafeteria orders, in addition to standard meal allowances. Bless him!" },
        "th": { name: "【ประกาศสวัสดิการ】ขอบคุณประธานบริษัท <span class=\"highlight-new\">Bank Electronics</span> สนับสนุนค่าอาหาร", desc: "ยินดีด้วย! ประธานสนับสนุนสวัสดิการช่วยจ่ายค่าอาหารเพิ่ม 30 TWD ต่อมื้อสำหรับพนักงานในโรงอาหารนอกเหนือจากสวัสดิการเดิม!" },
        "vi": { name: "【Tin Đặc Biệt】Cảm ơn Chủ Tịch <span class=\"highlight-new\">Bank Electronics</span> hỗ trợ phụ cấp ăn trưa", desc: "Tin vui! Phụ cấp thêm 30 TWD/suất ăn tại nhà ăn cho nhân viên bên cạnh trợ cấp ăn uống tiêu chuẩn hàng tháng!" }
    },
    "38577": {
        "zh-TW": { name: "【季節公告】浪漫六月即將推出夏季商品，敬請期待", desc: "夏季商品預計4/1正式開跑，歡迎老客戶提前使用語音諮詢優惠，另有熟客特別好康唷！" },
        "en": { name: "【Seasonal Notice】Upcoming Summer Delights in June", desc: "New summer menu items launch on 4/1. Old friends enjoy special telephone booking vouchers." },
        "th": { name: "【ข่าวฤดูกาล】เตรียมเปิดตัวเมนูใหม่รับหน้าร้อนช่วงมิถุนายนนี้", desc: "รายการอาหารสำหรับฤดูร้อนเตรียมเปิดตัวเป็นทางการ 4/1 ลูกค้าเก่าติดต่อทางโทรศัพท์เพื่อรับข้อเสนอพิเศษล่วงหน้า!" },
        "vi": { name: "【Mùa Hè Vẫy Gọi】Menu mới chào hè sắp ra mắt vào tháng 6", desc: "Các món ăn giải nhiệt dự kiến mở bán từ 4/1. Khách hàng thân thiết vui lòng gọi điện trước để nhận ưu đãi đặc biệt!" }
    }
};

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
        name: "<span class=\"highlight-new\">Sunny</span>愛妻招牌手工醃製炸燒肉飯",
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
        name: "<span class=\"highlight-new\">Sunny</span>主廚客製會議精緻餐盒",
        category: "main",
        description: "針對公司行號會議、貴賓研討會客製的精緻雙主菜餐盒，提供 200元/250元 雙規格供預算調配！(需提早預定)",
        price: 200,
        image: "https://www.slk9898.com.tw/wp-content/uploads/2025/12/LINE_ALBUM_新餐盒🍱_260530_3-300x300.jpg",
        status: "instock"
    },
    {
        id: "38575",
        name: "【特惠公告】感謝<span class=\"highlight-new\">銀行電子</span>袁董事長體恤員工補助餐費",
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

// --- 2. 預設資料庫模擬儲存與結構 (slk_poc_v2) ---
const DEFAULT_ORDERS = [
    {
        orderId: "SLK-827361",
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        userEmail: "member@slk.com",
        customerName: "測試會員",
        phone: "0912-345678 (研發部)",
        method: "外送 (指定地點: 銀行大樓4F)",
        details: "港式蔥油雞飯 x2 ($220)",
        totalPrice: 220,
        status: "completed",
        remarks: "不要餐具",
        options: "米飯: 標準, 客製: 不要油蔥"
    },
    {
        orderId: "SLK-948261",
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        userEmail: "guest",
        customerName: "張大同",
        phone: "0999-111222",
        method: "店面自取",
        details: "紅燒無骨滷排(先炸後滷) x2 ($240)",
        totalPrice: 240,
        status: "preparing",
        remarks: "加辣",
        options: "米飯: 加量 (+$10) x2, 客製: 加生辣椒 x2"
    },
    {
        orderId: "SLK-182749",
        timestamp: new Date().toISOString(),
        userEmail: "guest",
        customerName: "李小美",
        phone: "0988-777888 (行銷部)",
        method: "外送 (指定地點: 銀行大樓10F)",
        details: "Sunny主廚客製會議精緻餐盒 x5 ($1250)",
        totalPrice: 1250,
        status: "pending",
        remarks: "需11:45前送到",
        options: "餐盒等級: 250元款 (+$50) x5, 米飯: 標準 x5, 客製: 免洗餐具 x5"
    }
];

function getV2Data(key) {
    const data = localStorage.getItem(`slk_v2_${key}`);
    return data ? JSON.parse(data) : null;
}

function setV2Data(key, value) {
    localStorage.setItem(`slk_v2_${key}`, JSON.stringify(value));
}

// 初始化資料庫
function initializeV2DB() {
    if (!getV2Data('products')) {
        setV2Data('products', DEFAULT_PRODUCTS);
    }
    if (!getV2Data('orders')) {
        setV2Data('orders', DEFAULT_ORDERS);
    }
    // 預載會員地址簿
    if (!getV2Data('profile')) {
        setV2Data('profile', {
            name: "測試會員",
            phone: "0912-345678",
            dept: "銀行電子/研發部",
            address: "桃園市中壢區高鐵站前路120號5樓"
        });
    }
}
initializeV2DB();

// --- 3. 模擬 Apps Script 交互橋接器 ---
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
                        this._successHandler(getV2Data('products'));
                    }, 150);
                },
                getOrders: function() {
                    setTimeout(() => {
                        this._successHandler(getV2Data('orders'));
                    }, 150);
                },
                submitOrder: function(orderData) {
                    setTimeout(() => {
                        const orders = getV2Data('orders');
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
                            remarks: orderData.remarks || "",
                            options: orderData.options || ""
                        };
                        orders.unshift(newOrder);
                        setV2Data('orders', orders);
                        this._successHandler({ success: true, orderId: orderId });
                    }, 250);
                },
                updateOrderStatus: function(orderId, status) {
                    setTimeout(() => {
                        const orders = getV2Data('orders');
                        const idx = orders.findIndex(o => o.orderId === orderId);
                        if (idx !== -1) {
                            orders[idx].status = status;
                            setV2Data('orders', orders);
                            this._successHandler({ success: true });
                        }
                    }, 100);
                },
                updateProduct: function(productData) {
                    setTimeout(() => {
                        const products = getV2Data('products');
                        const idx = products.findIndex(p => p.id.toString() === productData.id.toString());
                        if (idx !== -1) {
                            products[idx] = { ...products[idx], ...productData, price: Number(productData.price) };
                            setV2Data('products', products);
                            this._successHandler({ success: true });
                        } else {
                            const newP = {
                                id: productData.id || new Date().getTime().toString().slice(-6),
                                name: productData.name,
                                category: productData.category,
                                description: productData.description,
                                price: Number(productData.price),
                                image: productData.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300",
                                status: productData.status || "instock"
                            };
                            products.push(newP);
                            setV2Data('products', products);
                            this._successHandler({ success: true, isNew: true });
                        }
                    }, 150);
                }
            }
        }
    };
}

// --- 4. 全域變數與 i18n 引擎 ---
let currentLang = localStorage.getItem('slk_lang') || 'zh-TW';
let currentRole = 'guest'; // guest, member, admin
let allProducts = [];
let shoppingCart = [];
let currentCategoryFilter = 'all';
let currentAdminTab = 'dashboard';
let currentAdminFilter = 'all';

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    updateNavbarUserBadge();
    applyLanguage(currentLang);
    
    // 監聽點擊關閉語言選單
    document.addEventListener('click', () => {
        document.getElementById('lang-dropdown').classList.remove('open');
    });
});

// 切換語言
function toggleLangDropdown(event) {
    event.stopPropagation();
    document.getElementById('lang-dropdown').classList.toggle('open');
}

function changeLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('slk_lang', lang);
    applyLanguage(lang);
    
    // 更新選單 Active 狀態
    document.querySelectorAll('.lang-option').forEach(btn => {
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // 重新繪製商品列表與購物車，完成全翻譯
    renderProductGrid(allProducts);
    updateCartUI();
    
    if (document.getElementById('view-member').classList.contains('active')) {
        loadMemberOrders();
        loadMemberProfile();
    }
    if (document.getElementById('view-admin').classList.contains('active')) {
        loadAdminData();
    }

    showToast(getTranslation("web_title"), "info");
}

// 套用翻譯至 HTML
function applyLanguage(lang) {
    const dict = I18N_DICT[lang];
    if (!dict) return;

    // 設定國旗按鈕標題
    const labels = { "zh-TW": "🇹🇼 繁體中文", "en": "🇺🇸 English", "th": "🇹🇭 ภาษาไทย", "vi": "🇻🇳 Tiếng Việt" };
    document.getElementById('current-lang-label').textContent = labels[lang];

    // 更新網頁 Title
    document.getElementById('web-title').textContent = dict.web_title;

    // 批量翻譯 ID 元素
    const idList = [
        "logo-subtitle", "nav-text-menu", "nav-text-member", "nav-text-admin", "nav-text-guide", "nav-text-cart",
        "nav-text-cart-link", "nav-text-checkout-link", "woo-breadcrumbs", "woo-page-title", "woo-result-count",
        "hero-title", "hero-subtitle", "feat-pork", "feat-box", "feat-delivery", 
        "cart-drawer-title", "label-shipping-title", "label-chk-name", "label-chk-phone", 
        "label-chk-method", "label-chk-dept", "label-chk-address", "label-chk-remarks", "label-chk-total", "btn-submit-order",
        "label-stat-count", "label-stat-spent", "label-member-menu-orders", "label-member-menu-profile",
        "label-my-orders-title", "label-profile-title", "label-prof-name", "label-prof-phone", "label-prof-dept", 
        "label-prof-address", "btn-save-profile", "label-admin-menu-dashboard", "label-admin-menu-orders",
        "label-admin-menu-products", "label-metric-revenue", "label-metric-orders", "label-metric-aov",
        "label-chart-trend", "label-chart-rank", "label-admin-orders-title", "label-admin-products-title",
        "btn-add-product", "th-order-id", "th-customer", "th-details", "th-method", "th-total", "th-status",
        "th-action", "th-prod-img", "th-prod-name", "th-prod-cat", "th-prod-price", "th-prod-status", "th-prod-edit",
        "customize-title", "label-rice-title", "label-required-tag", "label-rice-normal", "label-rice-extra", 
        "label-rice-less", "label-custom-title", "label-no-scallion", "label-add-chili", "label-no-utensils", 
        "label-catering-title", "label-required-catering", "label-catering-200", "label-catering-250",
        "btn-cancel-cust", "btn-add-cust", "label-switcher-title", "label-switcher-guest", 
        "label-switcher-member", "label-switcher-admin",
        "nav-text-gas", "label-feedback-title", "label-feedback-worker-no", "label-feedback-content", 
        "label-feedback-clear", "label-feedback-submit", "opt-feedback-status-all", "opt-feedback-status-unread", 
        "opt-feedback-status-read", "btn-feedback-mark-read", "btn-feedback-mark-unread", "th-fb-seq", 
        "th-fb-status", "th-fb-worker-no", "th-fb-dept", "th-fb-name", "th-fb-content", "th-fb-time", "th-fb-action"
    ];

    idList.forEach(id => {
        const el = document.getElementById(id);
        if (el && dict[id.replace(/-/g, '_').replace('label_', '').replace('nav_text_', 'nav_').replace('btn_', 'btn_').replace('th_', 'th_')]) {
            const key = id.replace(/-/g, '_').replace('label_', '').replace('nav_text_', 'nav_').replace('btn_', 'btn_').replace('th_', 'th_');
            el.textContent = dict[key];
        }
    });

    // 搜尋 Placeholder 翻譯
    document.getElementById('search-box').placeholder = dict.search_placeholder;
    if (document.getElementById('admin-order-search')) {
        document.getElementById('admin-order-search').placeholder = dict.admin_search_placeholder;
    }

    // 分類 Tabs 翻譯重繪
    const catTabs = document.getElementById('category-tabs-container');
    catTabs.innerHTML = `
        <button class="cat-tab ${currentCategoryFilter === 'all' ? 'active' : ''}" onclick="filterCategory('all', this)">${dict.cat_all}</button>
        <button class="cat-tab ${currentCategoryFilter === 'main' ? 'active' : ''}" onclick="filterCategory('main', this)">${dict.cat_main}</button>
        <button class="cat-tab ${currentCategoryFilter === 'salad' ? 'active' : ''}" onclick="filterCategory('salad', this)">${dict.cat_salad}</button>
        <button class="cat-tab ${currentCategoryFilter === 'promo' ? 'active' : ''}" onclick="filterCategory('promo', this)">${dict.cat_promo}</button>
    `;

    // 結帳配送下拉選單翻譯
    const chkMethod = document.getElementById('checkout-method');
    chkMethod.innerHTML = `
        <option value="delivery" selected>${dict.chk_method_delivery}</option>
        <option value="pickup">${dict.chk_method_pickup}</option>
    `;

    // 後台管理員訂單篩選器 Tabs 翻譯重繪
    if (document.getElementById('admin-order-filter-group')) {
        renderAdminFilterTabs(dict);
    }
}

function getTranslation(key) {
    return I18N_DICT[currentLang][key] || I18N_DICT['zh-TW'][key] || key;
}

function stripHtml(html) {
    if (!html) return '';
    return html.replace(/<[^>]*>/g, '');
}

// 取得多語系商品資訊
function getLocalizedProduct(productId) {
    const local = PRODUCT_I18N[productId];
    if (local && local[currentLang]) {
        return local[currentLang];
    }
    // 找不到則返回中文或預設
    const p = allProducts.find(prod => prod.id === productId);
    return { name: p ? p.name : '', desc: p ? p.description : '' };
}

// --- 5. 導航視角切換 ---
function switchView(viewName) {
    document.querySelectorAll('.nav-item').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.view-panel').forEach(panel => panel.classList.remove('active'));

    document.getElementById(`view-${viewName}`).classList.add('active');
    const navBtn = document.getElementById(`nav-${viewName}`);
    if (navBtn) navBtn.classList.add('active');

    if (viewName === 'member') {
        loadMemberOrders();
        loadMemberProfile();
        switchMemberSubTab('orders');
    } else if (viewName === 'admin') {
        loadAdminData();
    } else if (viewName === 'guide') {
        renderFeedbacks();
    }
}

function switchMemberSubTab(subTabName) {
    document.querySelectorAll('.member-menu-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.member-sub-panel').forEach(panel => panel.classList.remove('active'));

    document.getElementById(`member-sub-${subTabName}`).classList.add('active');
    document.getElementById(`member-tab-btn-${subTabName}`).classList.add('active');
}

function switchAdminTab(tabName) {
    document.querySelectorAll('.admin-menu-item').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.admin-tab-panel').forEach(panel => panel.classList.remove('active'));

    document.getElementById(`admin-tab-${tabName}`).classList.add('active');
    document.getElementById(`admin-tab-btn-${tabName}`).classList.add('active');
    currentAdminTab = tabName;

    if (tabName === 'dashboard') {
        renderSalesChart();
        renderBestSellers();
    }
}

// --- 6. 商品選單加載與客製化點餐彈窗 (Add-ons Modal) ---
function loadProducts() {
    google.script.run.withSuccessHandler(products => {
        allProducts = products;
        renderProductGrid(products);
        if (document.getElementById('view-admin').classList.contains('active')) {
            renderAdminProductsTable();
        }
    }).getProducts();
}

function renderProductGrid(products) {
    const container = document.getElementById('product-list-container');
    container.innerHTML = '';

    let filtered = products;
    if (currentCategoryFilter !== 'all') {
        filtered = filtered.filter(p => p.category === currentCategoryFilter);
    }

    if (filtered.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-muted);">
                <i class="fa-solid fa-cookie-bite" style="font-size: 3rem; margin-bottom: 15px; opacity: 0.3;"></i>
                <p>${getTranslation('no_products')}</p>
            </div>
        `;
        return;
    }

    filtered.forEach(p => {
        const isOutOfStock = p.status === 'outofstock';
        const card = document.createElement('div');
        card.className = 'product-card';
        const isPromo = p.category === 'promo';

        // 讀取多國語系商品資訊
        const localized = getLocalizedProduct(p.id);
        const displayName = localized.name || p.name;
        const displayDesc = localized.desc || p.description;

        card.innerHTML = `
            ${isOutOfStock ? `<span class="product-badge out-of-stock">${currentLang === 'zh-TW' ? '已售罄' : 'Sold Out'}</span>` : ''}
            ${p.category === 'promo' ? `<span class="product-badge" style="background-color: var(--primary)">${currentLang === 'zh-TW' ? '熱門公告' : 'News'}</span>` : ''}
            <div class="product-img-wrapper" onclick="openCustomizeModal('${p.id}')">
                <img src="${p.image}" class="product-img" alt="${stripHtml(displayName)}">
            </div>
            <div class="product-info">
                <span class="product-meta">${p.category === 'main' ? getTranslation('cat_main') : p.category === 'salad' ? getTranslation('cat_salad') : getTranslation('cat_promo')}</span>
                <h4 class="product-title" title="${stripHtml(displayName)}" onclick="openCustomizeModal('${p.id}')">${displayName}</h4>
                <div class="product-action-row">
                    <span class="price">
                        ${isPromo ? `<span class="promo-badge-text" style="font-size:0.8rem; font-weight:700; color:var(--text-muted);">${getTranslation('btn_contact')}</span>` : `<span class="woocommerce-Price-amount amount"><bdi><span class="woocommerce-Price-currencySymbol">NT$</span>${p.price}</bdi></span>`}
                    </span>
                    ${isPromo ? 
                      `<button class="order-btn" style="background-color:#64748b" onclick="showToast(getTranslation('toast_contact_info'), 'info')"><i class="fa-solid fa-phone"></i>${getTranslation('btn_contact')}</button>` :
                      `<button class="order-btn" ${isOutOfStock ? 'disabled' : ''} onclick="openCustomizeModal('${p.id}')">
                            <i class="fa-solid fa-circle-plus"></i>${getTranslation('btn_order')}
                       </button>`
                    }
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

function filterProducts() {
    const query = document.getElementById('search-box').value.toLowerCase().trim();
    if (query === '') {
        renderProductGrid(allProducts);
        return;
    }
    const filtered = allProducts.filter(p => {
        const localized = getLocalizedProduct(p.id);
        return (localized.name || p.name).toLowerCase().includes(query) || 
               (localized.desc || p.description).toLowerCase().includes(query);
    });
    renderProductGrid(filtered);
}

function filterCategory(cat, btnElement) {
    document.querySelectorAll('.cat-tab').forEach(b => b.classList.remove('active'));
    btnElement.classList.add('active');
    currentCategoryFilter = cat;
    renderProductGrid(allProducts);
}

// --- 7. 客製化點餐彈窗控制 (WooCommerce Product Add-ons Mock) ---
let activeCustomizeProduct = null;

function openCustomizeModal(productId) {
    const product = allProducts.find(p => p.id === productId);
    if (!product || product.status === 'outofstock' || product.category === 'promo') return;

    activeCustomizeProduct = product;
    const modal = document.getElementById('customize-modal');
    
    // 載入商品資訊與翻譯
    const localized = getLocalizedProduct(product.id);
    document.getElementById('cust-item-id').value = product.id;
    document.getElementById('cust-item-img').src = product.image;
    document.getElementById('cust-item-name').innerHTML = localized.name || product.name;
    document.getElementById('cust-item-desc').textContent = localized.desc || product.description;

    // 重置選項為預設值
    resetCustomizeOptions();

    // 判斷是否為會議客製化餐盒
    const isCateringBox = product.id === '76513';
    const cateringGroup = document.getElementById('option-catering-group');
    const riceGroup = document.getElementById('option-rice-group');
    const customGroup = document.getElementById('option-custom-group');
    
    if (isCateringBox) {
        cateringGroup.style.display = 'block';
        riceGroup.style.display = 'block';
        customGroup.style.display = 'block';
    } else {
        cateringGroup.style.display = 'none';
        riceGroup.style.display = 'block';
        customGroup.style.display = 'block';
    }

    modal.classList.add('open');
}

function closeCustomizeModal() {
    document.getElementById('customize-modal').classList.remove('open');
    activeCustomizeProduct = null;
}

function resetCustomizeOptions() {
    // 預設選中米飯標準
    document.querySelectorAll('[data-group="rice"]').forEach(el => {
        if (el.getAttribute('data-value') === 'normal') {
            el.classList.add('selected');
            el.querySelector('input').checked = true;
        } else {
            el.classList.remove('selected');
            el.querySelector('input').checked = false;
        }
    });

    // 預設取消所有客製要求
    document.querySelectorAll('[data-group="custom"]').forEach(el => {
        el.classList.remove('selected');
        el.querySelector('input').checked = false;
    });

    // 預設選中會議餐盒200款
    document.querySelectorAll('[data-group="catering"]').forEach(el => {
        if (el.getAttribute('data-value') === '200') {
            el.classList.add('selected');
            el.querySelector('input').checked = true;
        } else {
            el.classList.remove('selected');
            el.querySelector('input').checked = false;
        }
    });
}

// 選擇單選選項 (Radio Boxes)
function selectRadioOption(element) {
    const group = element.getAttribute('data-group');
    const nameAttr = group === 'rice' ? 'rice-portion' : 'catering-tier';

    document.querySelectorAll(`[data-group="${group}"]`).forEach(box => {
        box.classList.remove('selected');
        box.querySelector('input').checked = false;
    });

    element.classList.add('selected');
    element.querySelector('input').checked = true;
}

// 選擇多選選項 (Checkbox Boxes)
function toggleCheckboxOption(element) {
    const input = element.querySelector('input');
    input.checked = !input.checked;
    element.classList.toggle('selected', input.checked);
}

// 加進購物籃
function addCustomizedToCart() {
    if (!activeCustomizeProduct) return;

    // A. 讀取米飯選擇與金額加算
    let priceAddon = 0;
    let optionDetailsList = [];
    const riceVal = document.querySelector('[data-group="rice"].selected').getAttribute('data-value');
    if (riceVal === 'extra') {
        priceAddon += 10;
        optionDetailsList.push(`${getTranslation('opt_rice_title')}: ${getTranslation('opt_rice_extra')} (+$10)`);
    } else if (riceVal === 'less') {
        optionDetailsList.push(`${getTranslation('opt_rice_title')}: ${getTranslation('opt_rice_less')}`);
    } else {
        optionDetailsList.push(`${getTranslation('opt_rice_title')}: ${getTranslation('opt_rice_normal')}`);
    }

    // B. 讀取客製選配要求
    let customTextList = [];
    document.querySelectorAll('[data-group="custom"].selected').forEach(box => {
        const val = box.getAttribute('data-value');
        if (val === 'no-scallion') customTextList.push(getTranslation('opt_no_scallion'));
        if (val === 'add-chili') customTextList.push(getTranslation('opt_add_chili'));
        if (val === 'no-utensils') customTextList.push(getTranslation('opt_no_utensils'));
    });
    if (customTextList.length > 0) {
        optionDetailsList.push(`${getTranslation('opt_custom_title')}: ${customTextList.join(', ')}`);
    }

    // C. 判斷會議餐盒等級
    let basePrice = activeCustomizeProduct.price;
    if (activeCustomizeProduct.id === '76513') {
        const caterVal = document.querySelector('[data-group="catering"].selected').getAttribute('data-value');
        if (caterVal === '250') {
            basePrice = 250;
            optionDetailsList.push(`${getTranslation('opt_catering_title')}: 250 TWD`);
        } else {
            basePrice = 200;
            optionDetailsList.push(`${getTranslation('opt_catering_title')}: 200 TWD`);
        }
    }

    // D. 建置自訂商品規格
    const finalPrice = basePrice + priceAddon;
    const specDetails = optionDetailsList.join(' | ');

    // 檢查購物車中是否已有完全相同規格的餐盒
    const existing = shoppingCart.find(item => 
        item.product.id === activeCustomizeProduct.id && 
        item.specDetails === specDetails
    );

    if (existing) {
        existing.quantity += 1;
    } else {
        shoppingCart.push({
            product: activeCustomizeProduct,
            specDetails: specDetails,
            price: finalPrice,
            quantity: 1
        });
    }

    // 渲染 UI 與訊息
    updateCartUI();
    toggleCart(true);
    closeCustomizeModal();
    
    const localized = getLocalizedProduct(activeCustomizeProduct.id);
    showToast(getTranslation("toast_add_cart").replace("{name}", localized.name || activeCustomizeProduct.name), "success");
}

// --- 8. 購物車與配送表單管理 ---
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

function openCheckoutDirectly() {
    toggleCart(true);
    if (shoppingCart.length === 0) {
        showToast(currentLang === 'zh-TW' ? '您的購物車是空的，請先加入餐點！' : 'Your cart is empty, please add some items first!', 'warning');
        return;
    }
    setTimeout(() => {
        const checkoutForm = document.getElementById('checkout-form-container');
        if (checkoutForm && checkoutForm.style.display !== 'none') {
            checkoutForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, 300);
}

function updateCartQuantity(productId, specDetails, delta) {
    const item = shoppingCart.find(item => item.product.id === productId && item.specDetails === specDetails);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
        shoppingCart = shoppingCart.filter(item => !(item.product.id === productId && item.specDetails === specDetails));
    }
    updateCartUI();
}

function removeFromCart(productId, specDetails) {
    shoppingCart = shoppingCart.filter(item => !(item.product.id === productId && item.specDetails === specDetails));
    updateCartUI();
    showToast(getTranslation('toast_remove_cart'), 'info');
}

function updateCartUI() {
    const container = document.getElementById('cart-items-container');
    const checkoutForm = document.getElementById('checkout-form-container');
    const totalPriceDisplay = document.getElementById('cart-total-price');
    const cartCountDisplay = document.getElementById('cart-count');
    const submitBtn = document.getElementById('submit-order-btn');

    container.innerHTML = '';
    
    let totalItems = 0;
    let totalPrice = 0;

    if (shoppingCart.length === 0) {
        container.innerHTML = `
            <div class="empty-cart-message">
                <i class="fa-solid fa-cart-shopping"></i>
                <p style="white-space: pre-line;">${getTranslation('cart_empty')}</p>
            </div>
        `;
        checkoutForm.style.display = 'none';
        totalPriceDisplay.textContent = '0';
        cartCountDisplay.textContent = '0';
        submitBtn.disabled = true;
        return;
    }

    checkoutForm.style.display = 'block';
    submitBtn.disabled = false;

    shoppingCart.forEach(item => {
        totalItems += item.quantity;
        totalPrice += item.price * item.quantity;

        const localized = getLocalizedProduct(item.product.id);
        const displayName = localized.name || item.product.name;

        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <img src="${item.product.image}" class="cart-item-img" alt="${stripHtml(displayName)}">
            <div class="cart-item-details">
                <span class="cart-item-title">${displayName}</span>
                ${item.specDetails ? `<span class="cart-item-options">${item.specDetails}</span>` : ''}
                <span class="cart-item-price">NT$ ${item.price} / ${currentLang === 'zh-TW' ? '個' : 'pcs'}</span>
                <div class="cart-item-controls">
                    <div class="quantity-control">
                        <button class="qty-btn" onclick="updateCartQuantity('${item.product.id}', '${item.specDetails}', -1)">-</button>
                        <span class="qty-val">${item.quantity}</span>
                        <button class="qty-btn" onclick="updateCartQuantity('${item.product.id}', '${item.specDetails}', 1)">+</button>
                    </div>
                    <button class="remove-item-btn" onclick="removeFromCart('${item.product.id}', '${item.specDetails}')">
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

// 提交結帳
function submitOrder() {
    const name = document.getElementById('checkout-name').value.trim();
    const phone = document.getElementById('checkout-phone').value.trim();
    const method = document.getElementById('checkout-method').value;
    const dept = document.getElementById('checkout-dept').value.trim();
    const address = document.getElementById('checkout-address').value.trim();
    const remarks = document.getElementById('checkout-remarks').value.trim();

    if (!name || !phone) {
        showToast(currentLang === 'zh-TW' ? '請填寫完整資訊！' : 'Please fill name and phone number!', 'error');
        return;
    }

    if (method === 'delivery' && !address) {
        showToast(currentLang === 'zh-TW' ? '請填寫外送地址！' : 'Please fill delivery address!', 'error');
        return;
    }

    const totalPrice = Number(document.getElementById('cart-total-price').textContent);

    // 整合商品名稱、數量與客製選項，寫入試算表 database
    const details = shoppingCart.map(item => `${stripHtml(getLocalizedProduct(item.product.id).name || item.product.name)} x${item.quantity} ($${item.price * item.quantity})`).join(', ');
    const allOptions = shoppingCart.map(item => `[${stripHtml(getLocalizedProduct(item.product.id).name || item.product.name)}]: ${item.specDetails} x${item.quantity}`).join('; ');

    const submitBtn = document.getElementById('submit-order-btn');
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> ${getTranslation('btn_submit_ordering')}`;

    const orderData = {
        userEmail: currentRole === 'member' ? 'member@slk.com' : 'guest',
        customerName: name,
        phone: phone + (dept ? ` (${dept})` : ''),
        method: method === 'delivery' ? `${getTranslation('chk_method_delivery')}: ${address}` : getTranslation('chk_method_pickup'),
        details: details,
        totalPrice: totalPrice,
        remarks: remarks,
        options: allOptions // v2 新增
    };

    google.script.run.withSuccessHandler(res => {
        if (res.success) {
            showToast(getTranslation('toast_order_success').replace("{id}", res.orderId), 'success');
            shoppingCart = [];
            updateCartUI();
            toggleCart(false);

            // 清空
            document.getElementById('checkout-name').value = '';
            document.getElementById('checkout-phone').value = '';
            document.getElementById('checkout-dept').value = '';
            document.getElementById('checkout-address').value = '';
            document.getElementById('checkout-remarks').value = '';

            if (currentRole === 'member') {
                switchView('member');
            }
        }
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${getTranslation('btn_submit_order')}`;
    }).submitOrder(orderData);
}

// --- 9. 會員設定與地址簿 (Account Profile) ---
function loadMemberProfile() {
    const profile = getV2Data('profile');
    if (!profile) return;

    // 填寫基本資料表單
    document.getElementById('profile-name').value = profile.name || '';
    document.getElementById('profile-phone').value = profile.phone || '';
    document.getElementById('profile-dept').value = profile.dept || '';
    document.getElementById('profile-address').value = profile.address || '';

    // 若處於會員權限，自動預填結帳表單
    if (currentRole === 'member') {
        prepopulateCheckoutForm(profile);
    }
}

function saveMemberProfile(event) {
    event.preventDefault();
    const profileData = {
        name: document.getElementById('profile-name').value.trim(),
        phone: document.getElementById('profile-phone').value.trim(),
        dept: document.getElementById('profile-dept').value.trim(),
        address: document.getElementById('profile-address').value.trim()
    };

    setV2Data('profile', profileData);
    showToast(getTranslation('toast_profile_saved'), 'success');

    // 即刻預填結帳表單
    prepopulateCheckoutForm(profileData);
    
    // 更新左側卡片名稱
    document.getElementById('member-display-name').textContent = profileData.name;
    
    // 返回訂單紀錄 Tab
    switchMemberSubTab('orders');
}

function prepopulateCheckoutForm(profile) {
    document.getElementById('checkout-name').value = profile.name || '';
    document.getElementById('checkout-phone').value = profile.phone || '';
    document.getElementById('checkout-dept').value = profile.dept || '';
    document.getElementById('checkout-address').value = profile.address || '';
    
    // 如果有部門，自動判定為外送並顯示
    if (profile.address) {
        document.getElementById('checkout-method').value = 'delivery';
        toggleMethodFields();
    }
}

function loadMemberOrders() {
    const container = document.getElementById('member-orders-container');
    const orderCountBadge = document.getElementById('stat-order-count');
    const totalSpentBadge = document.getElementById('stat-total-spent');
    container.innerHTML = '<div style="text-align:center; padding: 20px;"><i class="fa-solid fa-spinner fa-spin"></i> Loading...</div>';

    google.script.run.withSuccessHandler(orders => {
        const myOrders = orders.filter(o => o.userEmail === 'member@slk.com');
        container.innerHTML = '';
        
        orderCountBadge.textContent = myOrders.length.toString();
        const total = myOrders.reduce((sum, o) => sum + (o.status !== 'cancelled' ? Number(o.totalPrice) : 0), 0);
        totalSpentBadge.textContent = `NT$ ${total}`;

        if (myOrders.length === 0) {
            container.innerHTML = `
                <div style="text-align: center; padding: 40px; color: var(--text-muted);">
                    <i class="fa-solid fa-receipt" style="font-size: 3rem; margin-bottom: 15px; opacity: 0.2;"></i>
                    <p>${currentLang === 'zh-TW' ? '尚無任何點餐訂單紀錄' : 'No order records yet.'}</p>
                </div>
            `;
            return;
        }

        myOrders.forEach(o => {
            const dateStr = new Date(o.timestamp).toLocaleString();
            const div = document.createElement('div');
            div.className = 'order-item-card';
            
            // 解析客製規格 badges
            let optionBadgesHtml = '';
            if (o.options) {
                const parts = o.options.split('; ');
                parts.forEach(part => {
                    if (part) optionBadgesHtml += `<span class="option-badge">${part}</span>`;
                });
            }

            div.innerHTML = `
                <div class="order-item-header">
                    <span class="order-item-id"><i class="fa-solid fa-hashtag"></i> ${o.orderId}</span>
                    <span class="order-item-date">${dateStr}</span>
                    <span class="status-badge ${o.status}">${translateStatus(o.status)}</span>
                </div>
                <div class="order-item-body">
                    <div class="order-item-details"><strong>${currentLang === 'zh-TW' ? '餐點明細' : 'Details'}:</strong> ${o.details}</div>
                    ${optionBadgesHtml ? `<div style="margin-bottom: 8px;">${optionBadgesHtml}</div>` : ''}
                    <div class="order-item-meta"><strong>${currentLang === 'zh-TW' ? '配送資訊' : 'Delivery'}:</strong> ${o.method}</div>
                    ${o.remarks ? `<div class="order-item-meta"><strong>${currentLang === 'zh-TW' ? '餐點備註' : 'Remarks'}:</strong> <span style="color:var(--accent-hover); font-weight:600;">${o.remarks}</span></div>` : ''}
                    <div class="order-item-total">${currentLang === 'zh-TW' ? '合計' : 'Total'}: NT$ ${o.totalPrice}</div>
                </div>
            `;
            container.appendChild(div);
        });
    }).getOrders();
}

function translateStatus(status) {
    return getTranslation(`status_${status}`);
}

// --- 10. 後台管理員系統與搜尋過濾 (Admin Module) ---
let cachedOrders = [];

function loadAdminData() {
    loadAdminMetrics();
    renderAdminOrdersTable();
    renderAdminProductsTable();
}

// 繪製後台狀態篩選按鈕
function renderAdminFilterTabs(dict) {
    const container = document.getElementById('admin-order-filter-group');
    container.innerHTML = `
        <button class="order-filter-btn ${currentAdminFilter === 'all' ? 'active' : ''}" onclick="filterOrdersByStatus('all')">${currentLang === 'zh-TW' ? '全部' : 'All'}</button>
        <button class="order-filter-btn ${currentAdminFilter === 'pending' ? 'active' : ''}" onclick="filterOrdersByStatus('pending')">${dict.status_pending}</button>
        <button class="order-filter-btn ${currentAdminFilter === 'preparing' ? 'active' : ''}" onclick="filterOrdersByStatus('preparing')">${dict.status_preparing}</button>
        <button class="order-filter-btn ${currentAdminFilter === 'completed' ? 'active' : ''}" onclick="filterOrdersByStatus('completed')">${dict.status_completed}</button>
        <button class="order-filter-btn ${currentAdminFilter === 'cancelled' ? 'active' : ''}" onclick="filterOrdersByStatus('cancelled')">${dict.status_cancelled}</button>
    `;
}

function loadAdminMetrics() {
    google.script.run.withSuccessHandler(orders => {
        cachedOrders = orders; // 暫存訂單
        
        const totalOrders = orders.length;
        const totalRevenue = orders.reduce((sum, o) => sum + (o.status === 'completed' ? Number(o.totalPrice) : 0), 0);
        const activeOrders = orders.filter(o => o.status !== 'cancelled').length;
        const avgValue = activeOrders > 0 ? Math.round(orders.reduce((sum, o) => sum + (o.status !== 'cancelled' ? Number(o.totalPrice) : 0), 0) / activeOrders) : 0;

        document.getElementById('admin-metric-revenue').textContent = `NT$ ${totalRevenue.toLocaleString()}`;
        document.getElementById('admin-metric-orders').textContent = `${totalOrders} ${currentLang === 'zh-TW' ? '筆' : 'orders'}`;
        document.getElementById('admin-metric-aov').textContent = `NT$ ${avgValue}`;

        renderSalesChart(orders);
        renderBestSellers(orders);
    }).getOrders();
}

// 暢銷排行榜 (Best Sellers Horizontal Progress Bars)
function renderBestSellers(orders = []) {
    const container = document.getElementById('top-selling-container');
    container.innerHTML = '';

    // 統計每個產品售出份數 (簡易分析訂單詳情文字)
    let counts = {};
    orders.forEach(o => {
        if (o.status === 'cancelled') return;
        
        // 解析 details 欄位 (如: 港式蔥油雞飯 x2 ($220), ...)
        const items = o.details.split(', ');
        items.forEach(item => {
            if (!item) return;
            const match = item.match(/(.+) x(\d+)/);
            if (match) {
                const name = match[1].trim();
                const qty = parseInt(match[2]);
                counts[name] = (counts[name] || 0) + qty;
            }
        });
    });

    // 轉為陣列排序
    let sorted = [];
    for (let name in counts) {
        sorted.push({ name, qty: counts[name] });
    }
    sorted.sort((a, b) => b.qty - a.qty);

    // 取前 5 名繪製
    const top5 = sorted.slice(0, 5);
    const maxQty = top5.length > 0 ? top5[0].qty : 10;

    if (top5.length === 0) {
        container.innerHTML = `<div style="text-align:center; padding: 20px; color:var(--text-muted);">${currentLang === 'zh-TW' ? '尚無銷售數據' : 'No sales data yet.'}</div>`;
        return;
    }

    top5.forEach(d => {
        const pct = (d.qty / maxQty) * 100;
        const div = document.createElement('div');
        div.className = 'ranking-item';
        div.innerHTML = `
            <div class="ranking-item-meta">
                <span>${d.name}</span>
                <span>${d.qty} ${currentLang === 'zh-TW' ? '份' : 'sets'}</span>
            </div>
            <div class="ranking-progress-bg">
                <div class="ranking-progress-bar" style="width: 0%;" data-pct="${pct}"></div>
            </div>
        `;
        container.appendChild(div);

        // 微動畫觸發
        setTimeout(() => {
            div.querySelector('.ranking-progress-bar').style.width = `${pct}%`;
        }, 100);
    });
}

// 營業概況長條圖
function renderSalesChart(orders = []) {
    const container = document.getElementById('orders-chart-container');
    container.innerHTML = '';

    const chartData = [
        { label: '6/4', value: 1800 },
        { label: '6/5', value: 2400 },
        { label: '6/6', value: 1950 },
        { label: '6/7', value: 3100 },
        { label: '今日', value: 0 }
    ];

    const todayStr = new Date().toDateString();
    const todayRevenue = orders
        .filter(o => new Date(o.timestamp).toDateString() === todayStr && o.status === 'completed')
        .reduce((sum, o) => sum + Number(o.totalPrice), 0);

    chartData[4].value = todayRevenue || 1200;

    const maxVal = Math.max(...chartData.map(d => d.value)) || 1000;

    chartData.forEach(d => {
        const pct = (d.value / maxVal) * 80 + 10;
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

// 渲染後台訂單表 (含搜尋與篩選邏輯)
function renderAdminOrdersTable(filteredOrders = null) {
    const tbody = document.getElementById('admin-orders-table-body');
    tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;"><i class="fa-solid fa-spinner fa-spin"></i> Loading...</td></tr>';

    const ordersToRender = filteredOrders || cachedOrders;
    tbody.innerHTML = '';

    if (ordersToRender.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; color:var(--text-muted);">${currentLang === 'zh-TW' ? '找不到任何訂單符合條件' : 'No matching orders found.'}</td></tr>`;
        return;
    }

    ordersToRender.forEach(o => {
        const dateStr = new Date(o.timestamp).toLocaleString();
        
        let optionBadgesHtml = '';
        if (o.options) {
            const parts = o.options.split('; ');
            parts.forEach(part => {
                if (part) optionBadgesHtml += `<span class="option-badge">${part}</span>`;
            });
        }

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${o.orderId}</strong><br><span style="font-size:0.75rem; color:var(--text-muted);">${dateStr}</span></td>
            <td>
                <strong>${o.customerName}</strong><br>
                <span style="font-size:0.75rem; color:var(--text-muted);">${o.phone}</span>
            </td>
            <td style="max-width:260px; font-size:0.82rem; word-break:break-all;">
                <div>${o.details}</div>
                ${optionBadgesHtml ? `<div style="margin-top:6px;">${optionBadgesHtml}</div>` : ''}
                ${o.remarks ? `<div style="font-size:0.75rem; color:var(--accent-hover); margin-top:4px;">💬 ${o.remarks}</div>` : ''}
            </td>
            <td style="font-size:0.8rem;">${o.method}</td>
            <td><strong>$${o.totalPrice}</strong></td>
            <td><span class="status-badge ${o.status}">${translateStatus(o.status)}</span></td>
            <td>
                <select class="form-control" style="width:110px; padding:4px 8px; font-size:0.8rem;" onchange="changeOrderStatus('${o.orderId}', this.value)">
                    <option value="pending" ${o.status === 'pending' ? 'selected' : ''}>${getTranslation('status_pending')}</option>
                    <option value="preparing" ${o.status === 'preparing' ? 'selected' : ''}>${getTranslation('status_preparing')}</option>
                    <option value="completed" ${o.status === 'completed' ? 'selected' : ''}>${getTranslation('status_completed')}</option>
                    <option value="cancelled" ${o.status === 'cancelled' ? 'selected' : ''}>${getTranslation('status_cancelled')}</option>
                </select>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// 後台訂單即時篩選 (狀態)
function filterOrdersByStatus(status) {
    currentAdminFilter = status;
    renderAdminFilterTabs(I18N_DICT[currentLang]);
    applySearchAndFilter();
}

// 後台訂單即時搜尋 (姓名, 電話, ID)
function filterAdminOrders() {
    applySearchAndFilter();
}

function applySearchAndFilter() {
    const query = document.getElementById('admin-order-search').value.toLowerCase().trim();
    
    let result = cachedOrders;
    
    // A. 先依狀態篩選
    if (currentAdminFilter !== 'all') {
        result = result.filter(o => o.status === currentAdminFilter);
    }
    
    // B. 再依搜尋詞模糊篩選
    if (query !== '') {
        result = result.filter(o => 
            o.orderId.toLowerCase().includes(query) || 
            o.customerName.toLowerCase().includes(query) || 
            o.phone.toLowerCase().includes(query) ||
            o.details.toLowerCase().includes(query)
        );
    }
    
    renderAdminOrdersTable(result);
}

function changeOrderStatus(orderId, newStatus) {
    google.script.run.withSuccessHandler(res => {
        if (res.success) {
            // 同步更新本地快取暫存
            const idx = cachedOrders.findIndex(o => o.orderId === orderId);
            if (idx !== -1) cachedOrders[idx].status = newStatus;

            showToast(getTranslation('toast_status_changed').replace("{id}", orderId).replace("{status}", translateStatus(newStatus)), 'success');
            loadAdminMetrics(); // 更新營業指標與趨勢
            applySearchAndFilter(); // 保持目前的搜尋/過濾表
        }
    }).updateOrderStatus(orderId, newStatus);
}

// 渲染後台商品表
function renderAdminProductsTable() {
    const tbody = document.getElementById('admin-products-table-body');
    tbody.innerHTML = '';

    allProducts.forEach(p => {
        const tr = document.createElement('tr');
        const localized = getLocalizedProduct(p.id);
        const displayName = localized.name || p.name;

        tr.innerHTML = `
            <td><img src="${p.image}" style="width:40px; height:40px; object-fit:cover; border-radius:4px;" alt=""></td>
            <td><strong>${displayName}</strong><br><span style="font-size:0.7rem; color:var(--text-muted);">ID: ${p.id}</span></td>
            <td><span class="product-meta">${p.category === 'main' ? getTranslation('cat_main') : p.category === 'salad' ? getTranslation('cat_salad') : getTranslation('cat_promo')}</span></td>
            <td>$${p.price}</td>
            <td>
                <span class="status-badge ${p.status === 'instock' ? 'completed' : 'cancelled'}">
                    ${p.status === 'instock' ? (currentLang === 'zh-TW' ? '供餐中' : 'In Stock') : (currentLang === 'zh-TW' ? '已售罄' : 'Out of Stock')}
                </span>
            </td>
            <td>
                <button class="action-btn edit" onclick="openProductModal('${p.id}')">
                    <i class="fa-solid fa-pen-to-square"></i> ${currentLang === 'zh-TW' ? '編輯' : 'Edit'}
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// --- 11. 後台商品管理新增與修改彈窗 ---
function openProductModal(productId = null) {
    const modal = document.getElementById('product-modal');
    const title = document.getElementById('modal-title');
    
    document.getElementById('modal-prod-id').value = '';
    document.getElementById('modal-prod-name').value = '';
    document.getElementById('modal-prod-category').value = 'main';
    document.getElementById('modal-prod-price').value = '110';
    document.getElementById('modal-prod-desc').value = '';
    document.getElementById('modal-prod-image').value = '';
    document.getElementById('modal-prod-status').value = 'instock';

    if (productId) {
        title.textContent = currentLang === 'zh-TW' ? '修改餐點資訊' : 'Edit Product Details';
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
        title.textContent = currentLang === 'zh-TW' ? '新增上架餐點' : 'Add New Product';
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
        showToast(currentLang === 'zh-TW' ? '請填寫完整資訊！' : 'Please fill all required inputs!', 'error');
        return;
    }

    const prodData = { id, name, category, price, description, image, status };

    google.script.run.withSuccessHandler(res => {
        if (res.success) {
            closeProductModal();
            showToast(currentLang === 'zh-TW' ? '餐點資料已儲存！' : 'Product saved successfully!', 'success');
            loadProducts(); 
        }
    }).updateProduct(prodData);
}

// --- 12. 漂浮角色切換管理員與會員模擬 ---
function changeUserRole(role) {
    currentRole = role;
    
    document.querySelectorAll('.role-switcher-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`.role-switcher-btn.${role}`).classList.add('active');

    const navAdmin = document.getElementById('nav-admin');
    if (role === 'admin') {
        navAdmin.style.display = 'flex';
        showToast(getTranslation('toast_role_admin'), 'info');
    } else {
        navAdmin.style.display = 'none';
        if (document.getElementById('view-admin').classList.contains('active')) {
            switchView('menu');
        }
        if (role === 'member') {
            showToast(getTranslation('toast_role_member'), 'success');
            loadMemberProfile(); // 自動帶入地址
        } else {
            showToast(getTranslation('toast_role_guest'), 'info');
            // 清空結帳表單
            document.getElementById('checkout-name').value = '';
            document.getElementById('checkout-phone').value = '';
            document.getElementById('checkout-dept').value = '';
            document.getElementById('checkout-address').value = '';
        }
    }
    
    updateNavbarUserBadge();
    
    if (document.getElementById('view-member').classList.contains('active')) {
        loadMemberOrders();
    }
    
    // 角色變更時，若正在回饋視角，則重新渲染 (切換表單與後台列表)
    if (document.getElementById('view-guide').classList.contains('active')) {
        renderFeedbacks();
    }
}

function updateNavbarUserBadge() {
    const userDisplay = document.getElementById('navbar-user-display');
    const label = userDisplay.querySelector('span');

    if (currentRole === 'admin') {
        label.textContent = getTranslation('user_admin');
        userDisplay.style.backgroundColor = '#fef3c7';
        userDisplay.style.color = '#d97706';
    } else if (currentRole === 'member') {
        label.textContent = getTranslation('user_member');
        userDisplay.style.backgroundColor = '#e0f2fe';
        userDisplay.style.color = '#0284c7';
    } else {
        label.textContent = getTranslation('user_guest');
        userDisplay.style.backgroundColor = '#f1f5f9';
        userDisplay.style.color = '#64748b';
    }
}

// --- 13. Toast 訊息與小工具 ---
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
    
    setTimeout(() => toast.classList.add('show'), 50);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400);
    }, 3500);
}

function copyGasCode() {
    const code = document.getElementById('gas-code-content').textContent.trim();
    navigator.clipboard.writeText(code).then(() => {
        showToast(currentLang === 'zh-TW' ? 'GAS 代碼已複製！' : 'GAS code copied successfully!', 'success');
    });
}

function escapeHTML(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;')
              .replace(/'/g, '&#039;');
}

// --- 13. 鼓勵與反饋留言板互動與後台管理 (Feedback Board System) ---

const WORKER_MOCK_DATA = {
    "1000": { name: "Sunny", dept: "廚苑部 (Kitchen)" },
    "11100002": { name: "銀行電子", dept: "系統部 (System)" },
    "11100004": { name: "李小明", dept: "研發部 (R&D)" },
    "11100007": { name: "王大同", dept: "管理部 (Admin)" },
    "11100010": { name: "張美玲", dept: "客服部 (CS)" },
    "admin": { name: "管理員", dept: "系統管理 (IT)" },
    "sunny": { name: "Sunny主廚", dept: "主廚室 (Chef)" }
};

function getWorkerInfo(workerNo) {
    if (WORKER_MOCK_DATA[workerNo]) {
        return WORKER_MOCK_DATA[workerNo];
    }
    return { name: "員工 " + workerNo, dept: "測試部門" };
}

const DEFAULT_FEEDBACKS = [
    {
        id: "FB-001",
        worker_no: "11100002",
        name: "銀行電子",
        department: "系統部 (System)",
        message_content: "昨天的炸燒肉飯真的太好吃了！皮很脆，肉也很嫩，今天還想再點！",
        create_time: "2026-06-07 11:30:15",
        read_status: 1
    },
    {
        id: "FB-002",
        worker_no: "11100004",
        name: "李小明",
        department: "研發部 (R&D)",
        message_content: "希望能增加素食餐點的選項，有時想吃得清淡一些。",
        create_time: "2026-06-08 09:15:30",
        read_status: 0
    },
    {
        id: "FB-003",
        worker_no: "1000",
        name: "Sunny",
        department: "廚苑部 (Kitchen)",
        message_content: "系統的客製化米飯份量和減油蔥功能非常好用，送餐也很準時！",
        create_time: "2026-06-08 10:20:00",
        read_status: 0
    }
];

function getFeedbacksFromStorage() {
    let feedbacks = localStorage.getItem('bento_feedbacks');
    if (!feedbacks) {
        feedbacks = JSON.stringify(DEFAULT_FEEDBACKS);
        localStorage.setItem('bento_feedbacks', feedbacks);
    }
    return JSON.parse(feedbacks);
}

function saveFeedbacksToStorage(feedbacks) {
    localStorage.setItem('bento_feedbacks', JSON.stringify(feedbacks));
}

function renderFeedbacks() {
    const feedbackFormContainer = document.getElementById('feedback-form-container');
    const feedbackAdminContainer = document.getElementById('feedback-admin-container');
    
    if (currentRole === 'admin') {
        if (feedbackFormContainer) feedbackFormContainer.style.display = 'none';
        if (feedbackAdminContainer) feedbackAdminContainer.style.display = 'block';
        loadAdminFeedbacks();
    } else {
        if (feedbackFormContainer) feedbackFormContainer.style.display = 'block';
        if (feedbackAdminContainer) feedbackAdminContainer.style.display = 'none';
        clearFeedbackForm();
    }
}

function clearFeedbackForm() {
    const workerNoInput = document.getElementById('feedback-worker-no');
    const contentInput = document.getElementById('feedback-message-content');
    if (workerNoInput) workerNoInput.value = '';
    if (contentInput) contentInput.innerHTML = '';
}

function submitFeedback() {
    const workerNoInput = document.getElementById('feedback-worker-no');
    const messageContentInput = document.getElementById('feedback-message-content');
    
    if (!workerNoInput || !messageContentInput) return;
    
    const workerNo = workerNoInput.value.trim();
    const messageContent = messageContentInput.innerHTML.replace(/\s+$/, '');
    
    if (!workerNo || !messageContent || messageContent === '<br>') {
        alert(getTranslation('alert_empty_feedback'));
        return;
    }
    
    // Validate Employee ID
    const allValidIDs = [
        "1000", "11100002", "11100004", "11100007", "11100010", "11100014",
        "11100016", "11100017", "11100018", "11100019", "11100020", "admin", "sunny",
        "11100021", "11100025", "11100026", "11100028", "11100029", "11100030"
    ];
    if (!allValidIDs.includes(workerNo)) {
        alert(getTranslation('alert_invalid_worker_no'));
        return;
    }
    
    const info = getWorkerInfo(workerNo);
    const feedbacks = getFeedbacksFromStorage();
    
    const newFeedback = {
        id: "FB-" + new Date().getTime().toString().slice(-6),
        worker_no: workerNo,
        name: info.name,
        department: info.dept,
        message_content: escapeHTML(messageContent).replace(/\n/g, '<br>'),
        create_time: new Date().toISOString().replace('T', ' ').substring(0, 19),
        read_status: 0
    };
    
    feedbacks.unshift(newFeedback);
    saveFeedbacksToStorage(feedbacks);
    
    showToast(getTranslation('toast_feedback_success'), 'success');
    clearFeedbackForm();
    renderFeedbacks();
}

let selectedFeedbackIds = [];

function loadAdminFeedbacks() {
    const body = document.getElementById('feedback-list-body');
    if (!body) return;
    body.innerHTML = '';
    
    const feedbacks = getFeedbacksFromStorage();
    const searchInput = document.getElementById('feedback-search-worker');
    const statusFilter = document.getElementById('feedback-filter-status');
    
    const query = searchInput ? searchInput.value.trim().toLowerCase() : "";
    const status = statusFilter ? statusFilter.value : "all";
    
    const filtered = feedbacks.filter(fb => {
        const matchQuery = fb.worker_no.toLowerCase().includes(query) || 
                           (fb.name && fb.name.toLowerCase().includes(query)) ||
                           (fb.message_content && fb.message_content.toLowerCase().includes(query));
        const matchStatus = status === "all" || 
                           (status === "read" && fb.read_status === 1) || 
                           (status === "unread" && fb.read_status === 0);
        return matchQuery && matchStatus;
    });
    
    if (filtered.length === 0) {
        body.innerHTML = `<tr><td colspan="9" style="text-align: center; color: var(--text-muted);">No feedback records found.</td></tr>`;
        return;
    }
    
    filtered.forEach((fb, index) => {
        const tr = document.createElement('tr');
        tr.className = fb.read_status === 0 ? "status-unread" : "status-read";
        
        const isChecked = selectedFeedbackIds.includes(fb.id) ? "checked" : "";
        const statusText = fb.read_status === 1 ? getTranslation('opt_feedback_status_read') : getTranslation('opt_feedback_status_unread');
        const badgeClass = fb.read_status === 1 ? "read" : "unread";
        
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td><input type="checkbox" class="feedback-checkbox" data-id="${fb.id}" ${isChecked} onchange="toggleFeedbackSelection('${fb.id}', this.checked)"></td>
            <td><span class="badge-status ${badgeClass}" style="cursor: pointer;" onclick="toggleFeedbackReadStatus('${fb.id}')">${statusText}</span></td>
            <td><strong>${escapeHTML(fb.worker_no)}</strong></td>
            <td>${escapeHTML(fb.department || '')}</td>
            <td>${escapeHTML(fb.name || '')}</td>
            <td class="message-content-cell" onclick="toggleExpandContent(this)">
                <div class="message-content-display">${fb.message_content}</div>
            </td>
            <td><small>${fb.create_time}</small></td>
            <td>
                <div style="display: flex; gap: 4px;">
                    <button class="action-btn edit" style="padding: 4px 8px; font-size: 0.75rem;" onclick="editFeedbackContent('${fb.id}')"><i class="fa-solid fa-pen"></i></button>
                    <button class="action-btn delete" style="padding: 4px 8px; font-size: 0.75rem; background-color: var(--danger);" onclick="deleteFeedback('${fb.id}')"><i class="fa-solid fa-trash"></i></button>
                </div>
            </td>
        `;
        body.appendChild(tr);
    });
}

function filterFeedbacks() {
    loadAdminFeedbacks();
}

function toggleExpandContent(cell) {
    cell.classList.toggle('expanded');
}

function toggleFeedbackSelection(id, checked) {
    if (checked) {
        if (!selectedFeedbackIds.includes(id)) selectedFeedbackIds.push(id);
    } else {
        selectedFeedbackIds = selectedFeedbackIds.filter(x => x !== id);
    }
}

function toggleSelectAllFeedbacks(checkbox) {
    const checkboxes = document.querySelectorAll('.feedback-checkbox');
    selectedFeedbackIds = [];
    checkboxes.forEach(cb => {
        cb.checked = checkbox.checked;
        const id = cb.getAttribute('data-id');
        if (checkbox.checked && id) {
            selectedFeedbackIds.push(id);
        }
    });
}

function toggleFeedbackReadStatus(id) {
    const feedbacks = getFeedbacksFromStorage();
    const fb = feedbacks.find(x => x.id === id);
    if (fb) {
        fb.read_status = fb.read_status === 1 ? 0 : 1;
        saveFeedbacksToStorage(feedbacks);
        loadAdminFeedbacks();
    }
}

function bulkMarkFeedback(status) {
    if (selectedFeedbackIds.length === 0) {
        alert(getTranslation('alert_select_fb'));
        return;
    }
    const feedbacks = getFeedbacksFromStorage();
    feedbacks.forEach(fb => {
        if (selectedFeedbackIds.includes(fb.id)) {
            fb.read_status = status;
        }
    });
    saveFeedbacksToStorage(feedbacks);
    selectedFeedbackIds = [];
    const selectAll = document.getElementById('feedback-select-all');
    if (selectAll) selectAll.checked = false;
    loadAdminFeedbacks();
}

function deleteFeedback(id) {
    if (confirm(getTranslation('alert_confirm_delete_fb'))) {
        let feedbacks = getFeedbacksFromStorage();
        feedbacks = feedbacks.filter(x => x.id !== id);
        saveFeedbacksToStorage(feedbacks);
        selectedFeedbackIds = selectedFeedbackIds.filter(x => x !== id);
        loadAdminFeedbacks();
    }
}

function editFeedbackContent(id) {
    const feedbacks = getFeedbacksFromStorage();
    const fb = feedbacks.find(x => x.id === id);
    if (!fb) return;
    
    const newContent = prompt("編輯留言內容 (Edit message content):", fb.message_content.replace(/<br>/g, "\n"));
    if (newContent !== null) {
        fb.message_content = escapeHTML(newContent).replace(/\n/g, "<br>");
        saveFeedbacksToStorage(feedbacks);
        showToast(getTranslation('alert_save_success'), 'success');
        loadAdminFeedbacks();
    }
}
