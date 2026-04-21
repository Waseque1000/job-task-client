import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

const WelcomePage = () => {
  return (
    <div className="min-h-screen bg-[#FCFAF5] font-sans selection:bg-[#E18D60] selection:text-white relative overflow-hidden">
      {/* Soft Ambient Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#faeedf] blur-[120px] opacity-70 pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#fdece4] blur-[120px] opacity-70 pointer-events-none" />

      <main className="relative z-10 flex flex-col items-center pt-24 md:pt-32 px-4 max-w-6xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F5EEE6] text-[#867666] text-sm font-medium mb-12 shadow-sm border border-[#EBE1D5]">
          <Sparkles size={16} className="text-[#E18D60]" />
          <span>Your calm, intentional companion</span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-[5.5rem] font-bold tracking-tight mb-8 leading-[1.1]">
          <span className="block text-[#433B36]">Plan your day.</span>
          <span className="block text-[#E18D60]">Feel accomplished.</span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl text-[#8E8681] text-lg md:text-xl leading-relaxed mb-12 font-medium">
          A focused Kanban-style daily task board designed for personal utility.
          Move work forward, clear your mind, and end the day with a clean slate.
        </p>

        {/* CTA Button */}
        <Link
          to="/task"
          className="inline-flex items-center gap-2 bg-[#E18D60] hover:bg-[#D47D4E] text-white px-8 py-4 rounded-xl md:rounded-2xl font-semibold text-lg transition-all shadow-[0_8px_20px_-6px_rgba(225,141,96,0.6)] hover:shadow-[0_10px_25px_-6px_rgba(225,141,96,0.8)] hover:-translate-y-0.5"
        >
          Start Planning For Free <ArrowRight size={20} className="ml-1" />
        </Link>

        {/* UI Mockup Window */}
        <div className="mt-20 w-full max-w-5xl rounded-t-3xl md:rounded-t-[2.5rem] bg-[#FEFDFB] border border-[#F0EBE3] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] relative overflow-hidden backdrop-blur-sm mx-auto">
          
          {/* Mockup Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-[#F4EFE9]/50">
            {/* Mac Window Dots */}
            <div className="flex gap-2.5">
              <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
              <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
            </div>
            
            {/* Window Title */}
            <div className="absolute left-1/2 -translate-x-1/2 text-[11px] uppercase tracking-[0.1em] text-[#B0A8A3] font-bold">
              Daily Task Board
            </div>
          </div>

          {/* Board Content */}
          <div className="p-4 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-left rounded-b-3xl md:rounded-b-[2.5rem]">
            
            {/* Column 1: To Do */}
            <div className="bg-[#F9F7F4] rounded-2xl p-4 md:p-5 border border-[#F0EBE3]/50">
              <div className="flex justify-between items-center mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#3B82F6] shadow-sm" />
                  <span className="font-bold text-[#433B36] text-[15px]">To Do</span>
                </div>
                <span className="w-6 h-6 rounded-md bg-[#EBE7E0] text-[#867666] flex items-center justify-center text-xs font-bold">3</span>
              </div>
              
              <div className="space-y-3">
                <div className="bg-white p-4 rounded-xl border border-[#F0EBE3] shadow-sm hover:shadow-md transition-shadow cursor-default transform hover:-translate-y-0.5 duration-200">
                  <h4 className="font-semibold text-[#433B36] text-[15px] mb-4">Review weekly goals</h4>
                  <span className="inline-block px-2.5 py-1 rounded-md bg-[#ECFDF5] text-[#059669] text-[10px] font-bold tracking-wider uppercase border border-[#D1FAE5]">High</span>
                </div>
                
                <div className="bg-white p-4 rounded-xl border border-[#F0EBE3] shadow-sm hover:shadow-md transition-shadow cursor-default transform hover:-translate-y-0.5 duration-200">
                  <h4 className="font-semibold text-[#433B36] text-[15px] mb-4">Reply to team emails</h4>
                  <span className="inline-block px-2.5 py-1 rounded-md bg-[#EFF6FF] text-[#2563EB] text-[10px] font-bold tracking-wider uppercase border border-[#DBEAFE]">Medium</span>
                </div>
              </div>
            </div>

            {/* Column 2: In Progress */}
            <div className="bg-[#F9F7F4] rounded-2xl p-4 md:p-5 border border-[#F0EBE3]/50">
              <div className="flex justify-between items-center mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B] shadow-sm" />
                  <span className="font-bold text-[#433B36] text-[15px]">In Progress</span>
                </div>
                <span className="w-6 h-6 rounded-md bg-[#EBE7E0] text-[#867666] flex items-center justify-center text-xs font-bold">1</span>
              </div>
              
              <div className="space-y-3">
                <div className="bg-white p-4 rounded-xl border border-[#E18D60]/40 shadow-[0_4px_12px_-4px_rgba(225,141,96,0.2)] transform -rotate-1 relative z-10 cursor-default">
                  <div className="absolute -left-[1px] top-4 bottom-4 w-1 bg-[#E18D60] rounded-r-md"></div>
                  <h4 className="font-semibold text-[#433B36] text-[15px] mb-4">Design landing page</h4>
                  <span className="inline-block px-2.5 py-1 rounded-md bg-[#ECFDF5] text-[#059669] text-[10px] font-bold tracking-wider uppercase border border-[#D1FAE5]">High</span>
                </div>
              </div>
            </div>

            {/* Column 3: Completed */}
            <div className="bg-[#F9F7F4] rounded-2xl p-4 md:p-5 border border-[#F0EBE3]/50 opacity-70">
              <div className="flex justify-between items-center mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#10B981] shadow-sm" />
                  <span className="font-bold text-[#433B36] text-[15px]">Completed</span>
                </div>
                <span className="w-6 h-6 rounded-md bg-[#EBE7E0] text-[#867666] flex items-center justify-center text-xs font-bold">2</span>
              </div>
              
              <div className="space-y-3">
                <div className="bg-[#FEFDFB] p-4 rounded-xl border border-[#F0EBE3] shadow-sm opacity-60">
                  <h4 className="font-semibold text-[#8E8681] text-[15px] line-through decoration-[#B0A8A3] decoration-2">Morning meditation</h4>
                </div>
                <div className="bg-[#FEFDFB] p-4 rounded-xl border border-[#F0EBE3] shadow-sm opacity-60">
                  <h4 className="font-semibold text-[#8E8681] text-[15px] line-through decoration-[#B0A8A3] decoration-2">Read 10 pages</h4>
                </div>
              </div>
            </div>

          </div>
          
          {/* Fade out bottom edge of Mockup */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#FCFAF5] to-transparent pointer-events-none" />
        </div>
      </main>
    </div>
  );
};

export default WelcomePage;
