
import React from 'react';
import { useParams } from 'react-router-dom';

const ProjectDetails = () => {
  const { projectId } = useParams<{ projectId: string }>();
  
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Project Details (ID: {projectId})</h1>
      <p>This is a placeholder for the project details page. In a real implementation, this would show detailed information about a specific project.</p>
    </div>
  );
};

export default ProjectDetails;
