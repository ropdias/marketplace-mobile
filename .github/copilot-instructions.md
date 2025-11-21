# Marketplace Mobile - AI Agent Instructions

## Project Overview
React Native marketplace mobile app built with Expo Router, NativeWind (Tailwind), and GluestackUI. Uses file-based routing with authentication guards and secure storage for session management.

## Tech Stack
- **Framework**: Expo SDK 54 with Expo Router 6 (file-based routing)
- **Styling**: NativeWind v4 + Tailwind CSS + custom GluestackUI components
- **State**: React Context (auth), expo-secure-store for persistence
- **TypeScript**: Strict mode with path aliases (`@/*` → `src/*`)

## Architecture

### Routing Structure
Uses Expo Router with nested layouts and route protection:
- `src/app/_layout.tsx` - Root layout with `Stack.Protected` guards for auth
- `src/app/(app)/` - Protected routes (requires session), uses tab navigation
- `src/app/login.tsx` & `register.tsx` - Public auth screens
- Navigation example: `router.replace('/home')` or `router.navigate('/register')`

**Protected Routes Pattern**: Use `Stack.Protected` with `guard` prop:
```tsx
<Stack.Protected guard={!!session}>
  <Stack.Screen name="(app)" />
</Stack.Protected>
```

### Authentication Flow
- **Context**: `src/contexts/auth-context.tsx` provides `useSession()` hook
- **Storage**: `useStorageState` hook abstracts SecureStore (native) vs localStorage (web)
- **Session**: Simple string token stored with key `'session'`
- **Guards**: Check `session` in root layout to control route access
- Sign in sets session to `'xxx'` (placeholder), sign out sets to `null`

### Styling System
**Primary approach**: NativeWind classes with custom font utilities
- Import `@/global.css` in root layout only
- Custom font classes defined in `global.css`: `font-title-lg`, `font-body-md`, `font-action-sm`, etc.
- Font families: `dmSans` (titles), `poppinsRegular`, `poppinsMedium` (body/actions)
- Color system: Use semantic tokens like `bg-primary-500`, `text-secondary-700`

**GluestackUI components**: Located in `src/components/ui/`, use `tva()` for variants
- Button example: `src/components/ui/button/index.tsx` with action/variant/size props
- Wrap app in `<GluestackUIProvider mode="light">` at root

### Component Patterns
1. **UI Components**: Use GluestackUI creators with NativeWind styling via `tva()`
2. **File structure**: Each component in own folder with `index.tsx`
3. **Import convention**: Use `@/` alias for all src imports
4. **Styling**: Combine NativeWind classes with custom font utilities

## Development Workflows

### Running the App
```bash
npm start          # Start Expo dev server
npm run android    # Run on Android
npm run ios        # Run on iOS
npm run web        # Run in web browser
```

### Linting & Formatting
```bash
npm run lint       # ESLint with Prettier integration
```
- Auto-sorts imports via `eslint-plugin-simple-import-sort`
- Prettier enforces Tailwind class ordering
- ESLint config: `eslint.config.js` (flat config format)

### Font Loading
Fonts load asynchronously via `expo-font` in `splash-screen-controller.tsx`:
- Splash screen stays visible until fonts load AND session state initializes
- Required fonts: DMSans_700Bold, Poppins_400Regular, Poppins_500Medium

## Key Conventions

### Import Ordering
ESLint enforces automatic import sorting - don't manually organize imports

### TypeScript Paths
Always use `@/*` alias for src imports:
```tsx
import { useSession } from '@/contexts/auth-context'
import { Button } from '@/components/ui/button'
```

### Storage Keys
Use descriptive string keys with `useStorageState`: `'session'`, `'user-preferences'`, etc.

### Route Navigation
- Use `router.replace()` for auth transitions (no back button)
- Use `router.navigate()` for regular navigation
- Protected routes automatically redirect based on session state

### Color Tokens
Tailwind config defines CSS variables for semantic colors (primary, secondary, error, etc.) with numeric scales (0-950). Reference in code as `bg-primary-500`, not hex values.

## File Structure Patterns
- **Screens**: `src/app/**/*.tsx` (file-based routes)
- **Components**: `src/components/ui/{component-name}/index.tsx`
- **Contexts**: `src/contexts/{name}-context.tsx` with matching hook
- **Hooks**: `src/hooks/use-{name}.ts`
- **Assets**: `assets/images/` for static images

## Common Tasks

### Adding a New Screen
1. Create file in `src/app/` following route naming conventions
2. Add to protected/unprotected Stack.Protected block if needed
3. Import required contexts via `useSession()` or other hooks

### Creating a UI Component
1. Create folder in `src/components/ui/{component-name}/`
2. Use GluestackUI creators if available, or plain React Native components
3. Apply styling with NativeWind classes + custom font utilities
4. Export from `index.tsx`

### Managing Authentication State
- Modify `auth-context.tsx` for auth logic
- Session state automatically syncs to SecureStore/localStorage
- Update guards in root `_layout.tsx` for route protection rules

### Cleaning GluestackUI Components for React Native Only

When adding new GluestackUI components, remove web-specific properties to optimize for mobile:

**1. Remove `:web:` prefixed classes** (web-only features):
- `data-[focus-visible=true]:web:outline-none`
- `data-[focus-visible=true]:web:ring-2`
- `data-[focus-visible=true]:web:ring-*`
- `web:select-none`

**2. Remove desktop/web interaction states** (not supported in touch interfaces):
- `data-[hover=true]:*` - Hover doesn't exist on mobile touch (mouse-specific)
- `data-[focus-visible=true]:*` - Keyboard navigation concept (desktop only)

**IMPORTANT - Keep these touch-based states:**
- ✅ **KEEP** `data-[active=true]:*` - This WORKS in React Native via Pressable's `onPressIn`/`onPressOut` and provides native touch feedback
- ✅ **KEEP** `data-[pressed=true]:*` - Alternative naming for active state, also works with Pressable
- ✅ **KEEP** `data-[focus=true]:*` - Works with Pressable focus states
- The `active` state is triggered during touch and is essential for proper mobile UX feedback

**3. Remove web-only visual effects**:
- `underline` in hover/active states
- `ring` and `ring-offset` classes (focus rings)
- `outline` properties

**4. Simplify or remove**:
- `group/button` selectors (limited React Native support)
- Complex compound variants with hover/active states

**5. Keep empty variant objects** for TypeScript compatibility:
If removing all styles from a variant, leave empty string `''` instead of deleting the property to avoid TypeScript errors when props are passed.

**Example cleanup**:
```tsx
// Before (from GluestackUI)
const buttonStyle = tva({
  base: 'flex-row data-[focus-visible=true]:web:outline-none data-[focus-visible=true]:web:ring-2',
  variants: {
    variant: {
      solid: 'bg-primary-500 data-[hover=true]:bg-primary-600 data-[active=true]:bg-primary-700',
    }
  }
})

// After (React Native only) - Note: KEEP data-[active] for touch feedback!
const buttonStyle = tva({
  base: 'flex-row',
  variants: {
    variant: {
      solid: 'bg-primary-500 data-[active=true]:bg-primary-700',
    }
  }
})
```

**Touch state priority**: `data-[active=true]` and `data-[pressed=true]` work natively with Pressable's touch events (onPressIn/onPressOut) and should be preserved for proper mobile UX.
