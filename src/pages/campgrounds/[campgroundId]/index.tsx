import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { api } from "~/utils/api";

export default function Campground() {
  const router = useRouter();
  const { campgroundId } = router.query;
  const { data: campgroundData } = api.user.getOneCampground.useQuery({
    id: campgroundId as string,
  });

  console.log(campgroundData);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="container flex max-w-[800px] flex-col items-center gap-8 rounded-lg bg-gray-50 px-16 py-8 shadow-md sm:flex-row">
        {campgroundData?.image && (
          <div className="relative h-96 w-80">
            <Image
              fill
              src={campgroundData.image}
              alt="Alt"
              className="object-cover"
            />
          </div>
        )}
        <div className="flex h-full w-80 flex-col items-start justify-start gap-4">
          <h1 className="text-xl font-bold">{campgroundData?.name}</h1>
          <p className="text-lg">{campgroundData?.location}</p>
          <p className="text-lg">{campgroundData?.description}</p>
          <p className="text-lg">{campgroundData?.price}</p>
          <Link href={`/campgrounds/${campgroundId as string}/booking`}>
            <button className="rounded-md bg-[#E9EB9E] px-4 py-2 hover:bg-[#ACC196]">
              Book
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
