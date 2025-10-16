# Portfolio Database System

## Overview
This portfolio website now includes a robust database system that allows you to:
- Store projects persistently in a SQLite database
- Upload and manage project images
- Add, edit, and delete projects through an admin interface
- View projects immediately on the main page after uploading

## Features

### 🗄️ Database
- **SQLite Database**: Persistent storage using `better-sqlite3`
- **Automatic Schema**: Database and tables are created automatically
- **Sample Data**: Pre-populated with example projects
- **Data Directory**: Database stored in `data/portfolio.db`

### 📁 File Upload
- **Image Upload**: Support for JPG, PNG, GIF, WebP images
- **File Validation**: 5MB size limit and type checking
- **Unique Filenames**: UUID-based naming to prevent conflicts
- **Public Storage**: Images stored in `public/uploads/`

### 🔧 Admin Interface
- **Project Management**: Full CRUD operations (Create, Read, Update, Delete)
- **Image Upload**: Drag-and-drop or click-to-upload interface
- **Real-time Preview**: See image previews before saving
- **Form Validation**: Required field validation and error handling
- **Password Protection**: Secure deletion with password verification

## How to Use

### 1. Access Admin Panel
- Navigate to `/admin` in your browser
- Or click the "Admin" link in the main navigation

### 2. Add a New Project
1. Click "Add Project" button
2. Fill in the required fields:
   - **Title**: Project name
   - **Description**: Project description
   - **Technologies**: Comma-separated list (e.g., "Python, Machine Learning, Data Analysis")
   - **Category**: Select from dropdown
   - **GitHub Link**: Repository URL (optional)
   - **Live Link**: Demo URL (optional)
   - **Image**: Upload project screenshot
3. Click "Create" to save

### 3. Edit Existing Projects
1. Click "Edit" button on any project card
2. Modify the fields as needed
3. Upload a new image if desired
4. Click "Update" to save changes

### 4. Delete Projects
1. Click the trash icon on any project card
2. Enter your admin password in the security modal
3. Confirm deletion (this action cannot be undone)

### 5. View Projects
1. Click anywhere on a project card to visit the GitHub repository
2. If a live demo URL is available, it will redirect there instead
3. Use the hover buttons for specific GitHub or live demo links
4. All links open in new tabs for better navigation

## File Structure

```
src/
├── lib/
│   └── database.ts          # Database operations and schema
├── app/
│   ├── api/
│   │   ├── projects/        # Project CRUD API
│   │   └── upload/          # File upload API
│   └── admin/
│       └── page.tsx         # Admin page
└── components/
    └── ProjectAdmin.tsx     # Admin interface component

data/
└── portfolio.db             # SQLite database file

public/
└── uploads/                 # Uploaded images
```

## API Endpoints

### Projects API
- `GET /api/projects` - Get all projects (with optional category/limit filters)
- `POST /api/projects` - Create new project
- `GET /api/projects/[id]` - Get specific project
- `PUT /api/projects/[id]` - Update project
- `DELETE /api/projects/[id]` - Delete project

### Upload API
- `POST /api/upload` - Upload image file

### Authentication API
- `POST /api/auth/verify` - Verify admin password for secure operations

## Database Schema

```sql
CREATE TABLE projects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  technologies TEXT NOT NULL,  -- JSON array as string
  githubLink TEXT DEFAULT '',
  liveLink TEXT DEFAULT '',
  image TEXT DEFAULT '',
  category TEXT DEFAULT 'Other',
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
npm install
```

### Environment Setup
Create a `.env.local` file in the root directory:
```bash
# Admin password for project deletion
ADMIN_PASSWORD=your_secure_password_here
```

**Default password**: `admin123` (change this in production!)

### Running the Development Server
```bash
npm run dev
```

### Database Reset
To reset the database with fresh sample data:
1. Delete `data/portfolio.db`
2. Restart the development server
3. The database will be recreated with sample data

## Production Considerations

For production deployment, consider:
1. **Database**: Migrate to PostgreSQL or MySQL for better performance
2. **File Storage**: Use cloud storage (AWS S3, Cloudinary) for images
3. **Authentication**: Add admin authentication to protect the admin panel
4. **Validation**: Add server-side validation and sanitization
5. **Backup**: Implement regular database backups

## Troubleshooting

### Common Issues

1. **Database not found**: Ensure the `data/` directory exists and is writable
2. **Upload fails**: Check that `public/uploads/` directory exists and is writable
3. **Images not displaying**: Verify file permissions and paths
4. **Admin page not loading**: Check that all dependencies are installed

### Error Logs
Check the browser console and terminal for detailed error messages.
