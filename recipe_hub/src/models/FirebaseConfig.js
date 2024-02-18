import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

class FirebaseConfig {
  constructor() {
    this.app = initializeApp({
      apiKey: "AIzaSyCPhEcbkiySYg38JEVK-nUmzNJ08hdzfz0",
      authDomain: "recipehub-2822d.firebaseapp.com",
      projectId: "recipehub-2822d",
      storageBucket: "recipehub-2822d.appspot.com",
      messagingSenderId: "397137383460",
      appId: "1:397137383460:web:ec732284465758e4e308b1",
      measurementId: "G-RB0QG4M7EZ",
    });
    this.db = getFirestore(this.app);
    this.storage = getStorage(this.app);
  }
}

const firebaseConfigInstance = new FirebaseConfig();
export default firebaseConfigInstance;

// import { initializeApp } from "firebase/app";
// // import { getAnalytics } from "firebase/analytics";
// import {
//   getFirestore,
//   collection,
//   getDocs,
//   doc,
//   getDoc,
//   // addDoc,
// } from "firebase/firestore";
// import { getStorage, ref, getDownloadURL } from "firebase/storage";

// class FirebaseConfig {
//   constructor() {
//     this.app = initializeApp({
//       apiKey: "AIzaSyCPhEcbkiySYg38JEVK-nUmzNJ08hdzfz0",
//       authDomain: "recipehub-2822d.firebaseapp.com",
//       projectId: "recipehub-2822d",
//       storageBucket: "recipehub-2822d.appspot.com",
//       messagingSenderId: "397137383460",
//       appId: "1:397137383460:web:ec732284465758e4e308b1",
//       measurementId: "G-RB0QG4M7EZ",
//     });
//     this.db = getFirestore(this.app);
//     this.storage = getStorage(this.app);
//   }
// }

// export default class MyFirebaseDB {
//   constructor() {
//     this.firebaseConfig = FirebaseConfig;
//   }

//   fetchAllRecipes = async () => {
//     try {
//       if (!this.db) {
//         console.error("Database not initialized!");
//         return;
//       }
//       const recipesCollection = await getDocs(collection(this.db, "recipes"));
//       const recipeList = [];

//       for (let doc of recipesCollection.docs) {
//         recipeList.push(doc.data());
//       }
//       return recipeList;
//     } catch (error) {
//       console.error("Error fetching recipes:", error);
//       return [];
//     }
//   };

//   fetchRecipeDetails = async (recipeName, setStateCallback) => {
//     try {
//       const recipeDocRef = doc(this.db, "recipes", recipeName);
//       const recipeDocSnap = await getDoc(recipeDocRef);

//       if (recipeDocSnap.exists()) {
//         const recipeDetails = recipeDocSnap.data();

//         // Fetch ingredients
//         const ingredientsRef = collection(
//           this.db,
//           "recipes",
//           recipeName,
//           "ingredients"
//         );
//         const ingredientsSnap = await getDocs(ingredientsRef);

//         // Map ingredients data
//         const ingredientDict = {};
//         ingredientsSnap.docs.forEach((doc) => {
//           const data = doc.data();
//           const ingredientName = doc.id;
//           const quantity = data.qty;
//           ingredientDict[ingredientName] = quantity;
//         });

//         setStateCallback({
//           recipeDetails: {
//             recipeIngredients: ingredientDict,
//             recipeInstructions: recipeDetails.instructions,
//             recipeAuthor: recipeDetails.author,
//             recipeName: recipeName,
//           },
//         });

//         console.log("Recipe Details fetched:", this.state.recipeDetails);
//         return this.state.recipeDetails;
//       } else {
//         console.log("Recipe not found -- js file");
//         return null;
//       }
//     } catch (error) {
//       console.error("Error fetching recipe details:", error);
//       return null;
//     }
//   };

//   getRecipeById = async (id) => {
//     try {
//       const recipeDoc = await this.db.collection("recipes").doc(id).get();
//       return recipeDoc.data();
//     } catch (error) {
//       console.error("Error fetching recipe by ID:", error);
//       return null;
//     }
//   };

//   downloadImage = async (recipeName, setStateCallback) => {
//     try {
//       console.log("trying to download image", recipeName);
//       const imageRef = ref(this.storage, `/images/${recipeName}.png`);
//       const url = await getDownloadURL(imageRef);
//       setStateCallback({ imageUrl: url });
//     } catch (error) {
//       console.error("Error downloading image:", error);
//     }
//   };
// }
