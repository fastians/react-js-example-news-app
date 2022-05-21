import { useContext, useState } from "react";
import FavoritesContext from "../store/favorites-context";
import NewsList from "../components/NewsList";

function BookmarksPage() {
  const favoritesCtx = useContext(FavoritesContext);
  const [sortOrder, setSortOrder] = useState("newest");
  let content;

  function loadContent() {
    let newlist;
    if (sortOrder === "newest") {
      newlist = favoritesCtx.favorites.sort((a, b) =>
        a.webPublicationDate < b.webPublicationDate ? 1 : -1
      );
    } else {
      newlist = favoritesCtx.favorites.sort((a, b) =>
        b.webPublicationDate < a.webPublicationDate ? 1 : -1
      );
    }

    content = <NewsList news={newlist} />;
  }
  if (favoritesCtx.totalFavorites === 0) {
    content = <p>You got no Bookmarks yet. Start adding some?</p>;
  } else {
    loadContent();
  }

  return (
    <section>
      <div className="wrapper">
        {/* <div className="headerGrid"> */}
        <div className="top--row">
          <div className="section--title">All bookmark</div>
          <div className="top--row-last">
            <select
              className="dropdown-btn"
              defaultValue={sortOrder}
              onChange={(e) => {
                setSortOrder(e.target.value);
                loadContent();
              }}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>
        {/* </div> */}
        <div className="bodyGrid">
          <div className="topStoriesGrid-row2">{content}</div>
        </div>
      </div>
    </section>
  );
}

export default BookmarksPage;
