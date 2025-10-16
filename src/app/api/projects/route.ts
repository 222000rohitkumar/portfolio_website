import { NextRequest, NextResponse } from 'next/server';
import { dbOperations } from '@/lib/database';

// GET - Fetch all projects
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const limit = searchParams.get('limit');

    const limitNum = limit ? parseInt(limit) : undefined;
    const projects = dbOperations.getAllProjects(category || undefined, limitNum);

    return NextResponse.json({
      success: true,
      data: projects,
      total: projects.length
    });
  } catch (error) {
    console.error('Database error:', error);
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

    const newProject = dbOperations.createProject({
      title: body.title,
      description: body.description,
      technologies: body.technologies,
      githubLink: body.githubLink || '',
      liveLink: body.liveLink || '',
      image: body.image || '/api/placeholder/400/300',
      category: body.category || 'Other'
    });

    return NextResponse.json({
      success: true,
      data: newProject,
      message: 'Project created successfully'
    }, { status: 201 });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create project' },
      { status: 500 }
    );
  }
}
