class Pantry {
  constructor() {}

  getPantryItems(user) {
    user.consolidatePantry();
    return user.pantry;
  }
//consider renaming to reflect what method is actually returning
  getRecipeIngredientsInStock(user, recipe) {
    return recipe.ingredients.reduce((ingredientsMissing, ingredientForRecipe) => {
      let pantryInventory = this.getPantryItems(user);
      let item = pantryInventory.find(item => {
        return ingredientForRecipe.id === item.ingredient;
      });
      if (!item || ingredientForRecipe.quantity.amount > item.amount) {
        let amountInPantry = (item && item.amount) || 0;
        ingredientsMissing.push({
          id: ingredientForRecipe.id,
          name: ingredientForRecipe.name,
          quantityNeeded: ingredientForRecipe.quantity.amount - amountInPantry
        });
      }
      return ingredientsMissing;
    }, []);
  }

  addIngredientsToCook(ingredientsMissing, user){
    user.pantry = user.pantry.map(userPantryItem => {
      ingredientsMissing.forEach((ingredient, index) => {
        if(userPantryItem.ingredient === ingredient.id){
          ingredientsMissing.splice(index, 1)
          userPantryItem.amount += ingredient.quantityNeeded
        }
      })
      return userPantryItem
    })
    if (ingredientsMissing.length !== 0){
    ingredientsMissing.forEach(ingredient => {
      user.pantry.push({ingredient: ingredient.id, amount: ingredient.quantityNeeded})
      })
    }
  }

  getMissingIngredientsPrice(missingIngredients, ingredientsData) {
    return missingIngredients.map(missingIngredient => {
      let missingQuantityPrice = ingredientsData.reduce((totalAmount, ingredient) => {
        if (missingIngredient.id === ingredient.id) {
          totalAmount = missingIngredient.quantityNeeded * ingredient.estimatedCostInCents;
        }
        return totalAmount;
      }, 0);
      missingIngredient.missingQuantityPrice = (missingQuantityPrice / 100);
       return missingIngredient;
    });
  }

  removeCookedIngredients(user, recipe) {

    //we will need two parameters, the user and the recipe being cooked
    //for the entire recipe, for each ingredient, iterate over the user pantry array, and remove the ingredients and the quantity needed of them to cook the recipe.
    //if there are not enough ingredients to cook the recipe, alert user
    //return modified pantry array with decreased ingredient amounts
    //if the ingredient count is zero, should it remove it totally?
  }
  saveUserPantry() {
    //Whenever the user buys ingredients, we want to add to the the ingredient count,
    //whenever the user cooks a recipe, we want to take away from the ingredient count
    //to remove ingredients, we want to post the updated count to the server so that it
    //will persist onload; same with when we want to add ingredients.
    //whenever there is a change, run this function.
    //when we run find necessary ingredients, we want to transfer the count to this function, then POST
    //
  }
}

module.exports = Pantry;
