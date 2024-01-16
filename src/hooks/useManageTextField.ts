import { useRef, useCallback } from "react";

export const useManageTextField = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const updateInput = useCallback((newContent: string) => {
    inputRef.current!.value = newContent;
  }, []);
  return { inputRef, updateInput };
};

export default useManageTextField;
