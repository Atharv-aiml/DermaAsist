import api from './api';
import { Family, FamilyMember } from '@/types';

export const familyService = {
  getFamily: async (): Promise<Family> => {
    const res = await api.get('/family');
    return res.data.data;
  },
  addMember: async (member: Partial<FamilyMember>): Promise<FamilyMember> => {
    const res = await api.post('/family/members', member);
    return res.data.data;
  },
  removeMember: async (id: string): Promise<void> => {
    await api.delete(`/family/members/${id}`);
  }
};
