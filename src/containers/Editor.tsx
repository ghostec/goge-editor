import * as React from 'react'

interface Props {
  style?: any
}

const Editor = (props: Props) => {
  return (
    <div
      style={{
        display: 'flex',
        flex: '1 1 auto',
        ...props.style,
      }}
    >
      <h1>Editor</h1>
    </div>
  )
}

export default Editor
