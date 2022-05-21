import React, { useEffect, useState } from "react";
import bookmarkSaveImg from "../../public/bookmarkon-icon@2x.svg";
import bookmarkRemoveImg from "../../public/bookmarkoff-icon@2x.svg";

function ToastMessage({ message, duration = 2000 }) {
  const [showToast, setShowToast] = useState(false);

  // the empty array as the second argument
  // ensures it is fired only after component mount.
  let content;
  if (message === "saved") {
    content = (
      <div className="bookmark--tost-green">
        <img src={bookmarkSaveImg} alt="" />
        <div className="bookmark-txt">Saved To Bookmarks</div>
      </div>
    );
  } else if (message === "removed") {
    content = (
      <div className="bookmark--tost-red">
        <img src={bookmarkRemoveImg} alt="" />
        <div className="bookmark-txt">Removed From Bookmarks</div>
      </div>
    );
  } else {
    content = <div>something Wrong</div>;
  }
  useEffect(() => {
    setShowToast(true);

    // Hides the message after 2 default seconds (configurable)
    setTimeout(() => setShowToast(false), duration);
  }, [message]);

  return (showToast && <div>{content}</div>) || null;
}
export default ToastMessage;
