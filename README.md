# OBS - User Management System

A simple user management application built with **React**, **TypeScript**, **Material-UI**, and **Atomic Design** principles.

##  Features

- **User List Display**: View all users in a responsive grid layout with search functionality
- **User Details Modal**: View complete user information including contact details, address, and company info
- **Add User**: Create new users with a comprehensive form and validation
- **Edit User**: Update existing user information
- **Delete User**: Remove users from the list
- **Responsive Design**: Fully responsive layout that works on desktop, tablet, and mobile devices
- **State Management**: Centralized state management using React Context API
- **TypeScript**: Full type safety with TypeScript interfaces and types
- **Atomic Design**: Component architecture following atomic design principles
- **Unit Testing**: Comprehensive test coverage using Vitest and React Testing Library
- **Code Quality**: ESLint and Prettier configuration for consistent code style


##  Technology Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Language**: TypeScript
- **UI Library**: Material-UI (MUI)
- **Styling**: Emotion (MUI's styling solution)
- **State Management**: React Context API
- **Icons**: Material Icons
- **Testing**: Vitest + React Testing Library
- **Code Quality**: ESLint + Prettier
- **API**: JSONPlaceholder (dummy REST API)
- **Images**: Picsum Photos (random profile pictures)

##  Installation

1. **Clone or download the project**

2. **Install dependencies**:
   \`\`\`
   npm install
   \`\`\`

3. **Run the development server**:
   \`\`\`
   npm run dev
   \`\`\`

4. **Open your browser** and navigate to `http://localhost:5173`

##  Testing

Run the test suite:

\`\`\`
npm test
\`\`\`

Run tests in watch mode:

\`\`\`
npm run test:watch
\`\`\`



##  Features in Detail

### User List
- Grid layout with user cards
- Search functionality (by name, email, username, or phone)
- Quick actions: View, Edit, Delete
- Add new user button
- Responsive grid (1-3 columns based on screen size)

### User Details Modal
- Complete user information display
- Profile picture from Picsum Photos
- Contact information (email, phone, website)
- Address details
- Company information
- Edit button for quick access

### User Form Modal
- Add new users or edit existing ones
- Comprehensive form validation
- Required fields: name, username, email, phone, city
- Email format validation
- Phone number validation
- Website format validation
- Organized sections (Personal, Contact, Address, Company)

### State Management
- Centralized user state with Context API
- CRUD operations (Create, Read, Update, Delete)
- Loading state management
- Error handling
- Custom hook for easy access



### Manual Deployment

Build the project:
\`\`\`
npm run build
\`\`\`



