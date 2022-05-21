// import { useState, useEffect } from "react";
// import axios from "axios";
// import NewsList from "../components/NewsList";
// import { Link } from "react-router-dom";
// function AllNewsPage() {
//   const [isLoading, setIsLoading] = useState(true);
//   const [loadedNews, setLoadedNews] = useState([]);

//   const baseURL = "https://content.guardianapis.com/search?news&section=news";
//   const parameter = "&show-elements=image&show-blocks=body";
//   const apiKey = "&api-key=b8af56fc-5821-4d8b-a4e7-e3bf1f379657";

//   useEffect(() => {
//     setIsLoading(true);

//     axios.get(baseURL + parameter + apiKey).then((response) => {
//       //console.log(response.data.response.results);

//       const data = response.data.response.results;
//       const newsList = [];
//       for (const key in data) {
//         const news = {
//           id: data[key].id,
//           title: data[key].webTitle,
//           description: data[key].webTitle,
//           image: "https://via.placeholder.com/50",
//           address: data[key].blocks.body[0].id
//         };
//         newsList.push(news);
//         // console.log(news);
//       }

//       setIsLoading(false);
//       setLoadedNews(newsList);
//     });
//   }, []);

//   if (isLoading) {
//     return (
//       <section>
//         <p>Loading...</p>
//       </section>
//     );
//   }

//   return (
//     <section>
//       <Link to="/favorite">
//         <button>View Bookmark</button>
//       </Link>
//       <h1>All Meetups</h1>
//       <NewsList news={loadedNews} />
//     </section>
//   );
// }

// export default AllNewsPage;
