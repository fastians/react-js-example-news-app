import { useState, useEffect } from "react";
import axios from "axios";
import NewsList from "../components/NewsList";
import { Link } from "react-router-dom";
import CardNews from "../components/CardNews";
import defaultImg from "../../public/default.png";
import ButtonBookmark from "../components/ButtonBookmark";
function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedNews, setLoadedNews] = useState([]);
  const [loadedsportsNews, setLoadedsportsNews] = useState([]);
  const [sortOrder, setSortOrder] = useState("newest");

  const baseURL = "https://content.guardianapis.com/";
  const parameter =
    "&show-elements=image&show-blocks=body&show-fields=thumbnail";
  const apiKey = "&api-key=b8af56fc-5821-4d8b-a4e7-e3bf1f379657";

  useEffect(() => {
    setIsLoading(true);

    axios
      .get(
        baseURL +
          "search?&section=news" +
          parameter +
          "&order-by=" +
          sortOrder +
          apiKey
      )
      .then((response) => {
        const data = response.data.response.results;
        //console.log(response.data.response.results);
        const newsList = [];
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
          newsList.push(news);
          //console.log(key);
          if (key >= 7) break;
        }
        setIsLoading(false);
        setLoadedNews(newsList);
      });

    axios
      .get(
        baseURL +
          "search?&section=sport" +
          parameter +
          "&order-by=" +
          sortOrder +
          apiKey
      )
      .then((response) => {
        //console.log(response.data.response.results);
        const data = response.data.response.results;
        const newsList = [];
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
          newsList.push(news);
          //console.log(key);
          if (key >= 2) break;
        }

        setIsLoading(false);
        setLoadedsportsNews(newsList);
      });
  }, [sortOrder]);

  if (isLoading) {
    return (
      <section>
        <div className="load"></div>;
      </section>
    );
  }

  return (
    <section>
      <div className="wrapper">
        <div className="headerGrid">
          <div className="top--row">
            <div className="section--title">Top Stories</div>
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
        <div>
          <div className="topStoriesGrid-row-1">
            {/* <div className=""> */}
            <CardNews
              id={loadedNews[0].id}
              title={loadedNews[0].title}
              color="green"
              image={loadedNews[0].image}
              details={loadedNews[0].details}
              styleClass="large_card"
            />
            <div className="topStoriesGrid-row1-sub1">
              <CardNews
                id={loadedNews[1].id}
                title={loadedNews[1].title}
                color="red"
                image={loadedNews[1].image}
                styleClass="Small_card"
              />
              <CardNews
                id={loadedNews[2].id}
                title={loadedNews[2].title}
                color="blue"
                image={loadedNews[2].image}
                styleClass="Small_card"
              />
              <CardNews
                id={loadedNews[3].id}
                title={loadedNews[3].title}
                color="yellow"
                styleClass="no_img_card"
              />
              <CardNews
                id={loadedNews[4].id}
                title={loadedNews[4].title}
                color="green"
                styleClass="no_img_card"
              />
            </div>
          </div>

          <div className="topStoriesGrid-row2">
            <div className="cards">
              <CardNews
                id={loadedNews[5].id}
                title={loadedNews[5].title}
                color="red"
                image={loadedNews[5].image}
                details={loadedNews[5].details}
              />
              <CardNews
                id={loadedNews[6].id}
                title={loadedNews[6].title}
                color="red"
                image={loadedNews[6].image}
                details={loadedNews[6].details}
              />
              <CardNews
                id={loadedNews[7].id}
                title={loadedNews[7].title}
                color="red"
                image={loadedNews[7].image}
                details={loadedNews[7].details}
              />
            </div>
          </div>
        </div>
        <h1 className="sports">Sports</h1>
        <div className="topStoriesGrid-row2">
          <NewsList news={loadedsportsNews} />
        </div>
      </div>
    </section>
  );
}

export default HomePage;
