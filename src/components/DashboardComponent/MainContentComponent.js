import React from 'react';
import './DashboardComponent.css'; // Custom CSS for styling
import 'bootstrap/dist/css/bootstrap.min.css';

const MainContent = () => {
    return (
        <div className="d-flex flex-column justify-content-start bg-gray-100 min-vh-100">
            <h4 className="m-5 align-self-start text-2xl font-semibold text-gray-800 mb-6">Seedfi Credit Report Generator</h4>
            <div className="text-center col-12">
                <img src={require('../../assets/emoji.png')} alt="No Data" className="w-[120px] py-10 mx-auto"/>
                <p className="text-muted">No data available yet</p>
            </div>
        </div>
    );
};

export default MainContent;
