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
app.get('/api/menutitle', (req, res) => {
    const dataMenuTitle = {
        'exitCode': 1,
        'data' : {
            'nItem': 20,
            'nPage': 1,
            'data': [
                {
                    'id': 1,
                    'name': 'Sản phẩm khuyết mại'
                },
                {
                    'id': 2,
                    'name': 'Ưu đãi hội viên'
                },
                {
                    'id': 3,
                    'name': 'Sữa các loại'
                },
                {
                    'id': 4,
                    'name': 'Rau - Củ - Trái Cây'
                },
                {
                    'id': 5,
                    'name': 'Hóa Phẩm - Tẩy Rửa'
                },
                {
                    'id': 6,
                    'name': 'Chăm sóc cá nhân'
                },
                {
                    'id': 7,
                    'name': 'Thịt - Hải Sản Tươi'
                },
                {
                    'id': 8,
                    'name': 'Bánh Kẹo'
                },
                {
                    'id': 9,
                    'name': 'Đồ uống có cồn'
                },
                {
                    'id': 10,
                    'name': 'Đồ Uống - Giải Khát'
                },
                {
                    'id': 11,
                    'name': 'Mì - Thực Phẩm Ăn Liền'
                },
                {
                    'id': 12,
                    'name': 'Thực Phẩm Khô'
                },
                {
                    'id': 13,
                    'name': 'Thực Phẩm Chế Biến'
                },
                {
                    'id': 14,
                    'name': 'Gia Vị'
                },
                {
                    'id': 15,
                    'name': 'Thực Phẩm Đông Lạnh'
                },
                {
                    'id': 16,
                    'name': 'Trứng - Đậu Hũ'
                },
                {
                    'id': 17,
                    'name': 'Chăm Sóc Bé'
                },
                {
                    'id': 18,
                    'name': 'Đồ Dùng Gia Đình'
                },
                {
                    'id': 19,
                    'name': 'Điện Gia Dụng'
                },
                {
                    'id': 20,
                    'name': 'Văn Phòng Phẩm - Đồ Chơi'
                }
            ]
        },
        'message' : 'Get all item successed'
    };
    res.status(200).json(dataMenuTitle)
})

