import Paper from '@material-ui/core/Paper'
import * as React from 'react'

interface Props {
  style?: any
}

const SideMenu = (props: Props) => {
  return (
    <div style={{ width: 300, borderRight: `1px solid black`, ...props.style }}>
      <Paper>Find here</Paper>
    </div>
  )
}

export default SideMenu
