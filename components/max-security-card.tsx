import BentoCard, { BentoCopy } from "@/components/ui/bento-card"

export default function MaxSecurityCard() {
  return (
    <BentoCard height="short" className="justify-end">
      <BentoCopy
        title="Maximum security"
        body="Your vault shares can be stored anywhere without risk. No single piece can compromise your funds."
      />
    </BentoCard>
  )
}
