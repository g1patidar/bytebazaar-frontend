import { useState } from 'react';

type AddProjectFormProps = {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  };

export const AddProjectForm: React.FC<AddProjectFormProps> = ({ setIsOpen }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        price: '',
        thumbnail: null,
        files: []
    });

    // Available project categories
    const categories = [
        'Web Dev',
        'Mobile App',
        'UI/UX',
        'Data Analysis',
        'E-commerce',
        'Backend Development',
        'Frontend Development',
        'Full-Stack'
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFileChange = (e) => {
        if (e.target.name === 'thumbnail') {
            setFormData({
                ...formData,
                thumbnail: e.target.files[0]
            });
        } else if (e.target.name === 'files') {
            setFormData({
                ...formData,
                files: [...e.target.files]
            });
        }
    };

    // Function to create a new project
    const createProject = async (projectData) => {
        try {
            // Create FormData for file upload
            const formDataToSend = new FormData();

            // Add text fields
            formDataToSend.append('title', projectData.title);
            formDataToSend.append('description', projectData.description);
            formDataToSend.append('category', projectData.category);
            formDataToSend.append('price', projectData.price);

            // Add thumbnail
            if (projectData.thumbnail) {
                formDataToSend.append('thumbnail', projectData.thumbnail);
            }

            // Add multiple files
            if (projectData.files && (projectData.files as FileList).length > 0) {
                Array.from(projectData.files as FileList).forEach((file) => {
                  formDataToSend.append('files', file);
                });
              }

            // Make API call
            const response = await fetch('/api/projects', {
                method: 'POST',
                headers: {
                    // No Content-Type header when using FormData
                    // Content-Type is automatically set with the correct boundary
                    Authorization: `Bearer ${localStorage.getItem('token')}` // Assuming token auth
                },
                body: formDataToSend
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to create project');
            }

            return await response.json();
        } catch (error) {
            console.error('Error creating project:', error);
            throw error;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMessage('');
        setSuccessMessage('');

        try {
            // Validate form
            if (!formData.title || !formData.price || !formData.category) {
                throw new Error('Please fill in all required fields');
            }

            // Call API
            const result = await createProject(formData);

            // Show success message
            setSuccessMessage('Project created successfully!');

            // Reset form
            setFormData({
                title: '',
                description: '',
                category: '',
                price: '',
                thumbnail: null,
                files: []
            });

            // Close modal after a delay
            setTimeout(() => {
                setIsOpen(false);
                setSuccessMessage('');
            }, 2000);

        } catch (error) {
            setErrorMessage(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            {/* Modal */}
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl max-h-screen overflow-y-auto">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">Add New Project</h2>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {successMessage && (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                            {successMessage}
                        </div>
                    )}

                    {errorMessage && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                            {errorMessage}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                                Project Title*
                            </label>
                            <input
                                id="title"
                                name="title"
                                type="text"
                                placeholder="Enter project title"
                                value={formData.title}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                                Category*
                            </label>
                            <select
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            >
                                <option value="">Select a category</option>
                                {categories.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                                Price ($)*
                            </label>
                            <input
                                id="price"
                                name="price"
                                type="number"
                                placeholder="Enter project price"
                                value={formData.price}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                min="0"
                                step="0.01"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                placeholder="Enter project description"
                                value={formData.description}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                rows={4}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="thumbnail">
                                Thumbnail Image
                            </label>
                            <input
                                id="thumbnail"
                                name="thumbnail"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                Upload a thumbnail image for your project
                            </p>
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="files">
                                Project Files
                            </label>
                            <input
                                id="files"
                                name="files"
                                type="file"
                                multiple
                                onChange={handleFileChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                Upload any relevant project files (multiple files allowed)
                            </p>
                        </div>

                        <div className="flex items-center justify-end">
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {isSubmitting ? 'Creating...' : 'Create Project'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}