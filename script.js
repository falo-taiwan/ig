document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. Tab Switcher Logic
    // ==========================================
    const tabButtons = document.querySelectorAll(".tab-btn");
    const tabContents = document.querySelectorAll(".tab-content");

    tabButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            // Remove active classes
            tabButtons.forEach(b => b.classList.remove("active"));
            tabContents.forEach(c => c.classList.remove("active"));

            // Add active to current
            btn.classList.add("active");
            const targetId = btn.getAttribute("data-tab");
            document.getElementById(targetId).classList.add("active");
        });
    });

    // ==========================================
    // 2. Python Copy Code Logic
    // ==========================================
    const btnCopy = document.getElementById("btn-copy-code");
    const pythonCode = document.getElementById("python-code");

    if (btnCopy && pythonCode) {
        btnCopy.addEventListener("click", () => {
            navigator.clipboard.writeText(pythonCode.innerText)
                .then(() => {
                    btnCopy.innerHTML = '<i class="fa-solid fa-check text-success"></i> 已複製！';
                    setTimeout(() => {
                        btnCopy.innerHTML = '<i class="fa-regular fa-copy"></i> 複製程式碼';
                    }, 2000);
                })
                .catch(err => {
                    console.error("無法複製程式碼：", err);
                });
        });
    }

    
    // ==========================================
    // 4. Interactive Spreadsheet Explorer Logic
    // ==========================================
    const btnShowV1 = document.getElementById("btn-show-v1");
    const btnShowV2 = document.getElementById("btn-show-v2");
    const explorerTheadTr = document.getElementById("explorer-thead-tr");
    const explorerTbody = document.getElementById("explorer-tbody");

    const columns = [
        "專案編號", "專案名稱", "負責部門", "專案經理 (PM)", 
        "開始日期", "預計結束日期", "專案預算 (NTD)", "進度 %", 
        "目前狀態", "主要風險與備註說明"
    ];

    // Procedural generation of 50-row V1/V2 datasets (matching create_simulated_data.py)
    const departments = ["資訊技術處", "數位金融處", "客戶服務處", "資訊安全處", "行銷企劃處", "總務管理處", "電子商務部"];
    const pms = ["陳雅婷 (Emily)", "張家豪 (Kevin)", "林俊傑 (JJ)", "黃冠宇 (Jerry)", "李明憲 (Alan)", "林淑芬 (Sophia)"];
    const projectConcepts = [
        ["雲端備份回復演練", "建置自動化備份驗證機制與還原模擬"],
        ["大樓門禁安防升級", "導入人臉識別與智慧RFID門禁感應"],
        ["薪資自動化與無紙化", "開發電子薪資單發送與歸檔平台"],
        ["智能合約審查輔助", "法務AI合約條款風險預測軟體"],
        ["全通路行銷自動化", "整合電子郵件、簡訊與Line推播"],
        ["顧客滿意度即時分析", "VOC客服中心自動語音轉文字與情緒分析"],
        ["集團伺服器虛擬化擴建", "提高硬體資源使用率與降低電費"],
        ["法規合規自動監測", "建立最新法規通報與內部自評系統"],
        ["行動辦公App安全升級", "導入MDM行動裝置管理系統"],
        ["大數據環境擴展工程", "擴充Hadoop集群與Spark儲存節點"]
    ];

    const first20 = [
        ["PRJ-2026-001", "2026年度核心系統雲端化移轉專案", "資訊技術處", "陳雅婷 (Emily)", "2026-01-10", "2026-12-31", 4500000, 0.35, "進行中", "已完成第一階段系統架構規劃與環境建置，目前進行資料遷移測試，進度正常。"],
        ["PRJ-2026-002", "企業客戶端行動App UI/UX全面改版", "數位金融處", "張家豪 (Kevin)", "2026-02-01", "2026-07-31", 1800000, 0.60, "進行中", "易用性測試(UT)報告已出爐，正在針對使用者反饋調整介面細節，時程略微吃緊。"],
        ["PRJ-2026-003", "AI智能客服系統升級第二期開發", "客戶服務處", "林俊傑 (JJ)", "2026-03-15", "2026-10-31", 2800000, 0.20, "進行中", "大語言模型微調資料集整理中，預計下個月進行初步效能評估。"],
        ["PRJ-2026-004", "資安端點偵測與回應(EDR)系統導入案", "資訊安全處", "黃冠宇 (Jerry)", "2025-11-01", "2026-04-30", 3200000, 1.00, "已完成", "全行端點部署率達 99.8%，已正式切換至日常維運模式並順利結案。"],
        ["PRJ-2026-005", "跨國跨境支付平台API串接工程", "國際金融部", "李明憲 (Alan)", "2026-04-01", "2026-09-30", 1500000, 0.10, "規劃中", "正與合作銀行進行API規格書確認，預計5月中旬召開技術啟動會議。"],
        ["PRJ-2026-006", "全通路會員紅利點數系統整合", "行銷企劃處", "王小明 (Ming)", "2026-01-05", "2026-06-30", 950000, 0.85, "進行中", "線上與線下點數扣帳機制API已通過聯調測試，目前進行壓力測試中。"],
        ["PRJ-2026-007", "永續發展ESG碳盤查與報告書平台建置", "永續發展辦公室", "林淑芬 (Sophia)", "2026-02-15", "2026-08-31", 2100000, 0.40, "進行中", "範疇一與範疇二碳排計算引擎已開發完成，刻正蒐集各廠區歷史數據。"],
        ["PRJ-2026-008", "智慧工廠生產線影像辨識瑕疵檢測系統", "智慧製造部", "周杰倫 (Jay)", "2026-03-01", "2026-11-30", 3800000, 0.25, "進行中", "光學鏡頭模組選型已底定，AI演算法模型正於測試機台進行微調。"],
        ["PRJ-2026-009", "供應商關係管理(SRM)系統升級案", "採購管理處", "蔡依林 (Jolin)", "2026-01-20", "2026-05-31", 1100000, 0.95, "進行中", "系統測試階段發現效能瓶頸，供應商配合調整中，預計延遲兩週上線。"],
        ["PRJ-2026-010", "電子發票與B2B對帳系統模組開發", "財務會計處", "徐若瑄 (Vivian)", "2026-04-10", "2026-09-15", 850000, 0.05, "規劃中", "需求規格書草案已擬定完成，正送交外部會計師事務所審查合規性。"],
        ["PRJ-2026-011", "客戶關係管理(CRM)雲端版資料庫移轉", "客戶服務處", "林志玲 (Chiling)", "2026-01-15", "2026-06-30", 1600000, 0.70, "進行中", "資料清理工作已超前完成，下週起進行批次測試載入。"],
        ["PRJ-2026-012", "智慧零售門市POS系統第二期更新", "零售業務處", "彭于晏 (Eddie)", "2026-02-10", "2026-08-31", 1900000, 0.45, "進行中", "第一批北部直營門市之硬體建置與員工訓練已陸續展開。"],
        ["PRJ-2026-013", "集團人力資源管理(HRM)薪資模組改版", "人力資源處", "張惠妹 (A-Mei)", "2026-03-20", "2026-09-30", 1300000, 0.15, "進行中", "針對勞基法新制之計算邏輯確認完成，系統進入核心程式開發。"],
        ["PRJ-2026-014", "大數據行銷行為特徵分析平台建置", "行銷企劃處", "蕭敬騰 (Jam)", "2026-01-05", "2026-05-31", 2400000, 0.90, "進行中", "數據清洗與打通工程已完成，目前正與第三方行銷廠商進行介面整合測試。"],
        ["PRJ-2026-015", "遠距辦公SSL-VPN架構升級專案", "資訊安全處", "羅志祥 (Show)", "2026-02-01", "2026-06-30", 750000, 0.80, "進行中", "新防火牆與VPN閘道器已完成實體上架，正進行高可用性(HA)測試。"],
        ["PRJ-2026-016", "企業內部知識管理(KM)平台維護更新", "行政管理處", "五月天阿信 (Ashin)", "2026-04-15", "2026-07-31", 500000, 0.10, "進行中", "搜尋引擎優化與標籤權重演算法調整中，預計5月中發布Beta測試版。"],
        ["PRJ-2026-017", "跨境電商物流追蹤模組開發", "電子商務部", "林宥嘉 (Yoga)", "2026-03-01", "2026-08-31", 1400000, 0.30, "進行中", "已完成串接跨國主要貨運商API，正開發前端包裹狀態追蹤UI。"],
        ["PRJ-2026-018", "智能辦公室IoT節能感測系統建置", "總務管理處", "楊丞琳 (Rainie)", "2026-02-20", "2026-09-30", 1150000, 0.35, "進行中", "總部大樓各樓層智慧感測器已布署完畢，開始進行中控平台連線測試。"],
        ["PRJ-2026-019", "全球專利智慧檢索平台系統優化", "法務智權處", "王力宏 (Leehom)", "2026-01-10", "2026-05-31", 980000, 0.92, "進行中", "進入使用者驗收測試(UAT)階段，法務同仁回饋良好，準備於本月下旬結案。"],
        ["PRJ-2026-020", "多重身分驗證(MFA)機制全行導入案", "資訊安全處", "田馥甄 (Hebe)", "2026-03-10", "2026-10-31", 2600000, 0.22, "進行中", "正與各系統主管討論認證模組API串接細節，以減少對核心服務的阻礙。"]
    ];

    function generateV1() {
        let data = [];
        // Copy first 20
        first20.forEach(row => {
            let obj = {};
            columns.forEach((col, idx) => {
                obj[col] = row[idx];
            });
            data.push(obj);
        });

        // Loop for 21-50
        for (let i = 21; i <= 50; i++) {
            let dept = departments[i % departments.length];
            let pm = pms[i % pms.length];
            let [conceptTitle, conceptDesc] = projectConcepts[(i - 21) % projectConcepts.length];
            let projName = `${dept}_${conceptTitle}專案_V${(i % 3) + 1}`;
            
            data.push({
                "專案編號": `PRJ-2026-${String(i).padStart(3, '0')}`,
                "專案名稱": projName,
                "負責部門": dept,
                "專案經理 (PM)": pm,
                "開始日期": `2026-0${(i % 4) + 1}-${String((i % 20) + 1).padStart(2, '0')}`,
                "預計結束日期": `2026-0${(i % 4) + 8}-${String((i % 25) + 1).padStart(2, '0')}`,
                "專案預算 (NTD)": 600000 + (i % 10) * 150000,
                "進度 %": Number((0.10 + (i % 10) * 0.08).toFixed(2)),
                "目前狀態": (i % 10 !== 0) ? "進行中" : "規劃中",
                "主要風險與備註說明": `${conceptDesc}，目前進度符合預期，正進入第${(i % 3) + 1}階段開發與技術對接。`
            });
        }
        return data;
    }

    function generateV2(v1Data) {
        let deletedKeys = new Set(["PRJ-2026-005", "PRJ-2026-015", "PRJ-2026-035"]);
        let modifiedKeys = new Set(["PRJ-2026-002", "PRJ-2026-009", "PRJ-2026-020", "PRJ-2026-045"]);
        
        let v2Data = [];

        v1Data.forEach(proj => {
            let key = proj["專案編號"];
            if (deletedKeys.has(key)) return; // Skip deleted ones

            let newProj = JSON.parse(JSON.stringify(proj)); // Deep copy

            if (modifiedKeys.has(key)) {
                if (key === "PRJ-2026-002") {
                    newProj["進度 %"] = 0.75;
                    newProj["主要風險與備註說明"] = "易用性測試(UT)調整完畢，UI微調超前完成，現已進入UAT測試籌備階段。";
                } else if (key === "PRJ-2026-009") {
                    newProj["目前狀態"] = "暫緩";
                    newProj["主要風險與備註說明"] = "因供應商測試機台大火事件，專案無限期暫緩，等待重新評估備援方案。";
                } else if (key === "PRJ-2026-020") {
                    newProj["專案預算 (NTD)"] = 3200000;
                    newProj["主要風險與備註說明"] = "經董事會核准，因追加硬體金鑰認證設備，本專案預算追加600,000元。";
                } else if (key === "PRJ-2026-045") {
                    newProj["專案經理 (PM)"] = "黃冠宇 (Jerry)";
                    newProj["主要風險與備註說明"] = "專案由原PM辦理交接，即日起改由 Jerry 接手，確保專案無縫接軌。";
                }
            }

            // Inject dirty data
            if (key === "PRJ-2026-012") {
                newProj["專案編號"] = "PRJ-2026-012   ";
            } else if (key === "PRJ-2026-048") {
                newProj["專案編號"] = "  PRJ-2026-048";
            }

            v2Data.push(newProj);
        });

        // Add 3 additions
        v2Data.push({
            "專案編號": "PRJ-2026-051",
            "專案名稱": "集團永續淨零轉型輔導專案",
            "負責部門": "永續發展辦公室",
            "專案經理 (PM)": "林淑芬 (Sophia)",
            "開始日期": "2026-06-01",
            "預計結束日期": "2027-05-31",
            "專案預算 (NTD)": 5200000,
            "進度 %": 0.00,
            "目前狀態": "規劃中",
            "主要風險與備註說明": "委託外部顧問進行溫室氣體盤查與第三方認證之輔導合約簽訂中。"
        });
        v2Data.push({
            "專案編號": "PRJ-2026-052",
            "專案名稱": "次世代生成式AI合規與沙盒測試系統",
            "負責部門": "資訊安全處",
            "專案經理 (PM)": "黃冠宇 (Jerry)",
            "開始日期": "2026-05-15",
            "預計結束日期": "2026-11-30",
            "專案預算 (NTD)": 1750000,
            "進度 %": 0.05,
            "目前狀態": "規劃中",
            "主要風險與備註說明": "擬定大語言模型輸出安全防欄之過濾機制與驗收劇本編製。"
        });
        v2Data.push({
            "專案編號": "PRJ-2026-053",
            "專案名稱": "行銷系統CDP(顧客數據平台)第二期擴充",
            "負責部門": "行銷企劃處",
            "專案經理 (PM)": "陳雅婷 (Emily)",
            "開始日期": "2026-06-15",
            "預計結束日期": "2026-12-31",
            "專案預算 (NTD)": 2300000,
            "進度 %": 0.00,
            "目前狀態": "規劃中",
            "主要風險與備註說明": "本期重點在於即時標籤推送與線下零售ERP的即時數據打通。"
        });

        return v2Data;
    }

    const v1Data = generateV1();
    const v2Data = generateV2(v1Data);

    // Initial render headers
    columns.forEach(col => {
        let th = document.createElement("th");
        th.textContent = col;
        explorerTheadTr.appendChild(th);
    });

    // Render helper
    function renderSpreadsheet(dataset, version) {
        explorerTbody.innerHTML = "";
        
        let deletedKeys = new Set(["PRJ-2026-005", "PRJ-2026-015", "PRJ-2026-035"]);
        let modifiedKeys = new Set(["PRJ-2026-002", "PRJ-2026-009", "PRJ-2026-020", "PRJ-2026-045"]);
        let dirtyKeys = new Set(["PRJ-2026-012", "PRJ-2026-048"]);
        
        dataset.forEach(row => {
            let tr = document.createElement("tr");
            
            let keyRaw = row["專案編號"];
            let keyClean = keyRaw.trim();
            
            // Apply row-level background highlight styles
            if (version === "v1" && deletedKeys.has(keyClean)) {
                tr.classList.add("bg-deleted");
            } else if (version === "v2" && (keyClean === "PRJ-2026-051" || keyClean === "PRJ-2026-052" || keyClean === "PRJ-2026-053")) {
                tr.classList.add("bg-added");
            }

            columns.forEach(col => {
                let td = document.createElement("td");
                let val = row[col];

                // Value formatting for beautiful presentation
                if (col === "專案預算 (NTD)" && typeof val === "number") {
                    td.textContent = "$" + val.toLocaleString();
                    td.classList.add("num-val");
                } else if (col === "進度 %" && typeof val === "number") {
                    td.textContent = (val * 100).toFixed(1) + "%";
                    td.classList.add("num-val");
                } else if (col === "專案編號" || col === "開始日期" || col === "預計結束日期" || col === "目前狀態" || col === "負責部門" || col === "專案經理 (PM)") {
                    td.textContent = val;
                    td.classList.add("center-val");
                } else if (col === "主要風險與備註說明" || col === "專案名稱") {
                    td.textContent = val;
                    td.classList.add("desc-val");
                } else {
                    td.textContent = val;
                }

                // Cell-level modification highlights
                if (version === "v2" && modifiedKeys.has(keyClean)) {
                    // Specific columns that changed
                    if (keyClean === "PRJ-2026-002" && (col === "進度 %" || col === "主要風險與備註說明")) {
                        td.classList.add("bg-modified");
                    } else if (keyClean === "PRJ-2026-009" && (col === "目前狀態" || col === "主要風險與備註說明")) {
                        td.classList.add("bg-modified");
                    } else if (keyClean === "PRJ-2026-020" && (col === "專案預算 (NTD)" || col === "主要風險與備註說明")) {
                        td.classList.add("bg-modified");
                    } else if (keyClean === "PRJ-2026-045" && (col === "專案經理 (PM)" || col === "主要風險與備註說明")) {
                        // Note: PM column was structurally equal but PM note claimed change, so we highlight both to keep visual clarity.
                        td.classList.add("bg-modified");
                    }
                }

                // Cell-level dirty highlights
                if (version === "v2" && dirtyKeys.has(keyClean) && col === "專案編號") {
                    td.classList.add("bg-dirty");
                    td.title = "注意：此編號前後帶有空白字元！";
                }

                tr.appendChild(td);
            });
            explorerTbody.appendChild(tr);
        });
    }

    // Default load V1
    renderSpreadsheet(v1Data, "v1");

    // Toolbar controller hooks
    btnShowV1.addEventListener("click", () => {
        btnShowV1.classList.add("active");
        btnShowV2.classList.remove("active");
        renderSpreadsheet(v1Data, "v1");
    });

    btnShowV2.addEventListener("click", () => {
        btnShowV2.classList.add("active");
        btnShowV1.classList.remove("active");
        renderSpreadsheet(v2Data, "v2");
    });
});

