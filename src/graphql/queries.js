/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      username
      events {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        username
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getEvent = /* GraphQL */ `
  query GetEvent($id: ID!) {
    getEvent(id: $id) {
      id
      title
      content
      status
      type
      creator {
        id
        username
        createdAt
        updatedAt
        owner
        __typename
      }
      createdAt
      updatedAt
      userEventsId
      creatorId
      __typename
    }
  }
`;
export const listEvents = /* GraphQL */ `
  query ListEvents(
    $filter: ModelEventFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEvents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        content
        status
        type
        createdAt
        updatedAt
        userEventsId
        creatorId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getShowcasedEvent = /* GraphQL */ `
  query GetShowcasedEvent($id: ID!) {
    getShowcasedEvent(id: $id) {
      id
      event {
        id
        title
        content
        status
        type
        createdAt
        updatedAt
        userEventsId
        creatorId
        __typename
      }
      displayOrder
      createdAt
      updatedAt
      showcasedEventEventId
      __typename
    }
  }
`;
export const listShowcasedEvents = /* GraphQL */ `
  query ListShowcasedEvents(
    $filter: ModelShowcasedEventFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listShowcasedEvents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        displayOrder
        createdAt
        updatedAt
        showcasedEventEventId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
