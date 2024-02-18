import {
  firestore,
  collection,
  getDocs,
  doc,
  getDoc,
  // getStorage,
  // ref,
  // getDownloadURL,
} from "../models/FirebaseConfig";

export const fetchRecipeDetails = async (recipeName, setStateCallback) => {
  try {
    const recipeDocRef = doc(firestore, "recipes", recipeName);
    const recipeDocSnap = await getDoc(recipeDocRef);

    if (recipeDocSnap.exists()) {
      const recipeDetails = recipeDocSnap.data();

      // Fetch ingredients
      const ingredientsRef = collection(
        firestore,
        "recipes",
        recipeName,
        "ingredients"
      );
      const ingredientsSnap = await getDocs(ingredientsRef);

      // Map ingredients data
      const ingredientDict = {};
      ingredientsSnap.docs.forEach((doc) => {
        const data = doc.data();
        const ingredientName = doc.id;
        const quantity = data.qty;
        ingredientDict[ingredientName] = quantity;
      });

      setStateCallback({
        recipeDetails: {
          recipeIngredients: ingredientDict,
          recipeInstructions: recipeDetails.instructions,
          recipeAuthor: recipeDetails.author,
          recipeName: recipeName,
        },
      });

      console.log("Recipe Details fetched:", this.state.recipeDetails);
      return this.state.recipeDetails;
    } else {
      console.log("Recipe not found -- js file");
      return null;
    }
  } catch (error) {
    console.error("Error fetching recipe details:", error);
    return null;
  }
};

// export const fetchRecipeImage = async (recipeName) => {
//   // Fetch image URL from Firebase Storage
//   try {
//     console.log("Entering fetchRecipeImage");
//     const storage = getStorage();
//     const URL = `images/${recipeName}.png`;
//     console.log("image path -- ", URL);
//     const pathReference = ref(storage, URL);
//     // const imageRef = storageRef.child(`images/${recipeName}.png`);
//     const imageRef = storageRef.child(URL);
//     const imageUrl = await imageRef.getDownloadURL();
//     return imageUrl;
//   } catch (error) {
//     console.error("Error fetching recipe image:", error);
//     return null;
//   }
// };
