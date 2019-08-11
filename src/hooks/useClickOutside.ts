import * as React from 'react'

function useClickOutside(onClick: (e: MouseEvent) => void) {
  const ref = React.useRef(null)
  const onClickWrapper = React.useCallback(
    (e: MouseEvent) => {
      if (ref.current.contains(e.target)) {
        return
      }
      onClick(e)
    },
    [onClick]
  )

  React.useEffect(() => {
    document.addEventListener('mousedown', onClickWrapper)
    return () => {
      document.removeEventListener('mousedown', onClickWrapper)
    }
  }, [onClickWrapper])

  return ref
}

export default useClickOutside
