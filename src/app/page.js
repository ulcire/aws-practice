import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-grow">
        <main className="flex-grow m-4 mr-2 w-3/4">
          <div>
            <div className="flex items-center justify-center w-full h-[32rem] bg-gray-300">
              <h1 className="text-xl">FrontPage Banner</h1>
            </div>
            <div className="flex justify-between mt-4">
              <Link
                href="/link1"
                className="w-1/3 h-48 bg-gray-300 flex items-center justify-center text-xl"
              >
                Link 1
              </Link>
              <div className="w-4"></div> {/* Spacer */}
              <Link
                href="/link2"
                className="w-1/3 h-48 bg-gray-300 flex items-center justify-center text-xl"
              >
                Link 2
              </Link>
              <div className="w-4"></div> {/* Spacer */}
              <Link
                href="/link3"
                className="w-1/3 h-48 bg-gray-300 flex items-center justify-center text-xl"
              >
                Link 3
              </Link>
            </div>
          </div>
        </main>
        <aside className="m-4 ml-2 bg-gray-100 p-4 w-1/4 flex flex-col">
          <h3 className="font-bold">News</h3>
          <p>News item 1</p>
          <p>News item 2</p>
        </aside>
      </div>
    </div>
  );
}
