import Image from "next/image";
import Link from "next/link";

const campgrounds = [
  {
    id: 1,
    name: "Test campground",
    address: "1234 Test St",
    province: "BC",
    postalcode: "10000",
    tel: "123-456-7890",
    region: "USA",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
  },
  {
    id: 2,
    name: "Test campground",
    address: "1234 Test St",
    province: "BC",
    postalcode: "10000",
    tel: "123-456-7890",
    region: "USA",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
  },
  {
    id: 3,
    name: "Test campground",
    address: "1234 Test St",
    province: "BC",
    postalcode: "10000",
    tel: "123-456-7890",
    region: "USA",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
  },
  {
    id: 4,
    name: "Test campground",
    address: "1234 Test St",
    province: "BC",
    postalcode: "10000",
    tel: "123-456-7890",
    region: "USA",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
  },
  {
    id: 5,
    name: "Test campground",
    address: "1234 Test St",
    province: "BC",
    postalcode: "10000",
    tel: "123-456-7890",
    region: "USA",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
  },
  {
    id: 6,
    name: "Test campground",
    address: "1234 Test St",
    province: "BC",
    postalcode: "10000",
    tel: "123-456-7890",
    region: "USA",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
  },
  {
    id: 7,
    name: "Test campground",
    address: "1234 Test St",
    province: "BC",
    postalcode: "10000",
    tel: "123-456-7890",
    region: "USA",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
  },
  {
    id: 8,
    name: "Test campground",
    address: "1234 Test St",
    province: "BC",
    postalcode: "10000",
    tel: "123-456-7890",
    region: "USA",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
  },
  {
    id: 9,
    name: "Test campground",
    address: "1234 Test St",
    province: "BC",
    postalcode: "10000",
    tel: "123-456-7890",
    region: "USA",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
  },
  {
    id: 10,
    name: "Test campground",
    address: "1234 Test St",
    province: "BC",
    postalcode: "10000",
    tel: "123-456-7890",
    region: "USA",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
  },
  {
    id: 11,
    name: "Test campground",
    address: "1234 Test St",
    province: "BC",
    postalcode: "10000",
    tel: "123-456-7890",
    region: "USA",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
  },
  // More campgrounds...
];

export default function Example() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Campgrounds List
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {campgrounds.map((product) => (
            <div key={product.id} className="group relative">
              <div className="aspect-h-1 aspect-w-1 lg:aspect-none relative w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
                <Image
                  fill={true}
                  src={product.imageSrc}
                  alt={product.imageAlt}
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <Link href={`/campgrounds/${product.id}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {product.address},
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    {product.province},
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    {product.postalcode},
                  </p>
                  <p className="mt-1 text-sm text-gray-500">{product.region}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  {product.tel}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
