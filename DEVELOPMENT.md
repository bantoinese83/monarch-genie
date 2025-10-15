# Development Guide

## Overview

This is a comprehensive development guide for the Buebu - Prompt to Blueprint application. The app has been fully audited and optimized for production use.

## Architecture

### Core Technologies
- **React 19** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **Zustand** for state management
- **Google Gemini AI** for blueprint generation

### Project Structure
```
src/
├── components/          # React components
│   ├── layout/         # Layout components
│   ├── modals/         # Modal dialogs
│   └── ui/             # Reusable UI components
├── features/           # Feature-based modules
│   ├── generation/     # AI generation features
│   └── projects/       # Project management
├── hooks/              # Custom React hooks
├── lib/                # Utility libraries
├── config/             # Configuration files
└── types/              # TypeScript type definitions
```

## Key Features

### ✅ Mobile Responsiveness
- Hamburger menu with slide-out sidebar
- Touch-friendly button sizes (44px minimum)
- Responsive layouts for all screen sizes
- Mobile-optimized interactions

### ✅ Accessibility (WCAG 2.1 AA)
- Full keyboard navigation support
- ARIA labels and roles throughout
- Screen reader compatibility
- Focus management in modals
- Color contrast compliance

### ✅ Security
- Input sanitization and validation
- XSS prevention measures
- Content filtering for harmful inputs
- API key protection

### ✅ Performance
- Service worker for offline support
- Error boundaries for graceful failures
- Performance monitoring
- Optimized animations and transitions

### ✅ Error Handling
- Comprehensive error boundaries
- User-friendly error messages
- Retry mechanisms for failed operations
- Graceful degradation

## Development Setup

### Prerequisites
- Node.js 18+
- npm or yarn
- Git

### Installation
```bash
npm install
```

### Environment Variables
Create a `.env.local` file:
```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

### Development Server
```bash
npm run dev
```

### Building for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Code Quality

### Linting
The project uses ESLint with TypeScript support. Run linting:
```bash
npm run lint
```

### Formatting
Prettier is configured for consistent code formatting:
```bash
npm run format
```

### Type Checking
TypeScript strict mode is enabled:
```bash
npx tsc --noEmit
```

## Testing

### Unit Tests
```bash
npm run test
```

### Integration Tests
```bash
npm run test:integration
```

### Accessibility Tests
```bash
npm run test:a11y
```

### Performance Tests
```bash
npm run test:performance
```

## Key Components

### App.tsx
Main application component with error boundary wrapper.

### Sidebar.tsx
Navigation sidebar with:
- Mobile hamburger menu
- Project search functionality
- Keyboard shortcuts support

### PromptInput.tsx
Main input component with:
- Real-time validation
- Input sanitization
- Accessibility features

### BlueprintDisplay.tsx
Blueprint rendering with:
- Syntax highlighting
- Copy functionality
- Download support

## State Management

### Zustand Stores
- `projects-store.ts` - Project data management
- `ui-store.ts` - UI state management

### Custom Hooks
- `use-app-state.ts` - Main app state
- `use-form-validation.ts` - Form validation
- `use-keyboard-shortcuts.ts` - Keyboard shortcuts

## Security Considerations

### Input Validation
All user inputs are validated and sanitized:
- Prompt text validation
- Project title validation
- XSS prevention

### API Security
- API keys are environment variables only
- Input sanitization before API calls
- Error handling for API failures

## Performance Optimization

### Bundle Optimization
- Code splitting with dynamic imports
- Tree shaking for unused code
- Optimized asset loading

### Runtime Performance
- Service worker caching
- Efficient state updates
- Memoized components

## Accessibility Features

### Keyboard Navigation
- Tab order management
- Focus trapping in modals
- Keyboard shortcuts

### Screen Reader Support
- Semantic HTML structure
- ARIA labels and roles
- Live regions for announcements

### Visual Accessibility
- High contrast support
- Scalable text
- Focus indicators

## Mobile Optimization

### Touch Interactions
- 44px minimum touch targets
- Touch-friendly gestures
- Mobile-specific layouts

### Responsive Design
- Mobile-first approach
- Flexible grid layouts
- Optimized typography

## Error Handling

### Error Boundaries
- Component-level error catching
- Graceful error recovery
- User-friendly error messages

### Retry Mechanisms
- Automatic retry for failed operations
- Exponential backoff
- Fallback strategies

## Monitoring and Analytics

### Performance Monitoring
- Web Vitals tracking
- Custom performance metrics
- Memory usage monitoring

### Error Tracking
- Error boundary integration
- Console error logging
- User action tracking

## Deployment

### Production Build
```bash
npm run build
```

### Environment Configuration
Ensure all environment variables are set:
- `VITE_GEMINI_API_KEY` - Required for AI functionality

### Static Hosting
The app can be deployed to any static hosting service:
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

## Browser Support

### Supported Browsers
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Mobile Browsers
- iOS Safari 14+
- Chrome Mobile 90+
- Samsung Internet 13+

## Troubleshooting

### Common Issues

#### API Key Not Working
1. Check environment variable is set
2. Verify API key is valid
3. Check network connectivity

#### Mobile Layout Issues
1. Clear browser cache
2. Check viewport meta tag
3. Verify responsive classes

#### Performance Issues
1. Check service worker registration
2. Monitor memory usage
3. Verify bundle size

### Debug Mode
Enable debug mode by setting:
```env
VITE_DEBUG=true
```

## Contributing

### Code Style
- Use TypeScript strict mode
- Follow React best practices
- Use functional components
- Implement proper error handling

### Pull Request Process
1. Create feature branch
2. Write tests for new features
3. Ensure all tests pass
4. Update documentation
5. Submit pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions:
- Create an issue in the repository
- Check the troubleshooting section
- Review the code documentation
