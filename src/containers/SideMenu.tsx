import * as React from 'react'

interface Props {
  style?: any
}

const SideMenu = (props: Props) => {
  return (
    <div style={{ width: 300, borderRight: `1px solid black`, ...props.style }}>
      <h1>SideMenu</h1>
    </div>
  )
}

export default SideMenu
