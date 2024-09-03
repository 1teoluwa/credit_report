import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './DashboardComponent.css';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

function Sidebar({ activeTab, setActiveTab }) {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control the modal visibility

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const response = await axios.post(`${backendUrl}/admin_check`, 
          {},
          { withCredentials: true }
        ); 
        setIsAdmin(response.data.isAdmin);
        console.log('Admin statusssss:', response)
      } catch (error) {
        console.error('Error checking admin status:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAdminStatus();
  }, []);

  const navItems = [
    { name: 'Generate Report', icon: 'generate-report.png', route: '/generate-report' },
    { name: 'Seedscore Report', icon: 'seedscore-report.png', route: '/seedscore-report' },
    { name: 'Fetch BVN', icon: 'fetch-bvn.png', route: '/fetch-bvn' },
    { name: 'Batch Seedscore Report', icon: 'batch-seedscore.png', route: '/batch-seedscore-report' },
    { name: 'Onboard Seedling', icon: 'onboard.png', route: '/onboard-seedling', adminOnly: true },
    { name: 'Remove Seedling', icon: 'remove.png', route: '/remove-seedling', adminOnly: true }
  ];

  const handleLogout = async () => {
    try {
      const response = await axios.post(`${backendUrl}/logout`, {}, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      if (response.status === 200) {
        navigate('/login');
      } else {
        console.error('Unexpected response:', response);
      }
    } catch (error) {
      console.error('Logout error:', error.response ? error.response.data : error.message);
    }
  };

  const openModal = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const confirmLogout = () => {
    closeModal();
    handleLogout();
  };

  return (
    <div className="d-flex px-4 flex-column h-full">
      <div className="text-center">
        <img src={require('../../assets/logo.png')} alt="SeedFi Logo" className="w-[124.95px] py-8 pl-8" />
      </div>
      <nav className="nav hover:bg-opacity-60 flex-column text-left">
        {navItems.map(item => (
          (!item.adminOnly || (item.adminOnly && isAdmin)) && (
            <a
              key={item.name}
              className={`no-underline py-2 my-1 cursor-pointer hover:bg-[#FFEC8969] text-white flex items-center gap-3 ${activeTab === item.name ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                setActiveTab(item.name);
              }}
            >
              <img
                src={require(`../../assets/${item.icon}`)}
                alt={`${item.name} Logo`}
                className=''
              />
              {item.name}
            </a>
          )
        ))}
      </nav>
      <a
        className="no-underline my-16 text-white flex items-center gap-3 hover:bg-[#FFEC8969]"
        href="/logout"
        onClick={openModal} // Open modal instead of directly logging out
      >
        <img
          src={require('../../assets/logout.png')}
          alt="Logout Logo"
          className='sidebar-logo'
        />
        Log Out
      </a>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Confirm Logout</h2>
            <p className="text-gray-700 mb-6">Are you sure you want to log out?</p>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 text-white bg-gray-500 rounded-md hover:bg-gray-400 focus:outline-none"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none"
                onClick={confirmLogout}
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
