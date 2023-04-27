import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  // Third Firebase Configuration
  apiKey: "AIzaSyDy6QLCpFteT6R8uy_AQaqbrBLhUXl9kkw",
  authDomain: "cacao-pamcak-84bec.firebaseapp.com",
  databaseURL: "https://cacao-pamcak-84bec-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "cacao-pamcak-84bec",
  storageBucket: "cacao-pamcak-84bec.appspot.com",
  messagingSenderId: "145929256674",
  appId: "1:145929256674:web:c3c76c07ef0b6ffa09e8bb"
  
  // Second Firebase Configuration
  // apiKey: "AIzaSyCrsBHji8SmH4dZVRLcHInRxFEmzrKx3Wo",
  // authDomain: "cacao-test.firebaseapp.com",
  // databaseURL: "https://cacao-test-default-rtdb.asia-southeast1.firebasedatabase.app",
  // projectId: "cacao-test",
  // storageBucket: "cacao-test.appspot.com",
  // messagingSenderId: "423532869885",
  // appId: "1:423532869885:web:2a103afd6f51672af1e694"
  
  // First Firebase Configuration
  // apiKey: "AIzaSyBI_9-g1KPt5vPTsQd8wD9KFubQe7pon18",
  // authDomain: "test-47314.firebaseapp.com",
  // databaseURL: "https://test-47314-default-rtdb.firebaseio.com",
  // projectId: "test-47314",
  // storageBucket: "test-47314.appspot.com",
  // messagingSenderId: "663872254872",
  // appId: "1:663872254872:web:719597f9089018346871ed",
  // measurementId: "G-GS2VXTNREH"
};

const app = initializeApp(firebaseConfig);
export default app;