import { useEffect } from 'react'

const Title: React.FC<{ children: string | string[] }> = ({ children }) => {
  const title = typeof children === 'string' ? children : children.join('')

  useEffect(() => {
    const oldTitle = document.title
    document.title = title
    return () => {
      document.title = oldTitle
    }
  }, [title])

  return null
}

export default Title
