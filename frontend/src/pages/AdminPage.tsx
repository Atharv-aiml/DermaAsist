import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Activity, BrainCircuit, AlertTriangle, ShieldCheck, Database, TrendingUp, Server } from 'lucide-react';

export default function AdminPage() {
  const stats = [
    { label: 'Total Users', value: '152', icon: Users, color: 'text-blue-600', bg: 'bg-blue-100', trend: '+12% this week' },
    { label: 'Total Assessments', value: '487', icon: Activity, color: 'text-teal-600', bg: 'bg-teal-100', trend: '+24% this week' },
    { label: 'Success Rate', value: '94.2%', icon: ShieldCheck, color: 'text-green-600', bg: 'bg-green-100', trend: 'Stable' },
    { label: 'Low Confidence', value: '12', icon: AlertTriangle, color: 'text-orange-600', bg: 'bg-orange-100', trend: '-2 cases' }
  ];

  return (
    <div className="container max-w-6xl mx-auto py-8 px-4 space-y-8">
      
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
        <p className="text-slate-500">System overview and AI model management.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-1">{stat.label}</p>
                  <h3 className="text-3xl font-bold text-slate-900">{stat.value}</h3>
                </div>
                <div className={`p-3 rounded-lg ${stat.bg} ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-slate-500">
                <TrendingUp className="w-4 h-4 mr-1 text-green-500" />
                {stat.trend}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Model Info */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BrainCircuit className="w-5 h-5 text-purple-600" /> AI Model Information
            </CardTitle>
            <CardDescription>Current configuration of the active diagnostic model.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm">
                <div>
                  <p className="text-slate-500 mb-1">Model Name</p>
                  <p className="font-semibold text-slate-900">DermaAsist Mock Model</p>
                </div>
                <div>
                  <p className="text-slate-500 mb-1">Version</p>
                  <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">mock-v1.0</Badge>
                </div>
                <div>
                  <p className="text-slate-500 mb-1">Provider</p>
                  <p className="font-medium text-slate-900">Internal Mock Service</p>
                </div>
                <div>
                  <p className="text-slate-500 mb-1">Status</p>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-none">Active</Badge>
                </div>
                <div className="col-span-2 bg-slate-50 p-3 rounded-md border border-slate-100 mt-2">
                  <p className="text-slate-500 mb-1 flex items-center gap-1"><Database className="w-4 h-4"/> Dataset Information</p>
                  <p className="font-medium text-slate-800">Demo/development mock model — not trained on real data.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Health */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="w-5 h-5 text-blue-600" /> System Health
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center p-3 border rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="font-medium">API Service</span>
              </div>
              <span className="text-sm text-slate-500">99.9% uptime</span>
            </div>
            <div className="flex justify-between items-center p-3 border rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="font-medium">Database</span>
              </div>
              <span className="text-sm text-slate-500">12ms latency</span>
            </div>
            <div className="flex justify-between items-center p-3 border rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="font-medium">AI Service</span>
              </div>
              <span className="text-sm text-slate-500">Mock active</span>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
