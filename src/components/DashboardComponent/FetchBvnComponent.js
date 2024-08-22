import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
const FetchBVN = () => {
    return (
        <div className="flex flex-col h-screen bg-gray-100 p-6 ">
            <h2 className="text-2xl font-semibold text-gray-800 ">Fetch BVN</h2>
            <div className="card py-14 px-24 mx-md-auto mx-72   shadow-sm">
                <div className="mb-3">
                    <label htmlFor="userId" className="form-label">Input User ID</label>
                    <div className="input-group">
                        <input type="text" className="form-control" id="userId" placeholder="Enter user ID" />
                        <button className="btn btn-success" type="button" style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}>Submit</button>
                    </div>
                </div>
                <div className="file-drop-area mt-4 p-4 text-center border-2 border-dotted border-green-500 rounded-md" style={{ borderStyle: 'dotted', borderColor: 'green', borderWidth: '2px', borderRadius: '15px' }}>
                    <i className="bi bi-file-earmark-arrow-up fs-1 text-muted"></i>
                    <img src={require('../../assets/file.png')} alt="file" className='mx-auto'/>
                    <p className="text-muted">Drag and drop a CSV file here or <a href="{}" className="text-success">choose a file</a></p>
                </div>
                <div className="d-grid mt-4">
                    <button className="btn btn-success" type="button">Fetch BVN</button>
                </div>
            </div>
        </div>
    );
};

export default FetchBVN;