"use client";
import React, { useState } from "react";
import * as mutations from "../graphql/mutations";

import { generateClient } from "aws-amplify/api";
const client = generateClient();

const CreateEventForm = ({ onEventCreated }) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    status: "PENDING", // default status of PENDING
    type: "NEWS", // default type of NEWS
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.content) {
      alert("Title and content are required!");
      return;
    }

    const eventDetails = {
      title: formData.title,
      content: formData.content,
      status: formData.status,
      type: formData.type,
    };

    try {
      const newEvent = await client.graphql({
        query: mutations.createEvent,
        variables: { input: eventDetails },
        authMode: "userPool",
      });
      onEventCreated();
      alert("Event created successfully!");
      setFormData({ title: "", content: "", status: "PENDING", type: "NEWS" }); // Reset form
    } catch (err) {
      console.error("Error creating event:", err);
      alert("Error creating event. Please try again.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
      <div className="max-w-lg mx-auto border p-4 shadow-sm overflow-y-auto">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-1">
          <div className="flex flex-row justify-between items-center">
            <label
              htmlFor="type"
              className="block mb-1 text-sm font-medium text-gray-900 mr-1"
            >
              Type:
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="form-select text-sm font-medium block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              required
            >
              <option value="NEWS">News</option>
              <option value="EVENT">Event</option>
              <option value="ANNOUNCEMENT">Announcement</option>
              <option value="OTHER">Other</option>
            </select>
          </div>

          <div className="flex flex-row justify-between items-center">
            <label
              htmlFor="title"
              className="block mb-1 text-sm font-medium text-gray-900 mr-1"
            >
              Title:
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              className="block text-sm font-medium w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              required
            />
          </div>

          <div>
            <label
              htmlFor="content"
              className="block mb-0 text-sm font-medium text-gray-900"
            >
              Content:
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              className="block text-sm font-medium  w-full p-2 border border-gray-300 h-24 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              required
            />
          </div>

          <button
            type="submit"
            className="py-1 px-4 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEventForm;
