import { BACKER_GROUPS } from "./backers"
import BackerGrid from "./components/backer-grid"

export default function BackedByPage() {
  return (
    <main className="min-h-screen bg-v5-page px-4 pb-[112px] pt-[110px] md:px-[30px] md:pb-[30px] md:pt-[134px]">
      <div className="mx-auto flex max-w-v5-content flex-col">
        {BACKER_GROUPS.map((group) => (
          <BackerGrid key={group.id} group={group} />
        ))}
      </div>
    </main>
  )
}
