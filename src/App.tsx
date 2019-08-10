import Editor from 'containers/Editor'
import SideMenu from 'containers/SideMenu'
import * as React from 'react'

const App = () => {
  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh' }}>
      <SideMenu style={{ backgroundColor: 'yellow' }} />
      <Editor style={{ backgroundColor: 'gray' }} />
    </div>
  )
}

export default App
