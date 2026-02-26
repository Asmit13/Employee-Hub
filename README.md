# Employee Hub 🚀

Employee Hub is a full-stack web application built to manage employees efficiently within an organization.  
It allows admins to manage employee records, track details, and maintain structured data in a clean and user-friendly interface.

---

## 🌐 Image
<img width="1440" height="802" alt="Screenshot 2569-02-25 at 4 19 27 PM" src="https://github.com/user-attachments/assets/0165663a-0d36-4a6c-a46b-dda2b06024f2" />
---

## 📌 Features

- Add, update, and delete employee records
- View complete employee details
- Secure authentication system
- Role-based access (Admin/User)
- Responsive UI for all devices
- Clean and structured dashboard layout

---

## 🛠 Tech Stack

**Frontend:**
- React.js
- Tailwind CSS / CSS
- Axios

**Backend:**
- Node.js
- Express.js

**Database:**
- MongoDB (Mongoose)

**Other Tools:**
- JWT Authentication
- Git & GitHub

---

## 📂 Project Structure

```
Employee-Hub/
│
├── client/        # Frontend (React)
├── server/        # Backend (Node + Express)
├── models/        # Database Schemas
├── routes/        # API Routes
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Asmit13/Employee-Hub.git
cd Employee-Hub
```

### 2️⃣ Install Backend Dependencies

```bash
cd server
npm install
```

### 3️⃣ Install Frontend Dependencies

```bash
cd client
npm install
```

### 4️⃣ Environment Variables

Create a `.env` file inside the `server` folder and add:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 5️⃣ Run the Application

Run Backend:

```bash
cd server
npm start
```

Run Frontend:

```bash
cd client
npm start
```

The app will run on:
```
Frontend: http://localhost:3000
Backend: http://localhost:5000
```

---

## 🔐 Authentication

- JWT-based authentication
- Protected routes for secure access
- Password hashing for security

---

## 📈 Future Improvements

- Pagination & search functionality
- Employee performance tracking
- Attendance management module
- Cloud deployment (AWS / Render / Vercel)

---

## 🤝 Contribution

Contributions are welcome.  
If you'd like to improve the project:

1. Fork the repository  
2. Create a new branch  
3. Commit your changes  
4. Open a Pull Request  

---

## 📄 License

This project is open-source and available under the MIT License.

---

## 👨‍💻 Author

**Asmit Aditya Singh**  
GitHub: https://github.com/Asmit13  

---

⭐ If you found this project helpful, please give it a star!
