import CardNews from "./CardNews";

function NewsList(props) {
  return (
    <div className="cards">
      {props.news.map((news) => (
        <CardNews
          key={news.id}
          id={news.id}
          title={news.title}
          image={news.image}
        />
      ))}
    </div>
  );
}

export default NewsList;
