"use client"

import { useState, useEffect } from 'react'

interface SupplyData {
  circulatingSupply: number
  loading: boolean
  error: string | null
}

export function useVultSupply(): SupplyData {
  const [circulatingSupply, setCirculatingSupply] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSupply = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Fetch token info from Etherscan API
        const response = await fetch(
          'https://api.etherscan.io/api?module=token&action=tokeninfo&contractaddress=0xb788144df611029c60b859df47e79b7726c4deba&apikey=YourApiKeyToken'
        )
        
        if (!response.ok) {
          throw new Error('Failed to fetch supply from Etherscan API')
        }
        
        const data = await response.json()
        
        if (data.status === '1' && data.result && data.result[0]) {
          const tokenInfo = data.result[0]
          // Extract circulating supply (total supply minus any burned tokens)
          const totalSupply = parseFloat(tokenInfo.totalSupply) || 0
          const decimals = parseInt(tokenInfo.decimals) || 18
          
          // Convert from wei to actual token amount
          const actualSupply = totalSupply / Math.pow(10, decimals)
          setCirculatingSupply(actualSupply)
        } else {
          throw new Error(data.message || 'Invalid response from Etherscan API')
        }
      } catch (err) {
        console.error('Error fetching VULT supply:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch supply')
        // Keep default supply of 0 on error
        setCirculatingSupply(0)
      } finally {
        setLoading(false)
      }
    }

    fetchSupply()
    
    // Refresh supply every 10 minutes (supply changes less frequently than price)
    const interval = setInterval(fetchSupply, 10 * 60 * 1000)
    
    return () => clearInterval(interval)
  }, [])

  return { circulatingSupply, loading, error }
}
