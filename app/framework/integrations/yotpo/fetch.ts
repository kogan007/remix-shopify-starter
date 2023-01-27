const API_TOKEN = process.env.YOTPO_TOKEN;

if (!API_TOKEN) {
  throw new Error("Yotpo token not provided");
}

export default async function fetchYotpo<T = {}>(
  endpoint: string,
  options: {
    body?: Record<string, any>;
    headers?: Record<string, any>;
    method?: Request["method"];
  } = {}
): Promise<T> {
  const url = new URL(
    `https://api-cdn.yotpo.com/v1/widget/${API_TOKEN}` + endpoint
  );

  const request = new Request(url.toString(), {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...(options?.body && {
      body: JSON.stringify(options.body),
    }),
    method: options.method ?? "get",
  });
  return await fetch(request).then((res) => res.json());
}
