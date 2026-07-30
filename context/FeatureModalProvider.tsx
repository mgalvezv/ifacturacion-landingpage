import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import FeatureDetailModal from '../components/FeatureDetailModal';
import { FEATURE_BY_ID } from '../lib/features';

interface FeatureModalContextValue {
  openFeature: (featureId: string) => void;
  closeFeature: () => void;
  activeFeatureId: string | null;
}

const FeatureModalContext = createContext<FeatureModalContextValue | null>(null);

export const FeatureModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [activeFeatureId, setActiveFeatureId] = useState<string | null>(null);

  const openFeature = useCallback((featureId: string) => {
    if (FEATURE_BY_ID[featureId]) {
      setActiveFeatureId(featureId);
    }
  }, []);

  const closeFeature = useCallback(() => {
    setActiveFeatureId(null);
  }, []);

  useEffect(() => {
    const handleOpenFromHash = () => {
      const match = window.location.hash.match(/^#feature-(.+)$/);
      if (match?.[1] && FEATURE_BY_ID[match[1]]) {
        setActiveFeatureId(match[1]);
      }
    };

    handleOpenFromHash();
    window.addEventListener('hashchange', handleOpenFromHash);
    return () => window.removeEventListener('hashchange', handleOpenFromHash);
  }, []);

  const activeFeature = activeFeatureId ? FEATURE_BY_ID[activeFeatureId] : null;

  return (
    <FeatureModalContext.Provider
      value={{ openFeature, closeFeature, activeFeatureId }}
    >
      {children}
      {activeFeature && (
        <FeatureDetailModal feature={activeFeature} onClose={closeFeature} />
      )}
    </FeatureModalContext.Provider>
  );
};

export const useFeatureModal = (): FeatureModalContextValue => {
  const ctx = useContext(FeatureModalContext);
  if (!ctx) {
    throw new Error('useFeatureModal debe usarse dentro de FeatureModalProvider');
  }
  return ctx;
};
