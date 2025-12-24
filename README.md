# AI Chat Search

Một ứng dụng chat tìm kiếm thông tin sử dụng AI, được xây dựng với Node.js, Express và MongoDB.

## Tính năng

- 💬 Giao diện chat thân thiện
- 🔍 Tìm kiếm thông tin thông minh
- 📱 Responsive trên mọi thiết bị
- 🗄️ Lưu trữ dữ liệu với MongoDB
- 🔐 Admin panel quản lý

## Yêu cầu

- Node.js 14+
- MongoDB Atlas account

## Cài đặt

1. Clone repository:
```bash
git clone https://github.com/yourusername/ai-chat-search.git
cd ai-chat-search
```

2. Cài đặt dependencies:
```bash
npm install
```

3. Tạo file `.env`:
```bash
cp .env.example .env
```

4. Thêm MongoDB connection string vào `.env`:
```
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/database
```

5. Chạy server:
```bash
npm start
```

6. Truy cập tại `http://localhost:8080`

## Deploy lên Vercel

1. Push code lên GitHub
2. Vào [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "Add New" → "Project"
4. Import GitHub repository
5. Thêm environment variables:
   - `MONGO_URL`: Connection string MongoDB
6. Click "Deploy"

## Cấu trúc thư mục

```
├── index.html      # Trang chính chat
├── admin.html      # Trang quản lý
├── ai-chat-search.html  # Trang khác
├── server.js       # Server backend
├── package.json    # Dependencies
├── vercel.json     # Cấu hình Vercel
└── .env.example    # Template environment variables
```

## API Endpoints

- `GET /api/data` - Lấy tất cả dữ liệu
- `POST /api/data` - Thêm dữ liệu mới
- `DELETE /api/data/:id` - Xóa dữ liệu

## License

MIT
