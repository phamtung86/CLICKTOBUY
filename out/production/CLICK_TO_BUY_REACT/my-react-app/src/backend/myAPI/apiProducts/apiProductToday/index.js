const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(cors());

wss.on('connection', function connection(ws) {
  console.log('Client connected');

  ws.on('message', function incoming(message) {
    console.log('Received: %s', message);
  });

  ws.on('close', function close() {
    console.log('Client disconnected');
  });
});

app.get('/api/producttoday', (req, res) => {
    const dataProductToday = {
        "exitcode" : 1,
        "data" : {
            "nItem" : 10,
            "nPage" : 1,
            "data" : [
                {
                    id: 1,
                    image: "https://hcm.fstorage.vn/images/2022/wmh_tui_rac_thsh_ma%CC%80u_den_44x56-500g-.png",
                    name: "Túi rác tự hủy sinh hoạt WinMart Home màu đen 44x56-500g",
                    unit: "Cuộn",
                    price: 39000,
                    note: "Mua 1 Cuộn được tặng 1 cuộn Túi rác tự hủy sinh hoạt WinMart Home màu đen 44x56-500g",
                    sale: ""
                },
                {
                    id: 2,
                    image: "https://hcm.fstorage.vn/images/2023/05/tuongotnho-20230526065635.png",
                    name: "Tương ớt cay vừa  Nam Dương 255g",
                    unit: "Chai",
                    price: 12000,
                    note: "Mua 2 Chai được tặng 1 chai Tương ớt cay vừa Nam Dương 255g",
                    sale: ""
                },
                {
                    id: 3,
                    image: "https://hcm.fstorage.vn/images/2022/pizza-hai-san-manna-vi-y-120g-20221007080640-og.jpg",
                    name: "Pizza hải sản Manna vị Ý 120g",
                    unit: "Gói",
                    price: 39400,
                    note: "Mua 2 Gói được tặng 1 gói Pizza hải sản Manna vị Ý 120g",
                    sale: ""
                },
                {
                    id: 4,
                    image: "https://hcm.fstorage.vn/images/2022/10183061-g1.jpg",
                    name: "Xúc xích Ponnie dinh dưỡng thịt heo 4*70g",
                    unit: "Gói",
                    price: 39400,
                    note: "",
                    sale: ""
                },
                {
                    id: 5,
                    image: "https://hcm.fstorage.vn/images/2022/winmart-home-khan-giay-rut-250-to-2-lop_5dd2d487-1a13-4590-842f-ff9e8db19137-og.jpg",
                    name: "Khăn giấy rút 250 tờ 2 lớp WinMart Home",
                    unit: "Gói",
                    price: 22900,
                    note: "Mua 2 Gói được tặng 1 gói Khăn giấy rút 250 tờ 2 lớp WinMart Home",
                    sale: ""
                },
                {
                    id: 6,
                    image: "https://hcm.fstorage.vn/images/2022/mat-na-ariul-7days-khang-viem-chiet-xuat-tra-23ml.jpg",
                    name: "Mặt nạ  Ariul 7days kháng viêm chiết xuất trà 23ml",
                    unit: "Gói",
                    price: 28000,
                    note: "Mua 1 Gói được tặng 1 gói Mặt nạ  Ariul 7days kháng viêm chiết xuất trà 23ml",
                    sale: ""
                },
                {
                    id: 7,
                    image: "https://hcm.fstorage.vn/images/2023/07/rojukiss-mat-na-giup-giam-lcl-to-25ml-20230727064745.jpg",
                    name: "Mặt nạ Rojukiss giúp giảm lỗ chân lông  to 25ml",
                    unit: "Gói",
                    price: 39000,
                    note: "Mua 2 Gói được tặng 1 gói Mặt nạ Rojukiss giúp giảm lỗ chân lông to 25ml",
                    sale: ""
                },
                {
                    id: 8,
                    image: "https://hcm.fstorage.vn/images/2023/07/lc-food-xuc-xich-pho-mai-200g-20230727063835.jpg",
                    name: "Xúc xích phô mai LC Food 200g",
                    unit: "Gói",
                    price: 55000,
                    note: "Mua 2 Gói được tặng 1 gói Xúc xích phô mai LC Food 200g",
                    sale: ""
                },
                {
                    id: 9,
                    image: "https://hcm.fstorage.vn/images/2023/04/vietquat-2--20230418043737.png",
                    name: "Trà việt quất TVT chai 470ml",
                    unit: "Chai",
                    price: 14300,
                    note: "Mua 2 Chai được tặng 1 chai Trà việt quất TVT chai 470ml",
                    sale: ""
                },
                {
                    id: 10,
                    image: "https://hcm.fstorage.vn/images/2022/162427595839710323687-hop-omachi-mo-khoai-toy-xot-bu-ham-93gr-og.jpg",
                    name: "Thùng 24 hộp mì khoai tây Omachi sốt bò hầm 68g/70g",
                    unit: "Thùng",
                    price: 251800,
                    note: "Mua 3 Hộp được tặng 1 hộp Mì ly ăn liền khoai tây Omachi xốt bò hầm​​​​​​​ 68g",
                    sale: ""
                }

            ]
        },
        "message" : "Get all items successful"
    }
    res.status(200).json(dataProductToday)
})

const PORT = process.env.PORT || 5004;

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});