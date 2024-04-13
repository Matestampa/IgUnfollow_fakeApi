const express = require('express');
const app = express();
const PORT = 2000;

const {load_allData}=require("./utils.js")

const {fakeApi_userInfo,fakeApi_followers}=require("./controllers/main.js")

app.use(express.json());


// Primer endpoint
app.get('/FAKE_user_info/:username',fakeApi_userInfo );

// Segundo endpoint
app.get('/FAKE_followers/:user_id/:cursor',fakeApi_followers);

// Tercer endpoint
app.get('/auth', (req, res) => {
 
});

load_allData();

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`IG FAKE API RUNNING ON PORT: ${PORT}`);
});