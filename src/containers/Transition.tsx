import usePrevious from 'hooks/usePrevious'
import * as React from 'react'
import { createUseStyles } from 'react-jss'

const Transition = ({
  children,
  mounted,
  unmountDelayMsecs,
  style,
}: {
  children: React.ReactNode;
  mounted: boolean;
  unmountDelayMsecs?: number;
  style?: any;
}) => {
  const previousMounted = usePrevious(mounted)
  const classes = useStyles()
  const [classToUse, setClassToUse] = React.useState(
    mounted ? classes.unmounted : classes.mounted
  )
  const [delayedMounted, setDelayedMounted] = React.useState<boolean>(mounted)
  const timeoutRef = React.useRef(null)

  React.useEffect(() => {
    if (mounted === previousMounted) {
      return
    }
    setClassToUse(mounted ? classes.mounted : classes.unmounted)
    if (!mounted) {
      timeoutRef.current = setTimeout(
        () => setDelayedMounted(false),
        unmountDelayMsecs || 30
      )
    } else {
      setDelayedMounted(true)
      clearTimeout(timeoutRef.current)
    }
  }, [
    mounted,
    previousMounted,
    delayedMounted,
    classes,
    setClassToUse,
    setDelayedMounted,
  ])

  React.useEffect(() => {
    return () => clearTimeout(timeoutRef.current)
  }, [])

  return (
    <div className={classToUse} style={style}>
      {delayedMounted && children}
    </div>
  )
}

const useStyles = createUseStyles({
  mounted: {
    transition: 'all ease-in 30ms',
    opacity: 1,
  },
  unmounted: {
    transition: 'all ease-out 30ms',
    opacity: 0,
  },
})

export default Transition
