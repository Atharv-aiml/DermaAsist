import { prisma } from '../lib/prisma';
import { NotFoundError } from '../utils/errors';

export class ReminderService {
  async createReminder(userId: string, data: any) {
    return prisma.routineReminder.create({
      data: {
        userId,
        ...data,
        startDate: new Date(data.startDate)
      }
    });
  }

  async getReminders(userId: string) {
    return prisma.routineReminder.findMany({
      where: { userId },
      include: { completions: true }
    });
  }

  async toggleCompletion(userId: string, reminderId: string, dateStr: string) {
    const reminder = await prisma.routineReminder.findFirst({
      where: { id: reminderId, userId }
    });
    if (!reminder) throw new NotFoundError('Reminder not found');

    const completionDate = new Date(dateStr);
    completionDate.setHours(0, 0, 0, 0);

    // See if completion exists
    const existing = await prisma.reminderCompletion.findFirst({
      where: { 
        reminderId, 
        completionDate: completionDate 
      }
    });

    if (existing) {
      await prisma.reminderCompletion.delete({ where: { id: existing.id } });
      return { status: 'uncompleted' };
    } else {
      await prisma.reminderCompletion.create({
        data: {
          reminderId,
          completionDate: completionDate
        }
      });
      return { status: 'completed' };
    }
  }
}

export const reminderService = new ReminderService();
