import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Shield, Trash2, Clock } from 'lucide-react';

const mockFamily = {
  id: 'fam-1',
  name: 'Sharma Family',
  members: [
    { id: 'm1', name: 'Rahul Sharma', age: 28, gender: 'Male', relationship: 'me', isAuthorized: true, assessmentCount: 3, lastCheck: '2026-09-01' },
    { id: 'm2', name: 'Sunita Sharma', age: 55, gender: 'Female', relationship: 'mother', isAuthorized: true, assessmentCount: 1, lastCheck: '2026-08-28' },
    { id: 'm3', name: 'Rajesh Sharma', age: 58, gender: 'Male', relationship: 'father', isAuthorized: true, assessmentCount: 0, lastCheck: null },
    { id: 'm4', name: 'Priya Sharma', age: 24, gender: 'Female', relationship: 'sister', isAuthorized: false, assessmentCount: 0, lastCheck: null }
  ]
};

export default function FamilyPage() {
  const [family, setFamily] = useState(mockFamily);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newMember, setNewMember] = useState({ name: '', age: '', gender: '', relationship: '' });

  const handleAddMember = () => {
    if (family.members.length >= 4 && family.members.length !== 0) return; // mock check
    const member = {
      id: 'm' + Date.now(),
      name: newMember.name,
      age: parseInt(newMember.age),
      gender: newMember.gender,
      relationship: newMember.relationship,
      isAuthorized: false,
      assessmentCount: 0,
      lastCheck: null
    };
    setFamily({ ...family, members: [...family.members, member] });
    setIsAddOpen(false);
    setNewMember({ name: '', age: '', gender: '', relationship: '' });
  };

  const removeMember = (id: string) => {
    setFamily({ ...family, members: family.members.filter(m => m.id !== id) });
  };

  const toggleAuth = (id: string) => {
    setFamily({
      ...family,
      members: family.members.map(m => m.id === id ? { ...m, isAuthorized: !m.isAuthorized } : m)
    });
  };

  return (
    <div className="container max-w-6xl mx-auto py-8 px-4 space-y-8">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">{family.name}</h1>
          <p className="text-slate-500">Manage health profiles for your loved ones.</p>
        </div>
        
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button className="bg-teal-600 hover:bg-teal-700">
              <Plus className="w-4 h-4 mr-2" /> Add Member
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Family Member</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              {family.members.length >= 6 ? (
                <div className="text-red-500 bg-red-50 p-3 rounded-md">Maximum family members limit reached.</div>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <Input value={newMember.name} onChange={e => setNewMember({ ...newMember, name: e.target.value })} placeholder="e.g. Amit Kumar" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Age</Label>
                      <Input type="number" value={newMember.age} onChange={e => setNewMember({ ...newMember, age: e.target.value })} placeholder="Years" />
                    </div>
                    <div className="space-y-2">
                      <Label>Gender</Label>
                      <Select onValueChange={v => setNewMember({ ...newMember, gender: v })}>
                        <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Relationship</Label>
                    <Select onValueChange={v => setNewMember({ ...newMember, relationship: v })}>
                      <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="spouse">Spouse</SelectItem>
                        <SelectItem value="child">Child</SelectItem>
                        <SelectItem value="parent">Parent</SelectItem>
                        <SelectItem value="sibling">Sibling</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddOpen(false)}>Cancel</Button>
              <Button onClick={handleAddMember} disabled={family.members.length >= 6 || !newMember.name || !newMember.age}>Save Member</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {family.members.map((member) => (
          <Card key={member.id} className="overflow-hidden hover:shadow-md transition-shadow relative">
            <CardHeader className="pb-4 bg-slate-50 border-b">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                    <AvatarFallback className="bg-teal-100 text-teal-700 font-bold">
                      {member.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{member.name}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs bg-white">{member.relationship}</Badge>
                      <span className="text-xs text-slate-500">{member.age} yrs • {member.gender}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="py-4 space-y-4">
              <div className="flex justify-between text-sm border-b pb-4 border-slate-100">
                <div className="flex flex-col items-center">
                  <span className="font-bold text-slate-700 text-lg">{member.assessmentCount}</span>
                  <span className="text-slate-500">Assessments</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-semibold text-slate-700 flex items-center gap-1 mt-1">
                    <Clock className="w-4 h-4 text-slate-400"/>
                    {member.lastCheck ? new Date(member.lastCheck).toLocaleDateString() : 'Never'}
                  </span>
                  <span className="text-slate-500">Last Check</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shield className={`w-4 h-4 ${member.isAuthorized ? 'text-green-500' : 'text-slate-400'}`} />
                  <div className="text-sm">
                    <p className="font-medium">Account Access</p>
                    <p className="text-xs text-slate-500">Allow member to view records</p>
                  </div>
                </div>
                <Switch checked={member.isAuthorized} onCheckedChange={() => toggleAuth(member.id)} />
              </div>
            </CardContent>
            <CardFooter className="bg-slate-50 border-t flex gap-2">
              <Button variant="outline" className="flex-1 text-sm h-9">View History</Button>
              {member.relationship !== 'me' && (
                <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700 hover:bg-red-50 h-9 w-9" onClick={() => removeMember(member.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>

    </div>
  );
}
