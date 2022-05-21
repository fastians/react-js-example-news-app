import React from "react";
import bookmarkSaveImg from "../../public/bookmarkon-icon@2x.svg";

function ButtonBookmark({ message }) {
  return (
    <div className="bookmark-btn">
      <div className="position-center">
        <img className="bookmark--img" src={bookmarkSaveImg} alt="" />
        <div className="bookmark-txt">{message}</div>
      </div>
    </div>
  );
}
export default ButtonBookmark;
