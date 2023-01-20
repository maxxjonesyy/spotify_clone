import { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";
import Login from "./components/Login";
import Home from "./components/Home";

function App() {
  const CLIENT_ID = "dd12b92a35b24500b82ba2bcf25b7774";
  const REDIRECT_URI = "http://127.0.0.1:5173/";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const SCOPES = `user-read-recently-played user-library-read user-read-email user-read-private user-read-playback-position user-top-read user-follow-read playlist-read-private playlist-read-collaborative app-remote-control streaming user-read-playback-state user-modify-playback-state user-read-currently-playing`;
  const RESPONSE_TYPE = "token";
  const AUTH_URL = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&scope=${SCOPES}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`;

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
