import { NextRequest, NextResponse } from 'next/server';

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

// GET - Fetch a specific project by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const projectId = parseInt(params.id);
    const project = projects.find(p => p.id === projectId);

    if (!project) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: project
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch project' },
      { status: 500 }
    );
  }
}

// PUT - Update a specific project
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const projectId = parseInt(params.id);
    const projectIndex = projects.findIndex(p => p.id === projectId);

    if (projectIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      );
    }

    const body = await request.json();
    
    // Update the project
    projects[projectIndex] = {
      ...projects[projectIndex],
      ...body,
      id: projectId, // Ensure ID doesn't change
      updatedAt: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      data: projects[projectIndex],
      message: 'Project updated successfully'
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update project' },
      { status: 500 }
    );
  }
}

// DELETE - Delete a specific project
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const projectId = parseInt(params.id);
    const projectIndex = projects.findIndex(p => p.id === projectId);

    if (projectIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      );
    }

    const deletedProject = projects.splice(projectIndex, 1)[0];

    return NextResponse.json({
      success: true,
      data: deletedProject,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to delete project' },
      { status: 500 }
    );
  }
}
