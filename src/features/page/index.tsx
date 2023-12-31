import { useAtomValue } from 'jotai'

import { isOpenAtom, tooltipAtom } from '@/store'

import ClientTooltip from './components/client-tooltip'
import Highlight from './components/highlight'
import { Tooltip } from './components/tooltip'
import { useAuth, useTooltipsQuery } from './hooks'
export default function Page() {
  const isOpen = useAtomValue(isOpenAtom)
  const session = useAuth()
  const { data: serverTooltips } = useTooltipsQuery()

  const clientTooltip = useAtomValue(tooltipAtom)
  return (
    <>
      {isOpen && <Highlight />}
      {/* server tooltips */}
      {isOpen &&
        session &&
        serverTooltips?.map((tooltip) => (
          <Tooltip x={tooltip.x} y={tooltip.y} tooltip_id={tooltip.tooltip_id} key={tooltip.tooltip_id} />
        ))}
      {/* client tooltip */}
      {clientTooltip.x && clientTooltip.y && isOpen && <ClientTooltip x={clientTooltip.x} y={clientTooltip.y} />}
    </>
  )
}
