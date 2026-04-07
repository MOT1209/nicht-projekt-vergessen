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
  CheckCircle2
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

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
    <div className="p-8 max-w-3xl">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">الإعدادات</h1>
        <p className="text-gray-500 mt-1">إدارة حسابك وتفضيلاتك</p>
      </div>

      <div className="space-y-6">
        {/* Profile */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              الملف الشخصي
            </CardTitle>
            <CardDescription>معلومات حسابك الحالي</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Avatar */}
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-xl border-2 border-purple-200">
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
              <div>
                <p className="font-semibold text-gray-900">{displayName}</p>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <Mail className="h-3 w-3" />
                  {displayEmail}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">الاسم</label>
                <Input
                  defaultValue={displayName}
                  readOnly
                  className="bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">البريد الإلكتروني</label>
                <Input
                  type="email"
                  defaultValue={displayEmail}
                  readOnly
                  className="bg-gray-50"
                />
              </div>
            </div>
            <p className="text-xs text-gray-400">يتم إدارة بياناتك عبر حساب جوجل</p>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              الإشعارات
            </CardTitle>
            <CardDescription>تحكم في الإشعارات التي تتلقاها</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">تذكيرات المشاريع</p>
                <p className="text-sm text-gray-500">تذكير عند عدم العمل على مشروع لفترة</p>
              </div>
              <Switch
                checked={notifications.reminders}
                onChange={(e) => setNotifications({ ...notifications, reminders: e.target.checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">تحديثات المهام</p>
                <p className="text-sm text-gray-500">الإشعارات عند إضافة أو تحديث المهام</p>
              </div>
              <Switch
                checked={notifications.taskUpdates}
                onChange={(e) => setNotifications({ ...notifications, taskUpdates: e.target.checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">التقرير الأسبوعي</p>
                <p className="text-sm text-gray-500">ملخص أسبوعي لنشاطاتك</p>
              </div>
              <Switch
                checked={notifications.weeklyReport}
                onChange={(e) => setNotifications({ ...notifications, weeklyReport: e.target.checked })}
              />
            </div>
            <Button onClick={handleSave} className="mt-2">
              {saved ? (
                <>
                  <CheckCircle2 className="h-4 w-4 ml-2 text-green-400" />
                  تم الحفظ!
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 ml-2" />
                  حفظ التفضيلات
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Appearance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              المظهر
            </CardTitle>
            <CardDescription>تخصيص مظهر التطبيق</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-gray-900 border-2 border-violet-500" />
                <span className="text-sm">داكن</span>
              </div>
              <div className="flex items-center gap-2 opacity-50">
                <div className="w-10 h-10 rounded-lg bg-white border border-gray-300" />
                <span className="text-sm">فاتح (قريباً)</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600">
              <Shield className="h-5 w-5" />
              منطقة الخطر
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">تسجيل الخروج</p>
                <p className="text-sm text-gray-500">تسجيل الخروج من حسابك</p>
              </div>
              <Button variant="danger" onClick={handleSignOut}>
                <LogOut className="h-4 w-4 ml-2" />
                تسجيل الخروج
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
