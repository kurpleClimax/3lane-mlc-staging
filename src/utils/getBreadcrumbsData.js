export async function getBreadcrumbsData(uri) {
  const params = {
    query: `query PageQuery($uri: String!) {
      nodeByUri(uri: $uri) {
        ... on Page {
          id
          title
          slug
          uri
          blocks
          parent {
            node {
              id
              slug
              uri
              ... on Page {
                id
                title
                parent {
                  node {
                    slug
                    ... on Page {
                      id
                      title
                      uri
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `,
    variables: {
      uri,
    },
  };

  if (uri === "/") {
    return null;
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_WP_GRAPHQL_URL}`, {
    method: "POST",
    body: JSON.stringify(params),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const { data } = await response.json();
  return data?.nodeByUri;
}
