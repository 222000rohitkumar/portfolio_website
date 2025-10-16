import { NextRequest, NextResponse } from 'next/server';
<<<<<<< HEAD
import { dbOperations } from '@/lib/database';
=======

// In-memory storage for projects (in production, use a database)
let projects = [
  {
    id: 1,
    title: 'Customer Churn Predictor',
    description: 'Machine learning model to predict customer churn using various algorithms and data analysis techniques.',
    technologies: ['Python', 'Machine Learning', 'Data Analysis'],
    githubLink: 'https://github.com/222000rohitkumar/customer_churn_predictor',
    liveLink: '',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
    category: 'Machine Learning',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 2,
    title: 'Old Car Price Predictor',
    description: 'Predictive model for estimating used car prices based on various features and market trends.',
    technologies: ['Python', 'Regression', 'Data Science'],
    githubLink: 'https://github.com/222000rohitkumar/old_car_price_predictor',
    liveLink: '',
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
    category: 'Data Science',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 3,
    title: 'NanoGPT Implementation',
    description: 'Implementation of a lightweight GPT model for natural language processing and text generation.',
    technologies: ['Python', 'Deep Learning', 'NLP'],
    githubLink: 'https://github.com/222000rohitkumar/nanogpt',
    liveLink: '',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
    category: 'Deep Learning',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 4,
    title: 'College Event Manager',
    description: 'Web application for managing college events, registrations, and event coordination.',
    technologies: ['JavaScript', 'Web Development', 'Event Management'],
    githubLink: 'https://github.com/222000rohitkumar/college-event-manager',
    liveLink: '',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
    category: 'Web Development',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];
>>>>>>> 9beead1279eacc1a70aa6fc2ab5f9c5a83f89bc5

// GET - Fetch all projects
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const limit = searchParams.get('limit');

<<<<<<< HEAD
    const limitNum = limit ? parseInt(limit) : undefined;
    const projects = dbOperations.getAllProjects(category || undefined, limitNum);

    return NextResponse.json({
      success: true,
      data: projects,
      total: projects.length
    });
  } catch (error) {
    console.error('Database error:', error);
=======
    let filteredProjects = projects;

    // Filter by category if provided
    if (category) {
      filteredProjects = projects.filter(project => 
        project.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Limit results if provided
    if (limit) {
      const limitNum = parseInt(limit);
      filteredProjects = filteredProjects.slice(0, limitNum);
    }

    return NextResponse.json({
      success: true,
      data: filteredProjects,
      total: filteredProjects.length
    });
  } catch (error) {
>>>>>>> 9beead1279eacc1a70aa6fc2ab5f9c5a83f89bc5
    return NextResponse.json(
      { success: false, error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

// POST - Create a new project
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.title || !body.description || !body.technologies) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

<<<<<<< HEAD
    const newProject = dbOperations.createProject({
=======
    const newProject = {
      id: projects.length + 1,
>>>>>>> 9beead1279eacc1a70aa6fc2ab5f9c5a83f89bc5
      title: body.title,
      description: body.description,
      technologies: body.technologies,
      githubLink: body.githubLink || '',
      liveLink: body.liveLink || '',
      image: body.image || '/api/placeholder/400/300',
<<<<<<< HEAD
      category: body.category || 'Other'
    });
=======
      category: body.category || 'Other',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    projects.push(newProject);
>>>>>>> 9beead1279eacc1a70aa6fc2ab5f9c5a83f89bc5

    return NextResponse.json({
      success: true,
      data: newProject,
      message: 'Project created successfully'
    }, { status: 201 });
  } catch (error) {
<<<<<<< HEAD
    console.error('Database error:', error);
=======
>>>>>>> 9beead1279eacc1a70aa6fc2ab5f9c5a83f89bc5
    return NextResponse.json(
      { success: false, error: 'Failed to create project' },
      { status: 500 }
    );
  }
}
