import Actions from 'containers/SideMenu/Actions'
import * as React from 'react'

interface Props {
  style?: any
}

const SideMenu = (props: Props) => {
  return (
    <div style={{ width: 300, borderRight: `1px solid black`, ...props.style }}>
      <Actions style={{ margin: 16 }} />
    </div>
  )
}

export default SideMenu
