import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import firebaseConfigInstance from "./FirebaseConfig";
import { ref, getDownloadURL } from "firebase/storage";
import RecipeDetails from "./RecipeDetails";
import Ingredient from "./Ingredient";

export default class MyFirebaseDB {
  constructor() {
    this.db = firebaseConfigInstance.db;
    this.storage = firebaseConfigInstance.storage;
  }

  async fetchRecipeNames() {
    try {
      if (!this.db) {
        console.error("Database not initialized!");
        return;
      }
      const recipesCollection = await getDocs(collection(this.db, "recipes"));

      const recipeList = [];

      for (let doc of recipesCollection.docs) {
        recipeList.push({
          id: doc.id,
        });
      }
      return recipeList;
    } catch (error) {
      console.error("Error fetching recipes:", error);
      return [];
    }
  }

  // async fetchRecipeDetails(recipeName, setStateCallback) {
  //   try {
  //     this.myDatabase = new MyFirebaseDB();
  //     const recipeDocRef = doc(this.myDatabase.db, "recipes", recipeName);
  //     console.log("recipeDocref created", recipeDocRef);
  //     const recipeDocSnap = await getDoc(recipeDocRef);

  //     if (recipeDocSnap.exists()) {
  //       const recipeDetails = recipeDocSnap.data();
  //       // Fetch ingredients
  //       const ingredientsRef = collection(
  //         this.myDatabase.db,
  //         "recipes",
  //         recipeName,
  //         "ingredients"
  //       );
  //       const ingredientsSnap = await getDocs(ingredientsRef);

  //       // Map ingredients data
  //       const ingredientDict = {};
  //       ingredientsSnap.docs.forEach((doc) => {
  //         const data = doc.data();
  //         const ingredientName = doc.id;
  //         const quantity = data.qty;
  //         ingredientDict[ingredientName] = quantity;
  //       });

  //       setStateCallback({
  //         recipeDetails: {
  //           recipeIngredients: ingredientDict,
  //           recipeInstructions: recipeDetails.instructions,
  //           recipeAuthor: recipeDetails.author,
  //           recipeName: recipeName,
  //         },
  //       });

  //       console.log("Recipe Details fetched:", this.state.recipeDetails);
  //       return this.state.recipeDetails;
  //     } else {
  //       console.log("Recipe not found -- js file");
  //       return null;
  //     }
  //   } catch (error) {
  //     console.error("Error fetching recipe details:", error);
  //     return null;
  //   }
  // }

  async fetchRecipeDetails(recipeName) {
    try {
      this.myDatabase = new MyFirebaseDB();
      const recipeDocRef = doc(this.myDatabase.db, "recipes", recipeName);
      const recipeDocSnap = await getDoc(recipeDocRef);

      if (recipeDocSnap.exists()) {
        const recipeDocumentData = recipeDocSnap.data();
        // Fetch ingredients
        const ingredientsRef = collection(
          this.myDatabase.db,
          "recipes",
          recipeName,
          "ingredients"
        );
        const ingredientsSnap = await getDocs(ingredientsRef);

        // Map ingredients data
        const ingredientList = [];

        ingredientsSnap.docs.forEach((doc) => {
          const data = doc.data();
          const newIngredient = new Ingredient(doc.id, data.qty);
          ingredientList.push(newIngredient);
        });

        const fetchedRecipeDetails = new RecipeDetails({
          recipeName: recipeName,
          recipeAuthor: recipeDocumentData.author,
          recipeInstructions: recipeDocumentData.instructions,
          recipeIngredients: ingredientList,
        });

        // Return the fetched recipe details directly
        return fetchedRecipeDetails;
      } else {
        console.log("Recipe not found -- js file");
        return null;
      }
    } catch (error) {
      console.error("Error fetching recipe details:", error);
      return null;
    }
  }

  async downloadImage(recipeName) {
    try {
      console.log("trying to download image", recipeName);
      const imageRef = ref(this.storage, `/images/${recipeName}.png`);
      console.log("printing URL - ", imageRef);
      const url = await getDownloadURL(imageRef);
      return url;
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  }
}
