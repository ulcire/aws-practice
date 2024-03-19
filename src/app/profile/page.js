"use client";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { generateClient } from "aws-amplify/api";
import { createEvent, updateEvent, deleteEvent } from "../../graphql/mutations";
import * as queries from "../../graphql/queries";
import CreateEventForm from "../../components/CreateEventForm";
import { getCurrentUser } from "aws-amplify/auth";
import EventSquare from "../../components/EventSquare";
import { fetchAuthSession } from "aws-amplify/auth";
const client = generateClient();

const Profile = () => {
  const [username, setUsername] = useState(null);
  const [userId, setUserId] = useState(null);
  const [events, setEvents] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showcasedEventIds, setShowcasedEventIds] = useState(new Set());

  const fetchEvents = useCallback(async () => {
    try {
      const allEvents = await client.graphql({ query: queries.listEvents });
      setEvents(allEvents.data.listEvents.items);

      if (isAdmin) {
        console.log("starting showcase search");
        const showcasedEventsResult = await client.graphql({
          query: queries.listShowcasedEvents,
        });
        console.log("showcasedEventsResult: ", showcasedEventsResult);
        const showcasedIds = new Set(
          showcasedEventsResult.data.listShowcasedEvents.items.map(
            (e) => e.showcasedEventEventId
          )
        );
        setShowcasedEventIds(showcasedIds);
        console.log("showcasedIds: ", showcasedIds);
      }
      console.log("events: ", allEvents);
    } catch (err) {
      console.error("Error fetching events:", err);
    }
  }, [isAdmin]);

  const checkUserGroup = async () => {
    try {
      const { accessToken, idToken } = (await fetchAuthSession()).tokens ?? {};
      const groups = accessToken.payload["cognito:groups"];
      setIsAdmin(groups && groups.includes("Admins"));
      //   console.log("accessToken: ", accessToken);
      //   console.log("Groups: ", groups);
      //   console.log("isAdmin: ", isAdmin);
    } catch (error) {
      console.error("Error checking user group: ", error);
    }
  };

  useEffect(() => {
    currentAuthenticatedUser();
    checkUserGroup();
    fetchEvents();
  }, [fetchEvents]);

  async function currentAuthenticatedUser() {
    try {
      const { username, userId, signInDetails } = await getCurrentUser();
      setUsername(username);
      setUserId(userId);
      console.log("userId: ", userId);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <div className="flex flex-col min-h-screen p-4">
        <div className="flex flex-wrap -mx-2 mt-4">
          {events.map((event) => (
            <div
              key={event.id}
              className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
            >
              <EventSquare
                event={event}
                onEventUpdate={fetchEvents}
                showcasedEventIds={showcasedEventIds}
              />
            </div>
          ))}
          <CreateEventForm onEventCreated={fetchEvents} />
        </div>
      </div>
    </>
  );
};
export default Profile;
