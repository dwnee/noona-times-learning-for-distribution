// const API_KEY = `b3890c85e6f94350bca0576090671f11`;
let keyword = '';
let news = [];
const getLatestNews = async ()=>{
  const url = new URL(`https://noona-times-2024july.netlify.app/top-headlines?page=1&pageSize=20`);
  console.log(url);
  const response = await fetch(url);
  const data = await response.json();
  let news = data.articles;
  console.log("Rrrr", response);
  console.log("dddd", data);
  console.log("news", news);
}
getLatestNews();