import type { RefObject } from "react"
import { useEffect, useRef, useState } from "react"
import { useZ } from "../state/store"

export const useSticky = (
  name?: string
): [
  ref: RefObject<HTMLDivElement> | null,
  isStuck: boolean,
  setIsStuck: (isStuck: boolean) => void
] => {
  const [isStuck, setIsStuck] = useState(false)
  const state = useZ(["position"])
  const ref = useRef<HTMLDivElement>(null)
  const yPos = state.position.y ?? 0
  useEffect(() => {
    const cachedRef = ref.current
    if (cachedRef) {
      const observer = new IntersectionObserver(
        ([e]) => {
          const shouldStick = e.boundingClientRect.top <= yPos + 60

          if (name === `devTools`) {
            console.log({
              name,
              top: e.boundingClientRect.top,
              yPos: yPos + 60,
              isStuck,
            })
            console.log({ shouldStick })
          }
          setIsStuck(shouldStick)
        },
        {
          threshold: [1],
          rootMargin: `${-yPos - 62}px 0px 0px 0px`,
        }
      )
      observer.observe(cachedRef)
      return () => observer.unobserve(cachedRef)
    }
  }, [ref.current, yPos])

  return [ref, isStuck, setIsStuck]
}

export default useSticky
