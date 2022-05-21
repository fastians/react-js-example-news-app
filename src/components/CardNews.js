import { Link } from "react-router-dom";
import styles from "./CardNews.module.css";
import PropTypes from "prop-types";
function CardNews(props) {
  let details = "";
  if (props.details) {
    details += props.details;
    details = details.substring(0, 100); //details.indexOf("."));
  }
  let content;
  if (props.styleClass === "large_card") {
    content = (
      <div className={styles[props.styleClass]}>
        <Link to={`/article/${props.id}`}>
          {/* {props.image ? ( */}
          <img className={styles.card__img_large} src={props.image} alt="" />
          {/* ) : null} */}
          <div className={styles.card__rectangle_large}>
            <div className={styles.card__title__large}>{props.title} </div>
            {props.details ? (
              <div className={styles.card__details}>{details}</div>
            ) : null}
          </div>
          <div
            className={`${styles.card__bottom} ${styles[props.color]}`}
          ></div>
        </Link>
      </div>
    );
  } else if (props.styleClass === "no_img_card") {
    content = (
      <div className={styles[props.styleClass]}>
        <Link to={`/article/${props.id}`}>
          {props.image ? (
            <img className={styles.card__img_large} src={props.image} alt="" />
          ) : null}
          {/* <div className={styles.card__rectangle_small}> */}
          <div className={styles.card__title__no_img}>{props.title} </div>
          {props.details ? (
            <div className={styles.card__details}>{details}</div>
          ) : null}
          {/* </div> */}
          <div
            className={`${styles.card__bottom__no_img} ${styles[props.color]}`}
          ></div>
        </Link>
      </div>
    );
  } else if (props.styleClass === "Small_card") {
    content = (
      <div className={styles[props.styleClass]}>
        <Link to={`/article/${props.id}`}>
          {props.image ? (
            <img className={styles.card__img_Small} src={props.image} alt="" />
          ) : null}
          <div className={styles.card__rectangle_Small}>
            <div className={styles.card__title__small}>{props.title} </div>
            {props.details ? (
              <div className={styles.card__details}>{details}</div>
            ) : null}
          </div>
          <div
            className={`${styles.card__bottom__Small} ${styles[props.color]}`}
          ></div>
        </Link>
      </div>
    );
  } else {
    content = (
      <div className={styles[props.styleClass]}>
        <Link to={`/article/${props.id}`}>
          {props.image ? (
            <img className={styles.card__img} src={props.image} alt="" />
          ) : null}
          <div className={styles.card__rectangle}>
            <div className={styles.card__title}>{props.title} </div>
            {props.details ? (
              <div className={styles.card__details}>{details}</div>
            ) : null}
          </div>
          <div
            className={`${styles.card__bottom} ${styles[props.color]}`}
          ></div>
        </Link>
      </div>
    );
  }
  return content;
}

CardNews.defaultProps = {
  title: "Title",
  color: "red",
  styleClass: "card"
};
CardNews.propTypes = {
  id: PropTypes.string.isRequired
};
export default CardNews;
