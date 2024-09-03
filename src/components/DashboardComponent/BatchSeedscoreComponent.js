import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';


const backendUrl = process.env.REACT_APP_BACKEND_URL;

const BatchSeedscoreReport = () => {
    const [filename, setFilename] = useState('');
    const [file, setFile] = useState(null);
    const [responseMessage, setResponseMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [abortController, setAbortController] = useState(null);

    // Function to handle file drop
    const onDrop = (acceptedFiles) => {
        const selectedFile = acceptedFiles[0];
        setFilename(selectedFile.name);
        setFile(selectedFile);
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    const handleFileUpload = async (e) => {
        e.preventDefault();
    
        if (!file) {
            setResponseMessage('No file selected.');
            return;
        }
    
        const formData = new FormData();
        formData.append('uploadedfile', file);
    
        const controller = new AbortController();
        setAbortController(controller);
    
        setLoading(true);  // Show spinner
    
        try {
            const response = await axios.post(`${backendUrl}/process_files`, formData, {
                responseType: 'blob',
                signal: controller.signal,
                headers: {
                    'Accept': 'text/csv',
                },
                withCredentials: true,
            });
            
            const contentType = response.headers['content-type'];
            const disposition = response.headers['content-disposition'];
            let filename = 'seedscore_report.csv';
            
            if (disposition && disposition.indexOf('attachment') !== -1) {
                const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                const matches = filenameRegex.exec(
                    
                );
                if (matches != null && matches[1]) { 
                    filename = matches[1].replace(/['"]/g, '');
                }
            }
    
            const blob = new Blob([response.data], { type: contentType });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
            setResponseMessage('File processed and downloaded successfully.');
        } catch (error) {
            if (axios.isCancel(error)) {
                setResponseMessage('Request canceled');
            } else {
                setResponseMessage(`There was an error: ${error.message}`);
                console.error('Error details:', error);
                if (error.response) {
                    const reader = new FileReader();
                    reader.onload = () => {
                        setResponseMessage(`Error: ${reader.result}`);
                    };
                    reader.readAsText(error.response.data);
                }
            }
        } finally {
            setLoading(false);  // Hide spinner
        }
    };  
    
    // Clean up the ongoing request if the component unmounts or a new tab is clicked
    useEffect(() => {
        return () => {
            if (abortController) {
                abortController.abort();
            }
        };
    }, [abortController]);

    return (
        <div className="flex flex-col h-screen bg-gray-100 p-6">
            <h2 className="text-2xl font-semibold text-gray-800">Batch Seedscore Report</h2>
            <div className="card overflow-auto py-14 px-24 mx-md-auto mx-72 shadow-sm">
                <div 
                    {...getRootProps({ className: 'file-drop-area mt-4 p-4 text-center border-2 border-dotted border-green-500 rounded-md' })}
                    style={{ borderStyle: 'dotted', borderColor: 'green', borderWidth: '2px', borderRadius: '15px' }}
                >
                    <input {...getInputProps()} />
                    <i className="bi bi-file-earmark-arrow-up fs-1 text-muted"></i>
                    <img src={require('../../assets/file.png')} alt="file" className='mx-auto'/>
                    <p className="text-muted">Drag and drop a CSV file here or <a href="{}" className="text-success">choose a file</a></p>
                </div>
                {filename && (
                    <div className="mt-4">
                        <p className="text-gray-800">Selected file: <strong>{filename}</strong></p>
                    </div>
                )}
                <div className="d-grid mt-4">
                    <button className="btn btn-success mx-auto" type="button" onClick={handleFileUpload}>
                        Batch Seedscore Report
                    </button>
                </div>
                {loading && (
                    <div className="flex justify-center items-center mt-4">
                        <div className="w-12 h-12 border-t-4 border-green-500 border-solid rounded-full animate-spin"></div>
                    </div>
                )}
                {responseMessage && (
                    <div className="alert alert-info mt-4" role="alert">
                        <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{responseMessage}</pre>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BatchSeedscoreReport;
