import { getProjectAPI, getProjectUsersAPI } from '@/http/services/projects';
import { useQuery } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';
import React from 'react'
import ProjectDetailsUi from '../an/projects/ProjectDetailsUi';

function ProjectView() {
  const { project_id } = useParams({strict: false});
  
  const { data: projectData, isLoading: projectLoading, error: projectError } = useQuery({
    queryKey: ["project", project_id],
    queryFn: async () => {
      if (!project_id) throw new Error("Project ID is required");
      const response = await getProjectAPI(project_id.toString());
      return response?.data?.data;
    },
    enabled: !!project_id,
  })

  console.log(projectData, "projectData");

  const { data: projectUsersData, isLoading: projectUsersLoading, error: projectUsersError } = useQuery({
    queryKey: ["projectUsers", project_id],
    queryFn: async () => {
      if (!project_id) throw new Error("Project ID is required");
      const response = await getProjectUsersAPI(project_id.toString());
      return response?.data?.data?.records || [];
    },
    enabled: !!project_id,
  })

  console.log(projectUsersData, "projectUsersData");


  return (
  <ProjectDetailsUi projectData={projectData} projectUsersData={projectUsersData} />
  )
}

export default ProjectView;