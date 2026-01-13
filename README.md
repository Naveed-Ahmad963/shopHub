# ShopHub - MERN Stack Ecommerce Frontend

A modern, fully-featured ecommerce frontend built with React, Redux Toolkit, and Tailwind CSS.

## 🚀 Features

- **User Authentication** - Login, Register, Profile Management
- **Product Browsing** - Search, Filter by Category, Product Details
- **Shopping Cart** - Add/Remove Items, Quantity Management
- **Order Management** - Checkout, Order History, Order Tracking
- **Reviews & Ratings** - Product Reviews System
- **Admin Panel** - Manage Products, Orders, Users, Categories
- **Responsive Design** - Mobile-first, works on all devices
- **State Management** - Redux Toolkit with RTK Query
- **Form Validation** - React Hook Form

## 🛠️ Tech Stack

- **React 18.3** - UI Library
- **Vite** - Build Tool
- **Redux Toolkit** - State Management
- **RTK Query** - Data Fetching
- **React Router v6** - Routing
- **React Hook Form** - Form Management
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

## 📦 Installation

1. **Clone the repository**

```bash
git clone <your-repo-url>
cd ecommerce-frontend
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**
   Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:5000/api
```

4. **Start development server**

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## 🏗️ Project Structure

```
src/
├── api/                    # RTK Query API configuration
├── components/             # Reusable components
│   ├── common/            # Common UI components
│   ├── home/              # Home page components
│   └── layout/            # Layout components
├── features/              # Feature-based modules
│   ├── auth/              # Authentication
│   ├── cart/              # Shopping cart
│   ├── products/          # Products
│   ├── categories/        # Categories
│   ├── orders/            # Orders
│   ├── reviews/           # Reviews
│   └── admin/             # Admin panel
├── pages/                 # Page components
├── store/                 # Redux store
├── utils/                 # Utility functions
├── App.jsx               # Main app component
├── main.jsx              # Entry point
└── index.css             # Global styles
```

## 🔑 Key Components

### Authentication

- Login page with form validation
- Registration with password confirmation
- Protected routes for authenticated users
- Admin-only routes

### Product Management

- Product listing with search and filters
- Product detail page with reviews
- Add to cart functionality
- Stock availability checking

### Shopping Cart

- Persistent cart (localStorage)
- Quantity management
- Real-time total calculation
- Cart summary

### Admin Panel

- Dashboard with statistics
- Product CRUD operations
- Order management with status updates
- User management
- Category management

## 🎨 Styling

The project uses Tailwind CSS with a custom configuration:

- **Primary Color**: Blue (#3b82f6)
- **Responsive Breakpoints**: sm, md, lg
- **Custom Components**: Buttons, inputs, cards
- **Dark Mode**: Not implemented (can be added)

## 🔐 Authentication Flow

1. User logs in → JWT token stored in localStorage
2. Token included in API headers automatically
3. Protected routes check for valid token
4. Admin routes verify admin role
5. Logout clears token and redirects

## 📱 API Integration

All backend endpoints are integrated via RTK Query:

```javascript
// Products API
GET    /api/products
GET    /api/products/:id
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id

// Orders API
GET    /api/orders
GET    /api/orders/:id
GET    /api/orders/my
POST   /api/orders
PUT    /api/orders/:id/status

// And more...
```

## 🚀 Build for Production

```bash
npm run build
```

The production build will be created in the `dist` folder.

## 📝 Environment Variables

| Variable     | Description     | Default                   |
| ------------ | --------------- | ------------------------- |
| VITE_API_URL | Backend API URL | http://localhost:5000/api |

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Your Name - [Your Email]

## 🙏 Acknowledgments

- React Team
- Redux Team
- Tailwind CSS Team
- All contributors
