interface unAuthFetchProps {
  other: {
    body: string;
    method: string;
    headers: object;
  };
  url: string;
}
async function unAuthFetchJson({ other, url }: unAuthFetchProps) {
  let errors = false;
  const response = await fetch(url, other);
    const data = await response.json();
    if (response.status >= 400) {
        console.error("Error!", data);
        errors = true;
    }
    return {response, data, errors}
}

export default unAuthFetchJson