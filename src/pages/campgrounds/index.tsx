import Image from "next/image";
import Link from "next/link";
import { api } from "~/utils/api";

export default function CampgroundList() {
  const { data: campground } = api.user.getAllCampgrounds.useQuery({});
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="flex flex-row items-center gap-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Campgrounds List
          </h2>
          <Link href="/campgrounds/create" className="bg-[#799496] p-2 rounded-md text-white hover:bg-[#ACC196]">
            Add Campground
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {campground?.map((product) => (
            <div
              key={product.id}
              className="group relative rounded-md bg-gray-100 p-4"
            >
              <div className="relative h-80 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75">
                <img
                  className="h-full w-full object-cover"
                  src={product.image}
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <Link href={`/campgrounds/${product.id}`}>
                      <span aria-hidden="true">{product.name}</span>
                    </Link>
                  </h3>

                  <p className="text-sm text-gray-500">
                    {product.description},
                  </p>
                  <p className="text-sm text-gray-500">{product.location},</p>
                  <p className="text-sm text-gray-500">{product.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
