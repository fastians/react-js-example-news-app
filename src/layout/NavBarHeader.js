import { Link, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import logoImg from "../../public/Logo_White.png";
import searchImg from "../../public/search-icon@2x.svg";

function NavBarHeader(props) {
  const [searchText, setSearchText] = useState("");
  const [searchFocus, setSearchFocus] = useState(false);
  const [justFocusOut, setJustFocusOut] = useState(false);
  let navigate = useNavigate();
  const textInput = useRef(null);

  return (
    <header>
      <nav className="wrapper">
        <div className="header">
          <Link to="/">
            <img className="nav--img" src={logoImg} alt="" />
          </Link>
          {/* <Link to="/news"> All News </Link> ||
        <Link to="/bookmarks"> Bookmark </Link> ||
        <Link to="/search"> Search </Link> */}
          <div className="search--box">
            <input
              className={searchFocus ? "search--focus-in" : "search--focus-out"}
              placeholder="Search the news"
              type="text"
              onChange={(e) => {
                e.preventDefault();
                setSearchText(e.target.value);
                navigate("/search/" + e.target.value);
              }}
              onBlur={(e) => {
                setSearchFocus(false);
                setJustFocusOut(true);
                setTimeout(function () {
                  setJustFocusOut(false);
                }, 300);
              }}
              onFocus={(e) => {
                setSearchFocus(true);
              }}
              ref={textInput}
            />
            <div
              className={
                searchFocus ? "search--button" : "search--button-active"
              }
              onClick={(e) => {
                if (justFocusOut) return;
                if (searchFocus) {
                  setSearchFocus(false);
                } else {
                  setSearchFocus(true);
                  textInput.current.focus();
                }
              }}
            >
              <img src={searchImg} alt="" />
            </div>
            {/* {searchText} */}
          </div>
        </div>
      </nav>
    </header>
  );
}
export default NavBarHeader;
