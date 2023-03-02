let fetchData = [];
const loadCategories = async() =>{
  const url = `https://openapi.programming-hero.com/api/news/categories`
  try{
    const res = await fetch(url);
    const data = await res.json();
    showCategories(data.data);

  }
  catch(error){
    console.log(error)
  }
};
const showCategories = data => {
const categoriesContainer = document.getElementById('categories-container');
data.news_category.forEach(category =>{
  // console.log(category);
  const {category_name, category_id} = category;
  categoriesContainer.innerHTML += `<a class="nav-link" href="#" onclick="loadAllCategoriesNews('${category_id}', '${category_name}')">${category_name}</a>
  `;
})

};

const loadAllCategoriesNews = async (category_id, category_name) => {
  const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
  try{
    const res = await fetch(url);
    const data = await res.json();
    fetchData = data.data
    showAllNews(data.data, category_name);
  }
  catch(error){
    console.log(error);
  };

};

const showAllNews = (data, category_name) =>{
  document.getElementById('news-count').innerText = data.length;
  document.getElementById('category_name').innerText = category_name;
  const allNewsContainer = document.getElementById('all-news');
  allNewsContainer.textContent = '';
  data.forEach(singleNews => {
    const {rating, author, _id, total_view, image_url, title, details,} = singleNews;
    const div = document.createElement('div');
    div.classList.add("card", "mb-3");
    div.innerHTML = `
    <div class="row g-0">
            <div class="col-md-4">
              <img src="${image_url}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8 d-flex flex-column">
              <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">${details.slice(0, 200)}</p>
              </div>
              <div class="d-flex justify-content-between card-footer border-0 bg-body ">
              <div class="d-flex gap-2">
              <img src=${author.img} class="img-fluid rounded-circle" alt=" " width="40" height="50">
              <div> 
              <p class="m-0 p-0">${author.name ? author.name : "Not Available"}</p>
              <p>${author.published_date}</p>
              </div>
              </div>
              <div class="d-flex align-items-center gap-2">
              <i class="fa-solid fa-eye"></i>
              <p class="m-0 p-0">${total_view ? total_view : "Not Available"}</p>
              </div>
              <div class="d-flex align-items-center">
              ${generateStars(rating.number)}
              <P class="my-3 ps-2">${rating.number}</p>
              </div>
              <div class="d-flex align-items-center">
              <i class="fa-solid fa-arrow-right" onclick="loadNewsDetails('${_id}')" data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
              </div>

              </div>
            </div>
          </div>
    `;
    allNewsContainer.appendChild(div)
    // console.log(singleNews);
  })

};

const loadNewsDetails = async (news_id) => {
  const url = ` https://openapi.programming-hero.com/api/news/${news_id}`
try{
  const res = await fetch(url);
  const data = await res.json();
  showNewsDetails(data.data[0])
}catch(error){
  console.log(error)
}
};

const showNewsDetails = newsDetails =>{
  const modalBody = document.getElementById('modal-body');
  modalBody.textContent = '';
  const {thumbnail_url, image_url, others_info, title, details,} = newsDetails;
  const div = document.createElement('div');
  div.classList.add("card", "mb-3");
  div.innerHTML = `
            <img src="${image_url}" class="img-fluid rounded-start" alt="...">
              <h5 class="card-title">${title} <span class="badge text-bg-warning">${others_info.is_trending ? 'Trending' : 'Not Trending'}</span></h5>
              <p class="card-text">${details}</p>
  `;
  modalBody.appendChild(div)
};

const showTrending = () => {
  const trendingNews = fetchData.filter(singData => singData.others_info.is_trending === true);
  const categoryName = document.getElementById("category_name").innerText;
 
  showAllNews(trendingNews, categoryName);
};

const showTodayPic = () =>{
  const todayPicNews = fetchData.filter(singData => singData.others_info.is_todays_pick === true);
  const categoryName = document.getElementById('category_name').innerText;
  showAllNews(todayPicNews, categoryName)
};

const generateStars = rating =>{
  let ratingHTML= '';
  for (let i = 1; i <= Math.floor(rating); i++){
    ratingHTML +=`<i class="fa-solid fa-star"></i>`;
  }
  if(rating - Math.floor(rating)>0){
            ratingHTML+= `<i class="fa-regular fa-star-half-stroke"></i>`
        }
        return ratingHTML
}


// loadCategories()

// Optional
// Generate stars
// ${generateStars(rating.number)}
// const generateStars= rating =>{
//     let ratingHTML= '';
//     for (let i = 1; i <= Math.floor(rating); i++){
//         ratingHTML +=`<i class="fas fa-star"></i>`;
      
//     }
//     if(rating - Math.floor(rating)>0){
//         ratingHTML+=`<i class="fas fa-star-half"></i>`
//     }
//     return ratingHTML
// }