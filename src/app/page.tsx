"use client";

export default function Home() {
  return (
    <main>
      <div className="pageTop">
        <center>
          <span className="displayTitle">Campus Search</span>
        </center>
      </div>
      <div id="searchBar">
        <div id="searchBarComponent" className="relative">
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg"
            placeholder="Search for anything on campus."
            required
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-blue-7 00 hover:bg-blue-800 focus:ring-1 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </div>
    </main>
  );
}
