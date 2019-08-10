import * as React from 'react'

const App: React.FunctionComponent<{
  count: string;
}> = props => {
  return <h1>Something {props.count}</h1>
}

export default App
