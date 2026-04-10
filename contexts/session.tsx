import { supabase } from '@/config/supabase';
import { consumeManualSignOutFlag } from '@/utils/authSessionEvents';
import { Session } from '@supabase/supabase-js';
import { createContext, ReactNode, useContext, useEffect, useMemo, useRef, useState } from 'react';
import Toast from 'react-native-toast-message';

type SessionContextValue = {
  session: Session | null;
  isLoading: boolean;
};

const SessionContext = createContext<SessionContextValue | undefined>(undefined);

type SessionProviderProps = {
  children: ReactNode;
};

export function SessionProvider({ children }: SessionProviderProps) {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const hadSessionRef = useRef(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, nextSession) => {
      // INITIAL_SESSION fires once on mount — validate token server-side
      if (event === 'INITIAL_SESSION') {
        if (nextSession) {
          const { error } = await supabase.auth.getUser();
          if (error) {
            // Token invalid or revoked — clear it
            await supabase.auth.signOut();
            setSession(null);
            hadSessionRef.current = false;
          } else {
            setSession(nextSession);
            hadSessionRef.current = true;
          }
        } else {
          setSession(null);
          hadSessionRef.current = false;
        }
        setIsLoading(false);
        return;
      }

      const hadSession = hadSessionRef.current;
      const hasSession = !!nextSession;
      const shouldShowExpiredToast = hadSession && !hasSession && !consumeManualSignOutFlag();

      setSession(nextSession ?? null);
      hadSessionRef.current = hasSession;

      if (shouldShowExpiredToast) {
        Toast.show({
          type: 'error',
          text1: 'Session expired',
          text2: 'Please sign in again to continue.',
        });
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const value = useMemo(() => ({ session, isLoading }), [session, isLoading]);

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession() {
  const context = useContext(SessionContext);

  if (!context) {
    throw new Error('useSession must be used within SessionProvider');
  }

  return context;
}
