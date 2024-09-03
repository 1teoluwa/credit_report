import React, { useState } from 'react';
import axios from 'axios';

const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://127.0.0.1:5000';  // Default to localhost if the env variable is not set

const OnboardSeedling = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');

    const addSeedling = async (e) => {
        e.preventDefault();

        if (!email) {
            setResponseMessage('Please enter an email address.');
            return;
        }

        setLoading(true);  // Show spinner    

        try {
            const response = await axios.post(`${backendUrl}/add_seedling`, {
                new_seedling: email
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            setResponseMessage(response.data.message || 'Email added successfully!');
        } catch (error) {
            console.error('Error adding email:', error);
            setResponseMessage(error.response?.data?.error || error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-screen bg-gray-100 p-6">
            <h2 className="text-2xl font-semibold text-gray-800">Onboard Seedling</h2>
            <div className="card py-14 px-24 mx-md-auto mx-72 shadow-sm">
                <form className="space-y-4" onSubmit={addSeedling}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            placeholder="Enter seedling's email" 
                            className="w-auto px-36 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500"
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    {responseMessage && (
                    <div 
                        className={`mt-4 p-4 rounded-md shadow-sm ${
                            responseMessage.includes('successfully') 
                            ? 'bg-red-100 text-red-800'
                            : 'bg-green-100 text-green-800' 
                        }`} 
                        role="alert"
                    >
                        <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }} className='mx-auto'>
                            {responseMessage}
                        </pre>
                    </div>
                )}
                    <div className="d-grid mt-4">
                        <button className="btn btn-success mx-auto" type="submit">Add</button>
                    </div>
                    
                </form>
                {loading && (
                    <div className="flex justify-center items-center mt-4">
                        <div className="w-12 h-12 border-t-4 border-green-500 border-solid rounded-full animate-spin"></div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OnboardSeedling;
