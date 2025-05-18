
# Eventify – Backend

This is the backend for **Eventify**, built using **Node.js**, **Express**, **PostgreSQL**, and **Sequelize** ORM.

---

## 🛠️ Tech Stack

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Sequelize](https://sequelize.org/)
- [Passport.js](http://www.passportjs.org/) (for JWT authentication)
- [dotenv](https://www.npmjs.com/package/dotenv) for environment configuration

---

## 📦 Getting Started

Follow these steps to set up and run the backend locally.

### 1. Clone the Repository

```bash
git clone https://github.com/bhalani-madhav/Eventify-Backend.git
cd Eventify-Backend
````

---

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Setup `.env` File

Create a `.env` file in the root directory and add the following content (modify the values as per your setup):

```env
JWT_SECRET=YOUR_JWT_SECRET
PORT=YOUR_PORT_NO
USERNAME=YOUR_DB_USERNAME
PASSWORD=YOUR_DB_PASSWORD
DB_NAME=YOUR_DB_NAME
HOST=YOUR_HOST
```

> ⚠️ **Never commit your `.env` file to GitHub.** Ensure `.env` is listed in your `.gitignore`.

---

### 4. Configure the Database

Ensure PostgreSQL is running locally, and that your credentials in the `.env` file are correct.

Then create the database using Sequelize CLI:

```bash
npx sequelize db:create
```

---

### ⚠️ Important: Initialize Tables

Before starting the server for the first time, run the following command **once** to initialize all tables:

```bash
node init-tables.js
```

> ⚠️ This executes `sequelize.sync({ force: true })`, which drops and recreates all tables. Avoid running this on production environments.

---

### 5. Start the Server

```bash
nodemon app.js
```

The server should now be running at [http://localhost:YOUR_PORT_NO](http://localhost:3000)

---

## 🔐 Authentication

JWT-based authentication is implemented using Passport.js. Protected routes require a valid JWT in the `Authorization` header.

---

## 📡 API Endpoints

### 👤 Users

* **Register**
  `POST /register`
  Create a new user account.

* **Login**
  `POST /login`
  Authenticate user and receive a JWT.

* **Logout**
  `POST /logout` *(Protected)*
  Logs out the authenticated user.

---

### ⏰ Reminders *(All routes protected)*

* **Create Reminder**
  `POST /reminders/`
  Add a new reminder.

* **List Reminders (Pagination)**
  `GET /reminders/`
  Fetch reminders with server-side pagination.

* **Edit Reminder**
  `PUT /reminders/:id`
  Update an existing reminder by ID.

* **Delete Reminder**
  `DELETE /reminders/:id`
  Remove a reminder by ID.

* **Get Reminder by ID**
  `GET /reminders/:id`
  Fetch a specific reminder's details.


---

## 📬 Feedback

Found a bug or have a suggestion? Feel free to open an issue or contribute!


