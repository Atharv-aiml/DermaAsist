import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Plus, Trash2, Clock, Repeat } from 'lucide-react';

const mockReminders = [
  { id: 'r1', name: 'Apply moisturizer', time: '09:00', repeat: 'daily', isCompleted: false, member: 'Rahul' },
  { id: 'r2', name: 'Apply sunscreen', time: '10:00', repeat: 'daily', isCompleted: true, member: 'Rahul' },
  { id: 'r3', name: 'Apply prescribed cream', time: '20:00', repeat: 'daily', isCompleted: false, member: 'Sunita' },
  { id: 'r4', name: 'Take medication', time: '21:00', repeat: 'daily', isCompleted: false, member: 'Rahul' },
  { id: 'r5', name: 'Follow-up appointment', time: '10:00', repeat: 'once', isCompleted: false, date: '2026-09-13', member: 'Rahul' }
];

export default function RemindersPage() {
  const [reminders, setReminders] = useState(mockReminders);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newReminder, setNewReminder] = useState({ name: '', time: '08:00', repeat: 'daily', member: 'Rahul' });

  const toggleComplete = (id: string) => {
    setReminders(reminders.map(r => r.id === id ? { ...r, isCompleted: !r.isCompleted } : r));
  };

  const deleteReminder = (id: string) => {
    setReminders(reminders.filter(r => r.id !== id));
  };

  const handleAdd = () => {
    const r = {
      id: 'r' + Date.now(),
      name: newReminder.name,
      time: newReminder.time,
      repeat: newReminder.repeat,
      member: newReminder.member,
      isCompleted: false
    };
    setReminders([...reminders, r]);
    setIsAddOpen(false);
    setNewReminder({ name: '', time: '08:00', repeat: 'daily', member: 'Rahul' });
  };

  const todayReminders = reminders.filter(r => r.repeat === 'daily' || r.date === new Date().toISOString().split('T')[0]);
  const upcomingReminders = reminders.filter(r => r.repeat !== 'daily' && r.date !== new Date().toISOString().split('T')[0]);

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4 space-y-8">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">My Routine</h1>
          <p className="text-slate-500">Manage your skincare routine and appointments.</p>
        </div>
        
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="w-4 h-4 mr-2" /> Create Reminder
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Reminder</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Reminder Name</Label>
                <Input value={newReminder.name} onChange={e => setNewReminder({ ...newReminder, name: e.target.value })} placeholder="e.g. Apply sunscreen" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Time</Label>
                  <Input type="time" value={newReminder.time} onChange={e => setNewReminder({ ...newReminder, time: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Repeat</Label>
                  <Select value={newReminder.repeat} onValueChange={v => setNewReminder({ ...newReminder, repeat: v })}>
                    <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="once">Once</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>For Family Member</Label>
                <Select value={newReminder.member} onValueChange={v => setNewReminder({ ...newReminder, member: v })}>
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Rahul">Rahul (Me)</SelectItem>
                    <SelectItem value="Sunita">Sunita</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddOpen(false)}>Cancel</Button>
              <Button onClick={handleAdd} disabled={!newReminder.name} className="bg-purple-600 hover:bg-purple-700">Save Reminder</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-semibold flex items-center gap-2 text-slate-800">
          <Clock className="w-5 h-5 text-teal-600" /> Today's Routine
        </h2>
        
        <div className="space-y-3">
          {todayReminders.sort((a,b) => a.time.localeCompare(b.time)).map(reminder => (
            <Card key={reminder.id} className={`transition-colors ${reminder.isCompleted ? 'bg-slate-50 border-transparent shadow-none' : 'bg-white shadow-sm'}`}>
              <CardContent className="p-4 flex items-center gap-4">
                <Checkbox 
                  checked={reminder.isCompleted} 
                  onCheckedChange={() => toggleComplete(reminder.id)}
                  className="w-6 h-6 rounded-full data-[state=checked]:bg-teal-500 data-[state=checked]:border-teal-500"
                />
                
                <div className={`flex-1 ${reminder.isCompleted ? 'opacity-50' : ''}`}>
                  <h3 className={`font-medium text-lg ${reminder.isCompleted ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                    {reminder.name}
                  </h3>
                  <div className="flex items-center gap-3 mt-1 text-sm text-slate-500">
                    <span className="font-medium text-slate-700">{reminder.time}</span>
                    <span className="flex items-center gap-1"><Repeat className="w-3 h-3"/> {reminder.repeat}</span>
                    <span className="bg-slate-100 px-2 py-0.5 rounded-full text-xs">{reminder.member}</span>
                  </div>
                </div>

                <Button variant="ghost" size="icon" onClick={() => deleteReminder(reminder.id)} className="text-slate-400 hover:text-red-500 hover:bg-red-50">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
          {todayReminders.length === 0 && (
            <div className="text-center py-8 text-slate-500 bg-slate-50 rounded-lg border border-dashed">
              No routines scheduled for today.
            </div>
          )}
        </div>
      </div>

      <div className="space-y-6 pt-6 border-t">
        <h2 className="text-xl font-semibold flex items-center gap-2 text-slate-800">
          <Calendar className="w-5 h-5 text-purple-600" /> Upcoming
        </h2>
        
        <div className="space-y-3">
          {upcomingReminders.map(reminder => (
            <Card key={reminder.id} className="bg-white shadow-sm">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-50 text-purple-700 rounded-lg flex flex-col items-center justify-center font-bold text-sm">
                  {reminder.date ? new Date(reminder.date).getDate() : '-'}
                  <span className="text-[10px] uppercase font-normal">{reminder.date ? new Date(reminder.date).toLocaleString('default', { month: 'short' }) : '-'}</span>
                </div>
                
                <div className="flex-1">
                  <h3 className="font-medium text-slate-900">{reminder.name}</h3>
                  <div className="flex items-center gap-3 mt-1 text-sm text-slate-500">
                    <span className="font-medium text-slate-700">{reminder.time}</span>
                    <span className="bg-slate-100 px-2 py-0.5 rounded-full text-xs">{reminder.member}</span>
                  </div>
                </div>

                <Button variant="ghost" size="icon" onClick={() => deleteReminder(reminder.id)} className="text-slate-400 hover:text-red-500 hover:bg-red-50">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
          {upcomingReminders.length === 0 && (
            <div className="text-center py-8 text-slate-500 bg-slate-50 rounded-lg border border-dashed">
              No upcoming appointments or one-time reminders.
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
