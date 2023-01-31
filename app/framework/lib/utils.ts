interface Connection<T = {}> {
  edges: {
    node: T;
  }[];
}
export function flattenConnection<T>(connection: Connection<T>): T[] {
  return connection.edges.map(({ node }) => ({ ...node }));
}
