
import React from 'react';
import { useParams } from 'react-router-dom';

const ProjectsByCategory = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Projects in Category: {categoryId}</h1>
      <p>This is a placeholder for the projects by category page. In a real implementation, this would show all projects filtered by the selected category.</p>
    </div>
  );
};

export default ProjectsByCategory;
