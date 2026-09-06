import api from './api';

export const assessmentService = {
  createAssessment: async (familyMemberId?: string, questionnaireData?: any, bodyArea?: string) => {
    const res = await api.post('/assessments', { familyMemberId, questionnaire: questionnaireData, bodyArea });
    return res.data;
  },
  uploadImage: async (id: string, file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    const res = await api.post(`/assessments/${id}/image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return res.data;
  },
  submitQuestionnaire: async (id: string, answers: any, freeTextDescription?: string, language?: string) => {
    const res = await api.post(`/assessments/${id}/questionnaire`, { answers, freeTextDescription, language });
    return res.data;
  },
  runAnalysis: async (id: string) => {
    const res = await api.post(`/assessments/${id}/analyze`);
    return res.data;
  },
  getResults: async (id: string) => {
    const res = await api.get(`/assessments/${id}`);
    return res.data.data;
  },
  getUserAssessments: async (memberId?: string, severity?: string) => {
    const params = new URLSearchParams();
    if (memberId) params.append('memberId', memberId);
    if (severity) params.append('severity', severity);
    const res = await api.get(`/assessments?${params.toString()}`);
    return res.data.data;
  }
};
