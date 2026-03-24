import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Settings, 
  LogOut, 
  PlusCircle,
  Clock,
  CheckCircle,
  AlertCircle,
  User as UserIcon,
  Mail,
  Phone,
  Shield
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [complaints, setComplaints] = useState([]);
  
  const username = localStorage.getItem('username') || 'Jane Doe';

  useEffect(() => {
    const stored = localStorage.getItem('complaints');
    if (stored) {
      setComplaints(JSON.parse(stored));
    } else {
      const defaultComplaints = [
        { id: 'CMP001', title: 'Street light not working', category: 'Infrastructure', priority: 'High', status: 'Pending', date: '2026-03-24' },
        { id: 'CMP002', title: 'Water Supply Issue', category: 'Utility', priority: 'Critical', status: 'In Progress', date: '2026-03-23' },
      ];
      localStorage.setItem('complaints', JSON.stringify(defaultComplaints));
      setComplaints(defaultComplaints);
    }
  }, []);

  const stats = [
    { label: 'Pending', value: complaints.filter(c => c.status === 'Pending').length, icon: Clock, color: 'text-amber-500', bg: 'bg-amber-100' },
    { label: 'In Progress', value: complaints.filter(c => c.status === 'In Progress').length, icon: AlertCircle, color: 'text-blue-500', bg: 'bg-blue-100' },
    { label: 'Resolved', value: complaints.filter(c => c.status === 'Resolved').length, icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-100' }
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <h1 className="text-xl font-bold font-serif text-indigo-600">SmartCMS</h1>
        </div>
        <div className="flex-1 py-4">
          <nav className="space-y-1 px-3">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'overview' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              <LayoutDashboard className="w-5 h-5 mr-3 shrink-0" /> Overview
            </button>
            <button
              onClick={() => setActiveTab('complaints')}
              className={`w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'complaints' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              <FileText className="w-5 h-5 mr-3 shrink-0" /> My Complaints
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'settings' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              <Settings className="w-5 h-5 mr-3 shrink-0" /> Settings
            </button>
          </nav>
        </div>
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-5 h-5 mr-3 shrink-0" /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-16 bg-white border-b border-gray-200 flex-shrink-0 flex items-center justify-between px-8">
          <h2 className="text-xl font-semibold text-gray-800 capitalize">{activeTab === 'complaints' ? 'My Complaints' : activeTab}</h2>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/submit-complaint')}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition flex items-center gap-2 shadow-sm shadow-indigo-200">
              <PlusCircle className="w-4 h-4" /> New Complaint
            </button>
            <div className="flex items-center gap-2">
              <img src={`https://ui-avatars.com/api/?name=${username}&background=6366f1&color=fff`} alt="avatar" className="w-8 h-8 rounded-full border border-gray-200" />
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-8">
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                    <div className={`p-4 rounded-xl ${stat.bg} ${stat.color}`}>
                      <stat.icon className="w-8 h-8" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">{stat.label}</p>
                      <h3 className="text-3xl font-bold text-gray-900">{stat.value}</h3>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent Activity Table */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-800">Recent Complaints</h3>
                  <button onClick={() => setActiveTab('complaints')} className="text-sm font-medium text-indigo-600 hover:text-indigo-700">View All</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 text-gray-500 text-sm">
                        <th className="px-6 py-4 font-medium">ID</th>
                        <th className="px-6 py-4 font-medium">Title</th>
                        <th className="px-6 py-4 font-medium">Category</th>
                        <th className="px-6 py-4 font-medium">Status</th>
                        <th className="px-6 py-4 font-medium">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                      {complaints.slice(0, 5).map((item, idx) => (
                        <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-6 py-4 font-medium text-gray-900">{item.id}</td>
                          <td className="px-6 py-4">{item.title}</td>
                          <td className="px-6 py-4">
                            <span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium">
                              {item.category}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold
                              ${item.status === 'Resolved' ? 'bg-green-100 text-green-700' : ''}
                              ${item.status === 'In Progress' ? 'bg-blue-100 text-blue-700' : ''}
                              ${item.status === 'Pending' ? 'bg-amber-100 text-amber-700' : ''}
                            `}>
                              {item.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-gray-500">{item.date}</td>
                        </tr>
                      ))}
                      {complaints.length === 0 && (
                        <tr>
                          <td colSpan="5" className="px-6 py-8 text-center text-gray-500">No complaints found. Create one to get started!</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'complaints' && (
            <div className="animate-in fade-in duration-500 space-y-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-800">All Complaints</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {complaints.map((item, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium">{item.category}</span>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold
                              ${item.status === 'Resolved' ? 'bg-green-100 text-green-700' : ''}
                              ${item.status === 'In Progress' ? 'bg-blue-100 text-blue-700' : ''}
                              ${item.status === 'Pending' ? 'bg-amber-100 text-amber-700' : ''}
                            `}>
                        {item.status}
                      </span>
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 mb-1">{item.title}</h4>
                    <p className="text-sm text-gray-500 line-clamp-2 mb-4">{item.description || 'No detailed description provided.'}</p>
                    <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center text-sm text-gray-500">
                      <span className="font-medium text-gray-700">#{item.id}</span>
                      <span>{item.date}</span>
                    </div>
                  </div>
                ))}
                {complaints.length === 0 && (
                  <div className="col-span-full py-12 text-center text-gray-500 bg-white rounded-2xl border border-gray-100">
                    No complaints found.
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="max-w-4xl animate-in fade-in duration-500">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-8 border-b border-gray-100 flex items-center gap-6">
                  <img src={`https://ui-avatars.com/api/?name=${username}&background=6366f1&color=fff&size=100`} alt="profile" className="w-24 h-24 rounded-full border-4 border-indigo-50 shadow-sm" />
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{username}</h3>
                    <p className="text-gray-500 flex items-center gap-2 mt-1"><Mail className="w-4 h-4"/> {username.toLowerCase()}@example.com</p>
                  </div>
                </div>
                
                <div className="p-8 space-y-8">
                  <section>
                    <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2"><UserIcon className="w-5 h-5 text-indigo-500"/> Personal Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input type="text" defaultValue={username} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input type="text" defaultValue="+1 (555) 000-0000" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                      </div>
                    </div>
                  </section>

                  <section className="pt-6 border-t border-gray-100">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2"><Shield className="w-5 h-5 text-indigo-500"/> Account Security</h4>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                      <div>
                        <p className="font-medium text-gray-900">Password</p>
                        <p className="text-sm text-gray-500">Last changed 3 months ago</p>
                      </div>
                      <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-white transition-colors">Change Password</button>
                    </div>
                  </section>

                  <div className="pt-6 flex justify-end">
                    <button className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition shadow-sm shadow-indigo-200">
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
