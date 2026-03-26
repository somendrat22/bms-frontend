# 🎬 BMS Frontend - Book My Show

A modern, responsive frontend application for the Book My Show ticket booking system built with React, TypeScript, TailwindCSS, and Vite.

## 🚀 Features

### For Customers
- **User Registration** - Sign up as a customer with location details
- **Theatre Search** - Search for theatres by city
- **Browse Shows** - View available movie shows and timings
- **Responsive Design** - Works seamlessly on desktop and mobile devices

### For Theatre Owners
- **Business Registration** - Register with PAN, GST, and business credentials
- **Theatre Management** - Create and manage multiple theatres
- **Hall Management** - Configure halls with seat types and pricing
- **Show Management** - Schedule movie shows with timing details

## 🛠 Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Fast build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **Lucide React** - Beautiful icon library

## 📋 Prerequisites

- Node.js 18+ and npm
- BMS Core backend running on `http://localhost:8080`

## 🔧 Installation

1. Install dependencies:
```bash
npm install
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
