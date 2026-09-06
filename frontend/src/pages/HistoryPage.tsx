import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Calendar, ChevronRight, LayoutList, GripVertical } from 'lucide-react';

const mockHistory = [
  { id: 'a1', date: '2026-09-01', bodyArea: 'Left Arm', symptom: 'Redness, Itching', condition: 'Contact Dermatitis', confidence: 78, severity: 'moderate', status: 'completed', member: 'Rahul' },
  { id: 'a2', date: '2026-08-22', bodyArea: 'Back', symptom: 'Dryness, Scaling', condition: 'Eczema', confidence: 85, severity: 'mild', status: 'completed', member: 'Rahul' },
  { id: 'a3', date: '2026-08-05', bodyArea: 'Feet', symptom: 'Itching, Scaling', condition: 'Fungal Infection', confidence: 72, severity: 'moderate', status: 'completed', member: 'Rahul' },
  { id: 'a4', date: '2026-08-28', bodyArea: 'Scalp', symptom: 'Scaling, Redness', condition: 'Psoriasis', confidence: 81, severity: 'moderate', status: 'completed', member: 'Sunita' }
];

export default function HistoryPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'timeline'>('list');

  const severityColors: Record<string, string> = {
    mild: 'bg-green-100 text-green-800 border-green-200',
    moderate: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    severe: 'bg-red-100 text-red-800 border-red-200'
  };

  const filteredHistory = mockHistory.filter(h => 
    h.condition.toLowerCase().includes(searchTerm.toLowerCase()) || 
    h.symptom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    h.bodyArea.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container max-w-5xl mx-auto py-8 px-4 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Assessment History</h1>
          <p className="text-slate-500">View past skin condition assessments and reports.</p>
        </div>
        <Button onClick={() => navigate('/assessment/new')} className="bg-teal-600 hover:bg-teal-700">
          New Assessment
        </Button>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input 
            placeholder="Search conditions, symptoms, body area..." 
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[140px]"><SelectValue placeholder="Family Member" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Members</SelectItem>
              <SelectItem value="rahul">Rahul</SelectItem>
              <SelectItem value="sunita">Sunita</SelectItem>
            </SelectContent>
          </Select>
          <div className="border rounded-md flex p-1 bg-slate-50">
            <Button variant={viewMode === 'list' ? 'secondary' : 'ghost'} size="icon" className="h-8 w-8" onClick={() => setViewMode('list')}>
              <LayoutList className="w-4 h-4" />
            </Button>
            <Button variant={viewMode === 'timeline' ? 'secondary' : 'ghost'} size="icon" className="h-8 w-8" onClick={() => setViewMode('timeline')}>
              <GripVertical className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {viewMode === 'list' ? (
        <div className="space-y-4">
          {filteredHistory.map((item) => (
            <Card key={item.id} className="hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-teal-500" onClick={() => navigate(`/assessment/${item.id}/results`)}>
              <CardContent className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="flex gap-4 items-start sm:items-center">
                  <div className="w-14 h-14 bg-teal-50 rounded-lg flex flex-col items-center justify-center text-teal-800 flex-shrink-0">
                    <span className="text-lg font-bold leading-none">{new Date(item.date).getDate()}</span>
                    <span className="text-xs uppercase mt-1">{new Date(item.date).toLocaleString('default', { month: 'short' })}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-lg text-slate-900">{item.condition}</h3>
                      <Badge variant="outline" className={severityColors[item.severity]}>
                        {item.severity}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-500">{item.bodyArea} • {item.symptom}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="secondary" className="text-xs">{item.member}</Badge>
                      <span className="text-xs text-slate-400">{item.confidence}% confidence</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center text-teal-600 font-medium text-sm self-end sm:self-auto">
                  View Report <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </CardContent>
            </Card>
          ))}
          {filteredHistory.length === 0 && (
            <div className="text-center py-12 text-slate-500">
              No assessments found matching your search.
            </div>
          )}
        </div>
      ) : (
        <div className="relative border-l-2 border-slate-200 ml-6 pl-6 space-y-8 py-4">
          {filteredHistory.map((item) => (
            <div key={item.id} className="relative">
              <div className="absolute -left-[35px] top-4 w-4 h-4 rounded-full bg-teal-500 border-4 border-white shadow-sm"></div>
              <Card className="hover:shadow-md cursor-pointer" onClick={() => navigate(`/assessment/${item.id}/results`)}>
                <CardContent className="p-4">
                  <div className="text-xs text-slate-400 font-medium flex items-center mb-2">
                    <Calendar className="w-3 h-3 mr-1" />
                    {new Date(item.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
                  <h3 className="font-bold text-slate-900">{item.condition}</h3>
                  <p className="text-sm text-slate-600 mt-1">{item.symptom} on {item.bodyArea}</p>
                  <div className="flex gap-2 mt-3">
                    <Badge variant="outline" className={severityColors[item.severity]}>{item.severity}</Badge>
                    <Badge variant="secondary">{item.member}</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
