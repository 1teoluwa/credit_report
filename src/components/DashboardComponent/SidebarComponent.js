import React from 'react';
import './DashboardComponent.css'; // Custom CSS for styling

function Sidebar({ activeTab, setActiveTab }) {
  const navItems = [
    { name: 'Generate Report', icon: 'generate-report.png', route: '/generate-report' },
    { name: 'Seedscore Report', icon: 'seedscore-report.png', route: '/seedscore-report' },
    { name: 'Fetch BVN', icon: 'fetch-bvn.png', route: '/fetch-bvn' },
    { name: 'Batch Seedscore Report', icon: 'batch-seedscore.png', route: '/batch-seedscore-report' },
    { name: 'Onboard Seedling', icon: 'onboard.png', route: '/onboard-seedling' },
    { name: 'Remove Seedling', icon: 'remove.png', route: '/remove-seedling' }
  ];

  return (
    <div className="d-flex px-4 flex-column h-full">
      <div className="text-center">
        <img src={require('../../assets/logo.png')} alt="SeedFi Logo" className="w-[124.95px] py-8 pl-8" />
      </div>
      <nav className="nav flex-column text-left ">
        {navItems.map(item => (
          <a 
            key={item.name}
            className={`no-underline py-2 my-1 text-white flex items-center gap-3 ${activeTab === item.name ? 'active' : ''}`}
            // href={item.route} // Link to Flask route
            onClick={(e) => {
              e.preventDefault();
              setActiveTab(item.name); // Update active tab in React state
            //   window.location.href = item.route; // Redirect to Flask route
            }}
          >
            <img 
              src={require(`../../assets/${item.icon}`)} 
              alt={`${item.name} Logo`} 
              className='' 
            />
            <p className='whitespace-normal m-0'>{item.name}</p>
          </a>
        ))}
      </nav>
      <a 
        className="no-underline my-16 text-white flex items-center gap-3"
        href="/logout" // Link to Flask logout route
        onClick={(e) => {
          e.preventDefault();
          // Handle logout logic here
          window.location.href = '/logout'; // Redirect to Flask logout route
        }}
      >
        <img 
          src={require('../../assets/logout.png')} 
          alt="Logout Logo" 
          className='sidebar-logo' 
        />
        Log Out
      </a>
    </div>
  );
}

export default Sidebar;
