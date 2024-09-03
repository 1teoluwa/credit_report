import React, { useState } from 'react';
import Sidebar from './SidebarComponent';
import MainContent from './MainContentComponent';
import SeedscoreForm from './SeedscoreComponent';
import FetchBvn from './FetchBvnComponent';
import BatchSeedscoreReport from './BatchSeedscoreComponent';
import OnboardSeedling from './OnboardSeedlingComponent';
import RemoveSeedling from './RemoveSeedlingComponent';
import ConfirmationModal from './ConfirmationModalComponent'; // Import the modal component
import 'bootstrap/dist/css/bootstrap.min.css';
import { Await } from 'react-router-dom';
import axios from 'axios';


const backendUrl = process.env.REACT_APP_BACKEND_URL;

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('Generate Report');
    const [showModal, setShowModal] = useState(false); // State to control the modal
    const [loading, setLoading] = useState(false);


    const handleTabChange = (tabName) => {
        setActiveTab(tabName);
        if (tabName === 'Generate Report') {
            setShowModal(true); // Trigger the modal when "Generate Report" is selected
        }
    };

    const handleConfirmGenerateReport = async () => {
        setLoading(true); // Show spinner
        try {
            const response = await axios.post('/generate_report', {}, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true, // Include credentials (cookies) in the request
            });

            if (response.status === 200) {
                // Handle success, e.g., display a success message or update the UI
                alert('Report generated successfully!');
            } else {
                // Handle error, e.g., display an error message
                alert('Failed to generate report. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        } finally {
            setLoading(false); // Hide spinner
        }
        setShowModal(false); // Close the modal after confirmation
        // You can add any additional logic here if needed
    };

    return (
        <div className="grid grid-cols-11 h-full w-full">
            <div className="w-[255px] border bg-[#2A8851] col-span-2">
                <Sidebar activeTab={activeTab} setActiveTab={handleTabChange} />
            </div>
            <div className="border border-blue-900 col-span-9 h-full">
                {activeTab === 'Generate Report' && (
                    <MainContent />
                )}
                {activeTab === 'Seedscore Report' && (
                    <SeedscoreForm />
                )}
                {activeTab === 'Fetch BVN' && (
                    <FetchBvn />
                )}
                {activeTab === 'Batch Seedscore Report' && (
                    <BatchSeedscoreReport/>
                )}
                {activeTab === 'Onboard Seedling' && (
                    <OnboardSeedling />
                )}
                {activeTab === 'Remove Seedling' && (
                    <RemoveSeedling />
                )}
            </div>

            {/* Confirmation Modal for Generate Report */}
            {showModal && (
                <ConfirmationModal
                    showModal={showModal}
                    setShowModal={setShowModal}
                    onConfirm={handleConfirmGenerateReport}
                />
            )}
        </div>
    );    
}

export default Dashboard;
