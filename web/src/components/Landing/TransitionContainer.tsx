import React from "react"
import { useInView } from "react-intersection-observer"

export interface TransitionContainerProps {
  children: React.ReactNode
  enterClasses: string
}


const TransitionContainer: React.FC<TransitionContainerProps> = ({ children, enterClasses }) => {
  const [mounted, setMounted] = React.useState(false)

  const { ref, inView } = useInView({
    threshold: 0,
  })

  React.useEffect(() => {
    if (inView) {
      setMounted(true)
    }
  }, [inView])

  const visible = mounted || inView

  return (
    <div ref={ref} className={`flex flex-col gap-y-8 lg:flex-row lg:gap-x-24 w-2/3 items-center duration-[1000ms] transition-all ${!visible && enterClasses}`}>
      {children}
    </div>
  )
}

export default TransitionContainer
