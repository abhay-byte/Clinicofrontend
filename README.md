# Clinico — Professional & Admin Portal (Frontend)

![GitHub repo size](https://img.shields.io/github/repo-size/your-username/clinico-frontend?color=0ea5e9&label=Repo%20Size)
![GitHub issues](https://img.shields.io/github/issues/your-username/clinico-frontend?color=22c55e)
![GitHub pull requests](https://img.shields.io/github/issues-pr/your-username/clinico-frontend?color=3b82f6)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![Made with React](https://img.shields.io/badge/Made%20with-React-61dafb?logo=react&logoColor=white)
![Powered by Vite](https://img.shields.io/badge/Built%20with-Vite-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Styled%20with-TailwindCSS-38bdf8?logo=tailwind-css&logoColor=white)

---

## 🌐 Overview

**Clinico** is the **web portal suite** for *The Healing Hand Initiative*, providing a seamless and secure interface for multiple user roles:

- 🩺 **Healthcare Professionals (Doctors)**  
- 🤝 **NGO Partners**  
- ⚙️ **Platform Administrators**

This repository contains the **frontend source code**, built with **React**, **Vite**, and **Tailwind CSS**, delivering modern, accessible dashboards and workflows.

> 🔗 For a full overview of the entire Clinico architecture (including the mobile app and backend), please see the **[Main Project Repository](https://github.com/abhay-byte/minor-project-gtbit/)**.

---

## ✨ Core Features

### 1. 🩺 Professional (Doctor) Portal
- **Dashboard:** At-a-glance KPIs for appointments, ratings, and patients.  
- **Schedule Management:** Interactive calendar (`react-big-calendar`) for availability.  
- **Live Consultation:** Secure video workspace with notes and prescription tools.  
- **Patient Directory:** Full list of connected patients and health records.  
- **Patient Details:** Deep insights into medical history, medications, and reminders.  
- **Secure Messaging:** Persistent chat for asynchronous communication.

---

### 2. ⚙️ Admin Portal
- **User Management:** View, edit, and verify all user roles.  
- **Professional Verification:** Approve or reject new doctor applications.  
- **Content Management:** CRUD interface for health articles (CMS).  
- **Analytics Dashboard:** Visual insights using **Recharts** for engagement and system health.  

---

### 3. 🤝 NGO Partner Portal
- **Community Dashboard:** Key metrics for outreach and appointments.  
- **Patient Management:** Simplified UI for CHWs to assist patients efficiently.

---

### 4. 👩‍💻 Public Static Site
- **Landing & Info Pages:** Marketing site for the Clinico platform.  
- **Signup & Support:** Registration flow, privacy policy, and help center pages.

---

## 💻 Tech Stack

| Category | Technologies |
|-----------|---------------|
| **Framework** | React 18 |
| **Build Tool** | Vite |
| **Styling** | Tailwind CSS |
| **UI Components** | shadcn/ui (Radix UI) |
| **Icons** | Lucide React |
| **Forms** | React Hook Form |
| **Charts** | Recharts |
| **Calendar** | React Big Calendar, React Day Picker |
| **Notifications** | Sonner |
| **Modals / Drawers** | Vaul |

---

## 🚀 Getting Started

### Prerequisites
- Node.js **v18+**
- npm or yarn

### 🧩 Installation

```bash
# Clone the repository
git clone https://github.com/your-username/clinico-frontend.git
cd clinico-frontend

# Install dependencies
npm install
# or
yarn install
```

### ⚙️ Setup Environment Variables

```bash
# Copy example environment file
cp .env.example .env
```

Then update `.env` with your API keys and configuration:

```bash
# .env.example

# Backend API URL
VITE_API_BASE_URL=http://localhost:8080/api

# Firebase Config
VITE_FIREBASE_API_KEY=AIza...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

### 🏃 Run the Development Server

```bash
npm run dev
# or
yarn dev
```
> App runs on: [http://localhost:5173](http://localhost:5173)

### 🏗️ Build for Production

```bash
npm run build
# or
yarn build
```

---

## 🤝 Contributing

Contributions make the open-source community such an incredible place to learn, inspire, and build together. ❤️

1. **Fork** the project  
2. **Create a feature branch:**  
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your changes:**  
   ```bash
   git commit -m "Add AmazingFeature"
   ```
4. **Push to your branch:**  
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

---

## 📜 License

Distributed under the **MIT License**.  
See [`LICENSE`](./LICENSE) for more information.

---

## 💫 Acknowledgements

Thanks to all contributors and volunteers of **The Healing Hand Initiative** for making healthcare more accessible worldwide. 🌍

---

> 💡 *Built with ❤️ using React, Vite, and Tailwind — for a healthier tomorrow.*
