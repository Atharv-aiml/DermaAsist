import api from './api';
import { Reminder } from '@/types';

export const reminderService = {
  getReminders: async (): Promise<Reminder[]> => {
    const res = await api.get('/reminders');
    return res.data.data;
  },
  createReminder: async (reminder: Partial<Reminder>): Promise<Reminder> => {
    const res = await api.post('/reminders', reminder);
    return res.data.data;
  },
  toggleCompletion: async (id: string, date: string): Promise<void> => {
    await api.post(`/reminders/${id}/complete`, { date });
  }
};
