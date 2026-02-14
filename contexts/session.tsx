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
    let isMounted = true;

    const loadSession = async () => {
      try {
        const { data } = await supabase.auth.getSession();

        if (!isMounted) {
          return;
        }

        const nextSession = data.session ?? null;
        setSession(nextSession);
        hadSessionRef.current = !!nextSession;
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (!isMounted) {
        return;
      }

      const hadSession = hadSessionRef.current;
      const hasSession = !!nextSession;
      const shouldShowExpiredToast = hadSession && !hasSession && !consumeManualSignOutFlag();

      setSession(nextSession ?? null);
      hadSessionRef.current = hasSession;
      setIsLoading(false);

      if (shouldShowExpiredToast) {
        Toast.show({
          type: 'error',
          text1: 'Session expired',
          text2: 'Please sign in again to continue.',
        });
      }
    });

    return () => {
      isMounted = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

  const value = useMemo(
    () => ({
      session,
      isLoading,
    }),
    [session, isLoading]
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession() {
  const context = useContext(SessionContext);

  if (!context) {
    throw new Error('useSession must be used within SessionProvider');
  }

  return context;
}
