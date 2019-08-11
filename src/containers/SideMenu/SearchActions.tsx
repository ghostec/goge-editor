import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import IconButton from '@material-ui/core/IconButton'
import InputBase from '@material-ui/core/InputBase'
import Paper from '@material-ui/core/Paper'
import SearchIcon from '@material-ui/icons/Search'
import Transition from 'containers/Transition'
import useAutocomplete, { Suggestion } from 'hooks/useAutocomplete'
import useClickOutside from 'hooks/useClickOutside'
import * as React from 'react'

declare var goge: any

const SearchActions = ({ style }: { style?: any }) => {
  const [focused, setFocused] = React.useState<boolean>(false)
  const toggleFocused = React.useCallback(() => setFocused(!focused), [
    setFocused,
    focused,
  ])
  const [suggestions, fetching] = useAutocomplete({
    text: '',
    fetchSuggestions: React.useCallback(text => {
      return new Promise<Suggestion[]>(resolve => {
        setTimeout(
          () =>
            resolve([
              { value: goge.AddBoxEvent, text: 'Add Box', label: 'Add Box' },
            ]),
          2000
        )
      })
    }, []),
  })
  const ref = useClickOutside(
    React.useCallback(() => {
      if (!focused) {
        return
      }
      toggleFocused()
    }, [toggleFocused, focused])
  )
  return (
    <div style={style} ref={ref}>
      <div
        style={{
          padding: 16,
          paddingBottom: 0,
          ...(focused ? { borderBottom: '1px solid black' } : {}),
        }}
      >
        <Paper
          elevation={focused ? 0 : 1}
          style={{
            display: 'flex',
          }}
        >
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
            style={{
              width: '100%',
            }}
          />
        </Paper>
      </div>
      <Transition mounted={focused} style={{ padding: 16 }}>
        <Results fetching={fetching} suggestions={suggestions} />
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
  style?: any;
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
        <li key={sugg.text}>
          <Button
            color="primary"
            style={{
              width: '100%',
              justifyContent: 'flex-start',
            }}
            onClick={() => goge.Dispatch(sugg.value)}
          >
            {sugg.label}
          </Button>
        </li>
      ))}
    </ul>
  )
}

export default SearchActions
