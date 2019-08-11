import * as React from 'react'

declare var goge: any

interface Props {
  style?: any
}

// react events onMouseEnter onMouseLeave => activate/deac listeners
// listen for middle mouse move

const Editor = (props: Props) => {
  return (
    <div
      id="screen"
      style={{
        display: 'flex',
        flex: '1 1 auto',
        ...props.style,
      }}
      onWheel={(e: React.WheelEvent) => {
        if (e.deltaY > 0) {
          goge.Dispatch(goge.ZoomInEvent)
        }
        if (e.deltaY < 0) {
          goge.Dispatch(goge.ZoomOutEvent)
        }
      }}
    />
  )
}

export default Editor
