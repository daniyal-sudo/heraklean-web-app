export const api_url =
  window.location.hostname === "localhost"
    ? "http://localhost:5001/api/auth/"
    : "http://82.112.240.94:5001/api/auth/";

// 'http://localhost:5001/api/auth/'

export function calculateCalories(meals) {
  // Initialize totals
  let totalProtein = 0;
  let totalCarbs = 0;
  let totalFats = 0;

  // Loop through each meal
  meals.forEach((meal) => {
    // Sum protein, fats, and carbs for each meal
    meal.protein.forEach((item) => {
      totalProtein += parseFloat(item.grams);
    });
    meal.fats.forEach((item) => {
      totalFats += parseFloat(item.grams);
    });
    meal.carbs.forEach((item) => {
      totalCarbs += parseFloat(item.grams);
    });
  });

  // Calculate total calories using the provided formula
  const totalCalories = totalProtein * 4 + totalCarbs * 4 + totalFats * 9;

  // Return the results with total counts in grams for each macronutrient
  return {
    Protein: `${totalProtein}G`, // Total protein in grams
    Carbs: `${totalCarbs}G`, // Total carbs in grams
    Fats: `${totalFats}G`, // Total fats in grams
    Calories: `${totalCalories}K`, // Total calories calculated
  };
}

export function formatTimeToAmPm(time) {
  const [hours, minutes] = time.split(":");
  const period = +hours >= 12 ? "PM" : "AM";
  const formattedHours = +hours % 12 || 12;
  return `${formattedHours}:${minutes} ${period}`;
}

export const getTodayDate = () => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0"); // Ensures 2-digit day
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const year = today.getFullYear();

  return `${year}-${month}-${day}`; // Returns date in YYYY-MM-DD format
};

