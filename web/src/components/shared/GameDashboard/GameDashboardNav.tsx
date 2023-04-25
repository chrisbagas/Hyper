import Link from "next/link";
import { ArrowTopRightOnSquareIcon, GlobeAltIcon } from "@heroicons/react/24/solid"

export interface GameDashboardProps {
  id: string
  logoUrl?: string
  name?: string
  page: string
}
const menu = [
  { title: 'Home', path: '/home' },
  { title: 'Party Finder', path: '/party' },
  { title: 'Community Posts', path: '/guides' },
  { title: 'Your Posts', path: '/your-guides' },
]
export const GameDashboardNav: React.FC<GameDashboardProps> = ({ id, logoUrl, name, page }) => (
  <div key={id}>
    <div className="flex flex-col items-center md:items-start sm:flex-row gap-4">
      <div className="mt-4">
        <div className="rounded-full h-24 w-24">
          <img src={logoUrl} />
        </div>
      </div>
      <div className="xl:ml-8 mt-4" >
        <h1 className="text-4xl text-center lg:text-left my-2 font-bold font text-white">
          {name}
        </h1>
        <div className="flex flex-row items-center gap-2">
          <div className="badge badge-lg border-none text-neutral-0 font-normal bg-accent-4 text-sm">First-Person Shooter</div>
          <div className="badge badge-lg border-none text-neutral-0 font-normal bg-accent-6 text-sm">Competitive
          </div>
        </div>
      </div>
    </div>
    <div className="flex flex-col sm:flex-row gap-8 mt-4">
      <Link href="https://playvalorant.com/" className="text-white flex gap-2">
        <GlobeAltIcon className="w-4" />Valorant.com<ArrowTopRightOnSquareIcon className="w-4" />
      </Link>
      <Link href="https://www.riotgames.com/en" className="text-white flex gap-2">
        <img src="https://assets.stickpng.com/thumbs/6095215353a8bf00040ff3a6.png" alt="" className="mt-1 w-4 h-4" /> Riot<ArrowTopRightOnSquareIcon className="w-4" />
      </Link>
    </div>
    <div className="flex flex-nowrap tabs border-b border-base-4 mt-8 overflow-x-auto transition-all">
      {menu.map((item, index) => {
        return (
          <Link key={index} href={"/" + id + item.path}>
            <div
              className={`tab tab-lg cursor-pointer text-neutral-0 w-52 relative group`}
            >
              {item.title}
              <div className={`h-[2px] transition-all duration-300 group-hover:w-full bg-white absolute bottom-0 ${page.includes(item.path)
                ? 'w-full'
                : 'w-0'
                }`}
              />
            </div>
          </Link>
        )
      })}
    </div>
  </div >
)
