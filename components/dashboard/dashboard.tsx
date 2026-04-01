"use client";

export default function StudentDashboard({ user }: { user: any }) {
    const homeworks = [
        { id: 1, subject: 'Geography', task: 'Chapter 4 Notes', time: 'Tomorrow', color: 'bg-[#eef0fc] text-[#606fce]', dot: 'bg-[#a6aff4]' },
        { id: 2, subject: 'Physics', task: 'Kinematics Worksheet', time: 'Wed', color: 'bg-[#fceede] text-[#fc6e35]', dot: 'bg-[#ffc1a6]' },
        { id: 3, subject: 'Physics II', task: 'Lab Report', time: 'Thu', color: 'bg-[#fceede] text-[#fc6e35]', dot: 'bg-[#ffc1a6]' },
        { id: 4, subject: 'Chemistry', task: 'Pre-lab Setup', time: 'Fri', color: 'bg-[#e6f9ed] text-[#27d861]', dot: 'bg-[#9ef0b8]' },
        { id: 5, subject: 'Physical Ed', task: 'Fitness Log', time: 'Mon', color: 'bg-[#fff8e7] text-[#f9c02d]', dot: 'bg-[#ffeca4]' },
        { id: 6, subject: 'Mathematics', task: 'Problem Set 3', time: 'Tue', color: 'bg-[#e7f9fb] text-[#26d0e6]', dot: 'bg-[#abf0f8]' },
    ];

    return (
        <div className="font-sans max-w-[1200px] w-full mx-auto p-10 text-[#1a1b24] bg-white min-h-screen">
            <header className="mb-12">
                <h1 className="text-[28px] font-medium text-[#a0a3bd] m-0">Hello, <span className="text-[#1a1b24] font-extrabold">{user?.user_id || 'Student07'}!</span></h1>
            </header>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-20">
                {/* LEFT SIDE: HOMEWORK */}
                <div className="flex flex-col">
                    <h2 className="text-[20px] font-bold text-[#1a1b24] mb-1">Homework Tracker</h2>
                    <p className="text-[14px] text-[#a0a3bd] font-medium mb-10">2 April 2026, Thursday</p>

                    <div className="flex flex-col gap-6">
                        {homeworks.map(hw => (
                            <div className="flex items-center gap-6" key={hw.id}>
                                <div className="text-[15px] font-bold text-[#a0a3bd] min-w-[50px]">{hw.time}</div>
                                <div className={`flex-1 flex items-center p-4 px-6 rounded-[16px] transition-all duration-200 hover:-translate-y-[2px] hover:shadow-[0_8px_16px_rgba(0,0,0,0.04)] cursor-pointer ${hw.color}`}>
                                    <div className={`w-5 h-5 rounded-full mr-4 ${hw.dot}`}></div>
                                    <div className="flex flex-col gap-1 flex-1">
                                        <span className="text-[15px] font-bold">{hw.subject}</span>
                                        <span className="text-[12px] font-medium opacity-70">{hw.task}</span>
                                    </div>
                                    <div className="text-[14px] font-bold">Pending</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT SIDE: CALENDAR */}
                <div className="flex flex-col xl:border-l-2 xl:border-[#f4f5f7] xl:pl-16 pt-10 xl:pt-0 border-t-2 xl:border-t-0 border-[#f4f5f7]">
                    <div className="flex flex-col items-center mb-10">
                        <div className="flex items-center gap-4 mb-6">
                            <span className="text-[#e2e4e8] text-[24px] font-light">←</span>
                            <div className="w-[80px] h-[80px] rounded-full bg-[#ffebb2] text-white flex items-center justify-center text-[32px] font-extrabold drop-shadow-[1px_1px_2px_rgba(255,200,0,0.3)]">12</div>
                            <div className="w-[44px] h-[44px] rounded-full flex items-center justify-center text-[15px] font-bold text-white bg-[#ffc6bd]">16</div>
                            <div className="w-[44px] h-[44px] rounded-full flex items-center justify-center text-[15px] font-bold text-white bg-[#ffc6bd] opacity-50">24</div>
                            <div className="w-[44px] h-[44px] rounded-full flex items-center justify-center text-[15px] font-bold text-white bg-[#e0e4fe]">6</div>
                            <span className="text-[#e2e4e8] text-[24px] font-light">→</span>
                        </div>
                        <h4 className="text-[14px] font-bold text-[#f9c02d] mb-1">Physics</h4>
                        <p className="text-[13px] font-medium text-[#a0a3bd]">Ohm's Law</p>
                    </div>

                    <div className="flex flex-col">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h3 className="text-[16px] font-extrabold m-0 text-[#1a1b24]">Calendar</h3>
                                <p className="text-[12px] font-bold text-[#fc6e35] mt-1">04/02/2026</p>
                            </div>
                            <div className="flex gap-2">
                                <span className="text-[#e2e4e8] text-[24px] font-light">‹</span>
                                <span className="text-[#e2e4e8] text-[24px] font-light">›</span>
                            </div>
                        </div>

                        <h4 className="text-center text-[15px] font-bold text-[#1a1b24] mb-6">April</h4>

                        <div className="grid grid-cols-7 gap-y-5 text-center mb-10">
                            {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
                                <div className="text-[11px] font-bold text-[#a0a3bd] uppercase mb-3" key={day}>{day}</div>
                            ))}
                            <div className="text-[13px] font-semibold h-8 flex items-center justify-center relative text-[#cbd0d9]">31</div>
                            {[1,2,3,4,5,6,7,8,9,10,11].map(num => (
                                 <div key={num} className="text-[13px] font-semibold h-8 flex items-center justify-center text-[#1a1b24]">{num}</div>
                            ))}
                            <div className="text-[13px] font-semibold h-8 flex items-center justify-center text-white bg-[#f9c02d] rounded-full w-8 mx-auto">12</div>
                            <div className="text-[13px] font-semibold h-8 flex items-center justify-center text-white bg-[#f9c02d] rounded-full w-8 mx-auto">13</div>
                            {[14,15].map(num => (
                                 <div key={num} className="text-[13px] font-semibold h-8 flex items-center justify-center text-[#1a1b24]">{num}</div>
                            ))}
                            <div className="text-[13px] font-semibold h-8 flex items-center justify-center text-white bg-[#fc6e35] rounded-full w-8 mx-auto">16</div>
                            {[17,18,19,20,21].map(num => (
                                 <div key={num} className="text-[13px] font-semibold h-8 flex items-center justify-center text-[#1a1b24]">{num}</div>
                            ))}
                            <div className="text-[13px] font-semibold h-8 flex items-center justify-center text-white bg-[#fc6e35] rounded-full w-8 mx-auto">22</div>
                            <div className="text-[13px] font-semibold h-8 flex items-center justify-center text-[#1a1b24]">23</div>
                            <div className="text-[13px] font-semibold h-8 flex items-center justify-center text-white bg-[#606fce] rounded-full w-8 mx-auto">24</div>
                            {[25,26,27,28,29,30].map(num => (
                                 <div key={num} className="text-[13px] font-semibold h-8 flex items-center justify-center text-[#1a1b24]">{num}</div>
                            ))}
                            <div className="text-[13px] font-semibold h-8 flex items-center justify-center relative text-[#cbd0d9]">1</div>
                            <div className="text-[13px] font-semibold h-8 flex items-center justify-center relative text-[#cbd0d9]">2</div>
                            <div className="text-[13px] font-semibold h-8 flex items-center justify-center relative text-[#cbd0d9]">3</div>
                            <div className="text-[13px] font-semibold h-8 flex items-center justify-center relative text-[#cbd0d9]">4</div>
                        </div>

                        <div className="flex gap-6 justify-center border-t border-[#f4f5f7] pt-6 flex-wrap">
                            <div className="flex items-center gap-2 text-[11px] font-semibold text-[#1a1b24]"><div className="w-2.5 h-2.5 rounded-full bg-[#606fce]"></div> Activities</div>
                            <div className="flex items-center gap-2 text-[11px] font-semibold text-[#1a1b24]"><div className="w-2.5 h-2.5 rounded-full bg-[#fc6e35]"></div> Homework</div>
                            <div className="flex items-center gap-2 text-[11px] font-semibold text-[#1a1b24]"><div className="w-2.5 h-2.5 rounded-full bg-[#f9c02d]"></div> Exams</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
