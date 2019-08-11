import * as React from 'react'

interface Props {
  style?: any
}

const Editor = (props: Props) => {
  return (
    <div
      id="screen"
      style={{
        display: 'flex',
        flex: '1 1 auto',
        ...props.style,
      }}
    />
  )
}

export default Editor
