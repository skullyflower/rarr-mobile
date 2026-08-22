import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';

import { getHasLock, getIsLocked, lockLog } from '@/lib/storage/journal-store';
import useLocked from '@/hooks/use-locked';

interface UseToggleLock {
  toggleLock: () => void;
  isLocked: boolean;
  hasLock: boolean;
  setIsLocked: (value: boolean) => void;
}

export default function useToggleLock(): UseToggleLock {
  const { locked, setLocked } = useLocked((state) => state);
  const [hasLock, setHasLock] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    getHasLock().then((res) => setHasLock(res));
  }, []);

  useEffect(() => {
    getIsLocked().then((res) => setLocked(res));
  }, [hasLock, setLocked]);

  const toggleLock = (): void => {
    if (!locked) {
      lockLog().then((res) => {
        if (res) {
          setLocked(res);
        } else {
          // still unlocked because there's no credential yet — go set one up
          router.push('/unlock');
        }
      });
    } else {
      router.push('/unlock');
    }
  };

  return { toggleLock, isLocked: locked, hasLock, setIsLocked: setLocked };
}
