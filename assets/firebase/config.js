import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB0DPGGsoP60VkxV2ivxQYBSpphOp6XsxY",
  authDomain: "ikam-multitiendas.firebaseapp.com",
  projectId: "ikam-multitiendas",
  storageBucket: "ikam-multitiendas.appspot.com",
  messagingSenderId: "877233063554",
  appId: "1:877233063554:web:fe9358b0328f04eecf969b",
  measurementId: "G-PFFZZ9HZER"
};

let app;
let db;

// Obtener documentos de la colección 'pyme'
const cargarPymes = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "pyme"));
    const categorias = await getDocs(collection(db, "categoria"));
    
    // pymes
    querySnapshot.docs.map((doc) => {
      const item = doc.data();
      const content = document.getElementById('contenidopymes');
      const div = document.createElement('div');
      div.className = "col mb-4";
      div.innerHTML = `                                
              
                <div class="card h-100">
                    <img height="150rem" src="${item.imagen1}" class="card-img-top imga" alt="..." >
                    <div class="card-body">
                        <h5 class="card-title">${item.nombre_pyme}</h5>
                        <p class="card-text">
                          ${item.direccion}
                        </p>
                    </div>
                </div>
          `;
      content.appendChild(div);
    });
  } catch (error) {
    console.error('Error al cargar datos:', error);
  }
};

const cargarCategorias = async () => {  
  try {    
    const categorias = await getDocs(collection(db, "categoria"));
    categorias.docs.map((doc) => {
      const item = doc.data();
      const content = document.getElementById('categorias');
      const li = document.createElement('li');
      li.innerHTML = `<ul>${item.nombreCate}</ul>`;
      content.appendChild(li);         
    });
    console.log("llamando a categorias..")   
  } catch (error) {
    console.error('Error al cargar datos de categoria:', error);
  }
}

try {
  // Inicializar Firebase
  app = initializeApp(firebaseConfig);

  // Inicializar Firestore
  db = getFirestore(app);
  console.log("Firebase conectado correctamente.");

  cargarCategorias();
  cargarPymes();
} catch (error) {
  console.error("Error al conectar Firebase:", error);
}

