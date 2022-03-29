import 'core-js/stable';
import 'regenerator-runtime/runtime';

import * as model from './model.js';
import recipeView from './views/recipeView.js';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.replace('#', '');

    if (!id) return;
    recipeView.renderSpinner();

    // 1. Load recipe
    await model.loadRecipe(id);

    // 2. Render recipe
    recipeView.render(model.state.recipe);
  } catch (error) {
    recipeView.renderError();
  }
};

const getAllRecipes = async function () {
  const res = await fetch(
    'https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza'
  );
  const data = await res.json();
  console.log(data);
};

// controlRecipes();
// getAllRecipes();
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
};

init();
