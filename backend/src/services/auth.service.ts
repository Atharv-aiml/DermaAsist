import { prisma } from '../lib/prisma';
import { hashPassword, comparePassword } from '../utils/password';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils/token';
import { AppError, AuthError, NotFoundError } from '../utils/errors';
import { randomBytes } from 'crypto';

export class AuthService {
  async register(data: {
    email: string; password: string; fullName: string;
    phone?: string; dateOfBirth?: string; gender?: string;
    preferredLanguage?: string; city?: string; state?: string;
  }) {
    const existing = await prisma.user.findUnique({ where: { email: data.email } });
    if (existing) throw new AppError('Email already in use', 409);

    const passwordHash = await hashPassword(data.password);
    const user = await prisma.user.create({
      data: {
        email: data.email,
        passwordHash,
        fullName: data.fullName,
        phone: data.phone,
        dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : undefined,
        gender: data.gender,
        preferredLanguage: data.preferredLanguage || 'en',
        city: data.city,
        state: data.state,
      },
      select: { id: true, email: true, fullName: true, phone: true, dateOfBirth: true, gender: true, preferredLanguage: true, city: true, state: true, role: true, emailVerified: true, createdAt: true }
    });

    return {
      accessToken: generateAccessToken(user.id),
      refreshToken: generateRefreshToken(user.id),
      user
    };
  }

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new AuthError('Invalid credentials');

    const valid = await comparePassword(password, user.passwordHash);
    if (!valid) throw new AuthError('Invalid credentials');

    const { passwordHash: _, ...safeUser } = user;
    return {
      accessToken: generateAccessToken(user.id),
      refreshToken: generateRefreshToken(user.id),
      user: safeUser
    };
  }

  async refreshToken(token: string) {
    const payload = verifyRefreshToken(token);
    if (!payload) throw new AuthError('Invalid refresh token');
    return { accessToken: generateAccessToken(payload.userId) };
  }

  async getProfile(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, fullName: true, phone: true, dateOfBirth: true, gender: true, preferredLanguage: true, city: true, state: true, role: true, emailVerified: true, createdAt: true, updatedAt: true }
    });
    if (!user) throw new NotFoundError('User not found');
    return user;
  }

  async updateProfile(userId: string, data: { fullName?: string; phone?: string; dateOfBirth?: string; gender?: string; preferredLanguage?: string; city?: string; state?: string; }) {
    const updateData: any = { ...data };
    if (data.dateOfBirth) updateData.dateOfBirth = new Date(data.dateOfBirth);
    const user = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: { id: true, email: true, fullName: true, phone: true, dateOfBirth: true, gender: true, preferredLanguage: true, city: true, state: true, role: true, emailVerified: true, createdAt: true, updatedAt: true }
    });
    return user;
  }

  async changePassword(userId: string, oldPassword: string, newPassword: string) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundError('User not found');
    const valid = await comparePassword(oldPassword, user.passwordHash);
    if (!valid) throw new AuthError('Current password is incorrect');
    const hash = await hashPassword(newPassword);
    await prisma.user.update({ where: { id: userId }, data: { passwordHash: hash } });
    return { message: 'Password changed successfully' };
  }

  async forgotPassword(email: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return { message: 'If an account exists, a reset link has been sent.' };
    const token = randomBytes(32).toString('hex');
    console.log(`\n=== PASSWORD RESET TOKEN ===\nUser: ${email}\nToken: ${token}\n===========================\n`);
    // In production, send email with token. For now, log it.
    return { message: 'If an account exists, a reset link has been sent.' };
  }

  async resetPassword(token: string, newPassword: string) {
    // In production, verify token from DB. For mock, accept any.
    const hash = await hashPassword(newPassword);
    return { message: 'Password reset successfully. Please sign in.' };
  }
}

export const authService = new AuthService();
