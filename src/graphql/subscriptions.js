/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onCreateUser(filter: $filter, owner: $owner) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onUpdateUser(filter: $filter, owner: $owner) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onDeleteUser(filter: $filter, owner: $owner) {
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
export const onCreateEvent = /* GraphQL */ `
  subscription OnCreateEvent(
    $filter: ModelSubscriptionEventFilterInput
    $creatorId: String
  ) {
    onCreateEvent(filter: $filter, creatorId: $creatorId) {
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
export const onUpdateEvent = /* GraphQL */ `
  subscription OnUpdateEvent(
    $filter: ModelSubscriptionEventFilterInput
    $creatorId: String
  ) {
    onUpdateEvent(filter: $filter, creatorId: $creatorId) {
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
export const onDeleteEvent = /* GraphQL */ `
  subscription OnDeleteEvent(
    $filter: ModelSubscriptionEventFilterInput
    $creatorId: String
  ) {
    onDeleteEvent(filter: $filter, creatorId: $creatorId) {
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
export const onCreateShowcasedEvent = /* GraphQL */ `
  subscription OnCreateShowcasedEvent(
    $filter: ModelSubscriptionShowcasedEventFilterInput
  ) {
    onCreateShowcasedEvent(filter: $filter) {
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
export const onUpdateShowcasedEvent = /* GraphQL */ `
  subscription OnUpdateShowcasedEvent(
    $filter: ModelSubscriptionShowcasedEventFilterInput
  ) {
    onUpdateShowcasedEvent(filter: $filter) {
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
export const onDeleteShowcasedEvent = /* GraphQL */ `
  subscription OnDeleteShowcasedEvent(
    $filter: ModelSubscriptionShowcasedEventFilterInput
  ) {
    onDeleteShowcasedEvent(filter: $filter) {
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
