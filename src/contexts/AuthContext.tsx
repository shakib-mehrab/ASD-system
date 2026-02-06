import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authenticateTherapist, authenticateGuardian } from '../services/dataService';
import type { Therapist, Patient } from '../types';

interface AuthState {
  isAuthenticated: boolean;
  user: Therapist | { name: string; phone: string; role: 'guardian'; patientId: string } | null;
  role: 'therapist' | 'guardian' | null;
  patient?: Patient; // For guardians
  loading: boolean;
}

interface AuthContextType extends AuthState {
  loginTherapist: (id: string, phone: string) => Promise<boolean>;
  loginGuardian: (patientId: string, phone: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'asd_auth_session';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    role: null,
    loading: true
  });

  // Restore session on mount
  useEffect(() => {
    const storedSession = localStorage.getItem(AUTH_STORAGE_KEY);
    if (storedSession) {
      try {
        const session = JSON.parse(storedSession);
        setAuthState({
          ...session,
          loading: false
        });
      } catch (error) {
        console.error('Failed to restore session:', error);
        setAuthState(prev => ({ ...prev, loading: false }));
      }
    } else {
      setAuthState(prev => ({ ...prev, loading: false }));
    }
  }, []);

  const loginTherapist = async (id: string, phone: string): Promise<boolean> => {
    try {
      const therapist = await authenticateTherapist(id, phone);
      
      if (therapist) {
        const newState = {
          isAuthenticated: true,
          user: therapist,
          role: 'therapist' as const,
          loading: false
        };
        
        setAuthState(newState);
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newState));
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const loginGuardian = async (patientId: string, phone: string): Promise<boolean> => {
    try {
      const result = await authenticateGuardian(patientId, phone);
      
      if (result) {
        const newState = {
          isAuthenticated: true,
          user: {
            name: result.guardian.name,
            phone: result.guardian.phone,
            role: 'guardian' as const,
            patientId: result.patient.id
          },
          role: 'guardian' as const,
          patient: result.patient,
          loading: false
        };
        
        setAuthState(newState);
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newState));
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const logout = () => {
    setAuthState({
      isAuthenticated: false,
      user: null,
      role: null,
      loading: false
    });
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        loginTherapist,
        loginGuardian,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
