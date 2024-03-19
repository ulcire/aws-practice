"use client";

import { Amplify } from "aws-amplify";
import awsExport from "../aws-exports.js";
import Link from "next/link";
import { generateClient } from "aws-amplify/api";
import { listShowcasedEvents } from "../graphql/custom-queries";
import * as mutations from "../graphql/mutations.js";
import { useState, useEffect } from "react";
import ContentFormatter from "../components/ContentFormatter";
import { fetchAuthSession } from "aws-amplify/auth";

import {
  MdOutlineEditNote,
  MdArrowUpward,
  MdArrowDownward,
} from "react-icons/md";

Amplify.configure(awsExport);

const client = generateClient();

const HomePage = () => {
  const [showcasedEvents, setShowcasedEvents] = useState([]);
  const [editableShowcasedEvents, setEditableShowcasedEvents] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const checkUserGroup = async () => {
    try {
      const { accessToken, idToken } = (await fetchAuthSession()).tokens ?? {};
      const groups = accessToken.payload["cognito:groups"];
      setIsAdmin(groups && groups.includes("Admins"));
    } catch (error) {
      console.error("Error checking user group: ", error);
    }
  };

  useEffect(() => {
    checkUserGroup();
    fetchShowcasedEvents();
  }, []);

  const toggleOrderEdit = () => {
    setIsEditMode(!isEditMode);
  };

  const moveEvent = (index, direction) => {
    const newList = [...editableShowcasedEvents];
    const positionChange = direction === "up" ? -1 : 1;
    const element = newList.splice(index, 1)[0];
    newList.splice(index + positionChange, 0, element);
    setEditableShowcasedEvents(newList);
  };

  const saveOrder = async () => {
    try {
      for (let index = 0; index < editableShowcasedEvents.length; index++) {
        const event = editableShowcasedEvents[index];
        await client.graphql({
          query: mutations.updateShowcasedEvent,
          variables: {
            input: {
              id: event.id,
              displayOrder: index + 1,
            },
          },
          authMode: "userPool",
        });
      }
      console.log("All events updated successfully");
      setShowcasedEvents([...editableShowcasedEvents]);
      setIsEditMode(false);
    } catch (error) {
      console.error("Error updating showcased events: ", error);
    }
  };

  const cancelEdit = () => {
    setEditableShowcasedEvents([...showcasedEvents]);
    setIsEditMode(false);
  };

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
      setEditableShowcasedEvents(
        showcasedEventsResult.data.listShowcasedEvents.items
      );
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
          {isAdmin && (
            <div className="flex items-center justify-end text-xl">
              {isEditMode ? (
                <>
                  <button
                    onClick={saveOrder}
                    className="text-green-500 text-sm px-2"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="text-red-500 text-sm px-2"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={toggleOrderEdit}
                    className="flex items-center text-gray-400 focus:outline-none"
                  >
                    <p className="text-sm mr-0">Reorder Events</p>
                    <MdOutlineEditNote />
                  </button>
                </>
              )}
            </div>
          )}
          <div className="flex flex-col">
            {editableShowcasedEvents.map((showcasedEvent, index) => (
              <div key={index} className="mb-4">
                <div className="flex flex-row items-start break-words">
                  <div className="flex-grow min-w-0">
                    <p className="font-bold">
                      {showcasedEvent.event.type} - {showcasedEvent.event.title}
                    </p>
                    <p className="break-words">
                      <ContentFormatter
                        content={showcasedEvent.event.content}
                      />
                    </p>
                  </div>
                  {isEditMode && isAdmin && (
                    <div className="p-2">
                      <button
                        onClick={() => moveEvent(index, "up")}
                        className="text-lg"
                        disabled={index === 0}
                      >
                        <MdArrowUpward className="hover:text-gray-400" />
                      </button>
                      <button
                        onClick={() => moveEvent(index, "down")}
                        className="text-lg"
                        disabled={index === editableShowcasedEvents.length - 1}
                      >
                        <MdArrowDownward className="hover:text-gray-400" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
};
export default HomePage;
