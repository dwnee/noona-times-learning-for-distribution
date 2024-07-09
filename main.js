// const API_KEY = `b3890c85e6f94350bca0576090671f11`;
// let keyword = '';
// let news = [];
// const getLatestNews = async ()=>{
//   const url = new URL(`https://noona-times-2024july.netlify.app/top-headlines?page=1&pageSize=20`);
//   console.log(url);
//   const response = await fetch(url);
//   const data = await response.json();
//   let news = data.articles;
//   console.log("Rrrr", response);
//   console.log("dddd", data);
//   console.log("news", news);
// }
// getLatestNews();


// const API_KEY = `b3890c85e6f94350bca0576090671f11`;
// let news = [];
let mode = "tab-all"
let newsList = [];
let filterList = [];
const menus = document.querySelectorAll(".menus button");
menus.forEach(menu=>menu.addEventListener("click",(event)=>getNewsByCategory(event)));

const getLatestNews = async ()=>{
  const url = new URL(`https://noona-times-2024july.netlify.app/top-headlines?page=1&pageSize=20`);
  console.log(url);
  const response = await fetch(url);
  const data = await response.json();
  newsList = data.articles;
  console.log("Rrrr", response);
  console.log("dddd", data);
  console.log("news", newsList);
  render();
}
const getNewsByCategory= async (event)=>{
  const category = event.target.textContent.toLowerCase();
  console.log("click category button", category)
  const url = new URL(`https://noona-times-2024july.netlify.app/top-headlines?category=${category}`);
  const response = await fetch(url);
  const data = await response.json();
  console.log("Dddd", data);
  newsList = data.articles;
  render();
}
const render=()=>{
  const newsHTML = newsList.map(news=>`
      <div class="row news">
          <div class="col-lg-4 img-wrap">
            <img
              class="news-img-size"
              src="${news.urlToImage || "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg"}"
              alt="News Image"
            />
          </div>
          <div class="col-lg-8">
            <h2>${news.title}</h2>
            <p>
              ${
                news.description == null || news.description =="" ? "내용없음" : news.description.length > 200? news.description.substring(0, 200) + "..." : news.description
              }
            </p>
           
            <div>${news.source.name || "no source"} * ${news.content=="[Removed]"?"no valid date":moment(news.publishedAt).startOf('hour').fromNow()}</div>
          </div>
        </div>
    `).join(' ');
  document.getElementById("news-section").innerHTML=newsHTML;
}


getLatestNews();

const openSearchBox = () => {
  let inputArea = document.getElementById("input-area");
  if(inputArea.style.display === "inline"){
    inputArea.style.display = "none"
    console.log("inputarea")
  } else {
    inputArea.style.display = "inline"
    console.log("else inputarea")
  }
}


const openNav = () => {
  document.getElementById("mySidenav").style.width = "250px";
};
const closeNav = () => {
  document.getElementById("mySidenav").style.width = "0"
}

// function render(){
//   // let list=[];
//   let list=news;
//   let resultHTML = '';
//   if (mode === "tab-all"){
//     // list = newsList;
//   } else {
//     // list = filterList;
//   }
//   console.log("list" , list)
//   for(let i=0; i<list.length; i++){
//     console.log("for in")
//     resultHTML += 
//     `<div class="row news">
//     <div class="col-lg-4 img-wrap">
//       <img
//         class="news-img-size"
//         src="${list[i].urlToImage}"
//         alt=""
//       />
//     </div>
//     <div class="col-lg-8">
//       <h2>${list[i].title}</h2>
//       <p>
//         ${list[i].description}
//       </p>
//       <div>${list[i].source.name} ${list[i].publishedAt}</div>
//     </div>
//   </div>;`
//   }
//   document.getElementById("news-section").innerHTML = resultHTML;
// }
// render();


