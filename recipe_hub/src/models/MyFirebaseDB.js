import { getDocs, collection } from "firebase/firestore";
import firebaseConfigInstance from "./FirebaseConfig";

export default class MyFirebaseDB {
  constructor() {
    this.db = firebaseConfigInstance.db; // You need to initialize this.db with the firestore instance from your FirebaseConfig
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
}
