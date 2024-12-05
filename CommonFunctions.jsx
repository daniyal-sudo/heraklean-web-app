export const api_url ='http://82.112.240.94:5001/api/auth/'
//  export const api_url ='http://localhost:5001/api/auth/'




// 'http://localhost:5001/api/auth/'


export function calculateCalories(meals) {
    // Initialize totals
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFats = 0;
  
    // Loop through each meal
    meals.forEach(meal => {
      // Sum protein, fats, and carbs for each meal
      meal.protein.forEach(item => {
        totalProtein += parseFloat(item.grams);
      });
      meal.fats.forEach(item => {
        totalFats += parseFloat(item.grams);
      });
      meal.carbs.forEach(item => {
        totalCarbs += parseFloat(item.grams);
      });
    });
  
    // Calculate total calories using the provided formula
    const totalCalories = (totalProtein * 4) + (totalCarbs * 4) + (totalFats * 9);
  
    // Return the results with total counts in grams for each macronutrient
    return {
      Protein: `${totalProtein}G`, // Total protein in grams
      Carbs: `${totalCarbs}G`,     // Total carbs in grams
      Fats: `${totalFats}G`,       // Total fats in grams
      Calories: `${totalCalories}K` // Total calories calculated
    };
  }
 


  export  function formatTimeToAmPm(time) {
    const [hours, minutes] = time.split(':');
    const period = +hours >= 12 ? 'PM' : 'AM';
    const formattedHours = +hours % 12 || 12;
    return `${formattedHours}:${minutes} ${period}`;
  }
  