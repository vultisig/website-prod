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
        
        // Fetch supply from CoinGecko (Etherscan V1 is deprecated, V2 requires API key)
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/vultisig?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false'
        )

        if (!response.ok) {
          throw new Error('Failed to fetch supply from CoinGecko')
        }

        const data = await response.json()
        const supply = data.market_data?.circulating_supply ?? data.market_data?.total_supply

        if (supply != null) {
          setCirculatingSupply(supply)
        } else {
          throw new Error('Supply data not available')
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
