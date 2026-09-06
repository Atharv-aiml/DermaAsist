import { prisma } from '../lib/prisma';
import { NotFoundError } from '../utils/errors';

export class FamilyService {
  async createFamily(userId: string, name: string) {
    return prisma.family.create({
      data: { primaryUserId: userId, name },
      include: { members: true }
    });
  }

  async getFamily(userId: string) {
    return prisma.family.findFirst({
      where: { primaryUserId: userId },
      include: { members: true }
    });
  }

  async addMember(userId: string, memberData: any) {
    let family = await this.getFamily(userId);
    if (!family) {
      family = await this.createFamily(userId, 'My Family');
    }
    if (!family) throw new NotFoundError('Unable to find or create family');
    
    return prisma.familyMember.create({
      data: {
        familyId: family.id,
        name: memberData.name,
        age: Number(memberData.age),
        gender: memberData.gender,
        relationship: memberData.relationship,
        isAuthorized: memberData.isAuthorized || false
      }
    });
  }

  async removeMember(userId: string, memberId: string) {
    const family = await this.getFamily(userId);
    if (!family) throw new NotFoundError('Family not found');
    
    const member = await prisma.familyMember.findFirst({
      where: { id: memberId, familyId: family.id }
    });
    
    if (!member) throw new NotFoundError('Member not found');
    
    await prisma.familyMember.delete({ where: { id: memberId } });
    return true;
  }
}

export const familyService = new FamilyService();
