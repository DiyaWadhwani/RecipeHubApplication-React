import { firestore, collection, getDocs } from "../models/FirebaseConfig";

export const fetchRecipes = async () => {
  try {
    const recipesCollection = await getDocs(collection(firestore, "recipes"));
    return recipesCollection.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }
};

export const getRecipeById = async (id) => {
  try {
    const recipeDoc = await firestore.collection("recipes").doc(id).get();
    return recipeDoc.data();
  } catch (error) {
    console.error("Error fetching recipe by ID:", error);
    return null;
  }
};
