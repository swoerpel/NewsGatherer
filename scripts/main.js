

class NewsGatherer
{

    constructor()
    {

        this.base_url = 'https://newsapi.org/v2/top-headlines?' 
        this.apiKey = '89fb0cc1c7b847c8beabe9ab81d96994'

    }

    async fetch_data(url_args)
    {   
        let query = ''
        let url_args_keys = Object.keys(url_args)
        for(let i = 0; i < url_args_keys.length; i++)
        {
            query += url_args_keys[i] + '=' + url_args[url_args_keys[i]] + '&'
        }
        // console.log('search query',query)
        let response = await fetch(this.base_url + query + 'apiKey=' + this.apiKey);
        return await this.post_data(await response.json())
        // console.log(this.chet)
    }

    post_data = async (data) =>
    {
        // let data = this.recent_response
        if (data.articles.length != 0) 
        {
            this.recent_response = data
            // console.log('rr',this.recent_response)
            for(let i = 0; i < data.articles.length; i++)
            {
                let result_list = document.getElementById("result_list");
                let entry = document.createElement("button");
                entry.className = "list-group-item list-group-item-action";
                entry.id = "news:" + i;
                // console.log(i)
                let list_item_name = data.articles[i].source.name
                entry.appendChild(document.createTextNode(list_item_name));
                result_list.appendChild(entry);
            }
        }
        return Promise.resolve(data)
    
        
    }

    populate_article = (news_result) =>
    {
        news_result = news_result.split(':')
        let article_id = news_result[1]
        console.log(article_id)
        console.log('populate articles',response_data)
        
        response_data.then(function(info){
            console.log('v',info)

            document.getElementById('source_field').innerHTML = info.articles[article_id].source.name
            document.getElementById('author_field').innerHTML = info.articles[article_id].author
            document.getElementById('title_field').innerHTML = info.articles[article_id].title
            document.getElementById('publish_date_field').innerHTML = info.articles[article_id].publishedAt

            let url_field = document.getElementById('url_field')
            url_field.href = info.articles[article_id].url
            // url_field.setAttribute('href', info.articles[article_id].url)
            url_field.innerHTML = info.articles[article_id].url
            // document.getElementById('url_field').href = 'http://www.cnn.com/'
            // document.getElementById('url_field').innerHTML = 'http://www.cnn.com/'


        })
        // let current_article = 
        // Promise.resolve(response_data).then((resp) => console.log(resp))

    }




}


$(document).on("click", '[id^="news:"]', (event) => N.populate_article(event.target.id));


let N = new NewsGatherer()
var response_data = {}

const searchNews = () => {
    console.log('SEARCH')
    let keywordTerm = document.getElementById('keywordSearch').value
    let countryTerm = document.getElementById('countrySearch').value
    let sourceTerm = document.getElementById('sourceSearch').value
    console.log(keywordTerm, countryTerm)
    url_args = {
        country : countryTerm,
        sources : sourceTerm,
        q       : keywordTerm,
        sortBy : 'popularity'

    }
    if (countryTerm == "")
    {
        delete url_args.country
    }
    if (sourceTerm == "")
    {
        delete url_args.sources
    }
    console.log('url arguements', url_args)
    if (keywordTerm == "")
    {
        alert('search arguement missing')
    }
    else
    {

        let N = new NewsGatherer()
        response_data = N.fetch_data(url_args)
        // console.log('lower data',article_info)
        N.post_data()
    }

    

}


