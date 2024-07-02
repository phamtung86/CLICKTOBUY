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

app.get('/api/productsaletet', (req, res) => {
    const dataProductSaleTet = {
        'exitcode': 1,
        "data": {
            "nItem": 20,
            "nPage": 1,
            "data": [

                {
                    id: 11,
                    image: "https://hcm.fstorage.vn/images/2023/02/tuong-ot-chin-su-20230224043051.jpg",
                    name: "Nước tương tỏi ớt Chinsu 330ml",
                    sale: "20",
                    price: 18800,
                    unit: "Chai",
                    note: ""
                },
                {
                    id: 12,
                    image: "https://hcm.fstorage.vn/images/2023/02/5511ce5d5435da8a842990924047b804.jpg",
                    name: "TEA+ oloong vị chanh 350ml",
                    sale: "34",
                    price: 180900,
                    unit: "Thùng",
                    note: ""
                },
                {
                    id: 13,
                    image: "https://hcm.fstorage.vn/images/2023/05/2-20230518040220-thumb-1.jpg",
                    name: "Phô mai vuông vị sữa Belcube gói 78g",
                    sale: "6",
                    price: 47300,
                    unit: "Hộp",
                    note: ""
                },
                {
                    id: 14,
                    image: "https://hcm.fstorage.vn/images/2022/a2efd179-63e7-4dbc-bbb5-6d6f5a44c1b9_20210908073358-og-thumb-1.jpg",
                    name: "Nước giải khát Coca-Cola Zero chai nhựa lốc 6 x 1,5 lít",
                    sale: "5",
                    price: 117000,
                    unit: "Gói 6",
                    note: ""
                },
                {
                    id: 15,
                    image: "https://hcm.fstorage.vn/images/2022/e3a964b6-5e60-405a-9830-3af7bd99e573_20210827073738-og-thumb-1.jpg",
                    name: "Sữa chua Vinamilk trái cây 100g",
                    sale: "6",
                    price: 7800,
                    unit: "Hộp",
                    note: ""
                },
                {
                    id: 16,
                    image: "https://hcm.fstorage.vn/images/2022/7cf24c1afe1e674372207b60fda636bd_89d0bcd4-5918-4e17-ad6e-9c3342d261e7-og-thumb-1.jpg",
                    name: "Ngũ cốc ăn sáng Milo hộp 170g",
                    sale: "21",
                    price: 62800,
                    unit: "Hộp",
                    note: ""
                },
                {
                    id: 17,
                    image: "https://hcm.fstorage.vn/images/2023/04/kun-sua-chua-uong-huong-cam-180ml_4-goi-4-20230410013450-thumb-1.png",
                    name: "Sữa chua uống hương cam Kun lốc 4 hộp x 180ml",
                    sale: "20",
                    price: 30900,
                    unit: "Gói 4",
                    note: ""
                },
                {
                    id: 18,
                    image: "https://hcm.fstorage.vn/images/2023/05/7-20230519021131-thumb-1.jpg",
                    name: "Phô mai vị hành, ham Belcube gói 78g",
                    sale: "6",
                    price: 47300,
                    unit: "Hộp",
                    note: ""
                },
                {
                    id: 19,
                    image: "https://hcm.fstorage.vn/images/2023/04/ngoc-nuong-gao-st-25-dac-san-3kg-vns-1--20230426095943-thumb-1.png",
                    name: "Gạo Ngọc Nương ST 25 đặc sản 3Kg",
                    sale: "",
                    price: 89900,
                    unit: "Gói",
                    note: ""
                },
                {
                    id: 20,
                    image: "https://hcm.fstorage.vn/images/2022/162427348903210011252-cha-loc-6-chai-nuoc-giai-khot-huong-chanh-sprite-390ml-og-thumb-1.jpg",
                    name: "Nước giải khát huong chanh Sprite chai 1.5L",
                    sale: "21",
                    price: 20200,
                    unit: "Chai",
                    note: ""
                }

            ]
        },
        "message": "Get all items successful"
    }
    res.status(200).json(dataProductSaleTet);
});
const PORT = process.env.PORT || 5003;

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
