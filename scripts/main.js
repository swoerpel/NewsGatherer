

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
        console.log('search query',query)
        let response = await fetch(this.base_url + query + 'apiKey=' + this.apiKey);
        let data = await response.json();
        console.log(data)

    }




}


url_args = {
    country : 'us',
    // sources : 'bbc-news',
    q : 'Apple',
    sortBy : 'popularity'

}

let N = new NewsGatherer()
N.fetch_data(url_args)