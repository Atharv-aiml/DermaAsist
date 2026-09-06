import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { User, Bell, Shield, Key } from 'lucide-react';

export default function ProfilePage() {
  return (
    <div className="container max-w-4xl mx-auto py-8 px-4 space-y-8">
      
      <div className="flex items-center gap-4 mb-8">
        <Avatar className="w-20 h-20 border-4 border-white shadow-lg">
          <AvatarFallback className="bg-teal-600 text-white text-2xl">RS</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Rahul Sharma</h1>
          <p className="text-slate-500">rahul.sharma@example.com</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Column - Nav */}
        <div className="space-y-2">
          <Button variant="secondary" className="w-full justify-start font-medium bg-teal-50 text-teal-700 hover:bg-teal-100">
            <User className="w-4 h-4 mr-2" /> Personal Info
          </Button>
          <Button variant="ghost" className="w-full justify-start text-slate-600 hover:bg-slate-100">
            <Key className="w-4 h-4 mr-2" /> Security
          </Button>
          <Button variant="ghost" className="w-full justify-start text-slate-600 hover:bg-slate-100">
            <Bell className="w-4 h-4 mr-2" /> Preferences
          </Button>
          <Button variant="ghost" className="w-full justify-start text-slate-600 hover:bg-slate-100">
            <Shield className="w-4 h-4 mr-2" /> Privacy & Data
          </Button>
        </div>

        {/* Right Column - Content */}
        <div className="md:col-span-2 space-y-6">
          
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your basic profile details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input defaultValue="Rahul Sharma" />
                </div>
                <div className="space-y-2">
                  <Label>Email Address</Label>
                  <Input defaultValue="rahul.sharma@example.com" readOnly className="bg-slate-50 text-slate-500" />
                </div>
                <div className="space-y-2">
                  <Label>Phone Number</Label>
                  <Input defaultValue="+91 98765 43210" />
                </div>
                <div className="space-y-2">
                  <Label>Date of Birth</Label>
                  <Input type="date" defaultValue="1998-05-15" />
                </div>
                <div className="space-y-2">
                  <Label>City</Label>
                  <Input defaultValue="Mumbai" />
                </div>
                <div className="space-y-2">
                  <Label>Gender</Label>
                  <Select defaultValue="male">
                    <SelectTrigger><SelectValue/></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end border-t pt-4">
              <Button className="bg-teal-600 hover:bg-teal-700">Save Changes</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>App Language</Label>
                <Select defaultValue="en">
                  <SelectTrigger className="max-w-[200px]"><SelectValue/></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="hi">हिंदी (Hindi)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Separator />
              <div className="space-y-4">
                <h4 className="font-medium text-sm text-slate-900">Notifications</h4>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base font-normal">Push Notifications</Label>
                    <p className="text-sm text-slate-500">Receive alerts on your device.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base font-normal">Email Updates</Label>
                    <p className="text-sm text-slate-500">Receive weekly summaries and tips.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-100">
            <CardHeader>
              <CardTitle className="text-red-600">Danger Zone</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Export Data</h4>
                  <p className="text-sm text-slate-500">Download all your assessment history.</p>
                </div>
                <Button variant="outline">Export Data</Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-red-600">Delete Account</h4>
                  <p className="text-sm text-slate-500">Permanently delete your account and all data.</p>
                </div>
                <Button variant="destructive">Delete Account</Button>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
