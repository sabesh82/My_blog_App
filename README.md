# 📝 EchoWrite - Blog Application

EchoWrite is a dynamic blog platform where users can create, view, and explore insightful blog posts. Built with modern web technologies, this app offers user authentication, blog creation, search, pagination, and a beautiful UI powered by Tailwind CSS.

## 🔧 Tech Stack

- **Frontend**: React 19, Next.js 15
- **Styling**: Tailwind CSS 4
- **Backend**: Next.js API routes
- **Database**: MongoDB
- **ORM**: Prisma ORM
- **Authentication**: JWT with Cookies
- **Deployment**: Vercel (optional)

---

## 📌 Features

- 🔐 User Authentication (Register, Login, Logout)
- 📝 Create, View Blogs
- 🔍 Search Blogs (with debounced input)
- 📄 Pagination for blog listing
- 🧠 Token-based Route Protection
- 🪄 Responsive & Clean UI

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/echowrite.git
cd echowrite
````
### 2. Install dependencies
```bash
npm install
# or
yarn install
```
### 3. Setup environment variables
```bash
DATABASE_URL="your-mongodb-connection-url"
JWT_SECRET="your-secret-key"
NEXT_PUBLIC_API_URL="your-baseApi-url"
```

### 4. Prisma setup
```bash
npx prisma generate
npx prisma db push
```

### 5. Run the development server
```bash
npm run dev
```


## homePage
![Screenshot (1762)](https://github.com/user-attachments/assets/c13c9e52-6057-4503-9d99-929c5d921bfe)

## RegisterPage
![Screenshot (1763)](https://github.com/user-attachments/assets/9500ee20-d351-4649-9783-dae7fce8b2fd)

## BlogCreationPage
![Screenshot (1765)](https://github.com/user-attachments/assets/5e7a02d5-e21b-4302-8adb-92a88aa75440)

##Blogs_Page
![Screenshot (1764)](https://github.com/user-attachments/assets/5e4f7a96-e5d2-462a-b73e-4b38215e47cc)






