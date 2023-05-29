interface Project {
    id: string;
    title: string;
    zip_code: number;
    cost: number;
    done: boolean;
    deadline: string;
    created_at: string;
    updated_at: string;
    username: string;
}

interface ProjectsResponse {
    projects: Project[];
    error?: string;
}