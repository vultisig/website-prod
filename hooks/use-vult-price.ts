"use client"

import { useState, useEffect } from 'react'

interface PriceData {
  price: number
  loading: boolean
  error: string | null
}

export function useVultPrice(): PriceData {
  const [price, setPrice] = useState<number>(1) // Default to $1
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Try Vultisig API first - VULT/USDC pool
        const response = await fetch(
          'https://api.vultisig.com/geckoterminal/api/v2/networks/eth/pools/0x6Df52cC6E2E6f6531E4ceB4b083CF49864A89020'
        )
        
        if (!response.ok) {
          throw new Error('Failed to fetch VULT price from Vultisig API')
        }
        
        const data = await response.json()
        
        // Debug logging to understand the API structure
        console.log('VULT/USDC Pool API Response:', data)
        
        // Extract VULT price from the VULT/USDC pool data
        // In a VULT/USDC pool, we need to determine which token is VULT
        const poolName = data.data?.attributes?.pool_name || ''
        const baseTokenPrice = data.data?.attributes?.base_token_price_usd
        const quoteTokenPrice = data.data?.attributes?.quote_token_price_usd
        
        // Check if this is indeed a VULT/USDC pool
        if (poolName.toLowerCase().includes('vult') && poolName.toLowerCase().includes('usdc')) {
          // Determine which token is VULT based on pool name or other indicators
          if (poolName.toLowerCase().startsWith('vult')) {
            // VULT is the base token
            if (baseTokenPrice) {
              setPrice(parseFloat(baseTokenPrice))
            } else {
              throw new Error('VULT base token price not found')
            }
          } else {
            // VULT is the quote token
            if (quoteTokenPrice) {
              setPrice(parseFloat(quoteTokenPrice))
            } else {
              throw new Error('VULT quote token price not found')
            }
          }
        } else if (baseTokenPrice) {
          // Fallback: use base token price if pool structure is unclear
          setPrice(parseFloat(baseTokenPrice))
        } else if (quoteTokenPrice) {
          // Fallback: use quote token price if pool structure is unclear
          setPrice(parseFloat(quoteTokenPrice))
        } else {
          // Fallback to CoinGecko API
          const coingeckoResponse = await fetch(
            'https://api.coingecko.com/api/v3/simple/price?ids=vultisig&vs_currencies=usd'
          )
          
          if (coingeckoResponse.ok) {
            const coingeckoData = await coingeckoResponse.json()
            if (coingeckoData.vultisig?.usd) {
              setPrice(coingeckoData.vultisig.usd)
            } else {
              setPrice(1)
            }
          } else {
            setPrice(1)
          }
        }
      } catch (err) {
        console.error('Error fetching VULT price:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch price')
        // Keep default price of $1 on error
        setPrice(1)
      } finally {
        setLoading(false)
      }
    }

    fetchPrice()
    
    // Refresh price every 5 minutes
    const interval = setInterval(fetchPrice, 5 * 60 * 1000)
    
    return () => clearInterval(interval)
  }, [])

  return { price, loading, error }
}
