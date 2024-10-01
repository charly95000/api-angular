const express = require('express')
const mongoose = require('mongoose');
const articlesRoutes = require('./routes/article-route');
const usersRoutes = require('./routes/user-route');
const path = require('path');

const app = express()


mongoose.connect('mongodb+srv://root:root@cluster0.npvjt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use('/images', express.static(path.join(__dirname, 'images')))  
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
app.use('/api/article', articlesRoutes);
app.use('/api/user', usersRoutes);





app.listen(process.env.PORT || 8080, () => {
    console.log("Serveur à l'écoute")
})