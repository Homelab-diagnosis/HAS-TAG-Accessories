// firebase.js - Firebase Initialization

// 1. Add Firebase SDKs to your index.html or HTML files:
// <script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js"></script>
// <script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js"></script>
// <script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js"></script>

// 2. Your Firebase Config Object
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// 3. Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Make auth & db available globally
window.auth = auth;
window.db = db;


// auth.js - Admin Login and Signup

// Signup Admin
async function signupAdmin(email, password) {
  try {
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    console.log("Admin signed up:", userCredential.user);
    alert("Admin signed up successfully!");
  } catch (error) {
    console.error("Signup Error:", error.message);
    alert(error.message);
  }
}

// Login Admin
async function loginAdmin(email, password) {
  try {
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    console.log("Admin logged in:", userCredential.user);
    alert("Login successful");
    window.location.href = "dashboard.html"; // redirect to admin dashboard
  } catch (error) {
    console.error("Login Error:", error.message);
    alert(error.message);
  }
}


// products.js - Upload and Fetch Products

// Add a product to Firestore
async function addProduct(data) {
  try {
    await db.collection("products").add(data);
    alert("Product added successfully!");
  } catch (error) {
    console.error("Add Product Error:", error.message);
    alert("Failed to add product.");
  }
}

// Fetch products from Firestore
async function fetchProducts() {
  try {
    const snapshot = await db.collection("products").get();
    const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.log("Fetched Products:", products);
    return products;
  } catch (error) {
    console.error("Fetch Products Error:", error.message);
    return [];
  }
}


// orders.js - Save and Fetch Orders

// Save customer order to Firestore
async function saveOrder(orderData) {
  try {
    await db.collection("orders").add(orderData);
    alert("Order placed successfully!");
  } catch (error) {
    console.error("Save Order Error:", error.message);
    alert("Failed to place order.");
  }
}

// Fetch all orders for admin
async function fetchOrders() {
  try {
    const snapshot = await db.collection("orders").orderBy("timestamp", "desc").get();
    const orders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.log("Fetched Orders:", orders);
    return orders;
  } catch (error) {
    console.error("Fetch Orders Error:", error.message);
    return [];
  }
}
