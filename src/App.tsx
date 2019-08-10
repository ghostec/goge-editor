import SideMenu from 'components/SideMenu'
import Editor from 'containers/Editor'
import * as React from 'react'

const App = () => {
  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh' }}>
      <SideMenu />
      <Editor />
    </div>
  )
}

export default App
