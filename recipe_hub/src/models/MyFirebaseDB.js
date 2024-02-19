import {
  setDoc,
  doc,
  getDoc,
  getDocs,
  collection,
  updateDoc,
} from "firebase/firestore";
import firebaseConfigInstance from "./FirebaseConfig";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
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
        recipeList.push(doc.id);
      }
      return recipeList;
    } catch (error) {
      console.error("Error fetching recipes:", error);
      return [];
    }
  }

  async fetchUserSpecificRecipeNames(fieldValue) {
    try {
      const userCollectionRef = collection(this.db, "users");
      const userCollectionSnap = await getDocs(userCollectionRef);

      if (!userCollectionSnap.empty) {
        const firstUserDoc = userCollectionSnap.docs[0];
        const userDocRef = doc(this.db, "users", firstUserDoc.id);

        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userDocData = userDocSnap.data();
          console.log("userDocData -- ", userDocData);

          const currentRecipeNameList = userDocData[fieldValue] || [];

          console.log("Fetched current recipes", currentRecipeNameList);
          return currentRecipeNameList;
        } else {
          console.log("User document does not exist.");
        }
      }
    } catch (error) {
      console.error("Error updating createdRecipes array:", error);
    }
  }

  async fetchRecipeDetails(recipeName) {
    try {
      const recipeDocRef = doc(this.db, "recipes", recipeName);
      const recipeDocSnap = await getDoc(recipeDocRef);

      if (recipeDocSnap.exists()) {
        const recipeDocumentData = recipeDocSnap.data();

        // Fetch ingredients
        const ingredientsRef = collection(
          this.db,
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

  async addRecipeToFirestore(recipeDetails) {
    try {
      console.log("Adding recipe to firestore now !!");

      // Step 1: Upload image to Firebase Storage
      console.log("step 1 - uploading");
      const imageFile = recipeDetails.recipeImageURL;
      const storageRef = ref(
        this.storage,
        `/images/${recipeDetails.recipeName}.png`
      );
      await uploadBytes(storageRef, imageFile);
      // const uploadedImageURL = await getDownloadURL(storageRef);
      console.log("step 1 completed");

      // Step 2: Add or update the recipe document with the image URL
      console.log("step 2 -- update doc with image url");
      const recipeRef = doc(this.db, "recipes", recipeDetails.recipeName);
      await setDoc(recipeRef, {
        author: recipeDetails.recipeAuthor,
        instructions: recipeDetails.recipeInstructions,
        // imageUrl: uploadedImageURL,
      });
      console.log("step 2 completed");

      //Step 3: Add or update ingredient documents
      console.log("Step 3 - adding ingrds");
      for (const ingredient of recipeDetails.recipeIngredients) {
        const ingredientRef = doc(
          this.db,
          "recipes",
          recipeDetails.recipeName,
          "ingredients",
          ingredient.ingredientName
        );

        // Set the qty field in the ingredient document
        await setDoc(ingredientRef, {
          qty: ingredient.quantity,
        });
      }
      console.log("step 3 completed");

      //Step 4: Add it to users createdRecipes
      console.log("Step 4 - update user contributions");
      this.addNewRecipeNameToUser(recipeDetails.recipeName);

      console.log("Recipe added successfully!");
    } catch (error) {
      console.error("Error adding recipe to Firestore:", error);
    }
  }

  async addNewRecipeNameToUser(recipeName) {
    try {
      const userCollectionRef = collection(this.db, "users");
      const userCollectionSnap = await getDocs(userCollectionRef);

      if (!userCollectionSnap.empty) {
        const firstUserDoc = userCollectionSnap.docs[0];
        const userDocRef = doc(this.db, "users", firstUserDoc.id);

        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userDocData = userDocSnap.data();

          const currentCreatedRecipes = userDocData.createdRecipes || [];

          // Add the new value to the array
          const updatedCreatedRecipes = [...currentCreatedRecipes, recipeName];

          // Update the document with the new 'createdRecipes' array
          await updateDoc(userDocRef, {
            createdRecipes: updatedCreatedRecipes,
          });

          console.log("Value added to createdRecipes array successfully.");
        } else {
          console.log("User document does not exist.");
        }
      }
    } catch (error) {
      console.error("Error updating createdRecipes array:", error);
    }
  }

  async addForkedRecipeNameToUser(recipeName) {
    try {
      const userCollectionRef = collection(this.db, "users");
      const userCollectionSnap = await getDocs(userCollectionRef);

      if (!userCollectionSnap.empty) {
        const firstUserDoc = userCollectionSnap.docs[0];
        const userDocRef = doc(this.db, "users", firstUserDoc.id);

        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userDocData = userDocSnap.data();

          const currentCreatedRecipes = userDocData.createdRecipes || [];

          // Add the new value to the array
          const updatedCreatedRecipes = [...currentCreatedRecipes, recipeName];

          // Update the document with the new 'createdRecipes' array
          await updateDoc(userDocRef, {
            createdRecipes: updatedCreatedRecipes,
          });

          console.log("Value added to createdRecipes array successfully.");
        } else {
          console.log("User document does not exist.");
        }
      }
    } catch (error) {
      console.error("Error updating createdRecipes array:", error);
    }
  }
}
