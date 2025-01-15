import { useState } from 'react';

function useInputFocus() {
  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = (disabledElement = false) => {
    if (!disabledElement) {
      setIsFocused(true);
    }
  };
  const handleBlur = (disabledElement = false) => {
    if (!disabledElement) {
      setIsFocused(false);
    }
  };
  return { isFocused, handleFocus, handleBlur };
}

export default useInputFocus;
