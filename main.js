const input = document.getElementById("input-search");
const search = document.getElementById("search-btn");
const mealBox = document.getElementById("mealInfo");
const singleMeal = document.getElementById("single-meal-info-box");
const singleMealDetails = document.getElementById("meal-details-box");
const mealClose = document.getElementById("recipe-close-btn");
const about = document.getElementById("about");
const blog = document.getElementById("blog-btn");
const recipe = document.getElementById("recipesInfo");


const mealInfo = () => {
    mealDetails();
}

search.addEventListener("click", mealInfo);





const mealDetails = () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${input.value}`)
    .then(res => res.json())
    .then(data => mealItem(data.meals));
}


const mealItem = (mealData) => {
    input.value = "";
    mealBox.innerHTML = "";

    for (let i = 0; i < mealData.length; i++) {
        const {strMeal, strMealThumb, idMeal} = mealData[i];

        mealBox.innerHTML += `
            <div class="meal-info col-md-3" data-id=${idMeal}>
            <div class="meal-img">
                <img class="meal-details" src="${strMealThumb}" alt="">
                <h1 class="meal-details">${strMeal}</h1>
            </div>
            </div>
            `
    }
}

const mealClick = (e) => {
    if(e.target.classList.contains("meal-details")){
        let mealClick = e.target.parentElement.parentElement;
    
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealClick.dataset.id}`)
        .then(res => res.json())
        .then(data => mealIngradients(data.meals));
    }


    console.log("Clicked");
}

mealBox.addEventListener("click", mealClick);

const mealIngradients = (ingrediants) => {
    ingrediants = ingrediants[0];
    const ingrediantsLists = [];
    for(let i = 1; i <= 20; i++) {
        let strIngredient = ingrediants[`strIngredient${i}`];
        if(strIngredient){
            ingrediantsLists.push(strIngredient);
        }
    }

    console.log(ingrediants);



    let showMeal = `
    <div class="single-meal-img">
                <img class="img-fluid" src="${ingrediants.strMealThumb}" alt="">
            </div>
    
            <div class="single-meal-info">
                <h1>${ingrediants.strMeal}</h1>
            
            <div class="ingredients">
                <h4>Main Ingrediants</h4>
                <ul>
                    ${ingrediantsLists.map(ing => 
                            `<li><i class="fa fa-check-square" aria-hidden="true"></i> ${ing}</li>`).join("")}
                </ul>
            </div>
    </div>
    `

    singleMeal.innerHTML = showMeal;
    singleMealDetails.style.display = "block";
}


mealClose.addEventListener("click", () => {
    singleMealDetails.style.display = "none";
});


const menuButton = (info) => {
    const mealwrapper = document.getElementById(info + "Info");
    const infoDetails = (id) => document.getElementById(id);
    const about = infoDetails("aboutInfo");
    const blog = infoDetails("blogInfo");

    if(info == "about"){
        mealwrapper.style.display = "block";
        blog.style.display = "none";
    }

    else if(info == "blog"){
        mealwrapper.style.display = "block";
        about.style.display = "none";
    }
    mealBox.innerHTML = "";
};

recipe.addEventListener("click", () => {
    mealInfo();
    document.getElementById("aboutInfo").style.display = "none";
    document.getElementById("blogInfo").style.display = "none";
})



























































// const searchBtn = document.getElementById('search-btn');
// const search = document.getElementById('search');
// const input = document.getElementById('input-search');
// const mealList = document.getElementById('meal');
// const mealDetailsBox = document.getElementById('meal-details-box');
// const showMealInfoBox = document.getElementById('single-meal-info-box');
// const mealImg = document.getElementById('meal-img');
// const mealName = document.getElementById('meal-name');
// const home = document.getElementById('home');
// const recipes = document.getElementById('recipes');
// const closeBtn = document.getElementById('recipe-close-btn');
// const about = document.getElementById('about');
// const aboutInfo = document.getElementById('about-info');
// const blogBtn = document.getElementById('blog-btn');
// const blogs = document.getElementById('blogs');
// const mealBox = document.getElementById('meal-box');


// searchBtn.addEventListener('click', mealListItem);
// closeBtn.addEventListener('click', () => {
//     mealDetailsBox.style.display = 'none';
// });
// about.addEventListener('click', () => {
//     aboutInfo.style.display = 'block';
//     search.style.display = 'none';
//     mealBox.style.display = 'none';
//     blogs.style.display = 'none';
// });
// blogBtn.addEventListener('click', () => {
//     blogs.style.display = 'block';
//     search.style.display = 'none';
//     mealBox.style.display = 'none';
//     aboutInfo.style.display = 'none';
// });

// recipes.addEventListener('click', mealListItem);



// function mealListItem() {
//     let inputSearch = document.getElementById('input-search').value.trim();

//     fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputSearch}`)
//         .then(response => response.json())
//         .then(data => {
//             let html = '';

//             if (data.meals) {
//                 data.meals.forEach(meal => {
//                     html += `
//         <div class="meal-info col-md-3" data-id="${meal.idMeal}">
//             <div class="meal-img">
//                 <img class="meal-details" src="${meal.strMealThumb}" alt="">
//                 <h1 class="meal-details">${meal.strMeal}</h1>
//             </div>
//         </div>
//             `;
//                 })
//             }
//             mealList.innerHTML = html;
//             input.value = '';
//             aboutInfo.style.display = 'none';
//             blogs.style.display = 'none';
//             mealList.style.display = '';
//             mealBox.style.display = 'block';
//         });
// }


// mealList.addEventListener('click', getMeal);

// function getMeal(e) {
//     e.preventDefault();
//     if (e.target.classList.contains("meal-details")) {
//         let mealItem = e.target.parentElement.parentElement;
//         // console.log(mealItem);

//         fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
//             .then(response => response.json())
//             .then(data => mealIngredients(data.meals));
//     }
// }

// function mealIngredients(meal) {
//     meal = meal[0];

//     const ingredientList = [];
//     for (let i = 1; i <= 20; i++) {
//         let ingredient = meal[`strIngredient${i}`];
//         let measure = meal[`strMeasure${i}`];
//         if (ingredient) {
//             ingredientList.push(`${ingredient} - ${measure}`);
//         } else {
//             break;
//         }
//         let html = `
//         <div class="single-meal-img">
//         <img class="img-fluid" src="${meal.strMealThumb}" alt="">
//         </div>

//         <div class="single-meal-info">
//         <h1>${meal.strMeal}</h1>

//         <div class="ingredients">
//         <h4>Ingredients</h4>
//         <ul>
//         ${ingredientList.map(ing => `<li> <i class="fa fa-check-square" aria-hidden="true"></i> ${ing}</li>`).join('')}
//         </ul>
//         </div>

//         </div>
// `;
//         showMealInfoBox.innerHTML = html;
//         mealDetailsBox.style.display = 'block';
//     }

// }
