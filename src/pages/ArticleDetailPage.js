import { useState, useEffect } from "react";
import { useContext } from "react";
import FavoritesContext from "../store/favorites-context";
import axios from "axios";
import ToastMessage from "../components/ToastMessage";
import defaultImg from "../../public/default.png";
import ButtonBookmark from "../components/ButtonBookmark";
import { useParams } from "react-router-dom";
const HtmlToReactParser = require("html-to-react").Parser;

function ArticleDetailPage(props) {
  const favoritesCtx = useContext(FavoritesContext);
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [loadedArticle, setLoadedArticle] = useState([]);
  const [showToast, setShowToast] = useState("");
  const baseURL = "https://content.guardianapis.com/";
  const parameter =
    "&show-elements=image&show-blocks=body&show-fields=thumbnail,headline,trailText";
  const apiKey = "?api-key=b8af56fc-5821-4d8b-a4e7-e3bf1f379657";
  // console.log(params["*"]);
  function toggleFavoriteStatusHandler() {
    if (favoritesCtx.itemIsFavorite(loadedArticle.id)) {
      favoritesCtx.removeFavorite(loadedArticle.id);
      setShowToast(<ToastMessage message="removed" />);
    } else {
      favoritesCtx.addFavorite({
        id: loadedArticle.id,
        title: loadedArticle.title,
        description: loadedArticle.description,
        image: loadedArticle.image,
        webPublicationDate: loadedArticle.webPublicationDate
      });
      setShowToast(<ToastMessage message="saved" />);
    }
  }

  useEffect(() => {
    setIsLoading(true);

    axios.get(baseURL + params["*"] + apiKey + parameter).then((response) => {
      //console.log(response.data.response.content);

      const data = response.data.response.content;

      const htmlToReactParser = new HtmlToReactParser();
      let image;

      if (data.fields) {
        if (data.fields.thumbnail) {
          image = data.fields.thumbnail;
        } else {
          image = defaultImg;
        }
      } else {
        image = defaultImg;
      }
      // console.log("s " + image);
      const article = {
        id: data.id,
        title: data.webTitle,
        detail: data.blocks.body[0].bodyTextSummary,
        image: image,
        bodyHtml: htmlToReactParser.parse(data.blocks.body[0].bodyHtml),
        webPublicationDate: data.webPublicationDate,
        headline: data.fields.headline,
        trailText: data.fields.trailText
      };

      setIsLoading(false);
      setLoadedArticle(article);
    });
  }, []);

  if (isLoading) {
    return (
      <section>
        <div className="load"></div>;
      </section>
    );
  }
  var articleDate = new Date(loadedArticle.webPublicationDate);
  articleDate = articleDate.toUTCString();
  articleDate =
    articleDate.substring(0, articleDate.indexOf(",")) +
    articleDate.substring(
      articleDate.indexOf(",") + 1,
      articleDate.indexOf(":")
    ) +
    "." +
    articleDate.substring(articleDate.indexOf(":") + 1);
  articleDate =
    articleDate.substring(0, articleDate.indexOf(":")) +
    articleDate.substring(articleDate.indexOf(":") + 3);

  return (
    <section>
      <div className="wrapper">
        <div className="headerGrid">
          <div className="article-top--row">
            <div className="section--title">
              <div onClick={toggleFavoriteStatusHandler}>
                {favoritesCtx.itemIsFavorite(loadedArticle.id) ? (
                  <ButtonBookmark message="REMOVE BOOKMARK" />
                ) : (
                  <ButtonBookmark message="ADD BOOKMARK" />
                )}
              </div>
            </div>
            <div>{articleDate}</div>
          </div>
        </div>
        <div className="wrapper-grid">
          {/* <div className="section--layout">
            <div className=""> */}
          <div className="article--leftside">
            <div className="article--title">{loadedArticle.title}</div>
            <div className="article--headline">{loadedArticle.headline}</div>
            <hr />
            <div className="article--body">{loadedArticle.bodyHtml}</div>
          </div>
          <div className="article--rightside">
            <div className="article--img">
              <img className="article--img" src={loadedArticle.image} alt="" />
              <div className="article--img-caption">
                {loadedArticle.trailText}
              </div>
            </div>
            {/* </div>
            </div> */}
          </div>
        </div>
      </div>
      {showToast}
    </section>
  );
}

export default ArticleDetailPage;
