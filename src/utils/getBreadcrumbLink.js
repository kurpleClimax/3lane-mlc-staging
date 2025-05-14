export function getLastBreadcrumbLink (data, uri) {
  for (const block of (data?.blocks || [])) {
    if (block?.name?.includes('subtabs')) {
      const entries = Object.entries(block?.attributes?.data || {})
      const activeEntry = entries.find((entry) => typeof entry[1] === 'string' && entry[1].endsWith(uri))
      if (activeEntry) {
        const activeTitle = entries.find((entry) => entry[0] === activeEntry[0]?.replace('url', 'title'))?.[1]
        if (activeTitle && activeTitle !== data?.title) {
          return <span className='text-h4 text-grey'>{activeTitle}</span>
        }
      }
    }

    if (block?.name?.includes('tabs')) {
      const entries = Object.entries(block?.attributes?.data || {})
      const activeEntry = entries.find((entry) => typeof entry[1] === 'string' && entry[1].endsWith(uri))
      if (activeEntry) {
        const activeTitle = entries.find((entry) => entry[0] === activeEntry[0]?.replace('url', 'title'))?.[1]
        if (activeTitle && activeTitle !== data?.title) {
          return <span className='text-h4 text-grey'>{activeTitle}</span>
        }
      }
    }
  }

  return null
}
