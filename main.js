const searchBtn = document.getElementById('search-btn');
const search = document.getElementById('search');
const input = document.getElementById('input-search');
const mealList = document.getElementById('meal');
const mealDetailsBox = document.getElementById('meal-details-box');
const showMealInfoBox = document.getElementById('single-meal-info-box');
const mealImg = document.getElementById('meal-img');
const mealName = document.getElementById('meal-name');
const home = document.getElementById('home');
const recipes = document.getElementById('recipes');
const closeBtn = document.getElementById('recipe-close-btn');
const about = document.getElementById('about');
const aboutInfo = document.getElementById('about-info');
const blogBtn = document.getElementById('blog-btn');
const blogs = document.getElementById('blogs');


searchBtn.addEventListener('click', mealListItem);
closeBtn.addEventListener('click', () => {
    mealDetailsBox.style.display = 'none';
});
about.addEventListener('click', () => {
    aboutInfo.style.display = 'block';
    search.style.display = 'none';
    mealList.style.display = 'none';
    blogs.style.display = 'none';
});
blogBtn.addEventListener('click', () => {
    blogs.style.display = 'block';
    search.style.display = 'none';
    mealList.style.display = 'none';
    aboutInfo.style.display = 'none';
});

recipes.addEventListener('click', mealListItem);



function mealListItem() {
    let inputSearch = document.getElementById('input-search').value.trim();

    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputSearch}`)
        .then(response => response.json())
        .then(data => {
            let html = '';

            if (data.meals) {
                data.meals.forEach(meal => {
                    html += `
        <div class="meal-info" data-id="${meal.idMeal}">
            <div class="meal-img">
                <img class="meal-details" src="${meal.strMealThumb}" alt="">
                <h1 class="meal-details">${meal.strMeal}</h1>
            </div>
        </div>
            `;
                })
            }
            mealList.innerHTML = html;
            input.value = '';
            aboutInfo.style.display = 'none';
            blogs.style.display = 'none';
            mealList.style.display = '';

        });
}


mealList.addEventListener('click', getMeal);

function getMeal(e) {
    e.preventDefault();
    if (e.target.classList.contains("meal-details")) {
        let mealItem = e.target.parentElement.parentElement;
        // console.log(mealItem);

        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
            .then(response => response.json())
            .then(data => mealIngredients(data.meals));
    }
}

function mealIngredients(meal) {
    meal = meal[0];

    const ingredientList = [];
    for (let i = 1; i <= 20; i++) {
        let ingredient = meal[`strIngredient${i}`];
        let measure = meal[`strMeasure${i}`];
        if (ingredient) {
            ingredientList.push(`${ingredient} - ${measure}`);
        } else {
            break;
        }
        let html = `
        <div class="single-meal-img">
        <img class="img-fluid" src="${meal.strMealThumb}" alt="">
        </div>

        <div class="single-meal-info">
        <h1>${meal.strMeal}</h1>

        <div class="ingredients">
        <h4>Ingredients</h4>
        <ul>
        ${ingredientList.map(ing => `<li> <i class="fa fa-check-square" aria-hidden="true"></i> ${ing}</li>`).join('')}
        </ul>
        </div>

        </div>
`;
        showMealInfoBox.innerHTML = html;
        mealDetailsBox.style.display = 'block';
    }

}
