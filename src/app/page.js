"use client";

import { Amplify } from "aws-amplify";
import awsExport from "../aws-exports.js";
import Link from "next/link";
import { generateClient } from "aws-amplify/api";
import { listShowcasedEvents } from "../graphql/custom-queries";
import { useState, useEffect } from "react";
import ContentFormatter from "../components/ContentFormatter";

Amplify.configure(awsExport);

const client = generateClient();

const HomePage = () => {
  const [showcasedEvents, setShowcasedEvents] = useState([]);

  useEffect(() => {
    fetchShowcasedEvents();
  }, []);

  const fetchShowcasedEvents = async () => {
    try {
      const showcasedEventsResult = await client.graphql({
        query: listShowcasedEvents,
        authMode: "apiKey",
      });
      const sortedShowcasedEvents =
        showcasedEventsResult.data.listShowcasedEvents.items.sort(
          (a, b) => a.displayOrder - b.displayOrder
        );
      setShowcasedEvents(sortedShowcasedEvents);
      console.log(
        "showcasedEvents: ",
        showcasedEventsResult.data.listShowcasedEvents.items
      );
    } catch (error) {
      console.error("Error fetching showcased events: ", error);
    }
  };

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
          {showcasedEvents.map((showcasedEvent, index) => (
            <div key={index} className="mb-4">
              <p className="font-bold break-words">
                {showcasedEvent.event.type} - {showcasedEvent.event.title}
              </p>
              <p className="break-words">
                <ContentFormatter content={showcasedEvent.event.content} />
              </p>
            </div>
          ))}
        </aside>
      </div>
    </div>
  );
};
export default HomePage;
