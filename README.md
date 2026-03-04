** Bitespeed Identity Reconciliation API**

A backend service built with Node.js, Express, TypeScript, Prisma, and MySQL that identifies and reconciles customer contacts based on email and phone number.

Deployed live on Railway.

**🌐 Live API**
https://bitespeed-identity-production-96fd.up.railway.app

**📌 Problem Statement**

Given a request containing an email and/or phoneNumber, the system:

Identifies if the contact already exists

Links related contacts

Maintains primary and secondary contact relationships

Returns consolidated contact information

**🛠 Tech Stack**

Node.js

Express.js

TypeScript

Prisma ORM

MySQL

Railway (Deployment)

**📂 Project Structure**

bitespeed-identity/

│
├── prisma/
│   ├── schema.prisma
│   └── migrations/

│

├── src/

│   ├── controllers/

│   │   └── identify.controller.ts

│   │

│   ├── services/

│   │   └── contact.service.ts

│   │

│   ├── routes/

│   │   └── identify.routes.ts

│   │

│   ├── app.ts

│   └── server.ts

│

├── package.json

├── tsconfig.json

└── README.md

**⚙️ Setup Instructions (Local)**
**1️⃣ Clone Repository**
git clone https://github.com/PavanKumarM761942/bitespeed-identity.git
cd bitespeed-identity
**2️⃣ Install Dependencies**
npm install
**3️⃣ Setup Environment Variables**

Create a .env file:

DATABASE_URL="mysql://root:password@localhost:3306/bitespeed"
4️⃣** Run Prisma Migration**
npx prisma migrate dev
**5️⃣ Start Server**

Development mode:

npm run dev

Production build:

npm run build
npm start**
📡 API Endpoint**
**POST /identify**
Request Body
{
  "email": "user@example.com",
  "phoneNumber": "1234567890"
}
Response Format
{
  "contact": {
    "primaryContactId": 1,
    "emails": ["user@example.com"],
    "phoneNumbers": ["1234567890"],
    "secondaryContactIds": []
  }
}
**🗄 Database Schema (Prisma)
**
Main model:

id

phoneNumber

email

linkedId

linkPrecedence (primary | secondary)

createdAt

updatedAt

deletedAt

🚀 Deployment

This application is deployed on Railway with:

MySQL Database

Environment variables configured

prisma migrate deploy used for production schema sync

**🔥 Key Features
**
Identity reconciliation logic

Primary & Secondary contact linking

Production-ready environment setup

Type-safe database queries using Prisma

Fully deployed backend service
