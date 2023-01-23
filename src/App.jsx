import { useEffect, useState } from "react";
import "./index.css";
import axios from "axios";
import Login from "./components/Login";
import Home from "./components/Home";

function App() {
  const AUTH_URL = `${import.meta.env.VITE_AUTH_ENDPOINT}?client_id=${
    import.meta.env.VITE_CLIENT_ID
  }&scope=${import.meta.env.VITE_SCOPES}&redirect_uri=${
    import.meta.env.VITE_REDIRECT_URI
  }&response_type=token`;

  const [token, setToken] = useState("");
  const [user, setUser] = useState("");

  async function getActiveUser(token) {
    const { data } = await axios.get("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setUser({
      name: data.display_name,
      image: data.images[0].url,
      followers: data.followers.total,
      href: data.href,
      uri: data.uri,
    });
  }

  useEffect(() => {
    let hash = window.location.hash;

    if (!token && hash) {
      const token = window.location.hash
        .substring(1)
        .split("&")[0]
        .split("=")[1];

      setToken(token);
      getActiveUser(token);

      window.location.hash = "";
    }
  }, []);

  return (
    <div>
      {user ? (
        <Home user={user} setUser={setUser} token={token} />
      ) : (
        <Login AUTH_URL={AUTH_URL} />
      )}
    </div>
  );
}

export default App;
