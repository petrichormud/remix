import { useCallback, useEffect } from "react";

export default function useKeyboardShortcut() {
  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    console.log(`Key pressed: ${e.key}`);
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  useEffect(() => {
    document.addEventListener("keyup", handleKeyPress);

    return () => {
      document.removeEventListener("keyup", handleKeyPress);
    };
  }, [handleKeyPress]);
}
