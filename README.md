# 🚀 ForgeAI - AI-Powered Web Development Platform

<div align="center">

![ForgeAI](https://img.shields.io/badge/Next.js-15.5.4-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.1.0-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)

**Transform your ideas into full-stack web applications with the power of AI**

<!-- [🚀 Live Demo](https://your-demo-url.com) • [📖 Documentation](https://your-docs-url.com) • [🐛 Report Bug](https://github.com/your-username/bolt-clone/issues) • [✨ Request Feature](https://github.com/your-username/bolt-clone/issues) -->

</div>

---

## ✨ Features

### 🤖 **AI-Powered Code Generation**
- **Smart Code Generation**: Generate complete React applications from natural language prompts
- **Multi-Component Architecture**: Automatically creates organized component structures
- **Tailwind CSS Integration**: Built-in styling with modern design patterns
- **Real-time Preview**: See your code come to life instantly

### 🛠️ **Advanced Development Tools**
- **Live Code Editor**: Powered by Sandpack for seamless development experience
- **File Explorer**: Navigate through your project structure effortlessly
- **Hot Reload**: Instant updates as you code
- **Export & Deploy**: One-click deployment to CodeSandbox

### 💳 **Flexible Pricing System**
- **Token-Based System**: Pay only for what you use
- **Multiple Plans**: From Basic (50K tokens) to Unlimited
- **PayPal Integration**: Secure payment processing
- **Real-time Token Tracking**: Monitor your usage

### 🔐 **User Management**
- **Google OAuth**: Secure authentication with Google
- **User Profiles**: Personalized experience
- **Workspace History**: Track all your projects
- **Token Management**: Monitor and purchase tokens

### 🎨 **Modern UI/UX**
- **Dark Theme**: Beautiful dark mode interface
- **Responsive Design**: Works perfectly on all devices
- **Smooth Animations**: Polished user experience
- **Intuitive Navigation**: Easy-to-use interface

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Google OAuth credentials
- PayPal developer account (for payments)
- Convex account (for backend)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/TheCodeWiz/Forge-AI.git
   cd Forge-AI
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local
   ```
   
   Add your environment variables:
   ```env
   NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID_KEY=your_google_client_id
   NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_paypal_client_id
   CONVEX_DEPLOYMENT=your_convex_deployment_url
   NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🏗️ Tech Stack

### Frontend
- **Next.js 15.5.4** - React framework with App Router
- **React 19.1.0** - Latest React with concurrent features
- **Tailwind CSS 4.0** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library

### Backend & Database
- **Convex** - Real-time backend as a service
- **Google Generative AI** - AI code generation
- **PayPal API** - Payment processing

### Development Tools
- **Sandpack** - Live code editor and preview
- **TypeScript** - Type safety
- **ESLint & Prettier** - Code quality
- **Turbopack** - Fast builds

---

## 📱 Screenshots

<div align="center">

### 🏠 Homepage
![Homepage](/public/homepage.png)

### 💻 Workspace
![Workspace](/public/workspace.png)

### 💳 Pricing
![Pricing](/public/pricingPage.png)

</div>

---

## 🎯 How It Works

1. **🤔 Describe Your Idea**: Tell the AI what you want to build
2. **🤖 AI Generates Code**: Get a complete React application
3. **👀 Preview & Edit**: See your app in real-time
4. **🚀 Deploy**: Share your creation with the world

---

## 💰 Pricing Plans

| Plan | Tokens | Price | Best For |
|------|--------|-------|----------|
| **Basic** | 50K | $4.99 | Hobbyists & personal projects |
| **Starter** | 120K | $9.99 | Professional developers |
| **Pro** | 2.5M | $19.99 | Teams & agencies |
| **Unlimited** | ∞ | $49.99 | Enterprise use |

---

## 🛠️ Development

### Project Structure
```
Forge-AI/
├── app/                    # Next.js App Router
│   ├── (main)/            # Main app routes
│   │   ├── pricing/       # Pricing page
│   │   └── workspace/     # Workspace pages
│   ├── api/               # API routes
│   │   ├── ai-chat/       # AI chat endpoint
│   │   └── gen-ai-code/   # AI code generation endpoint
│   ├── ConvexClientProvider.jsx
│   ├── favicon.ico
│   ├── globals.css        # Global styles
│   ├── layout.js          # Root layout
│   ├── page.js            # Home page
│   └── provider.jsx       # App providers
├── components/            # React components
│   ├── custom/           # Custom components
│   │   ├── AppSideBar.jsx
│   │   ├── ChatView.jsx
│   │   ├── CodeView.jsx
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── PricingModel.jsx
│   │   ├── SandpackPreviewClient.jsx
│   │   ├── SideBarFooter.jsx
│   │   ├── SignInDialog.jsx
│   │   └── WorkspaceHistory.jsx
│   └── ui/               # UI components
│       ├── button.jsx
│       ├── dialog.jsx
│       ├── input.jsx
│       ├── separator.jsx
│       ├── sheet.jsx
│       ├── sidebar.jsx
│       ├── skeleton.jsx
│       ├── sonner.jsx
│       └── tooltip.jsx
├── configs/              # Configuration files
│   └── AiModel.jsx       # AI model configuration
├── context/              # React contexts
│   ├── ActionContext.jsx
│   ├── MessagesContext.jsx
│   └── UserDetailContext.jsx
├── convex/               # Convex backend
│   ├── _generated/       # Generated Convex files
│   ├── schema.js         # Database schema
│   ├── users.js          # User-related functions
│   └── workspace.js      # Workspace functions
├── data/                 # Static data
│   ├── Colors.jsx        # Color definitions
│   ├── Lookup.jsx        # Lookup data
│   └── Prompt.jsx        # AI prompts
├── hooks/                # Custom React hooks
│   └── use-mobile.js     # Mobile detection hook
├── lib/                  # Utility functions
│   └── utils.js          # Utility functions
├── public/               # Static assets
│   ├── file.svg
│   ├── globe.svg
│   ├── logo.png
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
│   └── homepage.png
│   └── workspace.png
│   └── pricingPage.png
├── components.json        # Component configuration
├── jsconfig.json         # JavaScript configuration
├── next.config.mjs       # Next.js configuration
├── package.json          # Dependencies
├── postcss.config.mjs    # PostCSS configuration
└── README.md             # Project documentation
```

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
```

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Convex](https://convex.dev/) - Backend as a service
- [Sandpack](https://sandpack.codesandbox.io/) - Live code editor
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Radix UI](https://www.radix-ui.com/) - Component primitives

---

## 📞 Support

- 📧 Email: manavai1409@gmail.com
- Instagram: https://www.instagram.com/manav_bhatt_1409/?next=%2Fmanav_bhatt_1409%2F 
- Twitter: https://x.com/ManavBhatt_1409
- LinkedIn: https://www.linkedin.com/in/manav-bhatt1409/
---

<div align="center">

**Made with ❤️ by the Manav Bhatt**

[⭐ Star this repo](https://github.com/your-username/ForgeAI) • [🐦 Follow me on Twitter](https://twitter.com/FogeAI) 

</div>