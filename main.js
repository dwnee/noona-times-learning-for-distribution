const API_KEY = `b3890c85e6f94350bca0576090671f11`;
let keyword = '';
let news = [];
const getLatestNews = async ()=>{
  const url = new URL(`http://times-node-env.eba-appvq3ef.ap-northeast-2.elasticbeanstalk.com/top-headlines?q=${keyword}`);
  console.log(url);
  const response = await fetch(url);
  const data = await response.json();
  let news = data.articles;
  console.log("Rrrr", response);
  console.log("dddd", data);
  console.log("news", news);
}
getLatestNews();