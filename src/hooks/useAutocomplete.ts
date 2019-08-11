import useDebounce from 'hooks/useDebounce'
import * as React from 'react'

interface UseAutocompleteArgs {
  text: string
  fetchSuggestions(text: string): Promise<Suggestion[]>
  // custom function to filter suggestions based on `text`.
  // Default: IFilterSuggestions
  filterSuggestions?(text: string, suggs: Suggestion[]): Suggestion[]
}

export interface Suggestion {
  value: any // holds desired payload on selection
  label: React.ReactNode // visual representation
  text: string // used for filtering
}

function useAutocomplete(args: UseAutocompleteArgs): [Suggestion[], boolean] {
  const text = useDebounce(args.text, 250)
  const [suggs, setSuggs] = React.useState<Suggestion[]>([])
  const [fetching, setFetching] = React.useState<boolean>(false)

  React.useEffect(() => {
    async function fetchSuggestions() {
      setFetching(true)
      try {
        const suggs = await args.fetchSuggestions(text)
        const filterFunc = args.filterSuggestions || IFilterSuggestions
        setSuggs(filterFunc(text, suggs))
      } catch (err) {
        console.log(err)
      }
      setFetching(false)
    }
    fetchSuggestions()
  }, [text, args.fetchSuggestions, args.filterSuggestions, setFetching])

  return [suggs, fetching]
}

export function IFilterSuggestions(
  text: string,
  suggs: Suggestion[]
): Suggestion[] {
  return suggs.filter(sugg => {
    return sugg.text.toLowerCase().startsWith(text.toLowerCase())
  })
}

export default useAutocomplete
