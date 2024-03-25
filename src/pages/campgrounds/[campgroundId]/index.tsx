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

  const navigateToBooking = () => {
    router.push(`${router.asPath}/booking`);
  };

  return (
    <div className="container mx-auto flex max-w-[800px] flex-col rounded-lg bg-gray-50 pt-16 shadow-md sm:flex-row">
      <div className="relative h-96 w-80">
        <Image
          fill
          src={CAMPGROUND_DATA.imageSrc}
          alt="Alt"
          className="object-cover"
        />
      </div>
      <div>
        <h1>{CAMPGROUND_DATA.name}</h1>
        <p>{CAMPGROUND_DATA.address}</p>
        <p>{CAMPGROUND_DATA.province}</p>
        <p>{CAMPGROUND_DATA.postalcode}</p>
        <p>{CAMPGROUND_DATA.tel}</p>
        <p>{CAMPGROUND_DATA.region}</p>
      </div>
      <Link href={}>
        <button>Book</button>
      </Link>
    </div>
  );
}
