import {
  CheckCircle2,
  Clock,
  MapPin,
  MessageSquare,
  Navigation,
  PhoneCall,
  Send,
  ShieldCheck,
  ShoppingBag,
  Star,
  Truck,
  X
} from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { MOCK_DRIVERS } from '../data/mockData';
import { useStore } from '../store/useStore';

export const OrderTrackingPage: React.FC = () => {
  const { activeOrderId, orders, user, addNotification } = useStore();
  const currentOrder = orders.find((o) => o.id === activeOrderId) || orders[0];
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { sender: 'driver', text: 'Hello! I have picked up your order from L’Atelier du Truffle. On my way now!' },
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const driver = currentOrder?.driver || MOCK_DRIVERS[0];

  // Canvas map animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let progress = 0.35; // start 35% along route

    const renderMap = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Map background (Dark aesthetic canvas)
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw Grid / Street lines
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Route coordinates (Restaurant to Customer house)
      const restX = 80;
      const restY = 220;
      const custX = canvas.width - 80;
      const custY = 80;

      // Draw Route Path (Curve)
      ctx.beginPath();
      ctx.moveTo(restX, restY);
      ctx.quadraticCurveTo(canvas.width / 2, canvas.height - 40, custX, custY);
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 8;
      ctx.lineCap = 'round';
      ctx.stroke();

      // Active Glow Route
      ctx.beginPath();
      ctx.moveTo(restX, restY);
      ctx.quadraticCurveTo(canvas.width / 2, canvas.height - 40, custX, custY);
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 4;
      ctx.setLineDash([8, 8]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Restaurant Pin Marker
      ctx.fillStyle = '#f43f5e';
      ctx.beginPath();
      ctx.arc(restX, restY, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 10px sans-serif';
      ctx.fillText('🍳 Kitchen', restX - 25, restY + 28);

      // Customer Pin Marker
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.arc(custX, custY, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 10px sans-serif';
      ctx.fillText('🏠 Destination', custX - 30, custY + 28);

      // Animate Moving Driver Marker
      progress += 0.0008;
      if (progress > 0.95) progress = 0.35; // Loop animation

      // Quadratic bezier curve point calculations
      const t = progress;
      const cx = canvas.width / 2;
      const cy = canvas.height - 40;

      const currentX = (1 - t) * (1 - t) * restX + 2 * (1 - t) * t * cx + t * t * custX;
      const currentY = (1 - t) * (1 - t) * restY + 2 * (1 - t) * t * cy + t * t * custY;

      // Driver Pulse Ring
      ctx.fillStyle = 'rgba(245, 158, 11, 0.3)';
      ctx.beginPath();
      ctx.arc(currentX, currentY, 20 + Math.sin(Date.now() / 200) * 4, 0, Math.PI * 2);
      ctx.fill();

      // Driver Circle
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(currentX, currentY, 14, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#0f172a';
      ctx.font = '12px sans-serif';
      ctx.fillText('🛵', currentX - 6, currentY + 4);

      animationFrameId = requestAnimationFrame(renderMap);
    };

    renderMap();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage) return;

    setChatMessages((prev) => [...prev, { sender: 'user', text: inputMessage }]);
    setInputMessage('');

    // Simulate driver quick reply
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        { sender: 'driver', text: 'Got it! I am just 2 minutes away.' },
      ]);
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pb-16">
      
      {/* Header & Status Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-slate-800 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-extrabold text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>Live GPS Thermal Tracking</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-serif">Order #{currentOrder?.id || 'ORD_982341'}</h1>
          <p className="text-xs text-slate-400">Estimated Delivery Arrival in {currentOrder?.estimatedArrivalMinutes || 18} minutes</p>
        </div>

        <div className="text-center px-6 py-3 rounded-2xl bg-amber-500/10 border border-amber-500/30">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Estimated Delivery</span>
          <span className="text-2xl font-black text-amber-400 font-mono">{currentOrder?.estimatedArrivalMinutes || 18} MINS</span>
        </div>
      </div>

      {/* Stage Timeline */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-md">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          {[
            { step: '1', title: 'Order Confirmed', time: '7:02 PM', done: true },
            { step: '2', title: 'Chef Preparing', time: '7:05 PM', done: true },
            { step: '3', title: 'Rider Dispatched', time: '7:14 PM', done: true },
            { step: '4', title: 'Delivered', time: '7:28 PM', done: false },
          ].map((s, idx) => (
            <div key={idx} className="space-y-1 relative">
              <div
                className={`w-10 h-10 mx-auto rounded-2xl flex items-center justify-center font-bold text-xs ${
                  s.done ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                }`}
              >
                {s.done ? <CheckCircle2 className="w-5 h-5" /> : s.step}
              </div>
              <h4 className="font-bold text-xs text-slate-900 dark:text-white pt-1">{s.title}</h4>
              <span className="text-[10px] text-slate-400 block">{s.time}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Live Canvas Map (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-800 h-96">
            <canvas ref={canvasRef} width={700} height={384} className="w-full h-full object-cover"></canvas>
            
            <div className="absolute top-4 left-4 p-3 rounded-2xl bg-slate-950/80 backdrop-blur-md text-white text-xs border border-white/10 space-y-0.5">
              <span className="font-bold block text-amber-400">Rider Speed: 32 km/h</span>
              <span className="text-[10px] text-slate-400">Thermal Bag Temp: 68°C Optimal</span>
            </div>
          </div>
        </div>

        {/* Driver Profile & Chat Card */}
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-md space-y-4">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Assigned Rider</span>
            
            <div className="flex items-center gap-3">
              <img src={driver.avatar} alt={driver.name} className="w-12 h-12 rounded-2xl object-cover ring-2 ring-amber-500/50" />
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">{driver.name}</h4>
                <div className="flex items-center gap-1 text-xs text-amber-500 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-500" />
                  <span>{driver.rating}</span>
                  <span className="text-slate-400 font-normal">({driver.vehicleNumber})</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => addNotification('Calling Rider', `Dialing ${driver.phone}...`)}
                className="py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <PhoneCall className="w-3.5 h-3.5 text-amber-500" />
                <span>Call Rider</span>
              </button>

              <button
                onClick={() => setChatOpen(true)}
                className="py-2.5 rounded-xl bg-amber-500 text-slate-950 font-extrabold text-xs shadow-md hover:bg-amber-400 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Live Chat</span>
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Live Chat Drawer */}
      {chatOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-md">
          <div className="bg-white dark:bg-slate-900 w-full max-w-sm h-full flex flex-col shadow-2xl">
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src={driver.avatar} alt={driver.name} className="w-8 h-8 rounded-full object-cover" />
                <span className="font-bold text-xs text-slate-900 dark:text-white">{driver.name} (Rider)</span>
              </div>
              <button onClick={() => setChatOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`p-3 rounded-2xl max-w-[80%] ${
                    msg.sender === 'user' ? 'bg-amber-500 text-slate-950 font-medium' : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-100 dark:border-slate-800 flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Message driver..."
                className="flex-1 px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none"
              />
              <button type="submit" className="p-2 rounded-xl bg-amber-500 text-slate-950">
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
