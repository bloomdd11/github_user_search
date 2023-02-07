import React, { useState } from "react";

import Display from "./component/display";

const NoUserFound = () => {
  return <div className="text-style1">no user found</div>;
};

const Loading = () => {
  return <div className="text-style1">Loading...</div>;
};

function App() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({ name: "github username", html_url: "#" });
  const [searchValue, setSearchValue] = useState("");

  const url = "https://api.github.com/users";

  const handleSearch = async (e) => {
    e.preventDefault();
    let searchURL = `${url}/${searchValue}`;

    setLoading(true);
    const data = await (await fetch(searchURL)).json();
    if (data.message === "Not Found") {
      console.log("Not found");
      setUser(false);
      setLoading(false);
    } else {
      console.log(data);
      const { avatar_url, html_url, name } = data;
      setUser({ avatar_url, html_url, name });
      setLoading(false);
    }
  };

  return (
    <>
      <div className="main-wrapper">
        <header>
          <h1 className="header">Github User Search</h1>
        </header>
        <main className="container">
          <form className="form">
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <button type="submit" onClick={(e) => handleSearch(e)}>
              Search
            </button>
          </form>
          <section className="display">
            {loading ? (
              <Loading></Loading>
            ) : !user ? (
              <NoUserFound></NoUserFound>
            ) : (
              <Display
                imgSrc={user.avatar_url}
                html_url={user.html_url}
                username={user.name !== null ? user.name : searchValue}
              ></Display>
            )}
          </section>
        </main>
      </div>
    </>
  );
}

export default App;
