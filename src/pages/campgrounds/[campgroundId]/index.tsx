import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

const CAMPGROUND_DATA = {
  name: "Test campground",
  address: "1234 Test St",
  province: "BC",
  postalcode: "10000",
  tel: "123-456-7890",
  region: "USA",
  imageSrc:
    "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
  imageAlt: "Alt",
};
export default function Campground() {
  const router = useRouter();
  const { campgroundId } = router.query;

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="container flex max-w-[800px] flex-col gap-8 rounded-lg bg-gray-50 px-16 py-8 shadow-md sm:flex-row">
        <div className="relative h-96 w-80">
          <Image
            fill
            src={CAMPGROUND_DATA.imageSrc}
            alt="Alt"
            className="object-cover"
          />
        </div>
        <div className="flex h-full flex-col items-start justify-start">
          <h1 className="font-bold">{CAMPGROUND_DATA.name}</h1>
          <p>{CAMPGROUND_DATA.address}</p>
          <p>{CAMPGROUND_DATA.province}</p>
          <p>{CAMPGROUND_DATA.postalcode}</p>
          <p>{CAMPGROUND_DATA.tel}</p>
          <p>{CAMPGROUND_DATA.region}</p>
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
