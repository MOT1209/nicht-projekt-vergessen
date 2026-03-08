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
  Database,
  LogOut,
  Save
} from 'lucide-react';
import { useState } from 'react';

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    reminders: true,
    taskUpdates: true,
    weeklyReport: false,
  });

  const [profile, setProfile] = useState({
    name: 'المستخدم',
    email: 'user@example.com',
  });

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
            <CardDescription>معلومات حسابك</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">الاسم</label>
                <Input
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">البريد الإلكتروني</label>
                <Input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                />
              </div>
            </div>
            <Button>
              <Save className="h-4 w-4 ml-2" />
              حفظ التغييرات
            </Button>
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
                onCheckedChange={(checked) => setNotifications({ ...notifications, reminders: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">تحديثات المهام</p>
                <p className="text-sm text-gray-500">الإشعارات عند إضافة أو تحديث المهام</p>
              </div>
              <Switch
                checked={notifications.taskUpdates}
                onCheckedChange={(checked) => setNotifications({ ...notifications, taskUpdates: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">التقرير الأسبوعي</p>
                <p className="text-sm text-gray-500">ملخص أسبوعي لنشاطاتك</p>
              </div>
              <Switch
                checked={notifications.weeklyReport}
                onCheckedChange={(checked) => setNotifications({ ...notifications, weeklyReport: checked })}
              />
            </div>
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

        {/* Database */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              قاعدة البيانات
            </CardTitle>
            <CardDescription>إدارة الاتصال بقاعدة البيانات</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-amber-800 font-medium">قيد الإعداد</p>
              <p className="text-sm text-amber-700 mt-1">
                قم بإعداد Supabase لتخزين بياناتك بشكل دائم
              </p>
              <Button variant="outline" className="mt-3">
                إعداد Supabase
              </Button>
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
              <Button variant="danger">
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
