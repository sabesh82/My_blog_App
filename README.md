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
git clone https://github.com/sabesh82/My_blog_App.git
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
![Screenshot (1769)](https://github.com/user-attachments/assets/5004205a-25bf-4b94-b6df-d7aa3718c974)


## RegisterPage
![Screenshot (1772)](https://github.com/user-attachments/assets/65eecfa4-afd3-4547-9172-e0c31a6cd03b)


## BlogCreationPage
![Screenshot (1771)](https://github.com/user-attachments/assets/36ff1f07-6487-42a7-88e2-11d8fcb9a93c)


## Blogs_Page
![Screenshot (1770)](https://github.com/user-attachments/assets/c9406609-8013-4392-9da5-3b3d17b2de6f)







