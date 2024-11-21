# Next.js Feature-First Architecture Guide

## Table of Contents
- [1. Introduction](#1-introduction)
  - [1.1 What is Feature-First Architecture](#11-what-is-feature-first-architecture)
  - [1.2 Why Feature-First](#12-why-feature-first)
  - [1.3 When to Use](#13-when-to-use)

- [2. Project Structure](#2-project-structure)
  - [2.1 Root Directory Structure](#21-root-directory-structure)
  - [2.2 Feature Module Structure](#22-feature-module-structure)
  - [2.3 Shared Resources Structure](#23-shared-resources-structure)
  - [2.4 Type Definitions](#24-type-definitions)

- [3. Implementation Guide](#3-implementation-guide)
  - [3.1 Feature Implementation](#31-feature-implementation)
  - [3.2 Component Structure](#32-component-structure)
  - [3.3 State Management](#33-state-management)
  - [3.4 API Integration](#34-api-integration)
  - [3.5 Routing Implementation](#35-routing-implementation)

- [4. Best Practices](#4-best-practices)
  - [4.1 Code Organization](#41-code-organization)
  - [4.2 Naming Conventions](#42-naming-conventions)
  - [4.3 Type Safety](#43-type-safety)
  - [4.4 Performance Optimization](#44-performance-optimization)
  - [4.5 Error Handling](#45-error-handling)

- [5. Advanced Patterns](#5-advanced-patterns)
  - [5.1 Domain Events](#51-domain-events)
  - [5.2 Advanced State Management](#52-advanced-state-management)
  - [5.3 Advanced Routing](#53-advanced-routing)
  - [5.4 Form Management](#54-form-management)

- [6. Testing Strategy](#6-testing-strategy)
  - [6.1 Unit Testing](#61-unit-testing)
  - [6.2 Integration Testing](#62-integration-testing)
  - [6.3 E2E Testing](#63-e2e-testing)

- [7. Development Workflow](#7-development-workflow)
  - [7.1 Development Setup](#71-development-setup)
  - [7.2 Build Process](#72-build-process)
  - [7.3 Deployment Strategy](#73-deployment-strategy)

- [8. Maintenance and Scaling](#8-maintenance-and-scaling)
  - [8.1 Code Quality](#81-code-quality)
  - [8.2 Documentation](#82-documentation)
  - [8.3 Performance Monitoring](#83-performance-monitoring)

## 1. Introduction

### 1.1 What is Feature-First Architecture

Feature-First Architecture là một cách tiếp cận tổ chức code trong đó code được nhóm theo các tính năng nghiệp vụ thay vì các loại kỹ thuật. Mỗi feature là một module độc lập, tự chứa tất cả các thành phần cần thiết.

```
features/
├── auth/          # Authentication feature
├── products/      # Product management
└── users/         # User management
```

### 1.2 Why Feature-First

#### Lợi ích chính:

- **Modularity**: Mỗi feature độc lập và có thể maintain riêng
- **Scalability**: Dễ dàng thêm/xóa features
- **Team Organization**: Teams có thể làm việc song song
- **Code Locality**: Related code ở gần nhau
- **Better Testing**: Dễ dàng test từng feature

#### Developer Experience:

- Structure rõ ràng, dễ hiểu
- Onboarding dev mới dễ dàng
- Giảm conflicts khi làm việc nhóm
- Có thể reuse code hiệu quả

#### Type Safety:

- Type definitions nằm gần code
- Dễ dàng maintain types
- Auto-completion tốt hơn
- Catch errors sớm hơn

### 1.3 When to Use

#### Phù hợp cho:

- Large-scale applications
- Multiple development teams
- Complex business domains
- Long-term maintainability

#### Một vài bất lợi

##### Complexity:

- Setup ban đầu phức tạp
- Nhiều boilerplate code
- Learning curve cao hơn
- Cần thống nhất conventions

##### Overhead:

- Nhiều files và folders
- Duplicate code có thể xảy ra
- Bundle size có thể lớn hơn
- Build time có thể lâu hơn

##### Communication:

- Cần coordination giữa teams
- Shared resources cần quản lý kỹ
- Breaking changes ảnh hưởng nhiều
- Cần documentation tốt

##### Maintenance:

- Cập nhật dependencies phức tạp
- Cross-feature changes khó khăn
- Technical debt có thể tích tụ
- Cần review code kỹ hơn

## 2. Project Structure

### 2.1 Root Directory Structure

```typescript
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Auth routes group
│   │   │   ├── login/
│   │   │   │   ├── page.tsx
│   │   │   │   └── loading.tsx
│   │   │   └── register/
│   │   │       └── page.tsx
│   │   │
│   │   ├── (dashboard)/       # Dashboard routes
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   └── loading.tsx
│   │   │
│   │   └── api/               # API routes
│   │       ├── auth/
│   │       └── [...]/
│   │
│   ├── features/              # Feature modules
│   │   ├── auth/
│   │   ├── users/
│   │   └── products/
│   │
│   ├── shared/               # Shared resources
│   │   ├── components/              # Common UI components
│   │   ├── hooks/
│   │   └── utils/
│   │
│   └── types/               # Global types
│
├── public/                  # Static files
│
├── tailwind.config.js      # Tailwind configuration
├── next.config.js          # Next.js configuration
├── tsconfig.json           # TypeScript configuration
├── package.json
└── README.md
```

### 2.2 Feature Module Structure

```typescript
features/                          # Feature modules
├── auth/                         # Auth feature
│   ├── api/                     # API integrations
│   │   ├── auth-api.ts
│   │   └── endpoints.ts
│   │
│   ├── components/                     # Feature UI components
│   │   ├── login-form/
│   │   │   ├── login-form.tsx
│   │   │   ├── login-form.test.tsx
│   │   │   ├── use-login-form.ts
│   │   │   └── types.ts
│   │   └── register-form/
│   │
│   ├── hooks/                  # Feature hooks
│   │   ├── use-auth.ts
│   │   └── use-user.ts
│   │
│   ├── stores/                # State management
│   │   └── auth-store.ts
│   │
│   ├── types/                 # Feature types
│   │   ├── index.ts          # Type exports
│   │   ├── auth-types.ts     # Domain types
│   │   ├── api-types.ts      # API types
│   │   ├── store-types.ts    # Store types
│   │   └── component-types.ts # UI types
│   │
│   ├── utils/                # Feature utilities
│   │   ├── validation.ts
│   │   └── format.ts
│   │
│   └── constants/            # Feature constants
│       └── auth-constants.ts
│
└── users/                    # Users feature
    ├── api/
    ├── components/
    ├── hooks/
    └── types/
```

### 2.3 Shared Resources Structure

```typescript
shared/                           # Shared resources
├── components/                   # UI components
│   └── ui/                      # Shadcn components
│       ├── button.tsx
│       ├── form.tsx
│       ├── input.tsx
│       └── label.tsx
│
├── layouts/                     # Layout components
│   ├── header/
│   │   ├── header.tsx
│   │   └── types.ts
│   ├── sidebar/
│   │   ├── sidebar.tsx
│   │   └── types.ts
│   └── footer/
│       ├── footer.tsx
│       └── types.ts
│
├── hooks/                       # Common hooks  
│   ├── use-form.ts
│   └── use-fetch.ts
│
├── lib/                        # External libs & config
│   ├── api.ts                  # Axios config
│   └── db.ts                   # DB config
│
├── styles/                     # Global styles
│   └── globals.css
│
└── utils/                      # Common utilities
    ├── format.ts
    └── validation.ts
```

### 2.4 Type Definitions

```typescript
// Global types
types/
├── next.d.ts      # Next.js types
└── index.d.ts     # Global declarations

// Feature types
features/auth/types/
├── auth-types.ts   # Domain types
├── api-types.ts    # API types
└── store-types.ts  # Store types
```

## 3. Implementation Guide

### 3.1 Feature Implementation

```typescript
// features/auth/api/auth-api.ts
export const loginApi = async (credentials: LoginCredentials): Promise<User> => {
  const response = await api.post('/auth/login', credentials)
  return response.data
}

// features/auth/hooks/use-auth.ts
export const useAuth = () => {
  const user = useAuthStore(state => state.user)
  const login = useAuthStore(state => state.login)

  const handleLogin = async (data: LoginCredentials) => {
    try {
      await login(data)
    } catch (error) {
      handleError(error)
    }
  }

  return { user, handleLogin }
}

// features/auth/stores/auth-store.ts
export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  login: async (credentials) => {
    const user = await loginApi(credentials)
    set({ user })
  }
}))
```

### 3.2 Component Structure

```typescript
// shared/hooks/use-form.ts
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm as useHookForm } from 'react-hook-form'
import type { ZodSchema } from 'zod'

interface UseFormProps<T> {
  schema: ZodSchema
  defaultValues?: Partial<T>
  onSubmit: (data: T) => Promise<void>
}

export const useForm = <T>({
  schema,
  defaultValues,
  onSubmit
}: UseFormProps<T>) => {
  const form = useHookForm<T>({
    resolver: zodResolver(schema),
    defaultValues
  })

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      await onSubmit(data)
      form.reset()
    } catch (error) {
      form.setError('root', {
        message: error.message
      })
    }
  })

  return {
    form,
    handleSubmit,
    isLoading: form.formState.isSubmitting,
    errors: form.formState.errors
  }
}

// Usage in components
// features/users/components/user-form/user-form.tsx
import { useForm } from '@/shared/hooks/use-form'
import { userSchema } from '../../schemas/user-schema'
import type { UserFormData } from './types'

export const UserForm = () => {
  const {
    form,
    handleSubmit,
    isLoading,
    errors
  } = useForm<UserFormData>({
    schema: userSchema,
    onSubmit: async (data) => {
      await createUser(data)
    }
  })

  return (
    <form onSubmit={handleSubmit}>
      <Input
        {...form.register('name')}
        label="Name"
        error={errors.name?.message}
      />
      <Input
        {...form.register('email')}
        label="Email"
        error={errors.email?.message}
      />
      <Button loading={isLoading}>
        Submit
      </Button>
    </form>
  )
}
```

### 3.3 State Management

```typescript
// features/auth/stores/auth-store.ts
interface AuthStore {
  user: User | null
  isLoading: boolean
  error: Error | null
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isLoading: false,
  error: null,

  login: async (credentials) => {
    set({ isLoading: true })
    try {
      const user = await loginApi(credentials)
      set({ user, error: null })
    } catch (error) {
      set({ error })
    } finally {
      set({ isLoading: false })
    }
  },

  logout: () => {
    set({ user: null })
  }
}))
```

### 3.4 API Integration

```typescript
// shared/lib/api.ts
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
})

api.interceptors.request.use((config) => {
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// features/auth/api/auth-api.ts
export const authApi = {
  login: async (credentials: LoginCredentials): Promise<User> => {
    const response = await api.post('/auth/login', credentials)
    return response.data
  },

  register: async (data: RegisterData): Promise<User> => {
    const response = await api.post('/auth/register', data)
    return response.data
  }
}
```

### 3.5 Routing Implementation

```typescript
// app/(auth)/login/page.tsx
import { Metadata } from 'next'
import { LoginForm } from '@/features/auth/components/login-form'

export const metadata: Metadata = {
  title: 'Login'
}

export default function LoginPage() {
  return (
    <div className="auth-page">
      <h1>Login</h1>
      <LoginForm />
    </div>
  )
}

// middleware.ts
export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')

  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}
```

## 4. Best Practices

### 4.1 Code Organization

1. Feature Independence:
```typescript
features/
├── auth/      # Independent feature
└── users/     # Only depends on shared
```

2. Shared Code:
```typescript
shared/
├── components/       # Truly shared components
└── utils/    # Reusable utilities
```

3. Type Organization:
```typescript
types/
├── global.d.ts   # Global types
└── feature/      # Feature-specific types
```

### 4.2 Naming Conventions

Follow kebab-case for all folders and files:

```
components/                     # Folder containing UI components
├── user-profile/       # Component folder
│   ├── user-profile.tsx
│   ├── user-profile.test.tsx
│   └── styles.ts
└── auth-form/
    ├── auth-form.tsx
    └── auth-form.test.tsx
```

### 4.3 Type Safety

```typescript
// Strict configuration
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}

// Type utilities
type Nullable<T> = T | null
type Required<T> = { [P in keyof T]-?: T[P] }

// Type guards
function isUser(value: unknown): value is User {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'email' in value
  )
}
```

### 4.4 Performance Optimization

```typescript
// Code splitting
const DynamicComponent = dynamic(() => import('./heavy'))

// Memoization
const MemoizedComponent = memo(Component)

// Data fetching
export const revalidate = 3600 // revalidate every hour

// Image optimization
// next.config.js
module.exports = {
  images: {
    domains: ['assets.example.com'],
    formats: ['image/avif', 'image/webp']
  }
}
```

### 4.5 Error Handling

```typescript
// features/shared/errors/api-error.ts
class ApiError extends Error {
  constructor(
    message: string,
    public code: string,
    public status: number
  ) {
    super(message)
  }
}

// features/shared/components/error-boundary/error-boundary.tsx
export class ErrorBoundary extends React.Component {
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error
    console.error(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />
    }
    return this.props.children
  }
}

// API error handling
try {
  await api.post('/endpoint')
} catch (error) {
  if (error instanceof ApiError) {
    // Handle API error
  } else if (error instanceof NetworkError) {
    // Handle network error
  }
}
```

## 5. Advanced Patterns

### 5.1 Domain Events

```typescript
// features/users/events/user-events.ts
interface UserEvent {
  type: 'USER_CREATED' | 'USER_UPDATED' | 'USER_DELETED'
  payload: User
  metadata: {
    timestamp: number
    triggeredBy: string
  }
}

// Event emitter setup
const eventEmitter = new EventEmitter()

// Event publisher
const publishUserEvent = (event: UserEvent) => {
  eventEmitter.emit(event.type, event)
}

// Event subscriber
eventEmitter.on('USER_CREATED', async (event: UserEvent) => {
  // Handle user created
  await sendWelcomeEmail(event.payload)
  await setupUserDefaults(event.payload)
})
```

### 5.2 Advanced State Management

```typescript
// features/cart/stores/cart-store.ts
// Computed selectors
const selectTotalPrice = (state: CartStore) => {
  return state.items.reduce((sum, item) => {
    return sum + item.price * item.quantity
  }, 0)
}

// Store slices
interface CartSlice {
  items: CartItem[]
  addItem: (item: Product, quantity: number) => void
  removeItem: (itemId: string) => void
}

interface UISlice {
  isCartOpen: boolean
  toggleCart: () => void
}

// Combined store with persistence and devtools
const useStore = create<CartSlice & UISlice>()(
  devtools(
    persist(
      (set) => ({
        items: [],
        isCartOpen: false,

        addItem: (item, quantity) =>
          set((state) => ({
            items: [...state.items, { ...item, quantity }]
          })),

        removeItem: (itemId) =>
          set((state) => ({
            items: state.items.filter((item) => item.id !== itemId)
          })),

        toggleCart: () =>
          set((state) => ({
            isCartOpen: !state.isCartOpen
          }))
      }),
      {
        name: 'cart-storage'
      }
    )
  )
)
```

### 5.3 Advanced Routing

```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Auth check
  const token = request.cookies.get('token')
  
  // Role check
  const userRole = request.cookies.get('userRole')
  
  // Multi-tenant check
  const tenantId = request.headers.get('x-tenant-id')
  
  // Complex routing logic
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    
    if (userRole !== 'ADMIN') {
      return NextResponse.redirect(new URL('/forbidden', request.url))
    }
  }

  // Tenant routing
  if (tenantId) {
    // Modify request or response based on tenant
    const response = NextResponse.next()
    response.headers.set('x-tenant-id', tenantId)
    return response
  }
}

export const config = {
  matcher: ['/admin/:path*', '/dashboard/:path*']
}

// Route groups
app/
├── (marketing)/     # Public routes
│   ├── page.tsx    # Homepage
│   ├── about/
│   └── blog/
├── (dashboard)/    # Protected routes
│   ├── layout.tsx
│   ├── overview/
│   └── settings/
└── (admin)/       # Admin routes
    ├── layout.tsx
    ├── users/
    └── settings/
```

### 5.4 Form Management

```typescript
// features/users/schemas/user-schema.ts
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

// Validation schema
const userSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
})

type UserFormData = z.infer<typeof userSchema>

// features/users/hooks/use-user-form.ts
const useUserForm = () => {
  const form = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: ''
    }
  })

  const onSubmit = async (data: UserFormData) => {
    try {
      await createUser(data)
      form.reset()
    } catch (error) {
      form.setError('root', { message: error.message })
    }
  }

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit)
  }
}

// features/users/components/user-form/user-form.tsx
const UserForm = () => {
  const { form, onSubmit } = useUserForm()
  
  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* Other fields */}
        
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
```

## 6. Testing Strategy

### 6.1 Unit Testing

```typescript
// features/auth/components/login-form/login-form.test.tsx
describe('LoginForm', () => {
  it('should render all fields', () => {
    render(<LoginForm />)
    
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Password')).toBeInTheDocument()
  })

  it('should handle submit', async () => {
    const onSubmit = jest.fn()
    render(<LoginForm onSubmit={onSubmit} />)

    await userEvent.type(screen.getByLabelText('Email'), 'test@example.com')
    await userEvent.type(screen.getByLabelText('Password'), 'password123')
    await userEvent.click(screen.getByRole('button', { name: /submit/i }))

    expect(onSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123'
    })
  })
})

// features/auth/hooks/use-auth.test.ts
describe('useAuth', () => {
  it('should handle login', async () => {
    const { result } = renderHook(() => useAuth())

    await act(async () => {
      await result.current.login({
        email: 'test@example.com',
        password: 'password123'
      })
    })

    expect(result.current.user).toBeDefined()
    expect(result.current.isAuthenticated).toBe(true)
  })
})
```

### 6.2 Integration Testing

```typescript
// features/auth/api/auth-api.test.ts
describe('Auth API', () => {
  const server = setupServer(
    rest.post('/api/login', (req, res, ctx) => {
      return res(
        ctx.json({
          user: { id: '1', email: 'test@example.com' },
          token: 'fake-token'
        })
      )
    })
  )

  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  it('should handle login flow', async () => {
    const response = await authApi.login({
      email: 'test@example.com',
      password: 'password123'
    })

    expect(response.user).toBeDefined()
    expect(response.token).toBeDefined()
  })
})
```

### 6.3 E2E Testing

```typescript
// e2e/auth/login.spec.ts
import { test, expect } from '@playwright/test'

test('login flow', async ({ page }) => {
  await page.goto('/login')

  // Fill login form
  await page.fill('[name="email"]', 'test@example.com')
  await page.fill('[name="password"]', 'password123')
  await page.click('button[type="submit"]')

  // Assert successful login
  await expect(page).toHaveURL('/dashboard')
  await expect(page.getByText('Welcome')).toBeVisible()
})
```

## 7. Development Workflow

### 7.1 Development Setup

```json
// package.json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit",
    "test": "jest",
    "test:watch": "jest --watch",
    "e2e": "playwright test",
    "prepare": "husky install"
  }
}

// .vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

### 7.2 Build Process

```typescript
// next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

module.exports = withBundleAnalyzer({
  images: {
    domains: ['assets.example.com']
  },
  webpack: (config, { isServer }) => {
    // Custom webpack config
    return config
  }
})
```

### 7.3 Deployment Strategy

```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Type check
        run: npm run type-check
      
      - name: Run tests
        run: npm test
      
      - name: Build
        run: npm run build
      
      - name: Deploy
        # Deploy steps
```

## 8. Maintenance and Scaling

### 8.1 Code Quality

```typescript
// .eslintrc.js
module.exports = {
  extends: [
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended'
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/explicit-function-return-type': 'warn'
  }
}

// prettier.config.js
module.exports = {
  semi: false,
  singleQuote: true,
  trailingComma: 'es5'
}
```

### 8.2 Documentation

```markdown
# features/auth/README.md
# Auth Feature

## Overview
Handles user authentication and authorization.

## UI Components
- login-form: Handles user login
- register-form: Handles user registration

## API
- POST /api/auth/login
- POST /api/auth/register

## State Management
Uses Zustand for state management.

## Types
See `types/auth-types.ts` for type definitions.
```

### 8.3 Performance Monitoring

```typescript
// shared/lib/monitoring.ts
export const monitoring = {
  logError: (error: Error) => {
    // Send to error tracking service
    console.error(error)
  },

  logPerformance: (metric: PerformanceMetric) => {
    // Send to analytics service
    console.log(metric)
  }
}

// Usage in components
try {
  await operation()
} catch (error) {
  monitoring.logError(error)
}
```
