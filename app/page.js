import { getRandomImage } from "@/lib/actions";
import ImageSection from "@/components/ImageSection";

export default async function Home() {
  const image = await getRandomImage();
  return (
    <main>
      <>
        <div className="absolute inset-0 z-50 flex items-center justify-center px-4 text-3xl font-bold text-center text-white pointer-events-none md:text-4xl lg:text-7xl bg">
          <div className="flex flex-col gap-10">
            <h1 className="drop-shadow-2xl">Nah, I&apos;d Win-inator</h1>
            <div className="self-center">
              <ImageSection initialImage={image} />
            </div>
          </div>
        </div>
      </>
    </main>
  );
}
