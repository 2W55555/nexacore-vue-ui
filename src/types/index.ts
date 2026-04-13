// User Types
export interface User {
  id: string
  username: string
  email: string
  avatar?: string
  role: 'admin' | 'editor' | 'viewer'
  createdAt: string
  lastLoginAt: string
}

// Auth Types
export interface LoginCredentials {
  username: string
  password: string
  rememberMe?: boolean
}

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
}

// Script Types
export interface Script {
  id: string
  title: string
  content: string
  type: '口播' | '评测' | '对比' | '科普'
  carModel?: string
  tags: string[]
  duration: number
  status: '草稿' | '已生成' | '已使用'
  createdAt: string
  updatedAt: string
}

export interface ScriptGenerateParams {
  carModel: string
  scriptType: string
  duration: number
  tone: string
  keyPoints: string[]
  includeHashtags: boolean
  includeCTA: boolean
}

// Template Types
export interface Template {
  id: string
  name: string
  description: string
  content: string
  category: string
  tags: string[]
  usageCount: number
  thumbnail?: string
  isFavorite: boolean
  createdAt: string
  updatedAt: string
}

// Knowledge Types
export interface CarModel {
  id: string
  name: string
  brand: string
  category: '轿车' | 'SUV' | 'MPV' | '跑车' | '皮卡'
  price: string
  releaseDate: string
  thumbnail?: string
  specs: CarSpecs
  sellingPoints: SellingPoint[]
}

export interface CarSpecs {
  engine: string
  transmission: string
  power: string
  torque: string
  acceleration: string
  fuelConsumption: string
  dimensions: string
  wheelbase: string
}

export interface SellingPoint {
  id: string
  title: string
  description: string
  icon?: string
  highlightLevel: 'high' | 'medium' | 'low'
}

// History Types
export interface HistoryItem {
  id: string
  type: 'script' | 'template' | '素材'
  title: string
  thumbnail?: string
  carModel: string
  scriptType: string
  createdAt: string
  duration?: number
  status: '完成' | '处理中' | '失败'
}

// Dashboard Stats
export interface DashboardStats {
  totalScripts: number
  todayScripts: number
  weekScripts: number
  totalTemplates: number
  totalCarModels: number
  storageUsed: number
  storageTotal: number
}

export interface QuickAction {
  id: string
  title: string
  description: string
  icon: string
  route: string
  color: string
}

// Settings Types
export interface SystemSettings {
  general: {
    siteName: string
    siteLogo: string
    language: string
    timezone: string
  }
  notification: {
    email: boolean
    push: boolean
    inApp: boolean
  }
  security: {
    twoFactor: boolean
    sessionTimeout: number
    ipWhitelist: string[]
  }
}

export interface RolePermission {
  id: string
  name: string
  description: string
  permissions: Permission[]
}

export interface Permission {
  id: string
  name: string
  description: string
  granted: boolean
}

// UI Types
export interface SelectOption {
  label: string
  value: string | number
  disabled?: boolean
}

export interface TableColumn {
  key: string
  title: string
  width?: string | number
  align?: 'left' | 'center' | 'right'
  sortable?: boolean
  fixed?: 'left' | 'right'
}

export interface PaginationProps {
  current: number
  pageSize: number
  total: number
  showSizeChanger?: boolean
  showQuickJumper?: boolean
  showTotal?: boolean
}

export interface TreeNode {
  id: string
  label: string
  children?: TreeNode[]
  isLeaf?: boolean
  icon?: string
  selected?: boolean
  expanded?: boolean
}
