import { type NextPage } from "next";
import { GuideCard } from "../../../components/Guide/GuideCard";
import Link from "next/link";
import { api } from "../../../utils/api";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const Guides: NextPage = () => {
    const router = useRouter()
    const id = router.query.game
    const session = useSession()
    const { data } = api.guides.getAllbyUser.useQuery({ gameId: id as string, userId: session.data?.user.id as string })
    console.log(data)

    return (
        <>
            <div className="p-14">
                <div className="flex justify-between items-center content-center my-6">
                    <h1 className="text-3xl text-white">Your Posts</h1>
                    <Link href={"/"}><button className="btn bg-primary-main text-white">Create New Post &nbsp;<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    </button></Link>
                </div>
                <div className="grid xl:grid-cols-3 grid-flow-row gap-8 content-center justify-center items-center my-6">
                    {data?.map((guide) => {
                        return (
                            <GuideCard key={guide.id} title={guide.title} username={guide.author.name ?? ''} createdAt={guide.createdAt} content={guide.content ?? ''} status={guide.status}></GuideCard>
                        )
                    })}
                </div>
            </div>
        </>
    );
};

export default Guides;