'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Search() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const [searchTerm, setSearchTerm] = useState(searchParams?.get('query') || '')

  useEffect(() => {
    const handler = setTimeout(() => {
      const params = new URLSearchParams(searchParams || '')
      if (searchTerm) {
        params.set('query', searchTerm)
      } else {
        params.delete('query')
      }

      // Instead of using Next.js router, update the URL manually
      window.history.replaceState(null, '', `${pathname}?${params.toString()}`)
    }, 200)

    return () => clearTimeout(handler)
  }, [searchTerm, pathname, searchParams])

  return (
    <div>
      <div className="mt-2">
        <input
          id="search"
          name="search"
          type="search"
          placeholder="Product name, brand, or category"
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
        />
      </div>
    </div>
  )
}
