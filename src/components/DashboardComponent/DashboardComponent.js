import React, { useState } from 'react';
import Sidebar from './SidebarComponent';
import MainContent from './MainContentComponent';
import SeedscoreForm from './SeedscoreComponent';
import FetchBvn from './FetchBvnComponent';
import 'bootstrap/dist/css/bootstrap.min.css';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('Generate Report');

    const handleTabChange = (tabName) => {
        setActiveTab(tabName);
        // Handle tab-specific logic here if needed
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
                    <div>Batch Seedscore Report Content</div>
                )}
                {activeTab === 'Onboard Seedling' && (
                    <div>Onboard Seedling Content</div>
                )}
                {activeTab === 'Remove Seedling' && (
                    <div>Remove Seedling Content</div>
                )}
            </div>
        </div>
    );    
}
export default Dashboard;