import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import { api } from "~/utils/api";

// name        String
// location    String
// image       String
// description String
// price       Float
// bookings    Booking[]
export default function CreateCampGround() {
  const createCampGround = api.admin.createCampground.useMutation();
  const router = useRouter();

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = (document.getElementById("name") as HTMLInputElement).value;
    const location = (document.getElementById("location") as HTMLInputElement)
      .value;
    const description = (
      document.getElementById("description") as HTMLInputElement
    ).value;
    const price = (document.getElementById("price") as HTMLInputElement).value;
    const image =
      (document.getElementById("image") as HTMLInputElement)?.files?.[0] ??
      null;
    //turn image into base64
    if (!image) {
      alert("Please upload an image");
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = async () => {
      const base64 = reader.result;
      //console log everything

      await createCampGround.mutateAsync(
        {
          name,
          location,
          description,
          price: parseFloat(price),
          image: base64 as string,
        },
        {
          onSuccess: () => {
            alert("Campground created successfully");
            void router.push("/campgrounds");
          },
          onError: (error) => {
            alert(error.message);
          },
        },
      );
    };
  };

  return (
    <div className="px-4 py-24 ">
      <form
        className="mx-auto flex w-2/3 flex-col gap-8"
        onSubmit={onSubmitHandler}
      >
        <input
          type="text"
          placeholder="Name"
          className="rounded-md border-4 border-[#799496] p-4 "
          id="name"
        />
        <input
          type="text"
          placeholder="Location"
          className="rounded-md border-4 border-[#799496] p-4 "
          id="location"
        />
        <label htmlFor="image" className="flex items-center gap-2">
          <PhotoIcon className="h-6 w-6" />
          Image
        </label>
        <input type="file" placeholder="Image" id="image" required />
        <textarea
          placeholder="Description"
          className="rounded-md border-4 border-[#799496] p-4 "
          id="description"
        />
        <input
          type="number"
          placeholder="Price"
          className="rounded-md border-4 border-[#799496] p-4 "
          id="price"
        />
        <button className="rounded-md bg-[#ACC196] p-4">Create</button>
      </form>
    </div>
  );
}
