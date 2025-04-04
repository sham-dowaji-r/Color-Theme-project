export async function postFetch(hex, contrastText) {
  const response = await fetch(
    "https://www.aremycolorsaccessible.com/api/are-they",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        colors: [hex, contrastText],
      }),
    }
  );
  const data = await response.json();
  return data.overall; // تخزين النتيجة من API
}
