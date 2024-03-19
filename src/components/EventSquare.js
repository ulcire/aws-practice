import { useState, useRef, useEffect } from "react";
import { MdSettings, MdUndo } from "react-icons/md";
import { generateClient } from "aws-amplify/api";
import { fetchAuthSession } from "aws-amplify/auth";
import * as mutations from "../graphql/mutations";
import * as queries from "../graphql/queries";

const client = generateClient();

const EventSquare = ({ event, onEventUpdate, showcasedEventIds }) => {
  const dropdownRef = useRef(null);
  const [settingToggle, setSettingToggle] = useState(false);
  const [isShowcased, setIsShowcased] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setSettingToggle(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);

    checkUserGroup();

    if (isAdmin) {
      if (showcasedEventIds.has(event.id)) {
        setIsShowcased(true);
      } else {
        setIsShowcased(false);
        console.log("Event not showcased");
      }
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isAdmin, showcasedEventIds, event.id]);

  const toggleDropdown = () => {
    setSettingToggle(!settingToggle);
  };

  const handleShowcase = async () => {
    console.log("Showcase clicked");
    try {
      await client.graphql({
        query: mutations.createShowcasedEvent,
        variables: {
          input: {
            showcasedEventEventId: event.id,
            displayOrder: 0,
          },
        },
        authMode: "userPool",
      });
      alert("Event successfully showcased");
      onEventUpdate();
    } catch (error) {
      alert("Error showcasing event: ", error);
    }
  };

  const getShowcasedEventId = async (eventId) => {
    try {
      const showcasedEventsData = await client.graphql({
        query: queries.listShowcasedEvents,
      });

      const showcasedEvent =
        showcasedEventsData.data.listShowcasedEvents.items.find(
          (item) => item.showcasedEventEventId === eventId
        );

      return showcasedEvent ? showcasedEvent.id : null;
    } catch (error) {
      console.error("Error fetching showcased events: ", error);
      return null;
    }
  };

  const handleUnShowcase = async () => {
    console.log("Showcase clicked");
    try {
      const showcasedEventId = await getShowcasedEventId(event.id);
      await client.graphql({
        query: mutations.deleteShowcasedEvent,
        variables: {
          input: {
            id: showcasedEventId,
          },
        },
        authMode: "userPool",
      });
      alert("Event successfully un-showcased");
      onEventUpdate();
    } catch (error) {
      alert("Error un-showcasing event: ", error);
    }
  };

  //////////////////////////////////////////////////////// Edit Mode
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: event.title,
    content: event.content,
    type: event.type,
    status: event.status,
  });
  const [originalData] = useState({ ...editData });
  const [errorMessage, setErrorMessage] = useState("");

  const toggleEdit = () => {
    if (isEditing) {
      setSettingToggle(false);
      setEditData({ ...originalData });
      setErrorMessage("");
    }
    setIsEditing(!isEditing);
  };

  const handleUpdate = async () => {
    try {
      const updateDetails = {
        id: event.id,
        title: editData.title,
        content: editData.content,
        status: editData.status,
        type: editData.type,
      };

      await client.graphql({
        query: mutations.updateEvent,
        variables: { input: updateDetails },
        authMode: "userPool",
      });
      alert("Event updated successfully!");
      setSettingToggle(false);
      setIsEditing(false);
      onEventUpdate();
    } catch (err) {
      console.error("Error updating event:", err);
      setErrorMessage("Update not successful. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };
  //////////////////////////////////////////////////////// Auth Security Check
  const checkUserGroup = async () => {
    try {
      const { accessToken, idToken } = (await fetchAuthSession()).tokens ?? {};
      const groups = accessToken.payload["cognito:groups"];
      setIsAdmin(groups && groups.includes("Admins"));
    } catch (error) {
      console.error("Error checking user group: ", error);
    }
  };
  const borderStyle = isShowcased ? "border-4 border-green-500" : "border";

  return (
    <div className={`max-w-lg mx-auto p-4 shadow-sm relative ${borderStyle}`}>
      <div className="flex flex-row justify-between">
        {isEditing ? (
          <>
            <div className="flex flex-row justify-start">
              <p className="text-sm text-gray-600 mb-1">
                <strong>Type:</strong>
              </p>
              <select
                name="type"
                value={editData.type}
                onChange={handleChange}
                className="form-select text-sm"
              >
                <option value="NEWS">News</option>
                <option value="EVENT">Event</option>
                <option value="ANNOUNCEMENT">Announcement</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
            <div className="flex align-center">
              <button
                onClick={toggleEdit}
                className="text-gray-400 focus:outline-none"
              >
                <MdUndo />
              </button>
              <button
                onClick={toggleEdit}
                className="text-gray-400 text-xs focus:outline-none"
              >
                Exit Edit Mode
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Type:</strong> {event.type}
            </p>
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={toggleDropdown}
                className="text-gray-400 focus:outline-none"
              >
                <MdSettings />
              </button>
              {settingToggle && (
                <div className="absolute right-0 w-24 bg-gray-100 shadow-xl z-25 text-sm">
                  {isAdmin &&
                    (isShowcased ? (
                      <a
                        className="block px-2 py-1 text-gray-700 hover:bg-gray-200 cursor-pointer"
                        onClick={handleUnShowcase}
                      >
                        Remove Showcase
                      </a>
                    ) : (
                      <a
                        className="block px-2 py-1 text-gray-700 hover:bg-gray-200 cursor-pointer"
                        onClick={handleShowcase}
                      >
                        Showcase
                      </a>
                    ))}
                  <a
                    className="block px-2 py-1 text-gray-700 hover:bg-gray-200 cursor-pointer"
                    onClick={toggleEdit}
                  >
                    Edit Mode
                  </a>
                </div>
              )}
            </div>
          </>
        )}
      </div>
      {isEditing ? (
        <>
          <div className="flex flex-row justify-start">
            <p className="text-sm text-gray-600 mb-1">
              <strong>Title:</strong>
            </p>
            <input
              name="title"
              value={editData.title}
              onChange={handleChange}
              className="w-full p-1 border text-sm"
            />
          </div>
          <p className="text-sm text-gray-600 mb-0">
            <strong>Content:</strong>
          </p>
          <textarea
            name="content"
            value={editData.content}
            onChange={handleChange}
            className="w-full p-1 border text-sm"
          />
          <div className="flex flex-row justify-between">
            {isAdmin && (
              <div className="flex flex-row justify-start">
                <p className="text-xs text-gray-600 mb-1">
                  <strong>Status:</strong>
                </p>
                <select
                  name="status"
                  value={editData.status}
                  onChange={handleChange}
                  className="form-select text-xs"
                >
                  <option value="PENDING">Pending</option>
                  <option value="APPROVED">Approved</option>
                  <option value="REJECTED">Rejected</option>
                </select>
              </div>
            )}
            <button
              onClick={handleUpdate}
              className="py-1 px-2 bg-blue-500 text-white text-xs font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Update
            </button>
          </div>
          {errorMessage && (
            <p className="text-red-500 text-xs italic">{errorMessage}</p>
          )}
        </>
      ) : (
        <>
          <p className="text-sm text-gray-600 mb-1">
            <strong>Title:</strong> {event.title}
          </p>
          <p className="text-sm text-gray-600 mb-0">
            <strong>Content:</strong>
          </p>
          <p className="text-sm text-gray-600 mb-1 break-words">
            {event.content}
          </p>
          <div className="flex flex-row justify-between">
            <p className="text-xs text-gray-600 mb-1">
              <strong>Status:</strong> {event.status}
            </p>
            <p className="text-xs text-gray-600 mb-1">
              <strong>Creator:</strong> {event.creatorId}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default EventSquare;
