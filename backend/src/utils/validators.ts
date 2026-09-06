import { z } from 'zod';

export const registerSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    fullName: z.string().min(2, 'Name must be at least 2 characters'),
    phone: z.string().optional(),
    dateOfBirth: z.string().optional(),
    gender: z.string().optional(),
    preferredLanguage: z.enum(['en', 'hi']).optional(),
    city: z.string().optional(),
    state: z.string().optional(),
  })
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(1, 'Password is required'),
  })
});

export const profileUpdateSchema = z.object({
  body: z.object({
    fullName: z.string().min(2).optional(),
    phone: z.string().optional(),
    dateOfBirth: z.string().optional(),
    gender: z.string().optional(),
    preferredLanguage: z.enum(['en', 'hi']).optional(),
    city: z.string().optional(),
    state: z.string().optional(),
  })
});

export const changePasswordSchema = z.object({
  body: z.object({
    oldPassword: z.string().min(1),
    newPassword: z.string().min(6),
  })
});

export const forgotPasswordSchema = z.object({
  body: z.object({
    email: z.string().email(),
  })
});

export const resetPasswordSchema = z.object({
  body: z.object({
    token: z.string().min(1),
    newPassword: z.string().min(6),
  })
});

export const assessmentCreateSchema = z.object({
  body: z.object({
    familyMemberId: z.string().uuid().optional(),
    bodyArea: z.string().optional(),
  })
});

export const questionnaireSchema = z.object({
  body: z.object({
    answers: z.record(z.any()),
    freeTextDescription: z.string().optional(),
    language: z.enum(['en', 'hi']).optional(),
  })
});

export const familyCreateSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Family name must be at least 2 characters'),
  })
});

export const familyMemberSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    age: z.number().int().min(0).max(120),
    gender: z.string(),
    relationship: z.string(),
  })
});

export const reminderCreateSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Reminder name is required'),
    description: z.string().optional(),
    reminderTime: z.string(),
    repeatSchedule: z.enum(['daily', 'weekly', 'custom', 'once']),
    startDate: z.string(),
    endDate: z.string().optional(),
    familyMemberId: z.string().uuid().optional(),
  })
});

export const reminderUpdateSchema = z.object({
  body: z.object({
    name: z.string().min(1).optional(),
    description: z.string().optional(),
    reminderTime: z.string().optional(),
    repeatSchedule: z.enum(['daily', 'weekly', 'custom', 'once']).optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    isActive: z.boolean().optional(),
    familyMemberId: z.string().uuid().optional(),
  })
});
