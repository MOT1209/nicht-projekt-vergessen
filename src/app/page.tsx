'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Brain, Zap, Shield, Globe, Rocket, ArrowRight, Github } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0a0c10] text-white overflow-hidden relative selection:bg-blue-500/30" dir="rtl">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] bg-violet-600/10 blur-[120px] rounded-full animate-pulse delay-700" />
        <div className="absolute -bottom-[10%] left-[20%] w-[40%] h-[40%] bg-emerald-600/10 blur-[120px] rounded-full animate-pulse delay-1000" />
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 backdrop-blur-md border-b border-white/5 bg-[#0a0c10]/50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.3)]">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-l from-white to-gray-400 italic tracking-tighter">
              PROJECT MEMORY AI
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link 
              href="/register"
              className="px-6 py-2.5 rounded-full bg-white text-[#0a0c10] text-sm font-black hover:bg-gray-200 transition-all active:scale-95 text-center min-w-[120px]"
            >
              تسجيل
            </Link>
            <Link 
              href="/dashboard"
              className="px-6 py-2.5 rounded-full bg-blue-600 text-white text-sm font-black shadow-[0_4px_15px_rgba(37,99,235,0.3)] hover:bg-blue-500 hover:shadow-blue-500/40 transition-all active:scale-95 text-center min-w-[120px]"
            >
              دخول
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative z-10 pt-44 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8"
          >
            <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">مستقبل إدارة المشاريع هنا</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-gray-500"
          >
            المنصة الذكية المتكاملة <br /> لإدارة مشاريعك الإبداعية
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-12"
          >
            استخدم قوة الذكاء الاصطناعي في تحليل الأكواد، كتابة المقالات، توليد الصور، وتنسيق المهام في مكان واحد فاخر وذكي.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link 
              href="/register"
              className="group relative px-10 py-5 rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 text-white font-black text-lg shadow-[0_10px_30px_rgba(37,99,235,0.4)] hover:shadow-blue-500/60 transition-all hover:-translate-y-1 overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-center gap-3 relative z-10">
                <span>ابدأ رحلتك الآن</span>
                <Rocket className="h-5 w-5" />
              </div>
            </Link>
            <Link 
              href="/dashboard"
              className="px-10 py-5 rounded-2xl bg-white/5 border border-white/10 text-white font-black text-lg hover:bg-white/10 transition-all backdrop-blur-xl"
            >
              استعراض الميزات
            </Link>
          </motion.div>
        </div>
      </header>

      {/* Features Grid */}
      <section className="relative z-10 py-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Zap, title: "سرعة البرق", text: "تحليلات فورية بذكاء Gemini برو المدمج." },
            { icon: Shield, title: "أمان مطلق", text: "تشفير كامل وحماية متقدمة لبيانات مشروعك." },
            { icon: Globe, title: "وصول عالمي", text: "دبلجة، ترجمة، ونشر المحتوى للجمهور العالمي." }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/[0.07] transition-all group"
            >
              <div className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <feature.icon className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Floating Elements Animation Component could be added here */}
      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] z-0 opacity-20 pointer-events-none">
         <div className="relative w-full h-full">
            <motion.div 
               animate={{ y: [0, -20, 0] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               className="absolute top-10 left-20 p-4 rounded-2xl bg-blue-500/20 border border-blue-500/30 backdrop-blur-xl"
            >
               <Brain className="h-8 w-8 text-blue-400" />
            </motion.div>
            <motion.div 
               animate={{ y: [0, 20, 0] }}
               transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
               className="absolute top-40 right-40 p-4 rounded-2xl bg-violet-500/20 border border-violet-500/30 backdrop-blur-xl"
            >
               <Zap className="h-8 w-8 text-violet-400" />
            </motion.div>
         </div>
      </div>
    </div>
  );
}
