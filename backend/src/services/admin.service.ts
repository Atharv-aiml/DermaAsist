import { prisma } from '../lib/prisma';

export class AdminService {
  async getDashboardStats() {
    const totalUsers = await prisma.user.count();
    const totalAssessments = await prisma.skinAssessment.count();
    return { totalUsers, totalAssessments };
  }
}

export const adminService = new AdminService();
