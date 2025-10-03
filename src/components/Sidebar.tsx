import React from 'react';
import { ActivityIcon, SettingsIcon, BrainCircuitIcon, HomeIcon, LogOutIcon, BookOpenIcon, GlobeIcon, LayersIcon, ClockIcon } from 'lucide-react';
interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
}
export const Sidebar = ({
  activeView,
  setActiveView
}: SidebarProps) => {
  const menuItems = [{
    id: 'workflows',
    label: 'Workflows',
    icon: <LayersIcon size={20} />
  }, {
    id: 'agents',
    label: 'Agents',
    icon: <BrainCircuitIcon size={20} />
  }, {
    id: 'knowledge',
    label: 'Knowledge Base',
    icon: <BookOpenIcon size={20} />
  }, {
    id: 'connectors',
    label: 'Connectors',
    icon: <GlobeIcon size={20} />
  }, {
    id: 'monitoring',
    label: 'Monitoring',
    icon: <ActivityIcon size={20} />
  }, {
    id: 'settings',
    label: 'Settings',
    icon: <SettingsIcon size={20} />
  }];
  // In a real app, this would be determined by the user's role
  const isAdmin = true;
  return <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <BrainCircuitIcon className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
          <h1 className="text-xl font-bold">AgentFlow</h1>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Enterprise AI Orchestration
        </p>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {menuItems.filter(item => !item.adminOnly || isAdmin).map(item => <li key={item.id}>
                <button onClick={() => setActiveView(item.id)} className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${activeView === item.id ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                  <span className={activeView === item.id ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                  {item.adminOnly && <span className="ml-auto text-xs px-1.5 py-0.5 rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
                      Admin
                    </span>}
                </button>
              </li>)}
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3 px-3 py-2">
          <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-sm font-medium">
            JD
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">John Doe</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              Admin
            </p>
          </div>
        </div>
        <button className="mt-4 w-full flex items-center justify-center space-x-2 px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
          <LogOutIcon size={16} />
          <span>Sign Out</span>
        </button>
      </div>
    </div>;
};