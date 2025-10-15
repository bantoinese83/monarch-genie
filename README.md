# 🚀 Buebu - Prompt to Blueprint

> **AI-Powered Application Blueprint Generator**

Transform your application ideas into comprehensive, enterprise-ready technical blueprints with the power of AI. Built with modern web technologies and optimized for production use.

## ✨ Features

### 🎯 **Core Functionality**
- **AI-Powered Generation**: Convert simple prompts into detailed technical blueprints
- **Interactive File Tree**: Navigate project structures with collapsible folders and files
- **Project Management**: Save, organize, and manage multiple blueprints
- **Real-time Streaming**: Watch your blueprint generate in real-time
- **Export Options**: Download blueprints as Markdown files

### 🌳 **Interactive File Tree**
- **Collapsible Navigation**: Click folders to expand/collapse
- **Visual Hierarchy**: Clear file and folder distinction with icons
- **Smooth Scrolling**: Navigate large project structures effortlessly
- **Inline Comments**: View file descriptions and purpose
- **Keyboard Accessible**: Full keyboard navigation support
- **Responsive Design**: Works perfectly on all screen sizes

### 📱 **Mobile-First Design**
- **Responsive Layout**: Works perfectly on all devices
- **Touch-Friendly**: Optimized for mobile interactions
- **Hamburger Menu**: Intuitive mobile navigation
- **Progressive Web App**: Install and use offline

### ♿ **Accessibility First**
- **WCAG 2.1 AA Compliant**: Full accessibility support
- **Keyboard Navigation**: Complete keyboard support including file tree
- **Screen Reader Ready**: Works with assistive technologies
- **High Contrast**: Optimized for visual accessibility
- **ARIA Labels**: Proper labeling for interactive elements

### 🔒 **Security & Performance**
- **Input Validation**: Comprehensive input sanitization
- **Error Boundaries**: Graceful error handling
- **Service Worker**: Offline functionality
- **Performance Monitoring**: Built-in performance tracking

### 🎨 **Modern UI/UX**
- **Dark Theme**: Beautiful dark interface
- **Interactive File Tree**: Collapsible project structure navigation
- **Smooth Animations**: Polished user experience with custom scrollbars
- **Monospace Typography**: Perfect for code and file structures
- **Search & Filter**: Find projects quickly
- **Keyboard Shortcuts**: Power user features

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Google Gemini API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/buebu-prompt-to-blueprint.git
   cd buebu-prompt-to-blueprint
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Add your Gemini API key:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🛠️ Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
npm run lint         # Run ESLint

# Testing
npm run test         # Run unit tests
npm run test:a11y    # Run accessibility tests
npm run test:perf    # Run performance tests
```

## 🏗️ Architecture

### Tech Stack
- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **AI Integration**: Google Gemini API
- **Icons**: Lucide React

### Project Structure
```
src/
├── components/          # React components
│   ├── blueprint-display/ # Blueprint rendering components
│   │   ├── file-tree.tsx  # Interactive file tree component
│   │   ├── code-block.tsx # Syntax highlighted code blocks
│   │   └── toolbar.tsx    # Blueprint action toolbar
│   ├── layout/         # Layout components (Header, Sidebar, MainContent)
│   ├── modals/         # Modal dialogs (Settings, Help)
│   └── ui/             # Reusable UI components
├── features/           # Feature-based modules
│   ├── generation/     # AI generation features
│   └── projects/       # Project management
├── hooks/              # Custom React hooks
├── lib/                # Utility libraries
│   └── tree-parser.ts  # File tree parsing utilities
├── config/             # Configuration files
└── types/              # TypeScript definitions
```

## 🎯 Usage

### Creating a Blueprint

1. **Enter your idea** in the prompt input
2. **Click Generate** or press `Ctrl+Enter`
3. **Watch** your blueprint generate in real-time
4. **Navigate** the interactive file tree to explore the project structure
5. **Save** the project for future reference

### Exploring Project Structure

The interactive file tree allows you to:
- **Expand/Collapse** folders by clicking on them
- **Navigate** through the entire project hierarchy
- **View** file types with appropriate icons
- **Read** comments and descriptions inline
- **Scroll** through large project structures smoothly

### Managing Projects

- **Search**: Use the search bar to find projects
- **Rename**: Click the settings icon to rename projects
- **Delete**: Remove projects you no longer need
- **Export**: Download blueprints as Markdown files

### Keyboard Shortcuts

- `Ctrl+N` - Create new project
- `Ctrl+K` - Focus search
- `Escape` - Close modals
- `Enter` - Submit forms
- `Space` - Expand/collapse file tree folders
- `Arrow Keys` - Navigate file tree

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_GEMINI_API_KEY` | Google Gemini API key | Yes |
| `VITE_DEBUG` | Enable debug mode | No |
| `VITE_API_BASE_URL` | API base URL | No |

### Customization

The app supports various customization options:

- **Theme**: Dark theme (light theme coming soon)
- **Animations**: Can be disabled for better performance
- **Features**: Toggle features on/off
- **Limits**: Configure input limits and quotas

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm run test

# Run specific test suites
npm run test:unit      # Unit tests
npm run test:integration # Integration tests
npm run test:a11y      # Accessibility tests
npm run test:perf      # Performance tests
```

### Test Coverage

The project includes comprehensive test coverage:
- Unit tests for all components
- Integration tests for user flows
- Accessibility tests for WCAG compliance
- Performance tests for optimization

## 🚀 Deployment

### Production Build

```bash
npm run build
```

### Deployment Options

The app can be deployed to any static hosting service:

- **Vercel**: `vercel --prod`
- **Netlify**: Connect your repository
- **GitHub Pages**: Use GitHub Actions
- **AWS S3**: Upload the `dist` folder

### Environment Setup

Ensure your production environment has:
- `VITE_GEMINI_API_KEY` set
- HTTPS enabled
- Service worker support

## 📱 Mobile Support

### Progressive Web App

The app is a PWA with:
- Offline functionality
- Install prompt
- Service worker caching
- Mobile-optimized UI

### Browser Support

- **Desktop**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile**: iOS Safari 14+, Chrome Mobile 90+, Samsung Internet 13+

## ♿ Accessibility

### WCAG 2.1 AA Compliance

- ✅ Keyboard navigation
- ✅ Screen reader support
- ✅ Color contrast compliance
- ✅ Focus management
- ✅ ARIA labels and roles

### Testing Accessibility

```bash
npm run test:a11y
```

## 🔒 Security

### Security Features

- Input sanitization and validation
- XSS prevention
- Content filtering
- API key protection
- Error boundary protection

### Security Best Practices

- Never commit API keys
- Use environment variables
- Validate all inputs
- Sanitize user content

## 📊 Performance

### Performance Features

- Service worker caching
- Code splitting
- Lazy loading
- Performance monitoring
- Bundle optimization

### Performance Metrics

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

## 🤝 Contributing

### Development Setup

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

### Code Style

- Use TypeScript strict mode
- Follow React best practices
- Write comprehensive tests
- Update documentation

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google Gemini** for AI capabilities
- **React Team** for the amazing framework
- **Tailwind CSS** for the utility-first CSS
- **Vite** for the fast build tool
- **Lucide** for the beautiful icons

## 📞 Support

- **Documentation**: [DEVELOPMENT.md](DEVELOPMENT.md)
- **Issues**: [GitHub Issues](https://github.com/your-username/buebu-prompt-to-blueprint/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/buebu-prompt-to-blueprint/discussions)

---

**Built with ❤️ for developers who want to turn ideas into reality.**