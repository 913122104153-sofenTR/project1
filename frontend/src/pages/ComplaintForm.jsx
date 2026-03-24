import React, { useState } from 'react';
import { ArrowLeft, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ComplaintForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: '', category: 'Infrastructure', priority: 'Medium', description: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newComplaint = {
      id: 'CMP' + Math.floor(Math.random() * 1000) + 100,
      title: formData.title,
      category: formData.category,
      priority: formData.priority,
      description: formData.description,
      status: 'Pending',
      date: new Date().toISOString().split('T')[0]
    };

    const existing = JSON.parse(localStorage.getItem('complaints') || '[]');
    localStorage.setItem('complaints', JSON.stringify([newComplaint, ...existing]));

    alert('Complaint Submitted Successfully!');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-indigo-600">
          <button onClick={() => navigate('/dashboard')} className="text-indigo-100 hover:text-white transition flex items-center font-medium">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back
          </button>
          <h2 className="text-xl font-bold text-white">Raise New Complaint</h2>
          <div className="w-20"></div> {/* Spacer */}
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Complaint Title</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                placeholder="Brief summary of the issue"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                <select 
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition bg-white"
                >
                  <option>Infrastructure</option>
                  <option>Utility</option>
                  <option>Sanitation</option>
                  <option>Security</option>
                  <option>Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Priority</label>
                <select 
                  value={formData.priority}
                  onChange={(e) => setFormData({...formData, priority: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition bg-white"
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                  <option>Critical</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Detailed Description</label>
              <textarea
                required
                rows="4"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition resize-none"
                placeholder="Provide as many details as possible..."
              ></textarea>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-end">
            <button
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg shadow-indigo-200 hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center gap-2"
            >
               Submit Complaint <Send className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ComplaintForm;
