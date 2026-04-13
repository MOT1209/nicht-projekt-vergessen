'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { 
  User, 
  Bell, 
  Shield, 
  Palette,
  LogOut,
  Save,
  Mail,
  CheckCircle2,
  Brain,
  Zap,
  Lock,
  Smartphone,
  Globe,
  Settings
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function SettingsPage() {
  const { user, profile, signOut } = useStore();
  const router = useRouter();
  const [saved, setSaved] = useState(false);

  const [notifications, setNotifications] = useState({
    reminders: true,
    taskUpdates: true,
    weeklyReport: false,
  });

  useEffect(() => {
    const saved = localStorage.getItem('notification-preferences');
    if (saved) {
      try {
        setNotifications(JSON.parse(saved));
      } catch (e) {
        // ignore parse errors
      }
    }
  }, []);

  const displayName = profile?.full_name || user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'المستخدم';
  const displayEmail = user?.email || profile?.email || 'غير متاح';
  const avatarUrl = profile?.avatar_url || user?.user_metadata?.avatar_url || null;

  const handleSignOut = async () => {
    await signOut();
    router.push('/login');
  };

  const handleSave = () => {
    localStorage.setItem('notification-preferences', JSON.stringify(notifications));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="p-4 md:p-8 min-h-screen bg-[#0a0c10] text-right relative overflow-hidden" dir="rtl">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-violet-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-3"
            >
              <Settings className="h-3 w-3 text-blue-400" />
              <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">تخصيص المساحة الخاصة</span>
            </motion.div>
            <h1 className="text-4xl font-black text-white tracking-tight">إعدادات النظام</h1>
            <p className="text-gray-500 mt-2 font-medium">إدارة هويتك الرقمية وتفضيلات الأتمتة</p>
          </div>
          <Button 
            variant="ghost" 
            onClick={handleSignOut}
            className="text-gray-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl px-6 transition-all border border-white/5"
          >
            <LogOut className="h-4 w-4 ml-2" />
            تسجيل الخروج
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Navigation Sidebar (Local to Settings) */}
          <div className="space-y-2">
            {[
              { id: 'profile', label: 'الملف الشخصي', icon: User, active: true },
              { id: 'notifications', label: 'الإشعارات', icon: Bell },
              { id: 'security', label: 'الأمان', icon: Shield },
              { id: 'appearance', label: 'المظهر', icon: Palette },
            ].map((item) => (
              <button
                key={item.id}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all font-bold text-sm ${
                  item.active 
                    ? 'bg-white/5 border border-white/10 text-white shadow-xl' 
                    : 'text-gray-500 hover:text-gray-300 hover:bg-white/[0.02]'
                }`}
              >
                <item.icon className={`h-4 w-4 ${item.active ? 'text-blue-400' : ''}`} />
                {item.label}
              </button>
            ))}
          </div>

          {/* Main Settings Area */}
          <div className="md:col-span-2 space-y-8">
            {/* Profile Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-8 space-y-8"
            >
              <div className="flex items-center gap-6">
                <div className="relative group">
                  <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full scale-0 group-hover:scale-100 transition-transform" />
                  <div className="relative w-24 h-24 rounded-[2rem] overflow-hidden bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center text-white font-black text-3xl shadow-2xl border-2 border-white/10">
                    {avatarUrl ? (
                      <Image
                        src={avatarUrl}
                        alt={displayName}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      displayName.charAt(0).toUpperCase()
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-black text-white">{displayName}</h3>
                  <p className="text-gray-500 font-medium flex items-center gap-2 mt-1">
                    <Mail className="h-3.5 w-3.5" />
                    {displayEmail}
                  </p>
                  <div className="flex gap-2 mt-3">
                    <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-black text-emerald-400 uppercase tracking-tighter">Verified Account</span>
                    <span className="px-2 py-0.5 rounded-md bg-blue-500/10 border border-blue-500/20 text-[10px] font-black text-blue-400 uppercase tracking-tighter italic">Pro Member</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mr-2">الاسم المعروض</label>
                  <Input
                    defaultValue={displayName}
                    readOnly
                    className="bg-white/5 border-white/10 rounded-2xl py-6 text-white text-sm focus:ring-blue-500/20"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mr-2">البريد الإلكتروني</label>
                  <Input
                    type="email"
                    defaultValue={displayEmail}
                    readOnly
                    className="bg-white/5 border-white/10 rounded-2xl py-6 text-white text-sm focus:ring-blue-500/20"
                  />
                </div>
              </div>
            </motion.div>

            {/* Automation & Notifications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card p-8"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="h-10 w-10 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
                  <Zap className="h-5 w-5 text-amber-500" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">الأتمتة والتنبيهات</h3>
                  <p className="text-xs text-gray-500">تحكم في محرك الذكاء الاصطناعي وكيف يعلمك</p>
                </div>
              </div>

              <div className="space-y-6">
                {[
                  { id: 'reminders', title: 'تذكيرات المشاريع الذكية', desc: 'تحليل سلوكك وإرسال تنبيهات عند اكتشاف خمول في الإنتاجية.', icon: Brain },
                  { id: 'taskUpdates', title: 'تحديثات المهام الفورية', desc: 'إشعار عند اكتمال التحليلات أو العمليات الطويلة.', icon: Smartphone },
                  { id: 'weeklyReport', title: 'التقرير الاستراتيجي الأسبوعي', desc: 'تحليل شامل لنشاطك وتوليد خطة عمل للأسبوع القادم.', icon: Globe },
                ].map((pref) => (
                  <div key={pref.id} className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all">
                    <div className="flex items-start gap-4">
                      <div className="p-2 rounded-lg bg-white/5 text-gray-400">
                        <pref.icon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-200 text-sm">{pref.title}</p>
                        <p className="text-[10px] text-gray-500 mt-1 max-w-[250px] leading-relaxed">{pref.desc}</p>
                      </div>
                    </div>
                    <Switch
                      checked={(notifications as any)[pref.id]}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, [pref.id]: checked })}
                    />
                  </div>
                ))}
              </div>

              <Button 
                onClick={handleSave} 
                className={`mt-10 w-full py-7 rounded-2xl font-black transition-all flex items-center justify-center gap-3 ${
                  saved 
                    ? 'bg-emerald-500 text-white shadow-emerald-500/30' 
                    : 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-1'
                }`}
              >
                {saved ? (
                  <>
                    <CheckCircle2 className="h-5 w-5" />
                    تم حفظ التغييرات بنجاح
                  </>
                ) : (
                  <>
                    <Save className="h-5 w-5" />
                    حفظ كافة الإعدادات
                  </>
                )}
              </Button>
            </motion.div>

            {/* Danger Zone */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="p-8 rounded-[2.5rem] border border-rose-500/10 bg-rose-500/[0.02] flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-rose-500/10 flex items-center justify-center border border-rose-500/20">
                  <Shield className="h-6 w-6 text-rose-500" />
                </div>
                <div>
                  <h3 className="text-base font-black text-rose-400 uppercase tracking-widest">تأمين البيانات</h3>
                  <p className="text-xs text-gray-600 font-medium mt-1">احذف مساحة عملك أو عطل حسابك (تحذير: لا يمكن التراجع)</p>
                </div>
              </div>
              <Button 
                variant="outline"
                className="border-rose-500/20 text-rose-500 hover:bg-rose-500/10 rounded-xl px-6 font-bold text-xs"
              >
                تعطيل الحساب
              </Button>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
}
