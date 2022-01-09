const firebaseConfig = {
    apiKey: process.env.API_KEY || "",
    authDomain: process.env.AUTH_DOMAIN || "",
    projectId: process.env.PROJECT_ID || "",
    storageBucket: process.env.STORAGE_BUCKET || "",
    messagingSenderId: process.env.MESSAGING_SENDER_ID|| "",
    appId: process.env.APP_ID || ""
}
console.log(process.env)
console.log(process.env.VUE_APP_PRUEBA)
export default firebaseConfig;
