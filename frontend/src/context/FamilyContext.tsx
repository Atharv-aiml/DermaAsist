import React, { createContext, useState, useEffect } from 'react';
import { Family, FamilyMember } from '@/types';
import { useAuth } from '@/hooks/useAuth';

interface FamilyContextType {
  family: Family | null;
  members: FamilyMember[];
  activeMember: FamilyMember | null;
  isLoading: boolean;
  switchMember: (memberId: string) => void;
  refreshFamily: () => Promise<void>;
}

export const FamilyContext = createContext<FamilyContextType | undefined>(undefined);

export const FamilyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [family, setFamily] = useState<Family | null>(null);
  const [members, setMembers] = useState<FamilyMember[]>([]);
  const [activeMember, setActiveMember] = useState<FamilyMember | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mock initial load
  useEffect(() => {
    if (user) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        const mockFamily: Family = {
          id: 'fam-1',
          name: 'My Family',
          primaryUserId: user.id,
          members: [
            { id: 'mem-1', familyId: 'fam-1', name: user.fullName, age: 30, gender: user.gender || 'male', relationship: 'me', isAuthorized: true, createdAt: new Date().toISOString() }
          ],
          createdAt: new Date().toISOString()
        };
        setFamily(mockFamily);
        setMembers(mockFamily.members);
        setActiveMember(mockFamily.members[0]);
        setIsLoading(false);
      }, 500);
    } else {
      setFamily(null);
      setMembers([]);
      setActiveMember(null);
    }
  }, [user]);

  const switchMember = (memberId: string) => {
    const member = members.find(m => m.id === memberId);
    if (member) {
      setActiveMember(member);
    }
  };

  const refreshFamily = async () => {
    // Re-fetch family logic here
  };

  return (
    <FamilyContext.Provider value={{
      family,
      members,
      activeMember,
      isLoading,
      switchMember,
      refreshFamily
    }}>
      {children}
    </FamilyContext.Provider>
  );
};
