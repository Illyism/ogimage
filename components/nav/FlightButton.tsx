'use client'

import { Plane } from 'lucide-react'
import { type Country } from '../local/useCountry'
import { Button } from '../ui/button'

export const FlightButton = ({ country }: { country: Country }) => {
  const url = `https://www.kiwi.com/deep?affilid=tanarallcswissflights&departure=anytime&destination=CH&origin=${country.code}&pageName=tilesPage&return=anytime&returnFromDifferentAirport=false&returnToDifferentAirport=false`

  const onClick = () => {
    window.open(url, '_blank')
    if (window.posthog) {
      window.posthog.capture('Flight Button Clicked', {
        ...country,
      })
    }
  }

  if (country.code == 'CH') {
    return null
  }

  return (
    <Button
      className="flex h-auto items-center gap-1 px-2 py-1"
      variant="ghost"
      onClick={onClick}
      aria-label={`Flights from ${country.name} to Switzerland`}
      title={`Flights from ${country.name} to Switzerland`}
    >
      <Plane className="h-4 w-4" />
      {country.name}
    </Button>
  )
}
