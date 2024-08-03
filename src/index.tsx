import type { FC } from "react"

import { FloatingPortal } from "@floating-ui/react"

import { Tools } from "./App"
import DevToolsIcon from "./components/Icon"
import { useZ } from "./state/store"

export const ZustandDevTools: FC<{
  state: any
  showDevTools?: boolean
  setShowDevTools?: (showDevTools: boolean) => void
}> = ({ state, showDevTools, setShowDevTools }) => {
  const s = useZ(["devToolsOpen"])
  return (
    <FloatingPortal>
      {showDevTools === undefined && <DevToolsIcon />}
      {(s.devToolsOpen || showDevTools) && (
        <Tools state={state} setShowDevTools={setShowDevTools} />
      )}
    </FloatingPortal>
  )
}
