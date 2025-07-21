# DeFi Microfinance Platform – Frontend

A modern, professional, and fully responsive frontend for a decentralized microfinance platform. Built with React (Vite), Tailwind CSS, and best-in-class UI/UX practices.

---

## 🚀 Project Overview
This platform connects small businesses with global lenders through blockchain-powered microloans. The frontend is designed for a world-class user experience, featuring glassmorphism, 3D cards, real-time data, and a beautiful dark-only theme.

---

## ✨ Features
- Modern, glassy, 3D UI with dark theme only
- Animated cards, buttons, and navigation
- Responsive design for all devices
- Multi-step loan request form with validation and progress
- Real-time dashboard (ready for API integration)
- Wallet connection modal (ready for Web3 integration)
- Accessible, high-contrast, and keyboard-friendly
- Professional iconography and typography
- Modular, maintainable codebase

---

## 🛠️ Tech Stack
- **React** (Vite)
- **Tailwind CSS** (with custom theme)
- **React Router**
- **Radix UI** (for accessibility)
- **Heroicons/Lucide** (for icons)
- **@tanstack/react-query** (recommended for real-time fetching)

---

## ⚙️ Getting Started

### 1. **Clone the Repository**
```bash
git clone https://github.com/your-username/defi-microfinance-platform.git
cd defi-microfinance-platform
```

### 2. **Install Dependencies**
```bash
npm install
```

### 3. **Run the Development Server**
```bash
npm run dev
```
Visit [http://localhost:5173](http://localhost:5173) (or as shown in your terminal).

### 4. **Build for Production**
```bash
npm run build
```

### 5. **Preview Production Build**
```bash
npm run preview
```

---

## 🌐 Deployment (Vercel)
1. Push your code to GitHub.
2. Go to [vercel.com](https://vercel.com/), import your repo, and select the Vite preset.
3. Set build command: `vite build` and output directory: `dist` (default).
4. Add any environment variables as needed.
5. Click **Deploy**!

---

## 🔑 Environment Variables
If you use any API keys or secrets, create a `.env` file in the root:
```
VITE_API_URL=https://your-api-url.com
VITE_OTHER_KEY=your-value
```
**Never commit secrets to git!**

---

## 📁 Project Structure
```
├── public/                # Static assets (images, favicon, etc.)
├── src/
│   ├── components/        # Reusable UI components
│   ├── pages/             # Page-level components (dashboard, loan, etc.)
│   ├── styles/            # Tailwind and global CSS
│   ├── utils/             # Utility functions
│   └── App.jsx            # Main app entry
├── tailwind.config.js     # Tailwind theme config
├── vite.config.mjs        # Vite config
├── package.json           # Scripts and dependencies
└── README.md              # This file
```

---

## 🤝 Contributing
1. Fork the repo and create your branch: `git checkout -b feature/your-feature`
2. Commit your changes: `git commit -m 'Add feature'`
3. Push to the branch: `git push origin feature/your-feature`
4. Open a Pull Request

---

## 📄 License
This project is open source and available under the [MIT License](LICENSE).

---

## 📬 Contact
For questions, suggestions, or support, open an issue or contact the maintainer.

---

**Happy building!**

---

*This frontend is ready for production and real-time API integration. For backend/API or smart contract integration, see the backend repo or contact the team.*
