## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js and npm](https://nodejs.org/) (npm comes bundled with Node.js)

You can verify installation with:

```bash
node -v
npm -v
```

---

## 🛠️ Setup Instructions

1. **Fork this repository**

   Click the **Fork** button at the top right of the repo on GitHub.

2. **Clone your fork**

   ```bash
   git clone https://github.com/your-username/sick-project-name-here.git
   cd sick-project-name-here
   ```

3. **Install dependencies**

   ```bash
   npm install
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

   This will start the Vite dev server and open the app in your browser.

---

## 📁 Project Structure

```
.
├── index.html            # Entry HTML file
├── package.json          # Project config & dependencies
├── public/               # Static assets (served at root)
└── src/                  # Main source code
    ├── assets/           # Images, fonts, etc.
    ├── data/             # Local or mock data
    ├── main.js           # App entry point
    └── styles/
        └── style.css     # Global styles
```

---

## Available Scripts

- `npm run dev` — Start the dev server
- `npm run build` — Build for production
- `npm run preview` — Preview the production build locally
- `npm run format` — Run Prettier
- `npm run dev `→ just Vite
- `npm run dev:server `→ just backend
- `npm start `→ both together via concurrently

---

## How to Contribute

1. **Create a new branch** from `main` on your fork:

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**, then commit them:

   ```bash
   git add .
   git commit -m "Describe your changes"
   ```

3. **Push to your fork**:

   ```bash
   git push origin feature/your-feature-name
   ```

4. **Open a Pull Request**
   Go to the original repo on GitHub and click **Compare & pull request**. Fill in a clear description of what your changes do.

---

## Code Style & Formatting

We use Prettier to keep code consistent and clean.

Before submitting a pull request, run the formatter:

```bash
npm run format
```

This will format:

- All .js files in /src
- index.html at the project root
- css files
