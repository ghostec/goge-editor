import CircularProgress from '@material-ui/core/CircularProgress'
import IconButton from '@material-ui/core/IconButton'
import InputBase from '@material-ui/core/InputBase'
import Paper from '@material-ui/core/Paper'
import SearchIcon from '@material-ui/icons/Search'
import Transition from 'containers/Transition'
import useAutocomplete, { Suggestion } from 'hooks/useAutocomplete'
import * as React from 'react'

const SearchActions = ({ style }: { style?: any }) => {
  const [focused, setFocused] = React.useState<boolean>(false)
  const toggleFocused = React.useCallback(() => setFocused(!focused), [
    setFocused,
    focused,
  ])
  const [suggestions, fetching] = useAutocomplete({
    text: 'Add Box: Mesh',
    fetchSuggestions: React.useCallback(text => {
      return new Promise<Suggestion[]>(resolve => {
        setTimeout(
          () => resolve([{ value: 'something', text, label: text }]),
          2000
        )
      })
    }, []),
  })
  return (
    <div style={{ padding: 16, ...style }}>
      <Paper elevation={focused ? 0 : 1} style={{ display: 'flex' }}>
        <IconButton
          aria-label="search for actions"
          style={{ padding: 6, margin: 6 }}
        >
          <SearchIcon />
        </IconButton>
        <InputBase
          placeholder="Search for actions"
          inputProps={{ 'aria-label': 'search for actions' }}
          onFocus={toggleFocused}
          onBlur={toggleFocused}
          style={{ width: '100%' }}
        />
      </Paper>
      <Transition mounted={focused}>
        <Results
          fetching={fetching}
          suggestions={suggestions}
          style={{ marginTop: 16 }}
        />
      </Transition>
    </div>
  )
}

const Results = ({
  fetching,
  suggestions,
  style,
}: {
  fetching: boolean;
  suggestions: Suggestion[];
  style: any;
}) => {
  if (fetching) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', ...style }}>
        <CircularProgress />
      </div>
    )
  }

  return (
    <ul style={{ listStyleType: 'none', ...style }}>
      {suggestions.map(sugg => (
        <li key={sugg.text} style={{ marginLeft: 16 }}>
          {sugg.label}
        </li>
      ))}
    </ul>
  )
}

export default SearchActions
