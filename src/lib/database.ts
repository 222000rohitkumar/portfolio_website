import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

// Database file path
const dbPath = path.join(process.cwd(), 'data', 'portfolio.db');
const dataDir = path.dirname(dbPath);

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize database
const db = new Database(dbPath);

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Create projects table
db.exec(`
  CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    technologies TEXT NOT NULL, -- JSON array stored as string
    githubLink TEXT DEFAULT '',
    liveLink TEXT DEFAULT '',
    image TEXT DEFAULT '',
    category TEXT DEFAULT 'Other',
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Create trigger to update updatedAt timestamp
db.exec(`
  CREATE TRIGGER IF NOT EXISTS update_projects_timestamp 
  AFTER UPDATE ON projects
  BEGIN
    UPDATE projects SET updatedAt = CURRENT_TIMESTAMP WHERE id = NEW.id;
  END
`);

// Insert sample data if table is empty
const projectCount = db.prepare('SELECT COUNT(*) as count FROM projects').get() as { count: number };

if (projectCount.count === 0) {
  const insertProject = db.prepare(`
    INSERT INTO projects (title, description, technologies, githubLink, liveLink, image, category)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const sampleProjects = [
    {
      title: 'Customer Churn Predictor',
      description: 'Machine learning model to predict customer churn using various algorithms and data analysis techniques.',
      technologies: JSON.stringify(['Python', 'Machine Learning', 'Data Analysis']),
      githubLink: 'https://github.com/222000rohitkumar/customer_churn_predictor',
      liveLink: '',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
      category: 'Machine Learning'
    },
    {
      title: 'Old Car Price Predictor',
      description: 'Predictive model for estimating used car prices based on various features and market trends.',
      technologies: JSON.stringify(['Python', 'Regression', 'Data Science']),
      githubLink: 'https://github.com/222000rohitkumar/old_car_price_predictor',
      liveLink: '',
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
      category: 'Data Science'
    },
    {
      title: 'NanoGPT Implementation',
      description: 'Implementation of a lightweight GPT model for natural language processing and text generation.',
      technologies: JSON.stringify(['Python', 'Deep Learning', 'NLP']),
      githubLink: 'https://github.com/222000rohitkumar/nanogpt',
      liveLink: '',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
      category: 'Deep Learning'
    }
  ];

  // Insert sample projects
  const insertMany = db.transaction((projects) => {
    for (const project of projects) {
      insertProject.run(
        project.title,
        project.description,
        project.technologies,
        project.githubLink,
        project.liveLink,
        project.image,
        project.category
      );
    }
  });

  insertMany(sampleProjects);
}

// Database operations
export const dbOperations = {
  // Get all projects
  getAllProjects: (category?: string, limit?: number) => {
    let query = 'SELECT * FROM projects';
    const params: any[] = [];

    if (category) {
      query += ' WHERE category = ?';
      params.push(category);
    }

    query += ' ORDER BY createdAt DESC';

    if (limit) {
      query += ' LIMIT ?';
      params.push(limit);
    }

    const stmt = db.prepare(query);
    const projects = stmt.all(...params) as any[];

    // Parse technologies JSON
    return projects.map(project => ({
      ...project,
      technologies: JSON.parse(project.technologies)
    }));
  },

  // Get project by ID
  getProjectById: (id: number) => {
    const stmt = db.prepare('SELECT * FROM projects WHERE id = ?');
    const project = stmt.get(id) as any;

    if (project) {
      return {
        ...project,
        technologies: JSON.parse(project.technologies)
      };
    }
    return null;
  },

  // Create new project
  createProject: (project: {
    title: string;
    description: string;
    technologies: string[];
    githubLink?: string;
    liveLink?: string;
    image?: string;
    category?: string;
  }) => {
    const stmt = db.prepare(`
      INSERT INTO projects (title, description, technologies, githubLink, liveLink, image, category)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(
      project.title,
      project.description,
      JSON.stringify(project.technologies),
      project.githubLink || '',
      project.liveLink || '',
      project.image || '',
      project.category || 'Other'
    );

    return {
      id: result.lastInsertRowid,
      ...project,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  },

  // Update project
  updateProject: (id: number, updates: {
    title?: string;
    description?: string;
    technologies?: string[];
    githubLink?: string;
    liveLink?: string;
    image?: string;
    category?: string;
  }) => {
    const existingProject = dbOperations.getProjectById(id);
    if (!existingProject) {
      return null;
    }

    const updatedProject = { ...existingProject, ...updates };
    
    const stmt = db.prepare(`
      UPDATE projects 
      SET title = ?, description = ?, technologies = ?, githubLink = ?, liveLink = ?, image = ?, category = ?
      WHERE id = ?
    `);

    stmt.run(
      updatedProject.title,
      updatedProject.description,
      JSON.stringify(updatedProject.technologies),
      updatedProject.githubLink,
      updatedProject.liveLink,
      updatedProject.image,
      updatedProject.category,
      id
    );

    return dbOperations.getProjectById(id);
  },

  // Delete project
  deleteProject: (id: number) => {
    const project = dbOperations.getProjectById(id);
    if (!project) {
      return null;
    }

    const stmt = db.prepare('DELETE FROM projects WHERE id = ?');
    stmt.run(id);

    return project;
  }
};

export default db;
