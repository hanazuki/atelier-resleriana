import { useEffect } from 'react'

const Title: React.FC<{ children: string }> = ({ children: title }) => {
  useEffect(() => {
    const oldTitle = document.title
    document.title = title
    return () => {
      document.title = oldTitle
    }
  })

  return null
}

export default Title
