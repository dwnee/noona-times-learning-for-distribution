const API_KEY = `b3890c85e6f94350bca0576090671f11`;
let mode = "tab-all"
let newsList = [];
let filterList = [];
const menus = document.querySelectorAll(".menus button");
menus.forEach(menu=>menu.addEventListener("click",(event)=>getNewsByCategory(event)));
let url = new URL(`https://noona-times-2024july.netlify.app/top-headlines?page=1&pageSize=20`);


const getNews = async() =>{
  const response = await fetch(url);
  const data = await response.json();
  newsList = data.articles;
  render();
}

const getLatestNews = async() => {
  url = new URL(
    `https://noona-times-2024july.netlify.app/top-headlines?page=1&pageSize=20`
  );
  getNews();
}

const getNewsByCategory= async (event)=>{
  const category = event.target.textContent.toLowerCase();
  console.log("click category button", category)
  url = new URL(`https://noona-times-2024july.netlify.app/top-headlines?category=${category}`);
  getNews();
}

const searchNews = async() => {
  const inputValue = document.getElementById('search-input').value;
  url = new URL(`https://noona-times-2024july.netlify.app/top-headlines?q=${inputValue}`);
  getNews();
}

const render=()=>{
  const newsHTML = newsList.map(news=>`
      <div class="row news">
          <div class="col-lg-4 img-wrap">
            <img
              class="news-img-size"
              src="${news.urlToImage ? (news.urlToImage.endsWith('/') ? news.urlToImage.slice(0, -1) : news.urlToImage) : 'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg'}"
              alt="News Image" onerror="this.onerror=null; this.src='https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg';"
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

/*  */
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

/* 모바일 메뉴 햄버거 버튼 오픈 클로즈 */
const openNav = () => {
  document.getElementById("mySidenav").style.width = "250px";
};
const closeNav = () => {
  document.getElementById("mySidenav").style.width = "0"
}
