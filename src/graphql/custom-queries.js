export const listShowcasedEvents = /* GraphQL */ `
  query ListShowcasedEvents {
    listShowcasedEvents {
      items {
        id
        displayOrder
        event {
          id
          title
          content
          status
          type
        }
      }
    }
  }
`;