app.get('/api/menucontent', (req, res) => {
    const dataMenuContent = {
        'exitcode' : 1,
        'data' : {
            'nItem' : 20,
            'nPage' : 1,
            'data' : [
                {
                    'id' : 1,
                    'parentCode' : 3,
                    'image': 'https://hcm.fstorage.vn/images/2023/06/artboard-20-20230608080317.gif',
                    'name' : [
                        {
                            'id' : 1,
                            'name' : 'Sữa tươi',
                        },
                        {
                            'id' : 2,
                            'name' : 'Sữa hạt - Sữa đậu'
                        },
                        {
                            'id' : 3,
                            'name' : 'Sữa bột'
                        },
                        {
                            'id' : 4,
                            'name' : 'Bơ sữa - Phô mai'
                        },
                        {
                            'id' : 5,
                            'name' : 'Sữa đặc'
                        },
                        {
                            'id' : 6,
                            'name' : 'Sữa chua - Váng sữa'
                        }
                    ]
                },
                {
                    'id' : 2,
                    'parentCode' : 4,
                    'image' : 'https://hcm.fstorage.vn/images/2023/06/artboard-13-20230608080756.gif',
                    'name' : [
                        {
                            'id' : 1,
                            'name' : 'Rau'
                        },
                        {
                            'id' : 2,
                            'name' : 'Củ'
                        },
                        {
                            'id' : 3,
                            'name' : 'Trái cây'
                        }
                    ]
                },
                {
                    'id' : 3,
                    'parentCode' : 5,
                    'image' : '	https://hcm.fstorage.vn/images/2023/06/artboard-15-20230608080726.gif',
                    'name' : [
                        {
                            'id' : 1,
                            'name' : 'Bình xịt côn trùng'
                        },
                        {
                            'id' : 2,
                            'name' : 'Nước giặt'
                        },
                        {
                            'id' : 3,
                            'name' : 'Nước lau sàn - Lau kính'
                        },
                        {
                            'id' : 4,
                            'name' : 'Nước rửa chén'
                        },
                        {
                            'id' : 5,
                            'name' : 'Nước tẩy rửa'
                        },
                        {
                            'id' : 6,
                            'name' : 'Nước xả'
                        }
                    ]
                },
                {
                    'id' : 4,
                    'parentCode' : 6 ,
                    'image' : 'https://hcm.fstorage.vn/images/2023/06/artboard-8-20230608080344.gif'	,
                    'name' : [
                        {
                            'id' :1 ,
                            'name' : 'Chăm sóc tóc'
                        },
                        {
                            'id' : 2,
                            'name' : 'Chăm sóc da'
                        },
                        {
                            'id' : 3,
                            'name' : 'Chăm sóc răng miệng'
                        },
                        {
                            'id' : 4,
                            'name' : 'Chăm sóc phụ nữ'
                        },
                        {
                            'id' : 5,
                            'name' : 'Chăm sóc cá nhân khác'
                        },
                        {
                            'id' : 6,
                            'name' : 'Mỹ phẩm'
                        },
                        {
                            'id' : 7,
                            'name' : 'Khăn giấy - Khăn ướt'
                        },
                       
                    ]
                },
                {
                    'id' : 5,
                    'parentCode' :7 ,
                    'image' : 'https://hcm.fstorage.vn/images/2023/06/artboard-16-20230608080047.gif'	,
                    'name' : [
                        {
                            'id' : 1,
                            'name' : 'Thịt'
                        },
                        {
                            'id' : 2,
                            'name' : 'Hải sản'
                        },
                       
                    ]
                },
                {
                    'id' : 6,
                    'parentCode' :8 ,
                    'image' : 'https://hcm.fstorage.vn/images/2023/06/artboard-1-20230608080249.gif'	,
                    'name' : [
                        {
                            'id' : 1,
                            'name' : 'Bánh xốp - Bánh quy'
                        },
                        {
                            'id' : 2,
                            'name' : 'Kẹo - Chocolate'
                        },
                        {
                            'id' : 3,
                            'name' : 'Bánh snack'
                        },
                        {
                            'id' : 4,
                            'name' : 'Hạt - Trái cây xấy khô'
                        },
                       
                    ]
                },
                {
                    'id' : 7,
                    'parentCode' : 9,
                    'image' : 'https://hcm.fstorage.vn/images/2023/06/artboard-4-20230608080137.gif',
                    'name' : [
                        {
                            'id' : 1,
                            'name' : 'Bia'
                        },
                       
                    ]
                },
                {
                    'id' : 8,
                    'parentCode' :10 ,
                    'image' : 'https://hcm.fstorage.vn/images/2023/06/artboard-3-20230608080213.gif',
                    'name' : [
                        {
                            'id' :1 ,
                            'name' : 'Cà phê'
                        },
                        {
                            'id' : 2,
                            'name' : 'Nước suối'
                        },
                        {
                            'id' :3 ,
                            'name' : 'Nước ngọt'
                        },
                        {
                            'id' : 4,
                            'name' : 'Trà - Các loại khác'
                        },
                       
                    ]
                },
                {
                    'id' : 9,
                    'parentCode' : 11 ,
                    'image' : '	https://hcm.fstorage.vn/images/2023/06/artboard-18-20230608080027.gif'	,
                    'name' : [
                        {
                            'id' : 1,
                            'name' : 'Mì'
                        },
                        {
                            'id' : 2,
                            'name' : 'Miến - Hủ tíu - Bánh canh'
                        },
                        {
                            'id' : 3,
                            'name' : 'Phở'
                        },
                        {
                            'id' : 4,
                            'name' : 'Bún'
                        },
                       
                    ]
                },
                {
                    'id' : 10,
                    'parentCode' : 12,
                    'image' : 'https://hcm.fstorage.vn/images/2023/06/artboard-10-20230608075857.gif',
                    'name' : [
                        {
                            'id' : 1,
                            'name' : 'Gạo - Nông sản khô'
                        },
                        {
                            'id' : 2,
                            'name' : 'Ngũ cốc - Yến mạch'
                        },
                        {
                            'id' : 3,
                            'name' : 'Thực phẩm đóng hộp'
                        },
                        {
                            'id' : 4,
                            'name' : 'Rong biển - Tảo biển'
                        },
                        {
                            'id' : 5,
                            'name' : 'Bột các loại'
                        },
                        {
                            'id' : 6,
                            'name' : 'Thực phẩm chay'
                        },
                       
                    ]
                },
                {
                    'id' : 11,
                    'parentCode' :13 ,
                    'image' : 'https://hcm.fstorage.vn/images/2023/06/artboard-7-20230608075830.gif',
                    'name' : [
                        {
                            'id' :1 ,
                            'name' : 'Bánh mì'
                        },
                        {
                            'id' :2 ,
                            'name' : 'Xúc xích - Thịt nguội'
                        },
                        {
                            'id' : 3,
                            'name' : 'Bánh bao'
                        },
                        {
                            'id' : 4,
                            'name' : 'Kim chi'
                        },
                        {
                            'id' : 5,
                            'name' : 'Thực phẩm chế biến khác'
                        },
                       
                    ]
                },
                {
                    'id' : 12,
                    'parentCode' :14 ,
                    'image' : 'https://hcm.fstorage.vn/images/2023/06/artboard-12-20230608075800.gif',
                    'name' : [
                        {
                            'id' :1 ,
                            'name' : 'Dầu ăn'
                        },
                        {
                            'id' :2 ,
                            'name' : 'Nước mắm - Nước chấm'
                        },
                        {
                            'id' : 3,
                            'name' : 'Đường'
                        },
                        {
                            'id' : 4,
                            'name' : 'Nước tương'
                        },
                        {
                            'id' : 5,
                            'name' : 'Hạt nêm'
                        },
                        {
                            'id' : 6,
                            'name' : 'Tương các loại'
                        },
                        {
                            'id' : 7,
                            'name' : 'Gia vị khác'
                        },
                       
                    ]
                },
                {
                    'id' : 13,
                    'parentCode' : 15,
                    'image' : 'https://hcm.fstorage.vn/images/2023/06/artboard-9-20230608075737.gif',
                    'name' : [
                        {
                            'id' : 1,
                            'name' : 'Hải sản đông lạnh'
                        },
                        {
                            'id' : 2,
                            'name' : 'Thịt đông lạnh'
                        },
                        {
                            'id' : 3,
                            'name' : 'Chả giò'
                        },
                        {
                            'id' : 4,
                            'name' : 'Cá - Bò viên'
                        },
                        {
                            'id' : 5,
                            'name' : 'Thực phẩm đông lạnh khác'
                        },
                       
                    ]
                },
                {
                    'id' : 14,
                    'parentCode' :16 ,
                    'image' : 'https://hcm.fstorage.vn/images/2023/06/artboard-6-20230608075656.gif'	,
                    'name' : [
                        {
                            'id' :1 ,
                            'name' : 'Trứng'
                        },
                        {
                            'id' : 2,
                            'name' : 'Đậu hũ'
                        },
                       
                    ]
                },
                {
                    'id' : 15,
                    'parentCode' :17 ,
                    'image' : 'https://hcm.fstorage.vn/images/2023/06/artboard-2-20230608075639.gif'	,
                    'name' : [
                        {
                            'id' : 1,
                            'name' : 'Sữa bột - Sữa dinh dưỡng'
                        },
                        {
                            'id' : 2,
                            'name' : 'Tã - Bỉm'
                        },
                        {
                            'id' : 3,
                            'name' : 'Sữa tắm - Gội cho bé'
                        },
                        {
                            'id' : 4,
                            'name' : 'Chăm sóc cá nhân cho bé'
                        },
                       
                    ]
                },
                {
                    'id' : 16,
                    'parentCode' : 18,
                    'image' : 'https://hcm.fstorage.vn/images/2023/06/artboard-11-20230608075616.gif',
                    'name' : [
                        {
                            'id' : 1,
                            'name' : 'Đồ dùng phòng ngủ'
                        },
                        {
                            'id' : 2,
                            'name' : 'Đồ dùng trong nhà'
                        },
                        {
                            'id' : 3,
                            'name' : 'Dụng cụ sửa chữa'
                        },
                        {
                            'id' : 4,
                            'name' : 'Đồ dùng nhà bếp'
                        },
                        {
                            'id' : 5,
                            'name' : 'Thiết bị dùng điện trong nhà'
                        },
                        {
                            'id' :6 ,
                            'name' : 'Vệ sinh nhà cửa'
                        },
                       
                    ]
                },

                
            ]
        }
    }
    res.status(200).json(dataMenuContent)
})


const PORT = process.env.PORT || 5006;

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
