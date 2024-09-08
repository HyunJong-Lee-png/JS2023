import React, { useEffect, useState } from 'react';

function MyComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    console.log("useEffect is running...");
  }, []);

  // Simulate a slow render due to data fetching
  if (!data) {
    setTimeout(() => {
      setData({ message: "Data loaded" });
    }, 3000);
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{data.message}</h1>
    </div>
  );
}

export default MyComponent;