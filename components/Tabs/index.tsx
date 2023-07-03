import React, { useState } from 'react';

type Tab = {
  id: string;
  label: string;
  content: React.ReactNode;
};

type TabsProps = {
  tabs: Tab[];
  className?: string;
};

const Tabs: React.FC<TabsProps> = ({ tabs, className }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <div className={className}>
      <div className="flex space-x-2 border-b border-[#D9DBE9] mb-[32px]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-2 px-4 text-[20px] font-medium rounded-t border-b-4 ${
              activeTab === tab.id
                ? 'text-slate-900 border-blue-500'
                : 'text-slate-500 border-transparent'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div>
        {tabs.map((tab) => {
          if (tab.id === activeTab) {
            return <div key={tab.id}>{tab.content}</div>;
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default Tabs;
