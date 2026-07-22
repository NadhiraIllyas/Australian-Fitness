import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Interactive states
  const [checkInGym, setCheckInGym] = useState('AussieFit Central - Sydney');
  const [showScanner, setShowScanner] = useState(false);
  const [scanning, setScanning] = useState(false);
  
  const [bookingClass, setBookingClass] = useState({
    className: 'Morning Yoga Flow',
    gymName: 'Gold Coast Fitness Hub',
    instructor: 'Liam Gallagher',
    classTime: '2026-07-25T08:30:00.000Z'
  });

  const fetchDashboardData = async () => {
    try {
      const res = await axiosInstance.get('/dashboard/stats');
      setData(res.data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleCheckIn = async (gymName) => {
    try {
      await axiosInstance.post('/dashboard/checkin', { gymName });
      fetchDashboardData();
    } catch (err) {
      alert('Check-in failed');
    }
  };

  const triggerMockScanner = () => {
    setScanning(true);
    // Simulate camera focusing and code scan delay
    setTimeout(() => {
      handleCheckIn(checkInGym);
      setScanning(false);
      setShowScanner(false);
    }, 2000);
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/dashboard/booking', bookingClass);
      fetchDashboardData();
    } catch (err) {
      alert('Booking failed');
    }
  };

  if (loading) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center text-rose-500 font-semibold bg-slate-50 dark:bg-slate-950">
        ⚠️ {error}
      </div>
    );
  }

  const startDate = new Date(data.user.membership.startDate);
  const endDate = new Date(data.user.membership.endDate);
  const totalDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
  const remainingDays = Math.ceil((endDate - new Date()) / (1000 * 60 * 60 * 24));
  const progressPercent = Math.max(0, Math.min(100, Math.round((remainingDays / totalDays) * 100)));

  const maxVisits = Math.max(...data.chart.map(d => d.visits), 1);
  const chartHeight = 100; 
  const chartWidth = 500;  
  const pointXSpacing = chartWidth / (data.chart.length - 1);
  
  const points = data.chart.map((d, index) => {
    const x = index * pointXSpacing;
    const y = chartHeight - (d.visits / maxVisits) * (chartHeight - 15);
    return { x, y };
  });

  let pathD = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const cpX1 = points[i].x + pointXSpacing / 2;
    const cpY1 = points[i].y;
    const cpX2 = points[i + 1].x - pointXSpacing / 2;
    const cpY2 = points[i + 1].y;
    pathD += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${points[i+1].x} ${points[i+1].y}`;
  }
  const areaD = `${pathD} L ${points[points.length-1].x} ${chartHeight} L ${points[0].x} ${chartHeight} Z`;

  return (
    <div className="min-h-[85vh] bg-slate-50 dark:bg-slate-950 py-8 px-4 transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Banner */}
        <div className="bg-gradient-to-tr from-emerald-600 to-teal-650 text-white rounded-3xl p-6 md:p-8 shadow-xl shadow-emerald-600/10 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-black">Welcome Back, {data.user.name}! 👋</h2>
            <p className="text-emerald-100 text-sm mt-1">Here is your AussieFit centralized fitness aggregator dashboard.</p>
          </div>
          <div className="bg-white/15 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10 text-xs font-bold self-start md:self-center">
            📍 Favorite Gym: {data.user.favouriteGym}
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 p-5 rounded-2xl shadow-sm flex items-center space-x-4">
            <div className="p-3 bg-emerald-500/10 dark:bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 rounded-xl">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Total Visits</p>
              <p className="text-xl font-black text-slate-900 dark:text-white">{data.stats.totalVisits} check-ins</p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 p-5 rounded-2xl shadow-sm flex items-center space-x-4">
            <div className="p-3 bg-teal-500/10 dark:bg-teal-500/5 text-teal-600 dark:text-teal-400 rounded-xl">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Upcoming Classes</p>
              <p className="text-xl font-black text-slate-900 dark:text-white">{data.stats.upcomingClassesCount} sessions</p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 p-5 rounded-2xl shadow-sm flex items-center space-x-4">
            <div className="p-3 bg-emerald-500/10 dark:bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 rounded-xl">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Monthly Progress</p>
              <p className="text-xl font-black text-slate-900 dark:text-white">{data.stats.completionRate}% target</p>
            </div>
          </div>
        </div>

        {/* Dashboard Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-8">
            
            {/* Membership Details */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-extrabold text-slate-900 dark:text-white text-base">Current Membership Status</h3>
                <span className="px-3 py-1 bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-900 rounded-full text-xs font-extrabold capitalize">
                  {data.user.membership.status}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl">
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Plan Name</p>
                  <p className="text-sm font-black text-slate-900 dark:text-white mt-0.5">{data.user.membership.planName}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Remaining Validity</p>
                  <p className="text-sm font-black text-slate-900 dark:text-white mt-0.5">{remainingDays} Days</p>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 font-bold mb-1">
                  <span>Validity Progress Indicator</span>
                  <span>{progressPercent}% remaining</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-600 h-full rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }}></div>
                </div>
              </div>
            </div>

            {/* Custom SVG Curved Area Chart (Bonus: Charts) */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-extrabold text-slate-900 dark:text-white text-base">Weekly Activity Curve</h3>
                <span className="text-[10px] font-bold text-slate-400 tracking-wide uppercase">Visits Trend</span>
              </div>
              
              <div className="pt-4 relative">
                <svg className="w-full h-32" viewBox={`0 0 ${chartWidth} ${chartHeight}`} preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  <path d={areaD} fill="url(#chartGrad)" />
                  <path d={pathD} fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" />
                  {points.map((pt, idx) => (
                    <circle key={idx} cx={pt.x} cy={pt.y} r="5" fill="#ffffff" stroke="#10b981" strokeWidth="3" />
                  ))}
                </svg>

                <div className="flex justify-between text-xs font-bold text-slate-400 dark:text-slate-500 mt-2 px-1">
                  {data.chart.map((d, idx) => (
                    <span key={idx} className="w-12 text-center">{d.day}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Mock Action Forms */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Mock Check-In & Scanner Switcher */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm space-y-3">
                <h4 className="font-extrabold text-slate-900 dark:text-white text-sm">Simulate Gym Check-In</h4>
                <select
                  value={checkInGym}
                  onChange={(e) => setCheckInGym(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs focus:bg-white dark:focus:bg-slate-950 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 text-slate-900 dark:text-white cursor-pointer"
                >
                  <option value="AussieFit Central - Sydney">AussieFit Central - Sydney</option>
                  <option value="Melbourne Health Hub">Melbourne Health Hub</option>
                  <option value="Brisbane Active Club">Brisbane Active Club</option>
                  <option value="Adelaide Wellness Center">Adelaide Wellness Center</option>
                </select>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleCheckIn(checkInGym)} 
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-xl text-xs font-bold transition-all"
                  >
                    Quick Check-In
                  </button>
                  <button 
                    onClick={() => setShowScanner(true)} 
                    className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 px-3 py-2 rounded-xl text-xs font-bold transition-all"
                    title="Scan QR Pass"
                  >
                    📸 QR Scan
                  </button>
                </div>
              </div>

              {/* Class Booking */}
              <form onSubmit={handleBooking} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm space-y-3">
                <h4 className="font-extrabold text-slate-900 dark:text-white text-sm">Simulate Class Booking</h4>
                <select
                  value={bookingClass.className}
                  onChange={(e) => {
                    const mappedClasses = {
                      'Morning Yoga Flow': { gymName: 'Gold Coast Fitness Hub', instructor: 'Liam Gallagher' },
                      'High-Intensity HIIT': { gymName: 'AussieFit Central - Sydney', instructor: 'Marcus Aurelius' },
                      'Strength & Powerlifting': { gymName: 'Melbourne Health Hub', instructor: 'Thor Odinson' }
                    };
                    setBookingClass({
                      className: e.target.value,
                      gymName: mappedClasses[e.target.value].gymName,
                      instructor: mappedClasses[e.target.value].instructor,
                      classTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString()
                    });
                  }}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs focus:bg-white dark:focus:bg-slate-950 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 text-slate-900 dark:text-white cursor-pointer"
                >
                  <option value="Morning Yoga Flow">Morning Yoga Flow (Liam Gallagher)</option>
                  <option value="High-Intensity HIIT">High-Intensity HIIT (Marcus Aurelius)</option>
                  <option value="Strength & Powerlifting">Strength & Powerlifting (Thor Odinson)</option>
                </select>
                <button type="submit" className="w-full bg-slate-800 hover:bg-slate-700 text-white py-2 rounded-xl text-xs font-bold transition-all">
                  Book Upcoming Session
                </button>
              </form>
            </div>

          </div>

          {/* Right Column: Class Bookings, Check-In History, & Google Map Embed */}
          <div className="lg:col-span-1 space-y-8">
            
            {/* Live Interactive Google Map (Bonus: Google Maps) */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm space-y-4">
              <h3 className="font-extrabold text-slate-900 dark:text-white text-base">Favorite Gym Location</h3>
              <div className="rounded-xl overflow-hidden shadow-inner border border-slate-100 dark:border-slate-800">
                <iframe
                  title="AussieFit Location Map"
                  width="100%"
                  height="160"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  src="https://maps.google.com/maps?q=Sydney%20CBD,%20Australia&t=&z=13&ie=UTF8&iwloc=&output=embed"
                ></iframe>
              </div>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 text-center font-bold">
                📍 George St, Sydney NSW 2000, Australia
              </p>
            </div>

            {/* Upcoming Classes */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm space-y-4">
              <h3 className="font-extrabold text-slate-900 dark:text-white text-base">Upcoming Classes</h3>
              {data.upcomingBookings.length === 0 ? (
                <p className="text-xs text-slate-400 py-4 text-center">No classes booked yet.</p>
              ) : (
                <div className="space-y-3">
                  {data.upcomingBookings.map((booking) => (
                    <div key={booking._id} className="p-3.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 rounded-xl">
                      <p className="text-sm font-black text-slate-900 dark:text-white">{booking.className}</p>
                      <p className="text-xs text-slate-400 mt-1">{booking.gymName}</p>
                      <div className="flex justify-between items-center text-[10px] text-emerald-600 dark:text-emerald-400 font-bold mt-2.5">
                        <span>Instructor: {booking.instructor}</span>
                        <span>{new Date(booking.classTime).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Visit Log */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm space-y-4">
              <h3 className="font-extrabold text-slate-900 dark:text-white text-base">Recent Check-In Visits</h3>
              {data.recentVisits.length === 0 ? (
                <p className="text-xs text-slate-400 py-4 text-center">No check-in history found.</p>
              ) : (
                <div className="space-y-3.5">
                  {data.recentVisits.map((visit) => (
                    <div key={visit._id} className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800 last:border-none">
                      <div className="flex items-center space-x-3">
                        <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></div>
                        <div>
                          <p className="text-xs font-bold text-slate-900 dark:text-white">{visit.gymName}</p>
                          <p className="text-[10px] text-slate-400 mt-0.5">
                            {new Date(visit.checkInTime).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} at {new Date(visit.checkInTime).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

        </div>

      </div>

      {/* Simulated QR Code Camera Scanner Modal (Bonus: QR Scanner) */}
      {showScanner && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 text-white rounded-3xl border border-slate-800 p-6 max-w-md w-full text-center relative overflow-hidden shadow-2xl">
            <h3 className="font-black text-lg mb-2">📸 QR Pass Scanner</h3>
            <p className="text-slate-400 text-xs mb-6">Position your dynamic AussieFit QR Pass inside the frame to register a visit.</p>
            
            {/* Viewport Box */}
            <div className="w-64 h-64 mx-auto bg-slate-950 rounded-2xl border-4 border-dashed border-emerald-500/40 relative flex items-center justify-center overflow-hidden">
              {scanning ? (
                <>
                  {/* Bouncing emerald scanning laser */}
                  <div className="absolute inset-x-0 h-1 bg-emerald-500 shadow-md shadow-emerald-400 animate-bounce"></div>
                  <div className="text-center space-y-2 relative z-10">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500 mx-auto"></div>
                    <p className="text-xs font-bold text-emerald-400 tracking-wider uppercase">Decoding Pass...</p>
                  </div>
                </>
              ) : (
                <div className="text-center text-slate-500 p-4">
                  <p className="text-3xl">📳</p>
                  <p className="text-[10px] font-bold uppercase mt-3">Ready for check-in</p>
                </div>
              )}
            </div>

            <div className="flex gap-3 justify-center mt-8">
              <button
                disabled={scanning}
                onClick={() => setShowScanner(false)}
                className="px-4 py-2 border border-slate-700 hover:bg-slate-800 rounded-xl text-xs font-bold text-slate-300 transition-colors disabled:opacity-40"
              >
                Cancel
              </button>
              <button
                disabled={scanning}
                onClick={triggerMockScanner}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all disabled:opacity-50"
              >
                {scanning ? 'Scanning...' : 'Scan Now'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;