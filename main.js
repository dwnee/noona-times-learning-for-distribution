// const API_KEY = `b3890c85e6f94350bca0576090671f11`;
// const API_KEY = `b3890c85e6f94350bca0576090671f1`; // error test
let mode = "tab-all"
let newsList = [];
let filterList = [];
const menus = document.querySelectorAll(".menus button");
menus.forEach(menu=>menu.addEventListener("click",(event)=>getNewsByCategory(event)));
const mobileMenus = document.querySelectorAll(".side-menu-list button");
mobileMenus.forEach(menu=>menu.addEventListener("click",(event)=>getNewsByCategory(event)));
let url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr`);


const getNews = async() =>{
  try{
    const response = await fetch(url);
    const data = await response.json();
    if(response.status===200){
      if(data.articles.length===0){
        throw new Error("No result for this research");
      }
      newsList = data.articles;
      render();
    }else{
      throw new Error(data.message)
    }
  } catch(error){
    // console.log("error message", error.message)
    errorRender(error.message);
  }
}

const getLatestNews = async() => {
  url = new URL(
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?`
  );
  getNews();
}

const getNewsByCategory= async (event)=>{
  const category = event.target.textContent.toLowerCase();
  console.log("click category button", category)
  url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?category=${category}`);
  getNews();
}

const searchNews = async() => {
  const inputValue = document.getElementById('search-input').value;
  url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?q=${inputValue}`);
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

const errorRender = (errorMessage)=>{
  const errorHTML = `
    <div class="alert alert-danger" role="alert">
      ${errorMessage}
    </div>
  `;
  document.getElementById("news-section").innerHTML = errorHTML;
}

document.getElementById('search-input').addEventListener('click', function() {
  console.log(this.value);
  this.value = "";
});

getLatestNews();

/* search box open */
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
/* mobile hamburger button category menu open close */
const openNav = () => {
  document.getElementById("mySidenav").style.width = "250px";
};
const closeNav = () => {
  document.getElementById("mySidenav").style.width = "0"
}