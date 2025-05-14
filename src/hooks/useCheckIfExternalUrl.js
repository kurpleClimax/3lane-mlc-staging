import { useEffect, useState } from 'react'
import { isExternalUrl } from '@/utils/miscellaneous'

export default function useCheckIfExternalUrl (url) {
  const [isExternal, setIsExternal] = useState(false)

  useEffect(() => {
    setIsExternal(isExternalUrl(url))
  }, [url])

  return isExternal
}
