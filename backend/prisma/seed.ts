import { prisma } from '../src/lib/prisma';
import { hashPassword } from '../src/utils/password';

async function main() {
  console.log('🌱 Seeding database...');

  // Clean up
  await prisma.notification.deleteMany();
  await prisma.routineReminder.deleteMany();
  await prisma.recommendation.deleteMany();
  await prisma.aIResult.deleteMany();
  await prisma.skinImage.deleteMany();
  await prisma.questionnaireAnswer.deleteMany();
  await prisma.skinAssessment.deleteMany();
  await prisma.familyMember.deleteMany();
  await prisma.family.deleteMany();
  await prisma.user.deleteMany();

  // Create Users
  const passwordHashUser = await hashPassword('Demo@1234');
  const user1 = await prisma.user.create({
    data: {
      fullName: 'Rahul Sharma',
      email: 'rahul@example.com',
      passwordHash: passwordHashUser,
      role: 'user',
      preferredLanguage: 'en',
      city: 'Mumbai',
      state: 'Maharashtra',
      dateOfBirth: new Date('1998-05-15'),
      gender: 'Male',
      emailVerified: true
    }
  });

  const passwordHashAdmin = await hashPassword('Admin@1234');
  const admin = await prisma.user.create({
    data: {
      fullName: 'Admin',
      email: 'admin@dermaasist.com',
      passwordHash: passwordHashAdmin,
      role: 'admin',
      emailVerified: true
    }
  });

  // Create Family
  const family = await prisma.family.create({
    data: {
      name: 'Sharma Family',
      primaryUserId: user1.id,
      members: {
        create: [
          { name: 'Rahul', age: 28, gender: 'Male', relationship: 'Me', isAuthorized: true },
          { name: 'Sunita Sharma', age: 55, gender: 'Female', relationship: 'Mother', isAuthorized: true },
          { name: 'Rajesh Sharma', age: 58, gender: 'Male', relationship: 'Father', isAuthorized: true },
          { name: 'Priya Sharma', age: 24, gender: 'Female', relationship: 'Sister', isAuthorized: false }
        ]
      }
    },
    include: { members: true }
  });

  const rahulMember = family.members.find(m => m.name === 'Rahul');
  const sunitaMember = family.members.find(m => m.name === 'Sunita Sharma');

  if (!rahulMember || !sunitaMember) throw new Error('Members not found');

  // Assessments for Rahul
  const d1 = new Date(); d1.setDate(d1.getDate() - 5);
  const a1 = await prisma.skinAssessment.create({
    data: {
      userId: user1.id,
      familyMemberId: rahulMember.id,
      status: 'completed',
      bodyArea: 'Left Arm',
      createdAt: d1,
      questionnaire: {
        create: {
          answers: JSON.stringify({ mainProblems: ['itching', 'redness'], duration: '1 week', severity: 'moderate' }),
          language: 'en'
        }
      },
      result: {
        create: {
          modelVersion: 'mock-1.0',
          aiProvider: 'mock',
          possibleConditions: JSON.stringify([{ condition: 'Contact Dermatitis', confidenceScore: 0.78 }]),
          confidence: 0.78,
          severity: 'moderate',
          urgency: 'low',
          symptomsSummary: JSON.stringify({}),
          imageQuality: JSON.stringify({}),
          redFlags: JSON.stringify([]),
          disclaimer: 'Mock disclaimer'
        }
      },
      recommendations: {
        create: [
          { type: 'lifestyle', title: 'Hygiene', description: 'Keep clean', priority: 1 }
        ]
      }
    }
  });

  const d2 = new Date(); d2.setDate(d2.getDate() - 14);
  const a2 = await prisma.skinAssessment.create({
    data: {
      userId: user1.id,
      familyMemberId: rahulMember.id,
      status: 'completed',
      bodyArea: 'Back',
      createdAt: d2,
      result: {
        create: {
          modelVersion: 'mock-1.0',
          aiProvider: 'mock',
          possibleConditions: JSON.stringify([{ condition: 'Eczema', confidenceScore: 0.85 }]),
          confidence: 0.85,
          severity: 'mild',
          urgency: 'low',
          symptomsSummary: JSON.stringify({}),
          imageQuality: JSON.stringify({}),
          redFlags: JSON.stringify([]),
          disclaimer: 'Mock disclaimer'
        }
      }
    }
  });

  const d3 = new Date(); d3.setDate(d3.getDate() - 30);
  const a3 = await prisma.skinAssessment.create({
    data: {
      userId: user1.id,
      familyMemberId: rahulMember.id,
      status: 'completed',
      bodyArea: 'Feet',
      createdAt: d3,
      result: {
        create: {
          modelVersion: 'mock-1.0',
          aiProvider: 'mock',
          possibleConditions: JSON.stringify([{ condition: 'Fungal Infection', confidenceScore: 0.72 }]),
          confidence: 0.72,
          severity: 'moderate',
          urgency: 'medium',
          symptomsSummary: JSON.stringify({}),
          imageQuality: JSON.stringify({}),
          redFlags: JSON.stringify([]),
          disclaimer: 'Mock disclaimer'
        }
      }
    }
  });

  // Assessment for Sunita
  const d4 = new Date(); d4.setDate(d4.getDate() - 7);
  const a4 = await prisma.skinAssessment.create({
    data: {
      userId: user1.id,
      familyMemberId: sunitaMember.id,
      status: 'completed',
      bodyArea: 'Scalp',
      createdAt: d4,
      result: {
        create: {
          modelVersion: 'mock-1.0',
          aiProvider: 'mock',
          possibleConditions: JSON.stringify([{ condition: 'Psoriasis', confidenceScore: 0.81 }]),
          confidence: 0.81,
          severity: 'moderate',
          urgency: 'low',
          symptomsSummary: JSON.stringify({}),
          imageQuality: JSON.stringify({}),
          redFlags: JSON.stringify([]),
          disclaimer: 'Mock disclaimer'
        }
      }
    }
  });

  // Reminders for Rahul
  const today = new Date().toISOString();
  await prisma.routineReminder.createMany({
    data: [
      { userId: user1.id, familyMemberId: rahulMember.id, name: 'Apply moisturizer', reminderTime: '09:00', repeatSchedule: 'daily', startDate: today },
      { userId: user1.id, familyMemberId: rahulMember.id, name: 'Apply sunscreen', reminderTime: '10:00', repeatSchedule: 'daily', startDate: today },
      { userId: user1.id, familyMemberId: rahulMember.id, name: 'Apply prescribed cream', reminderTime: '20:00', repeatSchedule: 'daily', startDate: today },
      { userId: user1.id, familyMemberId: rahulMember.id, name: 'Take medication', reminderTime: '21:00', repeatSchedule: 'daily', startDate: today },
      { userId: user1.id, familyMemberId: rahulMember.id, name: 'Follow-up appointment', reminderTime: '10:00', repeatSchedule: 'once', startDate: new Date(Date.now() + 7*24*60*60*1000).toISOString() }
    ]
  });

  // Reminder for Sunita
  await prisma.routineReminder.create({
    data: { userId: user1.id, familyMemberId: sunitaMember.id, name: 'Apply prescribed ointment', reminderTime: '08:00', repeatSchedule: 'daily', startDate: today }
  });

  // Notifications for Rahul
  await prisma.notification.createMany({
    data: [
      { userId: user1.id, title: 'Welcome', message: 'Welcome to DermaAsist!', type: 'system', isRead: false },
      { userId: user1.id, title: 'Assessment Complete', message: 'Your assessment for Left Arm is ready.', type: 'assessment', isRead: false },
      { userId: user1.id, title: 'Reminder', message: 'Time to apply moisturizer.', type: 'reminder', isRead: true }
    ]
  });

  console.log('✅ Seeding complete!');
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
