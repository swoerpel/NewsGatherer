const express = require('express')
const app = express()
const port = 3000

const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('89fb0cc1c7b847c8beabe9ab81d96994');

app.get('/', (req, res) => {

newsapi.v2.sources(
    {
        category: 'technology',
        language: 'en',
        country: 'us'
    })
    .then(response => 
    {
        res.send(response);
    });
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))