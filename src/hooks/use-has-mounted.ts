import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/**
 * Returns `true` on the client after hydration, `false` during SSR.
 * Uses useSyncExternalStore to avoid the setState-in-useEffect pattern
 * that triggers the react-hooks/set-state-in-effect lint rule.
 */
export function useHasMounted(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,  // client snapshot
    () => false  // server snapshot
  );
}
