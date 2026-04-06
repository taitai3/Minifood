# 🍜 Mini Food Ordering System

Hệ thống đặt món ăn nội bộ theo kiến trúc Service-Based Architecture.

## Kiến trúc

```
Frontend (3000) → API Gateway (8080) → User Service (3001)
                                     → Food Service (3002)
                                     → Order Service (3003)
                                     → Payment Service (3004)
```

## Yêu cầu

- Node.js >= 16
- MariaDB / MySQL đang chạy
- npm hoặc yarn

---

## Bước 1: Khởi tạo Database

Đăng nhập MariaDB và chạy:

```sql
mysql -u root -p < database/init.sql
```

Hoặc copy nội dung file `database/init.sql` và chạy trong MySQL Workbench / DBeaver.

---

## Bước 2: Cấu hình .env

Mỗi service có file `.env` riêng. Mặc định dùng:
- Host: `localhost`, Port: `3306`
- User: `root`, Password: `root`

Chỉnh sửa nếu cần trong từng thư mục service.

---

## Bước 3: Cài dependencies và chạy từng service

Mở **5 terminal riêng biệt**:

### Terminal 1 - User Service
```bash
cd user-service
npm install
npm run dev
# Running on http://localhost:3001
```

### Terminal 2 - Food Service
```bash
cd food-service
npm install
npm run dev
# Running on http://localhost:3002
```

### Terminal 3 - Order Service
```bash
cd order-service
npm install
npm run dev
# Running on http://localhost:3003
```

### Terminal 4 - Payment Service
```bash
cd payment-service
npm install
npm run dev
# Running on http://localhost:3004
```

### Terminal 5 - API Gateway
```bash
cd api-gateway
npm install
npm run dev
# Running on http://localhost:8080
```

### Terminal 6 - Frontend
```bash
cd frontend
npm install
npm start
# Running on http://localhost:3000
```

---

## Bước 4: Test API với Postman

Import file `postman/MiniFood.postman_collection.json` vào Postman.

### Flow test thủ công:

1. **Đăng ký user**
```
POST http://localhost:8080/api/users/register
{ "username": "alice", "password": "123456" }
```

2. **Đăng nhập**
```
POST http://localhost:8080/api/users/login
{ "username": "alice", "password": "123456" }
```

3. **Xem danh sách món**
```
GET http://localhost:8080/api/foods
```

4. **Tạo đơn hàng**
```
POST http://localhost:8080/api/orders
{ "userId": 1, "items": [{"foodId": 1, "quantity": 2}, {"foodId": 3, "quantity": 1}] }
```

5. **Thanh toán**
```
POST http://localhost:8080/api/payments
{ "orderId": 1, "userId": 1, "method": "cash" }
```

6. **Xem thông báo**
```
GET http://localhost:8080/api/notifications?userId=1
```

---

## Health Check

```
GET http://localhost:3001/health  → user-service
GET http://localhost:3002/health  → food-service
GET http://localhost:3003/health  → order-service
GET http://localhost:3004/health  → payment-service
GET http://localhost:8080/health  → api-gateway
```

---

## Cấu trúc thư mục

```
mini-food-ordering/
├── user-service/
│   └── src/
│       ├── config/database.js
│       ├── models/User.js
│       ├── controllers/userController.js
│       ├── routes/userRoutes.js
│       ├── middleware/logger.js
│       └── index.js
├── food-service/
│   └── src/
│       ├── config/database.js
│       ├── models/Food.js
│       ├── controllers/foodController.js
│       ├── routes/foodRoutes.js
│       ├── seeders/foodSeeder.js
│       └── index.js
├── order-service/
│   └── src/
│       ├── config/database.js
│       ├── models/Order.js + OrderItem.js
│       ├── controllers/orderController.js
│       ├── routes/orderRoutes.js
│       ├── utils/serviceClient.js  ← retry logic
│       └── index.js
├── payment-service/
│   └── src/
│       ├── config/database.js
│       ├── models/Payment.js + Notification.js
│       ├── controllers/paymentController.js
│       ├── routes/paymentRoutes.js
│       └── index.js
├── api-gateway/
│   └── src/index.js  ← proxy tất cả services
├── frontend/
│   └── src/
│       ├── api/axios.js
│       ├── context/AuthContext.js + CartContext.js
│       ├── components/Navbar.js
│       ├── pages/LoginPage.js
│       ├── pages/RegisterPage.js
│       ├── pages/FoodListPage.js
│       ├── pages/CartPage.js
│       ├── pages/OrdersPage.js
│       └── App.js
├── database/init.sql
└── postman/MiniFood.postman_collection.json
```
