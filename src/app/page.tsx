"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Home() {
  const [currUserPrompt, setCurrUserPrompt] = useState("");
  const [modelResp, setModelResp] = useState(null);

  function updateMessage(prompt: string) {
    axios.post("/api/search", { content: prompt }).then((resp) => {
      console.log(resp);
      setModelResp(resp.data.content);
    });
  }

  return (
    <main>
      <div className="pageTop">
        <center>
          <span className="displayTitle">Campus Search: McGill Edition</span>
        </center>
      </div>
      <div id="searchBar">
        <div id="searchBarComponent" className="relative">
          <input
            onChange={(e) => {
              setCurrUserPrompt(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                console.log("User pressed enter!");
                e.preventDefault();
                updateMessage(currUserPrompt);
              }
            }}
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg"
            placeholder="Feel free to search for events on campus!"
            required
          />
          <button
            onClick={(e) => {
              updateMessage(currUserPrompt);
            }}
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-blue-7 00 hover:bg-blue-800 focus:ring-1 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </div>
      <div id="pageContent">
        <ReactMarkdown children={modelResp} remarkPlugins={[remarkGfm]} />
      </div>
    </main>
  );
}
