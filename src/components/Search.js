import React, { useState, useEffect } from "react";
import "./Search.css";
import SearchIcon from "@material-ui/icons/Search";
import MicIcon from "@material-ui/icons/Mic";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import { actionTypes } from "../reducer";

function Search({ hideButtons }) {
  const [{ term }, dispatch] = useStateValue();
  const [input, setInput] = useState("");
  const history = useHistory();

  //setting input here to term if exists
  useEffect(() => {
    if (term !== null) {
      setInput(term);
    }
  }, [term]);

  const search = (e) => {
    e.preventDefault();

    dispatch({
      type: actionTypes.SET_SEARCH_TERM,
      term: input,
    });

    history.push("/search");
  };
  return (
    <div className="search">
      <form>
        <div className="search__input">
          <SearchIcon className="search__inputIcon" />
          <input value={input} onChange={(e) => setInput(e.target.value)} />
          <MicIcon />
        </div>

        {!hideButtons ? (
          <div className="search__buttons">
            <Button onClick={search} type="submit" variant="outlined">
              Expendables Search
            </Button>
            <Button variant="outlined">I'm Feeling Lucky</Button>
          </div>
        ) : (
          <div className="search__buttons">
            <Button
              className="search__buttonsHidden"
              onClick={search}
              type="submit"
              variant="outlined"
            >
              Expendables Search
            </Button>
            <Button className="search__buttonsHidden" variant="outlined">
              I'm Feeling Lucky
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}

export default Search;
