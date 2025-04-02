# MedCompass

MedCompass is a health-focused web application built with React and Vite. It makes patient follow-up simpler and stress free. It helps in automating scheduled calls to patients after they’ve been discharged, asks the right questions based on their health condition, and gently checks how they’re doing. Everything is tracked in a clean, easy to use dashboard, giving healthcare teams a clear picture of each patient’s recovery, all without the endless phone calls and manual check-ins.

## 🛠️ Tech Stack Used

![Twilio](https://img.shields.io/badge/Twilio-%23F22F46.svg?style=flat&logo=twilio&logoColor=white)
![ReactJS](https://img.shields.io/badge/React-%2361DAFB.svg?style=flat&logo=react&logoColor=white)
![NodeJS](https://img.shields.io/badge/Node.js-%23339933.svg?style=flat&logo=node.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-%2306B6D4.svg?style=flat&logo=tailwindcss&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%2347A248.svg?style=flat&logo=mongodb&logoColor=white)
![REST API](https://img.shields.io/badge/REST%20API-%232c3e50.svg?style=flat&logo=api&logoColor=white)


---

## Installation (Frontend)

To run the MedCompass forntend locally, please follow these steps:

### 1. Clone the repository
```
git clone https://github.com/omkar-79/medcompass.git
cd frontend
```

### 2. Check Node.js and npm versions

Before proceeding, make sure that **Node.js** (v14 or higher) and **npm** are installed on your machine.

- Check your **Node.js** version:

  ```bash
  node -v
  npm -v

### 3. Install dependency

- Do npm install in /src folder

   ```bash
   npm install

### 4. Run the frontend project

- Do npm run dev

   ```bash
   npm run dev


## Installation (API Server)

To run the MedCompass APIs locally, please follow these steps:

### 1. Go to api directory
```
cd ..
cd api
```

### 2. Check Node.js and npm versions

Before proceeding, make sure that **Node.js** (v14 or higher) and **npm** are installed on your machine.

- Check your **Node.js** version:

  ```bash
  node -v
  npm -v

### 3. Install dependency

- Do npm install in /app folder

   ```bash
   npm install

### 4. Run the APIs

- Do add the environmental variables for mongodb in .env

### 5. Run the APIs

- Start the server

   ```bash
   node server.js

