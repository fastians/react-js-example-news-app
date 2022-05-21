import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import NewsList from "../components/NewsList";
import InfiniteScroll from "react-infinite-scroller";
import defaultImg from "../../public/default.png";
import { Link } from "react-router-dom";
import ButtonBookmark from "../components/ButtonBookmark";
function SearchPage(props) {
  const params = useParams();
  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [loadedNews, setLoadedNews] = useState([]);
  const [searchParams, setSearchParams] = useState(params["*"]);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [sortOrder, setSortOrder] = useState("newest");
  const baseURL = "https://content.guardianapis.com/search?q=";
  const parameter =
    "&show-elements=image&show-blocks=body&show-fields=thumbnail";
  const apiKey = "&api-key=b8af56fc-5821-4d8b-a4e7-e3bf1f379657";
  //console.log(params["*"]);

  if (params["*"] === "") {
    navigate("/");
  } else if (searchParams !== params["*"]) {
    setSearchParams(params["*"]);
  }

  const newslist = [];

  async function fetchData() {
    setIsLoading(true);
    axios
      .get(baseURL + params["*"] + "&page=" + pageNumber + apiKey + parameter)
      .then((response) => {
        //console.log(response.data.response.results);

        const data = response.data.response.results;

        for (const key in data) {
          let image;

          if (data[key].fields) {
            if (data[key].fields.thumbnail) {
              image = data[key].fields.thumbnail;
            } else {
              image = defaultImg;
            }
          } else {
            image = defaultImg;
          }
          const news = {
            key: data[key].id,
            id: data[key].id,
            title: data[key].webTitle,
            image: image,
            details: data[key].blocks.body[0].bodyTextSummary
          };
          newslist.push(news);
          //console.log(news);
        }

        setIsLoading(false);
        setLoadedNews(newslist);
      })
      .catch(function (error) {
        if (error.response) {
          // console.log(error.response.data);
          // console.log(error.response.status);
          // console.log(error.response.headers);
          setHasMore(false);
        }
      });
  }

  useEffect(() => {
    fetchData();
  }, [searchParams]);

  function handleLoadMore() {
    if (!isLoading) {
      setPageNumber(pageNumber + 1);
      fetchData();
    }
  }

  return (
    <section>
      <div className="wrapper">
        <div className="headerGrid">
          <div className="top--row">
            <div className="section--title">Search Result</div>
            <div className="top--row-last">
              <Link to="/bookmarks">
                <ButtonBookmark message="View Bookmark" />
              </Link>

              <div>
                <select
                  className="dropdown-btn"
                  defaultValue={sortOrder}
                  onChange={(e) => {
                    setSortOrder(e.target.value);
                  }}
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bodyGrid">
        <InfiniteScroll
          pageStart={0}
          loadMore={handleLoadMore}
          hasMore={hasMore}
          loader={
            <div className="loader" key={0}>
              Loading ...
            </div>
          }
        >
          <div className="topStoriesGrid-row2">
            <NewsList news={loadedNews} />
          </div>
        </InfiniteScroll>
      </div>
    </section>
  );
}

export default SearchPage;
