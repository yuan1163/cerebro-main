import React, { useRef, useState, useCallback } from 'react';

type UseDrawerTooltipReturnType<T extends HTMLElement> = {
  ref: React.RefObject<T>;
  drawerTooltip: boolean;
  showDrawerTooltip: () => void;
  hideDrawerTooltip: () => void;
};

function useDrawerTooltip<T extends HTMLElement>(): UseDrawerTooltipReturnType<T> {
  const ref = useRef<T>(null);
  const [drawerTooltip, setDrawerTooltip] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();

  const showDrawerTooltip = useCallback(() => {
    const timeoutId = setTimeout(() => {
      setDrawerTooltip(true);
    }, 800);
    setTimeoutId(timeoutId);
  }, []);

  const hideDrawerTooltip = useCallback(() => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(undefined);
    }
    setDrawerTooltip(false);
  }, [timeoutId]);

  React.useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  return {
    ref,
    drawerTooltip,
    showDrawerTooltip,
    hideDrawerTooltip,
  };
}

export default useDrawerTooltip;
