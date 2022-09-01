const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal')
const mealDetails = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.querySelector('.recipe-close-btn');

// Event Listeners

searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetails.parentElement.parentElement.classList.remove('showRecipe')
})

// Get Meal List that matches with the ingredient

function getMealList() {
    const searchField = document.getElementById('search-input');
    let searchInputTxt = searchField.value.trim();


    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
        .then(res => res.json())
        .then(data => {
            let html = '';
            if (data.meals) {
                data.meals.forEach(meal => {
                    html += `
                        <div class="meal-item" data-id='${meal.idMeal}'>
                            <div class="meal-img">
                                <img src="${meal.strMealThumb}" alt="">
                            </div>
                            <div class="meal-name">
                                <h3>${meal.strMeal}</h3>
                                <a href="#" class="recipe-btn">Get Recipe</a>
                            </div>
                        </div>
                    `;
                });
                mealList.classList.remove('not-found');
            } else {
                html = `Sorry We didn't find any meal for your search`;
                mealList.classList.add('not-found');
            }
            mealList.innerHTML = html;

        })
    searchField.value = '';
}

// Get Recipe of the meal

function getMealRecipe(e) {
    e.preventDefault();
    if (e.target.classList.contains('recipe-btn')) {
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
            .then(res => res.json())
            .then(data => mealRecipeModal(data.meals))
    }

}

// create a modal
function mealRecipeModal(meal) {
    meal = meal[0];

    let html = `
        <h2 class="recipe-title">${meal.strMeal}</h2>
        <p class="recipe-category">${meal.strCategory}</p>
        <div class="recipe-instruct">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
    
        </div>
        <div class="recipe-meal-img">
            <img src="${meal.strMealThumb}" alt="">
        </div>
        <div class="recipe-link">
            <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
        </div>
    `;

    mealDetails.innerHTML = html;

    mealDetails.parentElement.parentElement.classList.add('showRecipe')


}