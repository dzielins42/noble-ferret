import { DependencyList, EffectCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

export const useNonInitialEffect = (
  effect: EffectCallback,
  deps?: DependencyList
) => {
  const initialRender = useRef(true);

  useEffect(() => {
    let effectReturns: void | (() => void | undefined) = () => { };

    if (initialRender.current) {
      initialRender.current = false;
    } else {
      effectReturns = effect();
    }

    if (effectReturns && typeof effectReturns === "function") {
      return effectReturns;
    }
  }, deps);
};

export const useWindowSize = () => {
  const [size, setSize] = useState([0, 0])
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight])
    }
    window.addEventListener('resize', updateSize)
    updateSize()
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  return size
}
