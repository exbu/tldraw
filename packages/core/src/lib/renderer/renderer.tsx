import * as React from 'react'
import {
  TLShape,
  TLPage,
  TLPageState,
  TLSettings,
  TLCallbacks,
  TLShapeUtils,
  TLTheme,
  TLBounds,
} from '../types'
import { Canvas } from './components/canvas'
import { useTLTheme } from './hooks/useStyle'
import { TLContext } from './hooks/useTLContext'

export interface RendererProps<T extends TLShape>
  extends Partial<TLSettings>,
    Partial<TLCallbacks> {
  shapeUtils: TLShapeUtils<T>
  page: TLPage<T>
  pageState: TLPageState
  theme?: Partial<TLTheme>
  hideBounds?: boolean
  hideIndicators?: boolean
}

export function Renderer<T extends TLShape>({
  shapeUtils,
  page,
  pageState,
  theme,
  hideIndicators = false,
  hideBounds = false,
  isDarkMode = false,
  isDebugMode = false,
  isPenMode = false,
  ...rest
}: RendererProps<T>): JSX.Element {
  useTLTheme(theme)
  const rScreenBounds = React.useRef<TLBounds>(null)
  const rPageState = React.useRef<TLPageState>(pageState)

  React.useEffect(() => {
    rPageState.current = pageState
  }, [pageState])

  const [context] = React.useState(() => ({
    callbacks: rest,
    shapeUtils,
    rScreenBounds,
    rPageState,
  }))

  return (
    <TLContext.Provider value={context}>
      <Canvas
        page={page}
        pageState={pageState}
        hideBounds={hideBounds}
        hideIndicators={hideIndicators}
      />
    </TLContext.Provider>
  )
}