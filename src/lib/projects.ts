export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  githubLink: string;
  liveLink: string;
  image: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectResponse {
  success: boolean;
  data: Project | Project[];
  total?: number;
  message?: string;
  error?: string;
}

// Fetch all projects
export async function fetchProjects(category?: string, limit?: number): Promise<ProjectResponse> {
  try {
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (limit) params.append('limit', limit.toString());

    const response = await fetch(`/api/projects?${params.toString()}`);
    return await response.json();
  } catch (error) {
    return {
      success: false,
      data: [],
      error: 'Failed to fetch projects'
    };
  }
}

// Fetch a specific project by ID
export async function fetchProject(id: number): Promise<ProjectResponse> {
  try {
    const response = await fetch(`/api/projects/${id}`);
    return await response.json();
  } catch (error) {
    return {
      success: false,
      data: {} as Project,
      error: 'Failed to fetch project'
    };
  }
}

// Create a new project
export async function createProject(project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<ProjectResponse> {
  try {
    const response = await fetch('/api/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    });
    return await response.json();
  } catch (error) {
    return {
      success: false,
      data: {} as Project,
      error: 'Failed to create project'
    };
  }
}

// Update a project
export async function updateProject(id: number, updates: Partial<Project>): Promise<ProjectResponse> {
  try {
    const response = await fetch(`/api/projects/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });
    return await response.json();
  } catch (error) {
    return {
      success: false,
      data: {} as Project,
      error: 'Failed to update project'
    };
  }
}

// Delete a project
export async function deleteProject(id: number): Promise<ProjectResponse> {
  try {
    const response = await fetch(`/api/projects/${id}`, {
      method: 'DELETE',
    });
    return await response.json();
  } catch (error) {
    return {
      success: false,
      data: {} as Project,
      error: 'Failed to delete project'
    };
  }
}
