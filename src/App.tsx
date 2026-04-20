/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Search, 
  BookOpen, 
  MessageSquare, 
  Bell, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  FileText,
  ShieldCheck,
  ChevronRight,
  Plus,
  Scale,
  Globe,
  Library,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { mockHSCodes, mockProcedures, mockCirculars, mockTradeAgreements, mockLegislations } from './data';
import { askCustomsAI } from './services/gemini';
import { ChatMessage, HSCode, Procedure, TradeAgreement, Legislation } from './types';

type ActiveTab = 'dashboard' | 'procedures' | 'hs-search' | 'legal' | 'trade' | 'library' | 'ai-assistant';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-[#F0F2F5] font-sans">
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 260 : 80 }}
        className="bg-[#1A3066] text-white flex flex-col transition-all overflow-hidden relative z-50 shadow-xl"
      >
        <div className="px-6 py-8 border-b border-white/10 mb-6 group">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#D4AF37] rounded flex items-center justify-center shrink-0">
              <ShieldCheck className="text-[#1A3066] w-5 h-5" />
            </div>
            {isSidebarOpen && (
              <div>
                <span className="font-bold text-lg tracking-wider block text-[#D4AF37]">JKDM PORTAL</span>
                <span className="text-[9px] opacity-60 uppercase tracking-tighter block -mt-1">Knowledge Management Hub</span>
              </div>
            )}
          </div>
        </div>

        <nav className="flex-1 px-4 mt-2 space-y-1 overflow-y-auto custom-scrollbar">
          <SidebarItem 
            icon={<LayoutDashboard size={18} />} 
            label="Dashboard" 
            active={activeTab === 'dashboard'} 
            collapsed={!isSidebarOpen}
            onClick={() => setActiveTab('dashboard')} 
          />
          <SidebarItem 
            icon={<FileText size={18} />} 
            label="Customs Procedures" 
            active={activeTab === 'procedures'} 
            collapsed={!isSidebarOpen}
            onClick={() => setActiveTab('procedures')} 
          />
          <SidebarItem 
            icon={<Search size={18} />} 
            label="HS Code Finder" 
            active={activeTab === 'hs-search'} 
            collapsed={!isSidebarOpen}
            onClick={() => setActiveTab('hs-search')} 
          />
          <SidebarItem 
            icon={<Scale size={18} />} 
            label="Legal & Regulations" 
            active={activeTab === 'legal'} 
            collapsed={!isSidebarOpen}
            onClick={() => setActiveTab('legal')} 
          />
          <SidebarItem 
            icon={<Globe size={18} />} 
            label="Trade Agreements" 
            active={activeTab === 'trade'} 
            collapsed={!isSidebarOpen}
            onClick={() => setActiveTab('trade')} 
          />
          <SidebarItem 
            icon={<Library size={18} />} 
            label="Digital Library" 
            active={activeTab === 'library'} 
            collapsed={!isSidebarOpen}
            onClick={() => setActiveTab('library')} 
          />
          <div className="pt-4 pb-2 border-t border-white/10 mt-4 mx-2">
            {!isSidebarOpen ? <div className="h-px bg-white/10 w-full"></div> : <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-2 px-2">Intelligence</p>}
          </div>
          <SidebarItem 
            icon={<MessageSquare size={18} />} 
            label="AI Assistant" 
            active={activeTab === 'ai-assistant'} 
            collapsed={!isSidebarOpen}
            onClick={() => setActiveTab('ai-assistant')} 
          />
        </nav>

        <div className="p-4 border-t border-white/10">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="w-full flex items-center gap-3 p-3 hover:bg-white/5 rounded-lg text-slate-400"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            {isSidebarOpen && <span>Minimize Menu</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-[80px] bg-white border-b border-[#DADDE1] flex items-center justify-between px-8 z-40">
          <div className="relative group">
            <div className="bg-[#F2F3F5] rounded-lg px-4 py-2 w-[480px] flex items-center gap-3 text-[#606770] text-sm group-focus-within:bg-white border border-transparent group-focus-within:border-[#1A3066] transition-all">
              <Search size={18} />
              <input 
                type="text" 
                placeholder="Search procedures, tariff codes, or circulars..."
                className="bg-transparent border-none outline-none w-full placeholder:text-[#606770]"
              />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              <button className="p-2 text-[#606770] hover:bg-slate-50 rounded-full relative">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#CC0000] rounded-full border-2 border-white"></span>
              </button>
            </div>
            <div className="h-8 w-[1px] bg-[#DADDE1]"></div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-bold text-[#1C1E21]">Ahmad Iskandar</p>
                <p className="text-[11px] text-[#606770] font-medium uppercase tracking-wide">Senior Supt. Customs</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#1A3066] text-white flex items-center justify-center font-bold shadow-sm">
                AI
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'dashboard' && <DashboardView />}
              {activeTab === 'procedures' && <ProceduresView />}
              {activeTab === 'hs-search' && <HSSearchView />}
              {activeTab === 'legal' && <LegalView />}
              {activeTab === 'trade' && <TradeView />}
              {activeTab === 'library' && <LibraryView />}
              {activeTab === 'ai-assistant' && <AIAssistantView />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

function SidebarItem({ icon, label, active, onClick, collapsed }: { icon: any, label: string, active: boolean, onClick: () => void, collapsed: boolean }) {
  return (
    <button 
      onClick={onClick}
      className={`sidebar-link ${active ? 'active' : ''} w-full`}
    >
      {icon}
      {!collapsed && <span>{label}</span>}
    </button>
  );
}

// --- View Components ---

function DashboardView() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard label="Active Circulars" value="1,284" trend="+12" color="blue" />
        <StatsCard label="Pending Approvals" value="12" trend="+2" color="red" />
        <StatsCard label="HS Code Queries" value="45" trend="+5" color="gold" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
        <div className="space-y-6">
          <div className="card">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-[#1C1E21] font-bold text-base flex items-center gap-2">
                 <LayoutDashboard className="text-[#1A3066]" size={18} />
                 Operational Procedures Quick Links
              </h3>
              <span className="text-[#1A3066] text-xs font-bold cursor-pointer hover:underline uppercase tracking-wider">Edit Shortcuts</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <div className="border border-[#DADDE1] p-4 rounded-lg hover:border-[#1A3066] transition-all group flex flex-col gap-1">
                  <h4 className="text-sm font-bold text-[#1A3066] group-hover:text-[#D4AF37]">Import Clearance (SST)</h4>
                  <p className="text-xs text-[#606770]">Procedures for high-value goods clearance</p>
               </div>
               <div className="border border-[#DADDE1] p-4 rounded-lg hover:border-[#1A3066] transition-all group flex flex-col gap-1">
                  <h4 className="text-sm font-bold text-[#1A3066] group-hover:text-[#D4AF37]">Export Verification</h4>
                  <p className="text-xs text-[#606770]">Checklist for strategic goods monitoring</p>
               </div>
               <div className="border border-[#DADDE1] p-4 rounded-lg hover:border-[#1A3066] transition-all group flex flex-col gap-1">
                  <h4 className="text-sm font-bold text-[#1A3066] group-hover:text-[#D4AF37]">Free Zone Management</h4>
                  <p className="text-xs text-[#606770]">Regulatory framework for FZ transfers</p>
               </div>
               <div className="border border-[#DADDE1] p-4 rounded-lg hover:border-[#1A3066] transition-all group flex flex-col gap-1">
                  <h4 className="text-sm font-bold text-[#1A3066] group-hover:text-[#D4AF37]">Narcotics Interdiction</h4>
                  <p className="text-xs text-[#606770]">Border control tactical protocols</p>
               </div>
               <div className="border border-[#DADDE1] p-4 rounded-lg hover:border-[#1A3066] transition-all group flex flex-col gap-1">
                  <h4 className="text-sm font-bold text-[#1A3066] group-hover:text-[#D4AF37]">Transit Cargo Control</h4>
                  <p className="text-xs text-[#606770]">Cross-border movement regulations</p>
               </div>
               <div className="border border-[#DADDE1] p-4 rounded-lg hover:border-[#1A3066] transition-all group flex flex-col gap-1">
                  <h4 className="text-sm font-bold text-[#1A3066] group-hover:text-[#D4AF37]">Post-Clearance Audit</h4>
                  <p className="text-xs text-[#606770]">Compliance review and audit cycles</p>
               </div>
            </div>
          </div>

          <div className="card">
             <SectionHeader title="Active Standard Procedures" />
             <div className="mt-6 space-y-4">
                {mockProcedures.map(proc => (
                  <div key={proc.id} className="p-4 bg-[#F8FAFC] rounded-lg group">
                    <h4 className="font-bold text-[#1C1E21] flex items-center gap-2 text-sm">
                      <FileText size={16} className="text-[#1A3066]" />
                      {proc.title}
                    </h4>
                    <div className="mt-3 flex gap-2">
                       <button className="text-[11px] font-bold text-[#1A3066] uppercase hover:underline">View Steps</button>
                       <span className="text-[#DADDE1]">|</span>
                       <button className="text-[11px] font-bold text-[#1A3066] uppercase hover:underline">Download Forms</button>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card">
            <h3 className="text-[#1C1E21] font-bold text-sm mb-4 uppercase tracking-widest">Recent Circulars</h3>
            <div className="space-y-4">
              {mockCirculars.map((circular, i) => (
                <div key={circular.id} className={`pb-4 ${i !== mockCirculars.length - 1 ? 'border-b border-[#F0F2F5]' : ''}`}>
                  <span className={`badge ${i % 2 === 0 ? 'badge-tax' : 'badge-legal'}`}>
                    {i % 2 === 0 ? 'Tax' : 'Legal'}
                  </span>
                  <div className="text-[13px] font-bold text-[#1C1E21] mt-1 line-clamp-2">{circular.title}</div>
                  <div className="text-[11px] text-[#606770] mt-1">Effective: {circular.date}</div>
                </div>
              ))}
              <div className="pt-2">
                 <button className="w-full py-2 bg-[#F2F3F5] text-[#1A3066] text-xs font-bold rounded hover:bg-[#E4E6EB] transition-all">VIEW ALL NOTICES</button>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-[#1C1E21] font-bold text-sm mb-4 uppercase tracking-widest">Noticeboard</h3>
            <div className="p-4 bg-[#FFF9E6] border-l-4 border-[#D4AF37] rounded-r-lg">
                <p className="text-[12px] text-[#1C1E21] leading-relaxed">
                  <strong>System Maintenance:</strong> The HS Code Search Engine will be offline this Saturday 22:00 - 02:00 for data synchronization.
                </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HSSearchView() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<HSCode[]>(mockHSCodes);
  const [selectedHS, setSelectedHS] = useState<HSCode | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const filtered = mockHSCodes.filter(item => 
      item.code.includes(query) || 
      item.description.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
    setSelectedHS(null);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="card bg-[#1A3066] border-none">
        <h3 className="text-white text-lg font-bold mb-4 flex items-center gap-2 uppercase tracking-widest">
           <Search size={18} className="text-[#D4AF37]" />
           HS Code Tariff Lookup
        </h3>
        <form onSubmit={handleSearch} className="relative">
          <input 
            type="text" 
            placeholder="Enter HS Code or keyword (e.g. 8703 or 'Horses')"
            className="w-full bg-white/10 border border-white/20 text-white rounded-lg py-3 pl-12 pr-4 focus:ring-2 focus:ring-[#D4AF37] outline-none placeholder:text-white/40"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" size={18} />
          <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#D4AF37] text-[#1A3066] px-5 py-1.5 rounded-md font-bold hover:bg-[#ffe066] transition-all text-sm">
            SEARCH
          </button>
        </form>
      </div>

      <div className={`grid grid-cols-1 ${selectedHS ? 'lg:grid-cols-[1.5fr_1fr]' : 'lg:grid-cols-1'} gap-6 transition-all duration-300`}>
        <div className="card h-fit">
          <div className="data-grid-header border-[#DADDE1]">
            <span>HS Code</span>
            <span>Description</span>
            <span>Duty Rate</span>
            <span>Sales Tax</span>
          </div>
          <div className="divide-y divide-[#F0F2F5]">
            {results.length > 0 ? results.map(item => (
              <div 
                key={item.code} 
                onClick={() => setSelectedHS(item)}
                className={`data-grid-row border-none hover:bg-slate-50 transition-all cursor-pointer ${selectedHS?.code === item.code ? 'bg-[#F2F3F5] !border-l-4 !border-[#1A3066]' : ''}`}
              >
                <span className="font-mono font-bold text-[#1A3066]">{item.code}</span>
                <span className="text-[#606770] text-sm line-clamp-1">{item.description}</span>
                <span className="text-[#1C1E21] font-bold text-sm">{item.duty_rate}</span>
                <span className="text-[#606770] text-sm">{item.sales_tax}</span>
              </div>
            )) : (
              <div className="p-12 text-center text-[#606770]">
                No matching tariff codes found in current dataset.
              </div>
            )}
          </div>
        </div>

        <AnimatePresence>
          {selectedHS && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              <div className="card relative">
                <button 
                  onClick={() => setSelectedHS(null)}
                  className="absolute top-4 right-4 text-[#606770] hover:text-[#1A3066]"
                >
                  <X size={20} />
                </button>
                <div className="mb-6">
                  <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest block mb-1">Detailed View</span>
                  <h3 className="text-2xl font-bold font-mono text-[#1A3066]">{selectedHS.code}</h3>
                  <p className="text-sm text-[#606770] mt-2 leading-relaxed">{selectedHS.description}</p>
                </div>

                <div className="space-y-6">
                  <DetailSection 
                    title="Common Applications" 
                    items={selectedHS.common_uses || []} 
                    icon={<Settings size={14} className="text-[#1A3066]" />}
                  />
                  <DetailSection 
                    title="Applicable Regulations" 
                    items={selectedHS.regulations || []} 
                    icon={<ShieldCheck size={14} className="text-red-500" />}
                  />
                  <DetailSection 
                    title="Related Technical Circulars" 
                    items={selectedHS.related_circulars || []} 
                    icon={<FileText size={14} className="text-blue-500" />}
                  />
                </div>

                <div className="mt-8 pt-6 border-t border-[#F0F2F5] flex gap-4">
                  <button className="flex-1 bg-[#1A3066] text-white py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-[#142652] transition-all">
                    Generate Report
                  </button>
                  <button className="flex-1 border border-[#DADDE1] text-[#1A3066] py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-[#F2F3F5] transition-all">
                    Bookmark
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function DetailSection({ title, items, icon }: { title: string, items: string[], icon: any }) {
  return (
    <div className="space-y-3">
      <h4 className="text-[11px] font-bold text-[#606770] uppercase tracking-widest flex items-center gap-2">
        {icon}
        {title}
      </h4>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex gap-3 text-sm text-[#1C1E21] bg-[#F8FAFC] p-3 rounded-lg border border-[#F0F2F5]">
            <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full mt-1.5 shrink-0"></div>
            {item}
          </div>
        ))}
        {items.length === 0 && <p className="text-xs text-[#606770] italic">No specific data available.</p>}
      </div>
    </div>
  );
}

function ProceduresView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProc, setSelectedProc] = useState<Procedure | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('All');

  const categories = [
    { title: "Import", display: "Import Procedures" },
    { title: "Export", display: "Export Procedures" },
    { title: "Transit", display: "Warehouse & Transit" },
    { title: "Warehouse", display: "LMW & Bonded" },
    { title: "General", display: "General Administration" }
  ];

  const filteredProcedures = mockProcedures.filter(proc => {
    const matchesSearch = proc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         proc.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'All' || proc.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-[#1A3066] p-6 rounded-xl text-white gap-4">
        <div>
          <h3 className="text-xl font-bold">Standard Operating Procedures</h3>
          <p className="text-sm opacity-80 mt-1 text-[#D4AF37]">Operational efficiency through structured workflows.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
             <input 
               type="text" 
               placeholder="Search procedures..." 
               className="w-full bg-white/10 border border-white/20 rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-[#D4AF37] outline-none placeholder:text-white/40"
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
             />
             <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
          </div>
          <button className="bg-[#D4AF37] text-[#1A3066] px-4 py-2 rounded-lg font-bold text-sm hover:bg-[#ffe066] transition-all shrink-0">
            DOWNLOAD ALL
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {['All', ...categories.map(c => c.title)].map(cat => (
          <button
            key={cat}
            onClick={() => {
              setFilterCategory(cat);
              setSelectedProc(null);
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all border ${
              filterCategory === cat 
                ? 'bg-[#1A3066] text-white border-[#1A3066]' 
                : 'bg-white text-[#606770] border-[#DADDE1] hover:border-[#1A3066] hover:text-[#1A3066]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className={`grid grid-cols-1 ${selectedProc ? 'lg:grid-cols-[1.5fr_1fr]' : 'lg:grid-cols-2'} gap-6 transition-all duration-300`}>
        <div className="space-y-6">
          {categories.map(cat => {
            const catProcs = filteredProcedures.filter(p => p.category === cat.title);
            if (catProcs.length === 0) return null;
            
            return (
              <div key={cat.title} className="card">
                <SectionHeader title={cat.display} />
                <div className="mt-4 space-y-2">
                  {catProcs.map(proc => (
                    <div key={proc.id} onClick={() => setSelectedProc(proc)}>
                      <ProcedureItem title={proc.title} active={selectedProc?.id === proc.id} />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
          
          {filteredProcedures.length === 0 && (
            <div className="col-span-full p-20 text-center card bg-white">
              <Search size={48} className="mx-auto text-slate-200 mb-4" />
              <h4 className="text-lg font-bold text-[#1A3066]">No procedures found</h4>
              <p className="text-sm text-[#606770]">Try searching for different keywords using the search bar above.</p>
            </div>
          )}
        </div>

        <AnimatePresence>
          {selectedProc && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6 sticky top-8 h-fit"
            >
              <div className="card relative border-l-4 border-[#1A3066]">
                <button 
                  onClick={() => setSelectedProc(null)}
                  className="absolute top-4 right-4 text-[#606770] hover:text-[#1A3066]"
                >
                  <X size={20} />
                </button>
                
                <div className="mb-6">
                  <span className="badge badge-legal mb-2">{selectedProc.category}</span>
                  <h3 className="text-xl font-bold text-[#1A3066]">{selectedProc.title}</h3>
                  {selectedProc.legal_reference && (
                    <p className="text-xs text-[#606770] mt-1 font-mono uppercase tracking-tight">{selectedProc.legal_reference}</p>
                  )}
                </div>

                <div className="space-y-6">
                  <div className="space-y-3">
                    <h4 className="text-[11px] font-bold text-[#606770] uppercase tracking-widest flex items-center gap-2">
                      <LayoutDashboard size={14} className="text-[#1A3066]" />
                      Procedural Steps
                    </h4>
                    <div className="space-y-3">
                       {selectedProc.steps.map((step, idx) => (
                         <div key={idx} className="flex gap-3 text-sm">
                            <div className="w-5 h-5 rounded-full bg-[#1A3066] text-white flex items-center justify-center text-[10px] shrink-0 font-bold">
                              {idx + 1}
                            </div>
                            <span className="text-[#1C1E21]">{step}</span>
                         </div>
                       ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-[11px] font-bold text-[#606770] uppercase tracking-widest flex items-center gap-2">
                      <FileText size={14} className="text-[#1A3066]" />
                      Required Documentation
                    </h4>
                    <div className="flex flex-wrap gap-2">
                       {selectedProc.documents.map(doc => (
                         <span key={doc} className="text-xs bg-[#F2F3F5] text-[#1A3066] px-3 py-1.5 rounded-full font-medium border border-[#DADDE1]">
                            {doc}
                         </span>
                       ))}
                    </div>
                  </div>

                  {selectedProc.estimated_time && (
                    <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-between">
                       <span className="text-xs font-bold text-[#1A3066] uppercase">Est. Processing Time</span>
                       <span className="text-sm font-bold text-[#1A3066]">{selectedProc.estimated_time}</span>
                    </div>
                  )}
                </div>

                <div className="mt-8 pt-6 border-t border-[#DADDE1] flex gap-3">
                   <button className="flex-1 btn-primary py-2.5 text-xs">Print Guide</button>
                   <button className="flex-1 border border-[#DADDE1] text-[#1A3066] font-bold rounded-lg py-2.5 text-xs hover:bg-[#F2F3F5]">Bookmark</button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function ProcedureItem({ title, active }: { title: string, active?: boolean }) {
  return (
    <div className={`p-3 border rounded-lg flex items-center justify-between hover:bg-white hover:border-[#1A3066] transition-all group cursor-pointer ${active ? 'bg-[#F2F3F5] border-[#1A3066] shadow-sm' : 'bg-slate-50 border-slate-100'}`}>
      <span className={`text-sm font-medium ${active ? 'text-[#1A3066]' : 'text-[#1C1E21]'}`}>{title}</span>
      <ChevronRight size={14} className={`${active ? 'text-[#1A3066] translate-x-1' : 'text-[#606770]'} transition-all group-hover:text-[#1A3066]`} />
    </div>
  );
}

function LegalView() {
  const customsLeg = mockLegislations.filter(l => l.category === 'Customs Legislation');
  const exciseTax = mockLegislations.filter(l => l.category === 'Excise & Sales Tax');
  const associatedActs = mockLegislations.filter(l => l.category === 'Associated Acts');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-width-7xl mx-auto">
      <KBGroup title="Customs Legislation" items={customsLeg} />
      <KBGroup title="Excise & Sales Tax" items={exciseTax} />
      <KBGroup title="Associated Acts" items={associatedActs} />
      <div className="lg:col-span-3 card bg-white border-l-8 border-[#CC0000]">
        <div className="flex items-start gap-4">
           <div className="bg-[#FFEBEB] p-3 rounded-xl text-[#CC0000]">
              <Info size={24} />
           </div>
           <div>
              <h4 className="font-bold text-lg text-[#1C1E21]">Legal Compliance & Enforcement</h4>
              <p className="text-sm text-[#606770] mt-1 max-w-3xl">Officers are reminded that all enforcement actions must strictly adhere to the search and seizure powers granted under Part XII of the Customs Act 1967. Ensure all PKA forms are correctly filed within 24 hours of suspected violations.</p>
           </div>
        </div>
      </div>
    </div>
  );
}

function TradeView() {
  const [selectedAgreement, setSelectedAgreement] = useState<TradeAgreement | null>(null);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-[#1A3066] p-6 rounded-xl text-white gap-4 shadow-lg">
        <div>
          <h3 className="text-xl font-bold">International Trade Agreements</h3>
          <p className="text-sm opacity-80 mt-1 text-[#D4AF37]">Monitoring preferential tariff treatment frameworks.</p>
        </div>
        <div className="bg-white/10 px-4 py-2 rounded-lg border border-white/20 flex items-center gap-3">
          <Info size={18} className="text-[#D4AF37]" />
          <p className="text-xs font-medium">Verify "Rules of Origin" before granting preferential rates.</p>
        </div>
      </div>

      <div className={`grid grid-cols-1 ${selectedAgreement ? 'lg:grid-cols-[1.5fr_1fr]' : 'lg:grid-cols-2'} gap-6 transition-all duration-300`}>
        <div className="space-y-6">
          <div className="card">
            <SectionHeader title="Regional Agreements (FTA)" />
            <div className="mt-4 grid grid-cols-1 gap-2">
              {mockTradeAgreements.filter(a => a.type === 'Regional').map(item => (
                 <button 
                   key={item.id} 
                   onClick={() => setSelectedAgreement(item)}
                   className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between group ${
                     selectedAgreement?.id === item.id 
                       ? 'bg-[#1A3066] border-[#1A3066] text-white shadow-md' 
                       : 'bg-[#F8FAFC] border-[#DADDE1] hover:border-[#1A3066] text-[#1C1E21]'
                   }`}
                 >
                    <div>
                      <h5 className={`font-bold text-sm ${selectedAgreement?.id === item.id ? 'text-[#D4AF37]' : 'text-[#1A3066]'}`}>{item.name} ({item.acronym})</h5>
                      <p className={`text-[11px] mt-0.5 ${selectedAgreement?.id === item.id ? 'text-white/70' : 'text-[#606770]'}`}>
                        Status: <span className="font-bold">{item.status}</span>
                      </p>
                    </div>
                    <Globe size={18} className={`${selectedAgreement?.id === item.id ? 'text-[#D4AF37]' : 'text-[#DADDE1] group-hover:text-[#D4AF37]'} transition-all`} />
                 </button>
              ))}
            </div>
          </div>
          <div className="card">
            <SectionHeader title="Bilateral Agreements" />
            <div className="mt-4 grid grid-cols-1 gap-2">
              {mockTradeAgreements.filter(a => a.type === 'Bilateral').map(item => (
                 <button 
                   key={item.id} 
                   onClick={() => setSelectedAgreement(item)}
                   className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between group ${
                     selectedAgreement?.id === item.id 
                       ? 'bg-[#1A3066] border-[#1A3066] text-white shadow-md' 
                       : 'bg-[#F8FAFC] border-[#DADDE1] hover:border-[#1A3066] text-[#1C1E21]'
                   }`}
                 >
                    <div>
                      <h5 className={`font-bold text-sm ${selectedAgreement?.id === item.id ? 'text-[#D4AF37]' : 'text-[#1A3066]'}`}>{item.name} ({item.acronym})</h5>
                      <p className={`text-[11px] mt-0.5 ${selectedAgreement?.id === item.id ? 'text-white/70' : 'text-[#606770]'}`}>
                        Status: <span className="font-bold">{item.status}</span>
                      </p>
                    </div>
                    <Globe size={18} className={`${selectedAgreement?.id === item.id ? 'text-[#D4AF37]' : 'text-[#DADDE1] group-hover:text-[#D4AF37]'} transition-all`} />
                 </button>
              ))}
            </div>
          </div>
        </div>

        <AnimatePresence>
          {selectedAgreement && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="sticky top-8 h-fit"
            >
              <div className="card relative border-t-4 border-[#D4AF37] shadow-xl">
                <button 
                  onClick={() => setSelectedAgreement(null)}
                  className="absolute top-4 right-4 text-[#606770] hover:text-[#1A3066] transition-colors"
                >
                  <X size={20} />
                </button>
                
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`badge ${selectedAgreement.type === 'Regional' ? 'badge-legal' : 'badge-tax'}`}>
                      {selectedAgreement.type}
                    </span>
                    <span className="badge bg-green-100 text-green-700 font-bold uppercase text-[10px] px-2 py-0.5 rounded">{selectedAgreement.status}</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#1A3066] leading-tight">{selectedAgreement.name}</h3>
                  <p className="text-xs text-[#D4AF37] font-bold tracking-widest mt-1 uppercase">Agreement Identifier: {selectedAgreement.id.toUpperCase()}</p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <h4 className="text-[10px] font-bold text-[#606770] uppercase tracking-widest flex items-center gap-2">
                      <BookOpen size={14} className="text-[#1A3066]" />
                      About Agreement
                    </h4>
                    <p className="text-sm text-[#1C1E21] leading-relaxed italic border-l-2 border-[#D4AF37] pl-3">
                      "{selectedAgreement.description}"
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-[10px] font-bold text-[#606770] uppercase tracking-widest flex items-center gap-2">
                      <Globe size={14} className="text-[#1A3066]" />
                      Member Countries
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedAgreement.member_countries.map(country => (
                        <span key={country} className="text-[10px] font-bold bg-[#F2F3F5] text-[#1A3066] px-2 py-1 rounded border border-[#DADDE1]">
                          {country}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-[10px] font-bold text-[#606770] uppercase tracking-widest flex items-center gap-2">
                      <ShieldCheck size={14} className="text-[#1A3066]" />
                      Strategic Benefits for JKDM
                    </h4>
                    <ul className="space-y-2">
                      {selectedAgreement.key_benefits.map((benefit, i) => (
                        <li key={i} className="flex gap-2 text-sm text-[#1C1E21]">
                          <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full mt-1.5 shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6 border-t border-[#DADDE1] flex flex-col gap-3">
                    <a 
                      href={selectedAgreement.pdf_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn-primary w-full py-3 text-xs flex items-center justify-center gap-2 shadow-lg text-center"
                    >
                      <FileText size={16} /> VIEW FULL TEXT (PDF)
                    </a>
                    <button className="w-full border border-[#DADDE1] text-[#1A3066] font-bold rounded-lg py-3 text-xs hover:bg-[#F2F3F5] transition-all flex items-center justify-center gap-2">
                      CERTIFICATE VERIFICATION (E-PCO)
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function LibraryView() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center gap-4 card p-4 bg-[#F2F3F5] border-none">
         <Search size={20} className="text-[#606770]" />
         <input type="text" placeholder="Filter library materials (e.g. guidebooks, training videos)..." className="bg-transparent outline-none w-full text-sm" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {['Import Policy Handbook', 'Officer Field Manual', 'Narcotics ID Guide', 'Valuation Method V.2', 'Excise Sealing Guide', 'STA Compliance Book', 'Digital Customs Roadmap', 'Border Control Protocol'].map(item => (
          <div key={item} className="card p-4 hover:border-[#1A3066] cursor-pointer group">
             <div className="w-full aspect-[3/4] bg-slate-100 rounded mb-4 flex items-center justify-center">
                <Library size={48} className="text-slate-300 group-hover:text-[#1A3066] transition-all" />
             </div>
             <h5 className="font-bold text-sm text-[#1C1E21] leading-tight">{item}</h5>
             <p className="text-[10px] uppercase font-bold text-[#606770] mt-2 tracking-wide">PDF • 12.4 MB</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- UI Helpers ---

function AIAssistantView() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', content: input };
    const history = messages;
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await askCustomsAI(history, input);
      setMessages(prev => [...prev, { role: 'assistant', content: response || "" }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Error: Could not reach Intelligence Advisor. Please verify technical connectivity." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => setMessages([]);

  return (
    <div className="flex flex-col h-[calc(100vh-220px)] max-w-4xl mx-auto w-full">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-[10px] font-bold text-[#606770] uppercase tracking-widest">Active Intelligence Node</span>
        </div>
        {messages.length > 0 && (
          <button onClick={clearChat} className="text-[10px] font-bold text-red-600 hover:text-red-700 uppercase tracking-widest flex items-center gap-1">
            <X size={12} /> Clear Session
          </button>
        )}
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-hide">
        {messages.length === 0 && (
          <div className="text-center py-20 px-8">
            <div className="w-16 h-16 bg-[#1A3066] rounded-2xl flex items-center justify-center mx-auto mb-6 text-[#D4AF37] shadow-lg">
              <MessageSquare size={32} />
            </div>
            <h3 className="text-xl font-bold text-[#1C1E21] mb-2 uppercase tracking-tight">Customs Intelligence Advisor</h3>
            <p className="text-[#606770] text-sm mb-8">Professional guidance on HS codes, Act 1967, and operational SOPs.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto">
              <PromptSuggestion text="What is the duty for laptops?" onClick={setInput} />
              <PromptSuggestion text="Explain Form K1 workflow" onClick={setInput} />
              <PromptSuggestion text="Section 114: Search w/o warrant" onClick={setInput} />
              <PromptSuggestion text="Is RCEP active for Vietnam?" onClick={setInput} />
            </div>
          </div>
        )}
        {messages.map((m, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: m.role === 'user' ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] p-4 rounded-xl shadow-sm border ${
              m.role === 'user' 
                ? 'bg-[#1A3066] text-white border-transparent' 
                : 'bg-white text-[#1C1E21] border-[#DADDE1]'
            }`}>
               <div className="text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: m.content.replace(/\n/g, '<br/>') }} />
            </div>
          </motion.div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
             <div className="bg-white border border-[#DADDE1] p-4 rounded-xl flex gap-2 shadow-sm">
                <div className="w-2 h-2 bg-slate-200 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-slate-300 rounded-full animate-pulse delay-75"></div>
                <div className="w-2 h-2 bg-slate-200 rounded-full animate-pulse delay-150"></div>
             </div>
          </div>
        )}
      </div>

      <form onSubmit={sendMessage} className="mt-6 p-2 bg-white border border-[#DADDE1] rounded-2xl shadow-xl flex gap-2">
        <input 
          type="text" 
          placeholder="Ask a technical customs question..."
          className="flex-1 bg-transparent border-none outline-none px-4 py-3 text-sm"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isLoading}
        />
        <button 
          type="submit" 
          disabled={isLoading || !input.trim()}
          className="bg-[#1A3066] text-[#D4AF37] p-3 rounded-xl hover:bg-[#142652] disabled:opacity-50 transition-all shadow-md active:scale-95"
        >
          <ChevronRight size={24} />
        </button>
      </form>
    </div>
  );
}

// --- UI Helpers ---

function StatsCard({ label, value, trend, color }: { label: string, value: string, trend: string, color: string }) {
  return (
    <div className={`stat-card ${color === 'gold' ? 'from-[#D4AF37] to-[#BFA030] !text-[#1A3066]' : ''}`}>
      <div className="stat-lbl">{label}</div>
      <div className="flex items-end justify-between mt-1">
        <div className="stat-val">{value}</div>
        <span className={`text-[11px] font-bold ${trend.startsWith('+') ? 'text-white' : 'text-red-300'}`}>
          {trend}
        </span>
      </div>
    </div>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between pb-4 border-b border-[#DADDE1]">
      <h3 className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#606770]">{title}</h3>
      <button className="text-[11px] font-bold text-[#1A3066] hover:underline flex items-center gap-1 uppercase">
        Manage <Plus size={12} />
      </button>
    </div>
  );
}

function KBGroup({ title, items }: { title: string, items: (string | Legislation)[] }) {
  return (
    <div className="card h-full flex flex-col p-0">
      <div className="bg-[#1A3066] p-4 text-white">
        <h4 className="font-bold uppercase text-[11px] tracking-widest">{title}</h4>
      </div>
      <div className="p-4 space-y-1 flex-1">
        {items.map(item => {
          const isObject = typeof item === 'object';
          const label = isObject ? item.title : item;
          const url = isObject ? item.url : null;

          if (url) {
            return (
              <a 
                key={label} 
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-left p-2.5 text-sm text-[#1C1E21] font-medium hover:bg-[#F2F3F5] rounded-lg transition-all flex items-center justify-between group border border-transparent hover:border-[#DADDE1]"
              >
                {label}
                <ChevronRight size={14} className="text-[#DADDE1] group-hover:text-[#1A3066] transition-all" />
              </a>
            );
          }

          return (
            <button key={label} className="w-full text-left p-2.5 text-sm text-[#1C1E21] font-medium hover:bg-[#F2F3F5] rounded-lg transition-all flex items-center justify-between group border border-transparent hover:border-[#DADDE1]">
              {label}
              <ChevronRight size={14} className="text-[#DADDE1] group-hover:text-[#1A3066] transition-all" />
            </button>
          );
        })}
      </div>
    </div>
  );
}

function PromptSuggestion({ text, onClick }: { text: string, onClick: (t: string) => void }) {
  return (
    <button 
      onClick={() => onClick(text)}
      className="p-3 text-sm text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 text-left transition-all"
    >
      {text}
    </button>
  );
}
