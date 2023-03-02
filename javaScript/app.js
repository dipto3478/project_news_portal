let fetchData = [];
const dataLoad = () =>{
    const URL = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(URL)
    .then(res => res.json())
    .then(data => newsCategoryLoad(data.data.news_category));
}
const newsCategoryLoad = category =>{
    const categoryContainer = document.getElementById('categoryContainer');
    category.forEach(newsItem =>{
        // console.log(newsItem);
        
        const p = document.createElement('p');
        p.innerHTML = `
        <a onclick="fetchCategoryNews('${newsItem.category_id}', '${newsItem.category_name}')" class="nav-link" href="#">${newsItem.category_name}</a>
        `;
        categoryContainer.appendChild(p);
    })
}
const fetchCategoryNews = (category_id, category_name)=>{
   const URL = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
   fetch(URL)
   .then(res => res.json())
   .then(data =>
    {fetchData = data.data; showAllNews(data.data, category_name)})
};
const showAllNews = (data, category_name) =>{
    document.getElementById('news_count').innerHTML = data.length;
    document.getElementById('category_name').innerHTML = category_name;
    const newsContainer = document.getElementById('newsContainer');
    newsContainer.innerHTML = '';
    
    data.forEach(singleNews =>{
        // console.log(singleNews);
        const {_id,image_url,title,details,author,total_view} = singleNews;
        const div = document.createElement('div');
        div.classList.add('card', 'mb-3')
        div.innerHTML = `
        <div class="row g-0">
            <div class="col-md-4">
              <img  src="${image_url}" class="h-100 img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">title${title}</h5>
                <div class="d-flex flex-column justify-content-between">
                  <p class="card-text">${details.slice(0,200)}</p>
                  <p class="card-text">${details.slice(0,100)}</p>
                
                </div>
              </div>

              <div class="card-body d-flex justify-content-between align-items-center">
                <div class=" d-flex align-items-center ">
                    <img style="width: 40px ; height: 40px;" class="rounded-circle" src="${author.img}" alt="" srcset="">
                    <div>
                      <p class="p-0 m-0 ms-2">${author.name}</p>
                      <p class="p-0 m-0 ms-2">${author.published_date ? author.published_date : "Not available"}</p>
                    </div>
                </div>
                <div>
                  <p><i class="fa-regular fa-eye"></i> <span>${total_view ? total_view : "Not available"}</span></p>
                </div>
                <div>
                  <p><i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star-half-stroke"></i></p>
                </div>
                <div>
                  <p onclick="fetchDetailNews('${_id}')" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-solid fa-arrow-right"></i></p>
                </div>
              </div>

            </div>
          </div>
        `;
     newsContainer.appendChild(div);
    })
}
const fetchDetailNews = (news_id) =>{
 const URL = `https://openapi.programming-hero.com/api/news/${news_id}`;
 fetch(URL)
 .then(res => res.json())
 .then(data => newsDetail(data.data[0]))
}

const newsDetail = detail =>{
  console.log(detail);
  const newsContainer = document.getElementById('modal_body');
    
  
    // console.log(singleNews);
    const {image_url, title,details,author,total_view,others_info} = detail;
    
    newsContainer.innerHTML = `
    <div class="card mb-3">
    <div class="row g-0">
        <div class="col-md-12">
          <img  src="${image_url}" class="h-100 img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-12">
          <div class="card-body">
            <h5 class="card-title">${title} 
            <span class="badge text-bg-warning"> ${others_info.is_trending ? 'Trending' : 'Not trending'}</span></h5>
            <div class="d-flex flex-column justify-content-between">
              <p class="card-text"> ${details} </p>
              
            
            </div>
          </div>

          <div class="card-body d-flex justify-content-between align-items-center">
            <div class=" d-flex align-items-center ">
                <img style="width: 40px ; height: 40px;" class="rounded-circle" src="${author.img}" alt="" srcset="">
                <div>
                  <p class="p-0 m-0 ms-2">${author.name}</p>
                  <p class="p-0 m-0 ms-2">${author.published_date ? author.published_date : "Not available"}</p>
                </div>
            </div>
            <div>
              <p><i class="fa-regular fa-eye"></i>${total_view ? total_view : "Not available"} <span></span></p>
            </div>
            <div>
              <p><i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star-half-stroke"></i></p>
            </div>
            
          </div>

        </div>
      </div>
    </div>
    `;
 

}

const showTrending = () =>{
  const trendingNews = fetchData.filter(singleNews => singleNews.others_info.is_trending === true);
  const category_name =  document.getElementById('category_name').innerText ;
  showAllNews(trendingNews, category_name);
}

const   showTodayPick = () =>{
  const todayPickNews = fetchData.filter(singleNews => singleNews.others_info.is_todays_pick === true);
  const category_name =  document.getElementById('category_name').innerText ;
  showAllNews(todayPickNews, category_name);
}