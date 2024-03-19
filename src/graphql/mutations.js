/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createEvent = /* GraphQL */ `
  mutation CreateEvent(
    $input: CreateEventInput!
    $condition: ModelEventConditionInput
  ) {
    createEvent(input: $input, condition: $condition) {
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
export const updateEvent = /* GraphQL */ `
  mutation UpdateEvent(
    $input: UpdateEventInput!
    $condition: ModelEventConditionInput
  ) {
    updateEvent(input: $input, condition: $condition) {
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
export const deleteEvent = /* GraphQL */ `
  mutation DeleteEvent(
    $input: DeleteEventInput!
    $condition: ModelEventConditionInput
  ) {
    deleteEvent(input: $input, condition: $condition) {
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
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createShowcasedEvent = /* GraphQL */ `
  mutation CreateShowcasedEvent(
    $input: CreateShowcasedEventInput!
    $condition: ModelShowcasedEventConditionInput
  ) {
    createShowcasedEvent(input: $input, condition: $condition) {
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
export const updateShowcasedEvent = /* GraphQL */ `
  mutation UpdateShowcasedEvent(
    $input: UpdateShowcasedEventInput!
    $condition: ModelShowcasedEventConditionInput
  ) {
    updateShowcasedEvent(input: $input, condition: $condition) {
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
export const deleteShowcasedEvent = /* GraphQL */ `
  mutation DeleteShowcasedEvent(
    $input: DeleteShowcasedEventInput!
    $condition: ModelShowcasedEventConditionInput
  ) {
    deleteShowcasedEvent(input: $input, condition: $condition) {
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
