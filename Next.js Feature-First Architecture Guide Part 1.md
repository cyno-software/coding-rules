# Hướng Dẫn Kiến Trúc Feature-First Next.js 14

## Mục Lục
1. [Cấu Trúc Dự Án](#1-cấu-trúc-dự-án)
  - [1.1 Cấu Trúc Thư Mục Gốc](#11-cấu-trúc-thư-mục-gốc)
  - [1.2 Cấu Trúc Feature Module](#12-cấu-trúc-feature-module)
  - [1.3 Cấu Trúc Shared Resources](#13-cấu-trúc-shared-resources)

2. [Quy Ước Đặt Tên](#2-quy-ước-đặt-tên)
  - [2.1 Quy Tắc Chung](#21-quy-tắc-chung)
  - [2.2 Ví Dụ Cụ Thể](#22-ví-dụ-cụ-thể)

3. [Tổ Chức Features](#3-tổ-chức-features)
   - [3.1 Tính Năng Xác Thực](#31-tính-năng-xác-thực)
   - [3.2 Tổ Chức State Management](#32-tổ-chức-state-management)
      - [3.2.1 Global State](#321-global-state)
      - [3.2.2 Feature State](#322-feature-state)
      - [3.2.3 Server State](#323-server-state)

4. [Mô Hình Luồng Dữ Liệu](#4-mô-hình-luồng-dữ-liệu)
  - [4.1 Luồng Xử Lý Dữ Liệu Chuẩn](#41-luồng-xử-lý-dữ-liệu-chuẩn)
  - [4.2 Xử Lý Mutations](#42-xử-lý-mutations)

5. [Triển Khai Chi Tiết](#5-triển-khai-chi-tiết)
  - [5.1 Data Table Với TanStack Table](#51-data-table-với-tanstack-table)
  - [5.2 Form Handling Với React Hook Form](#52-form-handling-với-react-hook-form)

6. [Xử Lý Lỗi và Loading States](#6-xử-lý-lỗi-và-loading-states)
  - [6.1 Error Handling](#61-error-handling)
  - [6.2 Loading States](#62-loading-states)

7. [Tối Ưu Hiệu Suất](#7-tối-ưu-hiệu-suất)
  - [7.1 React Query Optimization](#71-react-query-optimization)
  - [7.2 Component Optimization](#72-component-optimization)
  - [7.3 Code Splitting và Dynamic Imports](#73-code-splitting-và-dynamic-imports)

8. [Testing Strategy](#8-testing-strategy)
  - [8.1 Unit Testing Components](#81-unit-testing-components)
  - [8.2 Integration Testing](#82-integration-testing)
  - [8.3 API Mocking](#83-api-mocking)

9. [Deployment và Configuration](#9-deployment-và-configuration)
  - [9.1 Environment Variables](#91-environment-variables)
  - [9.2 Next.js Config](#92-nextjs-config)
  - [9.3 CI/CD Workflow](#93-cicd-workflow)

10. [Best Practices](#10-best-practices)
   - Code Organization
   - State Management
   - Performance
   - Testing
   - Error Handling

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

## 1. Cấu Trúc Dự Án

### 1.1 Cấu Trúc Thư Mục Gốc
```typescript
src/
├── app/                     # Next.js App Router
│   ├── (auth)/             # Nhóm route xác thực
│   │   ├── login/
│   │   ├── register/
│   │   └── forgot-password/
│   │
│   ├── (dashboard)/        # Nhóm route dashboard
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── loading.tsx
│   │
│   └── api/                # Routes API
│       ├── auth/
│       └── users/
│
├── features/               # Các module tính năng
│   ├── auth/
│   ├── users/
│   └── products/
│
├── shared/                # Tài nguyên dùng chung
│   ├── components/
│   ├── hooks/
│   └── utils/
│
├── types/                 # Types toàn cục
└── lib/                  # Cấu hình thư viện bên ngoài
```

### 1.2 Cấu Trúc Feature Module
```typescript
features/auth/              # Module xác thực
├── api/                   # Tích hợp API
│   ├── queries/          # React Query hooks
│   │   ├── use-auth-user.ts
│   │   └── use-auth-session.ts
│   └── mutations/        # Mutation hooks
│       ├── use-login.ts
│       └── use-register.ts
│
├── components/           # Components UI
│   ├── forms/           # Form components
│   │   ├── login-form/
│   │   │   ├── login-form.tsx
│   │   │   ├── use-login-form.ts
│   │   │   └── types.ts
│   │   └── register-form/
│   └── shared/          # Components dùng chung trong feature
│
├── hooks/               # Custom hooks
│   ├── use-auth.ts
│   └── use-permissions.ts
│
├── stores/             # Quản lý state
│   └── auth-store.ts
│
├── utils/              # Tiện ích
│   ├── token.ts
│   └── validation.ts
│
└── types/              # Định nghĩa types
    ├── auth.types.ts
    └── api.types.ts
```

### 1.3 Cấu Trúc Shared Resources
```typescript
shared/
├── components/
│   ├── ui/            # Components UI cơ bản
│   │   ├── button/
│   │   │   ├── button.tsx
│   │   │   ├── button.test.tsx
│   │   │   └── types.ts
│   │   └── input/
│   │
│   ├── layout/       # Components layout
│   │   ├── header/
│   │   └── sidebar/
│   │
│   └── data/         # Components hiển thị dữ liệu
│       └── data-table/
│
├── hooks/
│   ├── data/         # Hooks xử lý dữ liệu
│   │   ├── use-query-wrapper.ts
│   │   └── use-mutation-wrapper.ts
│   │
│   ├── ui/          # Hooks UI
│   │   ├── use-modal.ts
│   │   └── use-toast.ts
│   │
│   └── form/        # Hooks form
│       └── use-form.ts
│
└── utils/
    ├── api/         # Tiện ích API
    │   ├── api-client.ts
    │   └── error-handler.ts
    │
    ├── form/        # Tiện ích form
    │   └── validators.ts
    │
    └── date/        # Tiện ích xử lý ngày tháng
        └── formatters.ts
```

## 2. Quy Ước Đặt Tên

### 2.1 Quy Tắc Chung
- Thư mục: kebab-case
- Files: kebab-case
- Components: PascalCase
- Hooks: camelCase (prefix use)
- Types/Interfaces: PascalCase

### 2.2 Ví Dụ Cụ Thể:
```typescript
// Tên thư mục
features/
├── user-management/
├── product-catalog/
└── order-processing/

// Tên file
components/
├── user-table.tsx       # Component file
├── user-table.test.tsx  # Test file
└── use-user-table.ts    # Hook file

// Trong code
// Components
export const UserTable = () => {}

// Hooks
export const useUserTable = () => {}

// Types
interface UserTableProps {}
type UserTableData = {}

// Constants
const DEFAULT_PAGE_SIZE = 10
const API_ENDPOINTS = {}
```

## 3. Tổ Chức Features

### 3.1 Tính Năng Xác Thực
```typescript
// features/auth/stores/auth-store.ts
interface AuthState {
  user: User | null
  isLoading: boolean
  error: Error | null
}

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  isLoading: false,
  error: null,

  login: async (credentials: LoginCredentials) => {
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

// features/auth/hooks/use-auth.ts
export const useAuth = () => {
  const store = useAuthStore()
  const { data: session } = useSession()

  const handleLogin = async (credentials: LoginCredentials) => {
    try {
      await store.login(credentials)
    } catch (error) {
      handleError(error)
    }
  }

  return {
    user: store.user,
    isLoading: store.isLoading,
    handleLogin,
    handleLogout: store.logout
  }
}
```

### 3.2 Tổ Chức State Management

#### 3.2.1 Global State
```typescript
// store/global/index.ts
export const useGlobalStore = create<GlobalStore>()((set) => ({
  theme: 'light',
  language: 'en',
  setTheme: (theme) => set({ theme }),
  setLanguage: (language) => set({ language })
}))

## 4. Mô Hình Luồng Dữ Liệu

### 4.1 Luồng Xử Lý Dữ Liệu Chuẩn
```typescript
// 1. API Layer (React Query)
const useUserData = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => fetchUsers()
  })
}

// 2. Store Layer (Zustand)
const useUserStore = create((set) => ({
  filters: initialFilters,
  setFilters: (filters) => set({ filters })
}))

// 3. Business Logic Layer (Custom Hooks)
const useUserManagement = () => {
  const { data, isLoading } = useUserData()
  const { filters, setFilters } = useUserStore()
  const { mutate: createUser } = useCreateUserMutation()

  const handleCreateUser = async (userData: UserInput) => {
    try {
      await createUser(userData)
    } catch (error) {
      handleError(error)
    }
  }

  return {
    users: data,
    isLoading,
    filters,
    setFilters,
    handleCreateUser
  }
}

// 4. UI Layer (Components)
const UserTable = () => {
  const {
    users,
    isLoading,
    filters,
    handleCreateUser
  } = useUserManagement()

  return (
    <div>
      <TableFilters filters={filters} />
      <DataTable 
        data={users} 
        loading={isLoading} 
      />
    </div>
  )
}
```

#### 3.2.2 Feature State
```typescript
// features/users/stores/user-store.ts
interface UserState {
  filters: UserFilters
  sorting: SortingState
  selection: RowSelectionState
  pagination: PaginationState
}

export const useUserStore = create<UserState>()((set) => ({
  filters: initialFilters,
  sorting: [],
  selection: {},
  pagination: {
    pageIndex: 0,
    pageSize: 10
  },
  
  setFilters: (filters) => set({ filters }),
  setSorting: (sorting) => set({ sorting }),
  setSelection: (selection) => set({ selection }),
  setPagination: (pagination) => set({ pagination }),
  
  reset: () => set({
    filters: initialFilters,
    sorting: [],
    selection: {},
    pagination: { pageIndex: 0, pageSize: 10 }
  })
}))
```

#### 3.2.3 Server State
```typescript
// features/users/api/queries/use-users.ts
export const useUsers = () => {
  const filters = useUserStore(state => state.filters)
  const sorting = useUserStore(state => state.sorting)
  const pagination = useUserStore(state => state.pagination)

  return useQuery({
    queryKey: ['users', filters, sorting, pagination],
    queryFn: () => fetchUsers({ filters, sorting, pagination }),
    keepPreviousData: true
  })
}

// features/users/api/mutations/use-create-user.ts
export const useCreateUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      toast.success('User created successfully')
    }
  })
}
```

## 4. Mô Hình Luồng Dữ Liệu

### 4.1 Luồng Xử Lý Dữ Liệu Chuẩn
```typescript
// 1. API Layer (React Query)
const useUserData = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => fetchUsers()
  })
}

// 2. Store Layer (Zustand) (Không bắt buộc phải có bước này)
const useUserStore = create((set) => ({
  filters: initialFilters,
  setFilters: (filters) => set({ filters })
}))

// 3. Business Logic Layer (Custom Hooks)
const useUserManagement = () => {
  const { data, isLoading } = useUserData()
  const { filters, setFilters } = useUserStore()
  const { mutate: createUser } = useCreateUserMutation()

  const handleCreateUser = async (userData: UserInput) => {
    try {
      await createUser(userData)
    } catch (error) {
      handleError(error)
    }
  }

  return {
    users: data,
    isLoading,
    filters,
    setFilters,
    handleCreateUser
  }
}

// 4. UI Layer (Components)
const UserTable = () => {
  const {
    users,
    isLoading,
    filters,
    handleCreateUser
  } = useUserManagement()

  return (
    <div>
      <TableFilters filters={filters} />
      <DataTable 
        data={users} 
        loading={isLoading} 
      />
    </div>
  )
}
```

### 4.2 Xử Lý Mutations
```typescript
// features/users/api/mutations/use-create-user.ts
export const useCreateUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UserInput) => createUserApi(data),
    onSuccess: () => {
      // Invalidate và refetch
      queryClient.invalidateQueries({ queryKey: ['users'] })
      // Hiển thị thông báo thành công
      toast.success('Người dùng đã được tạo')
    },
    onError: (error) => {
      // Xử lý lỗi
      handleError(error)
      // Hiển thị thông báo lỗi
      toast.error('Không thể tạo người dùng')
    }
  })
}
```

## 5. Triển Khai Chi Tiết

### 5.1 Data Table Với TanStack Table
```typescript
// features/users/components/user-table/user-table.tsx
export const UserTable = () => {
  const {
    data,
    isLoading,
    pageCount,
    filters,
    sorting,
    pagination,
    onPaginationChange,
    onSortingChange,
    onFiltersChange
  } = useUserTable()

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      pagination,
      columnFilters: filters
    },
    onSortingChange,
    onPaginationChange,
    onColumnFiltersChange: onFiltersChange,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    pageCount
  })

  return (
    <div>
      <TableToolbar 
        table={table}
        filters={filters}
        onFiltersChange={onFiltersChange}
      />
      
      <DataTable
        table={table}
        loading={isLoading}
      />
      
      <TablePagination
        table={table}
        pageCount={pageCount}
      />
    </div>
  )
}

// features/users/components/user-table/hooks/use-user-table.ts
export const useUserTable = () => {
  // State local
  const [sorting, setSorting] = useState<SortingState>([])
  const [filters, setFilters] = useState<ColumnFiltersState>([])
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  })

  // Data fetching
  const { data, isLoading } = useQuery({
    queryKey: ['users', sorting, filters, pagination],
    queryFn: () => fetchUsers({
      sorting,
      filters,
      pagination
    }),
    keepPreviousData: true
  })

  return {
    data: data?.users ?? [],
    pageCount: data?.pageCount ?? 0,
    isLoading,
    sorting,
    filters,
    pagination,
    onSortingChange: setSorting,
    onFiltersChange: setFilters,
    onPaginationChange: setPagination
  }
}
```

### 5.2 Form Handling Với React Hook Form
```typescript
// shared/hooks/use-form.ts
export const useAppForm = <TFormData extends Record<string, any>>({
  schema,
  defaultValues,
  onSubmit
}: UseFormProps<TFormData>) => {
  const form = useForm<TFormData>({
    resolver: zodResolver(schema),
    defaultValues
  })

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      await onSubmit(data)
      form.reset()
    } catch (error) {
      // Xử lý lỗi form
      if (error instanceof ValidationError) {
        error.errors.forEach(({ path, message }) => {
          form.setError(path as any, { message })
        })
      } else {
        form.setError('root', { message: error.message })
      }
    }
  })

  return {
    form,
    handleSubmit,
    isLoading: form.formState.isSubmitting,
    errors: form.formState.errors
  }
}

// features/users/components/user-form/user-form.tsx
export const UserForm = () => {
  const {
    form,
    handleSubmit,
    isLoading,
    errors
  } = useAppForm({
    schema: userSchema,
    defaultValues: {
      name: '',
      email: '',
      role: 'USER'
    },
    onSubmit: async (data) => {
      await createUser(data)
    }
  })

  return (
    <Form onSubmit={handleSubmit}>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tên</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      {/* Các field khác */}
      
      <Button 
        type="submit" 
        loading={isLoading}
      >
        Tạo người dùng
      </Button>
    </Form>
  )
}
```

## 6. Xử Lý Lỗi và Loading States

### 6.1 Error Handling
```typescript
// shared/utils/error-handling.ts
export class ApiError extends Error {
  constructor(
    message: string,
    public code: string,
    public status: number
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

export const handleError = (error: unknown) => {
  if (error instanceof ApiError) {
    switch (error.code) {
      case 'VALIDATION_ERROR':
        toast.error('Dữ liệu không hợp lệ')
        break
      case 'UNAUTHORIZED':
        toast.error('Vui lòng đăng nhập lại')
        // Redirect to login
        break
      default:
        toast.error('Đã có lỗi xảy ra')
    }
  } else {
    toast.error('Đã có lỗi không xác định')
  }
  
  // Log error
  logger.error(error)
}
```

### 6.2 Loading States
```typescript
// shared/components/ui/loading/loading-state.tsx
interface LoadingStateProps {
  loading: boolean
  children: React.ReactNode
  fallback?: React.ReactNode
}

export const LoadingState = ({
  loading,
  children,
  fallback = <Spinner />
}: LoadingStateProps) => {
  if (loading) return fallback
  return children
}

// Usage
<LoadingState loading={isLoading}>
  <UserTable data={users} />
</LoadingState>
```

## 7. Tối Ưu Hiệu Suất

### 7.1 React Query Optimization
```typescript
// lib/react-query/query-client.ts
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Thời gian cache
      staleTime: 1000 * 60 * 5, // 5 phút
      // Thời gian giữ data trong cache
      cacheTime: 1000 * 60 * 30, // 30 phút
      // Không tự động refetch khi focus window
      refetchOnWindowFocus: false,
      // Số lần retry khi gặp lỗi
      retry: 1,
      // Sử dụng data cũ khi fetch data mới
      keepPreviousData: true
    }
  }
})

// Sử dụng prefetching
const prefetchUsers = async () => {
  await queryClient.prefetchQuery({
    queryKey: ['users'],
    queryFn: fetchUsers
  })
}

// Sử dụng infinite queries
const useInfiniteUsers = () => {
  return useInfiniteQuery({
    queryKey: ['users'],
    queryFn: ({ pageParam = 0 }) => fetchUsers({ page: pageParam }),
    getNextPageParam: (lastPage) => lastPage.nextCursor
  })
}
```

### 7.2 Component Optimization
```typescript
// features/users/components/user-list/user-list.tsx
import { memo } from 'react'

// Tách component nhỏ và sử dụng memo
const UserRow = memo(({ user }: UserRowProps) => {
  return (
    <tr>
      <td>{user.name}</td>
      <td>{user.email}</td>
    </tr>
  )
})

// Sử dụng virtualization cho danh sách lớn
import { useVirtualizer } from '@tanstack/react-virtual'

export const UserList = ({ users }: UserListProps) => {
  const parentRef = useRef<HTMLDivElement>(null)

  const rowVirtualizer = useVirtualizer({
    count: users.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
    overscan: 5
  })

  return (
    <div ref={parentRef} className="h-screen overflow-auto">
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative'
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => (
          <UserRow
            key={virtualRow.index}
            user={users[virtualRow.index]}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `${virtualRow.size}px`,
              transform: `translateY(${virtualRow.start}px)`
            }}
          />
        ))}
      </div>
    </div>
  )
}
```

### 7.3 Code Splitting và Dynamic Imports
```typescript
// Lazy loading components
const UserAnalytics = dynamic(() => import('./user-analytics'), {
  loading: () => <LoadingSpinner />,
  ssr: false
})

// Route-based code splitting
// app/(dashboard)/analytics/page.tsx
export default async function AnalyticsPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <UserAnalytics />
    </Suspense>
  )
}
```

## 8. Testing Strategy

### 8.1 Unit Testing Components
```typescript
// features/users/components/user-table/user-table.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { UserTable } from './user-table'

describe('UserTable', () => {
  const mockUsers = [
    { id: 1, name: 'User 1', email: 'user1@example.com' },
    { id: 2, name: 'User 2', email: 'user2@example.com' }
  ]

  it('hiển thị danh sách người dùng', () => {
    render(<UserTable users={mockUsers} />)
    
    expect(screen.getByText('User 1')).toBeInTheDocument()
    expect(screen.getByText('User 2')).toBeInTheDocument()
  })

  it('xử lý phân trang', () => {
    const onPageChange = jest.fn()
    render(
      <UserTable 
        users={mockUsers}
        onPageChange={onPageChange}
      />
    )
    
    fireEvent.click(screen.getByText('Next'))
    expect(onPageChange).toHaveBeenCalled()
  })
})
```

### 8.2 Integration Testing
```typescript
// features/auth/tests/auth-flow.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { AuthProvider } from '../providers/auth-provider'
import { LoginForm } from '../components/login-form'

describe('Auth Flow', () => {
  it('xử lý luồng đăng nhập', async () => {
    render(
      <AuthProvider>
        <LoginForm />
      </AuthProvider>
    )

    // Nhập thông tin đăng nhập
    fireEvent.change(
      screen.getByLabelText('Email'),
      { target: { value: 'test@example.com' }}
    )
    
    fireEvent.change(
      screen.getByLabelText('Password'),
      { target: { value: 'password123' }}
    )

    // Submit form
    fireEvent.click(screen.getByText('Đăng nhập'))

    // Kiểm tra kết quả
    await waitFor(() => {
      expect(screen.getByText('Đăng nhập thành công')).toBeInTheDocument()
    })
  })
})
```

### 8.3 API Mocking
```typescript
// shared/test/mocks/handlers.ts
import { rest } from 'msw'

export const handlers = [
  rest.post('/api/auth/login', (req, res, ctx) => {
    return res(
      ctx.json({
        user: {
          id: 1,
          name: 'Test User'
        },
        token: 'fake-token'
      })
    )
  }),

  rest.get('/api/users', (req, res, ctx) => {
    return res(
      ctx.json({
        users: [
          { id: 1, name: 'User 1' },
          { id: 2, name: 'User 2' }
        ],
        total: 2
      })
    )
  })
]

// shared/test/setup.ts
import { setupServer } from 'msw/node'
import { handlers } from './handlers'

export const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
```

## 9. Deployment và Configuration

### 9.1 Environment Variables
```typescript
// src/env.mjs
import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    API_KEY: z.string().min(1),
    NEXTAUTH_URL: z.string().url(),
    NEXTAUTH_SECRET: z.string().min(1)
  },
  client: {
    NEXT_PUBLIC_API_URL: z.string().url(),
    NEXT_PUBLIC_WS_URL: z.string().url()
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    API_KEY: process.env.API_KEY,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_WS_URL: process.env.NEXT_PUBLIC_WS_URL
  }
})
```

### 9.2 Next.js Config
```typescript
// next.config.mjs
import { withAxiom } from 'next-axiom'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['assets.example.com'],
    formats: ['image/avif', 'image/webp']
  },
  experimental: {
    serverActions: true
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,DELETE,PATCH,POST,PUT' }
        ]
      }
    ]
  }
}

export default withAxiom(nextConfig)
```

### 9.3 CI/CD Workflow
```yaml
# .github/workflows/main.yml
name: CI/CD

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Lint
        run: npm run lint
      
      - name: Type check
        run: npm run type-check
      
      - name: Test
        run: npm run test

  build:
    needs: validate
    runs-on: ubuntu-latest
    steps:
      - name: Build
        run: npm run build
      
      - name: Deploy
        # Các bước deploy
```

## 10. Best Practices

1. Code Organization:
- Tổ chức code theo tính năng
- Giữ components nhỏ và tái sử dụng
- Tách biệt logic và UI
- Sử dụng TypeScript nghiêm ngặt

2. State Management:
- Sử dụng React Query cho server state
- Sử dụng Zustand cho client state
- Implement optimistic updates
- Cache và invalidate hợp lý

3. Performance:
- Lazy loading components
- Implement virtualization cho danh sách lớn
- Optimize re-renders với memo
- Sử dụng proper caching strategies

4. Testing:
- Unit test cho components
- Integration test cho flows
- E2E test cho critical paths
- Mock API calls trong tests

5. Error Handling:
- Implement error boundaries
- Proper API error handling
- Form validation
- Logging và monitoring
