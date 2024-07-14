const API_KEY = `b3890c85e6f94350bca0576090671f11`;
// const API_KEY = `b3890c85e6f94350bca0576090671f1`; // error test
let mode = "tab-all"
let newsList = [];
let filterList = [];
const menus = document.querySelectorAll(".menus button");
menus.forEach(menu=>menu.addEventListener("click",(event)=>getNewsByCategory(event)));
const mobileMenus = document.querySelectorAll(".side-menu-list button");
mobileMenus.forEach(menu=>menu.addEventListener("click",(event)=>getNewsByCategory(event)));
// let url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);
let url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr`);
let totalResults = 0;
let page = 1;
const pageSize = 10;
const groupSize = 5;


const getNews = async() =>{
  try{
    url.searchParams.set("page", page); // => &page=page
    url.searchParams.set("pageSize", pageSize);
    const response = await fetch(url);
    const data = await response.json();
    console.log("ddd", data)
    if(response.status===200){
      if(data.articles.length===0){
        throw new Error("No result for this research");
      }
      newsList = data.articles;
      totalResults = data.totalResults;
      render();
      paginationRender();
    }else{
      throw new Error(data.message)
    }
  } catch(error){
    // console.log("error message", error.message)
    errorRender(error.message);
  }
}

const getLatestNews = async() => {
  // url = new URL(
    // `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
  // );
  url = new URL(
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?`
  );

  await getNews();
}

const getNewsByCategory= async (event)=>{
  const category = event.target.textContent.toLowerCase();
  console.log("click category button", category)
  // url = new URL(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`);
  url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?category=${category}`);
  page = 1;
  await getNews();
}

const searchNews = async() => {
  const inputValue = document.getElementById('search-input').value;
  // url = new URL(`https://newsapi.org/v2/top-headlines?q=${inputValue}&country=us&apiKey=${API_KEY}`);
  url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?q=${inputValue}`);
  await getNews();
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

/* 모바일 메뉴 햄버거 버튼 오픈 클로즈 */
const openNav = () => {
  document.getElementById("mySidenav").style.width = "250px";
};
const closeNav = () => {
  document.getElementById("mySidenav").style.width = "0"
}

const paginationRender=()=>{
  // totalResult
  // page
  // pageSize
  // groupSize
  // totalPages - 총 있어야 하는 페이지 수
    const totalPages = Math.ceil(totalResults/pageSize); 
    console.log("total pages", totalPages)
  // pageGroup - 현재 페이지의 페이지 그룹
    const pageGroup = Math.ceil(page/groupSize);
  // lastPage - 현재 문서의 페이징 섹션에 렌더할 마지막 페이지 번호
    let lastPage = pageGroup * groupSize;
    // 마지막 페이지 그룹이 그룹 사이즈보다 작다? lastpage = total page
    if(lastPage > totalPages){
      lastPage = totalPages;
    }

  // firstPage - 현재 문서의 페이징 섹션에 렌더할 첫번째 페이지 번호
    const firstPage = lastPage - (groupSize - 1)<=0?1:lastPage - (groupSize - 1);

  let paginationHTML='';
  if(pageGroup == 1) {
    if(page == 1) {
      for(let i=firstPage;i<=lastPage;i++){
        paginationHTML += `<li class="page-item ${i===page ? "active" : ""}" onclick="moveToPage(${i})"><a class="page-link">${i}</a></li>`
      }
      paginationHTML += `
        <li class="page-item" onclick="moveToPage(${page+1})"><a class="page-link" >Next</a></li>
        <li class="page-item" onclick="moveToPage(${totalPages})">
          <a class="page-link" aria-label="Next">
            <span aria-hidden="true">${pageGroup !== Math.ceil(totalPages / groupSize) ? `
              <li class="page-item" onclick="moveToPage(${totalPages})">
                <a class="page-link" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>` : ''}
            </span>
          </a>
        </li>
      `
    } else {
      if(page == totalPages){
        paginationHTML += `
        <li class="page-item" onclick="moveToPage(${page-1})"><a class="page-link" >Previous</a></li>
      `;
          for(let i=firstPage;i<=lastPage;i++){
            paginationHTML += `<li class="page-item ${i===page ? "active" : ""}" onclick="moveToPage(${i})"><a class="page-link">${i}</a></li>`
          }
          
      } else {
        paginationHTML += `
        <li class="page-item" onclick="moveToPage(${page-1})"><a class="page-link" >Previous</a></li>
      `;
          for(let i=firstPage;i<=lastPage;i++){
            paginationHTML += `<li class="page-item ${i===page ? "active" : ""}" onclick="moveToPage(${i})"><a class="page-link">${i}</a></li>`
          }
          paginationHTML += `
            <li class="page-item" onclick="moveToPage(${page+1})"><a class="page-link" >Next</a></li>
            <li class="page-item" onclick="moveToPage(${totalPages})">
              <a class="page-link" aria-label="Next">
                <span aria-hidden="true">${pageGroup !== Math.ceil(totalPages / groupSize) ? `
                  <li class="page-item" onclick="moveToPage(${totalPages})">
                    <a class="page-link" aria-label="Next">
                      <span aria-hidden="true">&raquo;</span>
                    </a>
                  </li>` : ''}
                </span>
              </a>
            </li>
          `
      }

    }
  } else if(page == totalPages) {
    console.log("page == totalPages")
    paginationHTML += `
    <li class="page-item" onclick="moveToPage(1)">
      <a class="page-link" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    <li class="page-item" onclick="moveToPage(${page-1})"><a class="page-link" >Previous</a></li>`
  for(let i=firstPage;i<=lastPage;i++){
    paginationHTML += `<li class="page-item ${i===page ? "active" : ""}" onclick="moveToPage(${i})"><a class="page-link">${i}</a></li>`
  }
  } else {
    if(page > lastPage-groupSize) {
      paginationHTML += `
    <li class="page-item" onclick="moveToPage(1)">
      <a class="page-link" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    <li class="page-item" onclick="moveToPage(${page-1})"><a class="page-link" >Previous</a></li>
  `;
  for(let i=firstPage;i<=lastPage;i++){
    paginationHTML += `<li class="page-item ${i===page ? "active" : ""}" onclick="moveToPage(${i})"><a class="page-link">${i}</a></li>`
  }
  paginationHTML += `
    <li class="page-item" onclick="moveToPage(${page+1})"><a class="page-link" >Next</a></li>
  `
    } else {
      paginationHTML += `
    <li class="page-item" onclick="moveToPage(1)">
      <a class="page-link" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    <li class="page-item" onclick="moveToPage(${page-1})"><a class="page-link" >Previous</a></li>
  `;
  for(let i=firstPage;i<=lastPage;i++){
    paginationHTML += `<li class="page-item ${i===page ? "active" : ""}" onclick="moveToPage(${i})"><a class="page-link">${i}</a></li>`
  }
  paginationHTML += `
    <li class="page-item" onclick="moveToPage(${page+1})"><a class="page-link" >Next</a></li>
    <li class="page-item" onclick="moveToPage(${totalPages})">
      <a class="page-link" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  `
    }
    
  }

  document.querySelector(".pagination").innerHTML = paginationHTML;

  /* <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item"><a class="page-link" href="#">Previous</a></li>
      <li class="page-item"><a class="page-link" href="#">1</a></li>
      <li class="page-item"><a class="page-link" href="#">2</a></li>
      <li class="page-item"><a class="page-link" href="#">3</a></li>
      <li class="page-item"><a class="page-link" href="#">Next</a></li>
    </ul>
  </nav> */
}
const moveToPage = async (pageNum)=>{
  console.log("movetopage", pageNum);
  page = pageNum;
  await getNews();
}

getLatestNews();