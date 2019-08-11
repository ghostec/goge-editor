import * as React from 'react'

function useDebounce(value: any, delayMsecs: number) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = React.useState(value)
  React.useEffect(() => {
    // Update debounced value after delay
    const handler = setTimeout(() => setDebouncedValue(value), delayMsecs)
    // Cancel the timeout if value changes (also on delay change or unmount)
    // This is how we prevent debounced value from updating if value is changed ...
    // .. within the delay period. Timeout gets cleared and restarted.
    return () => clearTimeout(handler)
  }, [value, delayMsecs, setDebouncedValue]) // Only re-call effect if value or delay changes

  return debouncedValue
}

export default useDebounce
