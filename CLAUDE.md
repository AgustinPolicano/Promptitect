# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Promptitect is an Angular v20 application with SSR (Server-Side Rendering) support using the new @angular/ssr package. The project is configured with TailwindCSS v4 for styling and uses SCSS as the primary style language.

## Common Commands

### Development
- `npm run start` or `ng serve` - Start development server on http://localhost:4200/
- `npm run build` - Build for production
- `npm run watch` - Build in watch mode for development
- `npm run test` - Run unit tests with Karma/Jasmine
- `npm run serve:ssr:Promptitect` - Serve the SSR build

### Code Generation
- `ng generate component component-name` - Generate new component with SCSS styles
- `ng generate --help` - List all available schematics

## Architecture & Structure

### Application Structure
- **Standalone Components**: Uses Angular v20 standalone components architecture
- **Signal-based State**: The app component uses Angular signals (`signal()`) for reactive state
- **Route-based Organization**: Components are organized by routes in `src/app/routes/`
- **SSR Configuration**: Full SSR setup with server entry point at `src/server.ts`

### Key Directories
- `src/app/core/` - Core services and shared functionality
- `src/app/layout/` - Layout components and structure
- `src/app/routes/` - Route-specific components organized by page
- `src/app/shared/` - Shared components and utilities

### Routing
- Simple route configuration in `src/app/app.routes.ts`
- Currently has home route (`''`) mapped to `HomePageComponent`
- Server-specific routes handled in `src/app/app.routes.server.ts`

## TailwindCSS Configuration

The project uses TailwindCSS v4 with the following setup:
- **PostCSS Config**: `.postcssrc.json` with `@tailwindcss/postcss` plugin
- **Import Required**: TailwindCSS directives must be imported in `src/styles.scss`
- **Angular Integration**: Configured through Angular's build system, no separate tailwind.config.js needed for v4

### Current TailwindCSS Issue
TailwindCSS is installed but not properly configured. The `src/styles.scss` file is missing the required Tailwind directives. To fix Tailwind, add these imports to `src/styles.scss`:

```scss
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
```

## Styling Approach
- **Primary**: SCSS files (`.scss`) for component styles
- **Global**: `src/styles.scss` for global styles
- **Component Prefix**: `app-` prefix for all components
- **Style Language**: Configured for SCSS in angular.json schematics

## Build Configuration
- **Production**: Optimized builds with output hashing and budgets (500KB initial, 1MB max)
- **Development**: Source maps enabled, no optimization for faster builds
- **SSR**: Server-side rendering with Express.js server
- **Bundle Budgets**: Component styles limited to 4KB warning / 8KB error

## Testing
- **Framework**: Jasmine + Karma
- **Config**: Uses `tsconfig.spec.json` for test configuration
- **Coverage**: Karma coverage reports enabled
- **Browser**: Chrome launcher for test execution