export const TestObject = [
  {
    category: "Chest",
    exercises: [
      "Barbell Bench Press",
      "Incline Barbell Bench Press",
      "Decline Barbell Bench Press",
      "Dumbbell Bench Press",
      "Incline Dumbbell Bench Press",
      "Decline Dumbbell Bench Press",
      "Chest Fly (Machine)",
      "Cable Crossover (High-to-Low)",
      "Cable Crossover (Low-to-High)",
      "Pec Deck Machine",
      "Smith Machine Bench Press",
      "Guillotine Press (Barbell)",
      "Svend Press (Plate Squeeze)",
      "Plate-Loaded Chest Press",
      "Hammer Strength Chest Press",
      "Push-Up on Handles (Weighted or Non-Weighted)",
      "Landmine Press (Angled)",
    ],
  },
  {
    category: "Back",
    exercises: [
      "Lat Pulldown (Wide Grip)",
      "Lat Pulldown (Close Grip)",
      "Lat Pulldown (Neutral Grip)",
      "Seated Cable Row (Wide Grip)",
      "Seated Cable Row (Close Grip)",
      "One-Arm Dumbbell Row",
      "T-Bar Row (Machine or Barbell)",
      "Bent-Over Barbell Row (Overhand Grip)",
      "Bent-Over Barbell Row (Underhand Grip)",
      "Pendlay Row",
      "Smith Machine Row",
      "Chest-Supported Row (Machine)",
      "Inverted Rows (TRX or Barbell)",
      "Pull-Ups (Weighted or Assisted)",
      "Chin-Ups (Weighted or Assisted)",
      "Straight-Arm Pulldown (Cable)",
      "Deadlifts (Conventional)",
      "Trap Bar Deadlift",
      "Rack Pulls",
      "Meadows Row",
      "Dumbbell Shrugs (Trap Focus)",
      "High Cable Row",
    ],
  },
  {
    category: "Biceps",
    exercises: [
      "Barbell Curl",
      "Dumbbell Curl (Alternating or Simultaneous)",
      "Hammer Curl (Dumbbells)",
      "Preacher Curl (EZ-Bar, Barbell, or Dumbbell)",
      "Concentration Curl (Dumbbell)",
      "Cable Biceps Curl (Straight Bar or Rope)",
      "Reverse-Grip Barbell Curl",
      "Spider Curl (Inclined Bench Dumbbell or Barbell)",
      "Zottman Curl (Dumbbells)",
      "Incline Dumbbell Curl",
      "Cable Rope Hammer Curl",
      "Machine Biceps Curl (Seated)",
      "Smith Machine Biceps Curl",
      "Drag Curl (Barbell or Dumbbells)",
      "Overhead Cable Biceps Curl",
      "Lying Cable Biceps Curl",
    ],
  },
  {
    category: "Triceps",
    exercises: [
      "Triceps Pushdowns (Straight Bar, Rope, or V-Bar)",
      "Overhead Triceps Extension (Dumbbell)",
      "Overhead Triceps Extension (EZ-Bar or Barbell)",
      "Skull Crushers (EZ-Bar or Barbell)",
      "Dips (Parallel Bar, Weighted or Assisted)",
      "Close-Grip Bench Press",
      "Close-Grip Push-Ups",
      "Kickbacks (Dumbbell or Cable)",
      "Cable Overhead Triceps Extension",
      "Cable Rope Triceps Kickbacks",
      "Reverse-Grip Triceps Pushdown",
      "Smith Machine Close-Grip Press",
      "JM Press (Barbell or Dumbbell)",
      "Seated Machine Triceps Pushdown",
      "Decline Dumbbell Triceps Extension",
      "Incline Dumbbell Triceps Extension",
    ],
  },
  {
    category: "Glutes",
    exercises: [
      "Barbell Hip Thrusts",
      "Dumbbell Hip Thrusts",
      "Glute Bridges (Barbell or Dumbbell)",
      "Cable Glute Kickbacks",
      "Bulgarian Split Squats",
      "Step-Ups (Weighted)",
      "Sumo Deadlift",
      "Romanian Deadlifts (Barbell or Dumbbells)",
      "Reverse Lunges (Barbell or Dumbbell)",
      "Lateral Step-Ups",
      "Hip Abduction (Cable or Machine)",
      "Plate-Loaded Glute Bridge",
      "Belt Squat",
      "Kettlebell Swings",
      "Single-Leg Hip Thrust",
      "Glute-Ham Raises (GHD Machine)",
    ],
  },
  {
    category: "Quads",
    exercises: [
      "Back Squat (Barbell or Smith Machine)",
      "Front Squat (Barbell)",
      "Goblet Squat (Dumbbell or Kettlebell)",
      "Bulgarian Split Squats",
      "Walking Lunges (Weighted or Unweighted)",
      "Stationary Lunges (Barbell or Dumbbell)",
      "Step-Ups (Weighted)",
      "Leg Press",
      "Hack Squat (Machine)",
      "Sissy Squats (Machine or Free)",
      "Leg Extensions (Machine)",
      "Zercher Squats",
      "Split Squats",
      "Wall Sit (Weighted or Unweighted)",
      "Belt Squat (Machine)",
      "Box Squats",
      "Cyclist Squats (Heels Elevated)",
    ],
  },
  {
    category: "Hamstrings",
    exercises: [
      "Romanian Deadlifts (Barbell or Dumbbell)",
      "Stiff-Legged Deadlift (Barbell or Dumbbell)",
      "Lying Leg Curl (Machine)",
      "Seated Leg Curl (Machine)",
      "Nordic Hamstring Curl (Assisted or Weighted)",
      "Good Mornings (Barbell or Dumbbell)",
      "Cable Pull-Through",
      "Glute-Ham Raises (GHD Machine)",
      "Single-Leg Romanian Deadlift (Dumbbell or Barbell)",
      "Reverse Lunges",
      "Step-Ups (Hamstring Focus)",
      "Stability Ball Hamstring Curls",
      "Trap Bar Deadlifts",
      "Hamstring Slide Curl (Using Sliders)",
    ],
  },
  {
    category: "Shoulders",
    exercises: [
      "Overhead Press (Barbell or Dumbbell)",
      "Arnold Press (Dumbbell)",
      "Seated Dumbbell Shoulder Press",
      "Smith Machine Overhead Press",
      "Lateral Raises (Dumbbells, Cables, or Machine)",
      "Front Raises (Dumbbells or Cable)",
      "Rear Delt Fly (Dumbbell or Machine)",
      "Face Pulls (Cable)",
      "Upright Rows (Barbell, Dumbbells, or Cable)",
      "Shrugs (Barbell, Dumbbell, or Machine)",
      "Overhead Press (Neutral Grip, Dumbbell)",
      "Cable Lateral Raise",
      "Cable Front Raise",
      "Plate Front Raise",
      "Landmine Press",
      "Z Press (Seated Barbell Press on Floor)",
      "Rear Delt Cable Fly",
      "Dumbbell Y Raise",
      "Scaption (Dumbbell or Cable)",
      "Dumbbell Shoulder Shrugs",
    ],
  },
];
