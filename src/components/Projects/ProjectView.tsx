import { getProjectAPI, getProjectUsersAPI } from '@/http/services/projects';
import { useQuery } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';
import ProjectDetailsUi from '../an/projects/ProjectDetailsUi';
import { toast } from 'sonner';

function ProjectView() {
  const { project_id } = useParams({strict: false});
  
  const { data: projectData, isLoading: projectLoading, error: projectError, isError } = useQuery({
    queryKey: ["project", project_id],
    queryFn: async () => {
      if (!project_id) throw new Error("Project ID is required");
      const response = await getProjectAPI(project_id.toString());
      return response?.data?.data;
    },
    enabled: !!project_id,
  })

  const { data: projectUsersData, isLoading: projectUsersLoading, error: projectUsersError, isError: projectUsersIsError } = useQuery({
    queryKey: ["projectUsers", project_id],
    queryFn: async () => {
      if (!project_id) throw new Error("Project ID is required");
      const response = await getProjectUsersAPI(project_id.toString());
      return response?.data?.data?.records || [];
    },
    enabled: !!project_id,
  })

  if(isError){
    toast.error(projectError?.message);
    console.log(projectError);
    return <div>Error Loading Project</div>
  }

  if(projectUsersIsError){
    toast.error(projectUsersError?.message);
    console.log(projectUsersError);
    return <div>Error Loading Project Users</div>
  }
  

  if(projectLoading || projectUsersLoading){
    return <div>Loading...</div>
  }


  return (
  <ProjectDetailsUi projectData={projectData} projectUsersData={projectUsersData} />
  )
}

export default ProjectView;