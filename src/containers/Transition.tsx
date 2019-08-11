import usePrevious from 'hooks/usePrevious'
import * as React from 'react'
import { createUseStyles } from 'react-jss'

const Transition = ({
  children,
  mounted,
  style,
}: {
  children: React.ReactNode;
  mounted: boolean;
  style?: any;
}) => {
  // TODO: don't unmount right away! need to keep it mounted for as long as
  // transition takes
  const previousMounted = usePrevious(mounted)
  const classes = useStyles()
  const [classToUse, setClassToUse] = React.useState(
    mounted ? classes.unmounted : classes.mounted
  )

  React.useEffect(() => {
    if (mounted === previousMounted) {
      return
    }
    setClassToUse(mounted ? classes.mounted : classes.unmounted)
  }, [mounted, previousMounted, classes, setClassToUse])

  return (
    <div className={classToUse} style={style}>
      {children}
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
