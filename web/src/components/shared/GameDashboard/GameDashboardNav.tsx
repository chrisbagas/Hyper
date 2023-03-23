import Link from "next/link";
import { ArrowTopRightOnSquareIcon, GlobeAltIcon } from "@heroicons/react/24/solid"

export interface GameDashboardProps {
    id: string
    logoUrl?: string
    name?: string
    page: string
}
const menu = [
    { title: 'Home', path: '' },
    { title: 'Party Finder', path: '/party' },
    { title: 'Community Posts', path: '/guides' },
    { title: 'Your Posts', path: '/your-guides' },
]
export const GameDashboardNav: React.FC<GameDashboardProps> = ({ id, logoUrl, name, page }) => (
    <div key={id}>
        <div className="flex flex-col sm:flex-row gap-4">
            <div className=" mt-4">
                <div className=" rounded-full h-24 w-24">
                    <img src={logoUrl} />
                </div>

            </div>
            <div className=" ml-8 mt-4" >
                <h1 className="text-4xl my-2 font-bold font text-white">
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
            <Link href="valorant.com" className="text-white flex gap-2">
                <GlobeAltIcon className="w-4" />Valorant.com<ArrowTopRightOnSquareIcon className="w-4" />
            </Link>
            <Link href="riot.com" className="text-white flex gap-2">
                <img src="https://assets.stickpng.com/thumbs/6095215353a8bf00040ff3a6.png" alt="" className="mt-1 w-4 h-4" /> Valorant<ArrowTopRightOnSquareIcon className="w-4" />
            </Link>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-between items-center content-center mt-8">
            {menu.map((item, index) => {
                return (
                    <Link key={index} href={"/" + id + item.path}>
                        <div
                            className={`cursor-pointer ${page === "/[game]" + item.path
                                ? 'font-bold text-xl text-neutral-0 border-b-4 flex-1'
                                : 'text-xl text-neutral-0 flex-1'
                                }`}
                        >
                            {item.title}
                        </div>
                    </Link>
                )
            })}
        </div>
    </div>
)
