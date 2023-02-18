
     // default settings (sVariable)
    let API_KEY = 'API_KEY'; 
    let API_HOST = 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com';
    let sHits = '30'; // number of search hits, 8-24 is recommended
    let sHomeRecipes: number[] = [690978, 628780, 626234, 812399]; // array with recipes (IDs) to be shown on the Home page
    let sShowHomeRecipes:boolean = true; // Show Home recipes - on or off (default: true)
    let sShowRecipeID:boolean = false; // Show recipe IDs in search (default: false)
    let sShowHPRSummary:boolean = false; // Show recipe Summary text on the Home page (default: false)

    let section2 = document.querySelector("#section2") as HTMLDivElement;
    let section2b = document.querySelector("#section2b") as HTMLDivElement;
    let section2c = document.querySelector("#section2c") as HTMLDivElement;
    let section2d = document.querySelector("#section2d") as HTMLDivElement;

    const homeLink = document.querySelector("#home-link") as HTMLAnchorElement;
    const searchLink = document.querySelector("#search-link") as HTMLAnchorElement;
    const favoriteLink = document.querySelector("#favorite-link") as HTMLAnchorElement;
    const recipeLink = document.querySelector("#recipe-link") as HTMLAnchorElement;

    let mainHeader = document.querySelector("#main-header") as HTMLDivElement;
    let searchDiv = document.querySelector("#search-div") as HTMLDivElement;
    let promoDiv = document.querySelector("#promo-div") as HTMLDivElement;
    let favoriteDiv = document.querySelector("#favorite-div") as HTMLDivElement;
    let recipeDiv = document.querySelector("#recipe-div") as HTMLDivElement;

    let tooltipBox= document.querySelector(".tooltiptext") as HTMLSpanElement;

    // Search inputs
    let searchField = document.querySelector("#search-field") as HTMLInputElement;
    let searchButton = document.querySelector("#search-button") as HTMLButtonElement;
    
    let diets = document.querySelector("#diets") as HTMLSelectElement;

    let glutenFree = document.querySelector("#gluten-free") as HTMLInputElement;
    let dairyFree = document.querySelector("#dairy-free") as HTMLInputElement;
    let eggFree = document.querySelector("#egg-free") as HTMLInputElement;
    let peanutFree = document.querySelector("#peanut-free") as HTMLInputElement;
    let sesameFree = document.querySelector("#sesame-free") as HTMLInputElement;
    let seafoodFree = document.querySelector("#seafood-free") as HTMLInputElement;
    let shellfishFree = document.querySelector("#shellfish-free") as HTMLInputElement;
    let soyFree = document.querySelector("#soy-free") as HTMLInputElement;
    let sulfiteFree = document.querySelector("#sulfite-free") as HTMLInputElement;
    let treenutFree = document.querySelector("#treenut-free") as HTMLInputElement;
    let wheatFree = document.querySelector("#wheat-free") as HTMLInputElement;
    
    let excludeIngredients = document.querySelector("#exclude-ingredients") as HTMLInputElement;
    
   
    // API Image URL
    const imageURL: string = 'https://spoonacular.com/recipeImages/';
           
    // API fetch URL
    const fetchURL: string = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/';

     // API method, host, and key
     const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': API_KEY,
            'X-RapidAPI-Host': API_HOST
        }
    };
    

    let fetchType: string;
    let fetchId: number;
    let fetchString: string;

    /*
    let defaultSettings: string[] = [
            '&intolerances=gluten',
            '&diet=vegetarian',                       
    ]*/



    async function getData(query: string, fetchType: string, fetchId: number) {

        // 4 different URL's with different kind of results.

        // Information provides detailed information about a specific recipe
        // Example URL: https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/479101/information

        // Standard performs a standard search using search settings such as:
        // food type (query), intolerances, type (for example main course, appetizer), excludeIngredients
        // and returns ImageURL, ImageType, recipe ID and Recipe Title
        // Example URL ending: ?query=burger&diet=vegetarian&excludeIngredients=coconut&intolerances=egg%2C%20gluten&number=10&offset=0&type=main%20course

        // Random generates a random, detailed, result that takes search settings (?tags=) into account
        // Example URL: https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?tags=vegetarian%2Cdessert&number=1

        // Complex is currently not in use in WYCE 1.0, but is the most complex one with tons of allowed settings

        // Similar is currently not in use, but finds recipes which are similar to the given one (id)
        // Example: https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/156992/similar

        switch (fetchType) {
            
            case "information":
                fetchString = fetchId + '/information';
                break;
            case "standard":
                fetchString = 'search?query=' + query;
                break;
            case "random":
                    fetchString = 'random?tags=' + query;
                    break;
            case "complex":
                fetchString = 'complexSearch?query=' + query; // not in use in WYCE 1.0
                break;

            case "similar":
                fetchString = '/similar'; // not in use in WYCE 1.0 but will be used in the next version.
                break;

        }

    
        let wyceFetch: string = fetchURL + fetchString;
        
        const response = await fetch(wyceFetch, options);
        const data = await response.json();
       
        return data;

    }

   

    // Function that creates recipe <article> blocks in Section 2 of <main>
    // The ID of the recipe article is passed as an argument (fetchID)
    function frontArticle(fetchId: number) {

        // Show loading GIF animation
        let loadingDIV = document.createElement("div") as HTMLDivElement;
        let loadingGIF = document.createElement("img") as HTMLImageElement;
        loadingGIF.src = 'images/loading.gif';
        loadingGIF.id = 'loading';
        loadingDIV.append(loadingGIF);
        section2c.append(loadingDIV);

        getData('', 'information', fetchId).then((data: any) => {

                // hide loadingGIF animation when finished loading
                removeAllChildNodes(loadingDIV);
                section2c.removeChild(loadingDIV); 
                
                let frontArticle = document.createElement("article") as HTMLDivElement;
                let h1 = document.createElement("h1") as HTMLDivElement;
                let img = document.createElement("img") as HTMLImageElement;

                let diets = document.createElement("p") as HTMLParagraphElement;
                let row1 = document.createElement("p") as HTMLParagraphElement;
                let row2 = document.createElement("p") as HTMLParagraphElement;


                let p = document.createElement("p") as HTMLParagraphElement;
                let div = document.createElement("div") as HTMLDivElement;
                let button = document.createElement("button") as HTMLButtonElement;        
                
                

                let div2 = document.createElement("div") as HTMLDivElement;
               
                let p1 = document.createElement("p") as HTMLParagraphElement;
                let p2 = document.createElement("p") as HTMLParagraphElement;



        
                p1.innerHTML = 'Ready in: ' + data.readyInMinutes + ' minutes';
            
                

                div2.append(p1); 

                for (let i in data.extendedIngredients) {
                    let li = document.createElement("li") as HTMLLIElement;
                    li.innerHTML = data.extendedIngredients[i].amount + " " + data.extendedIngredients[i].measures.metric.unitLong + " of " + data.extendedIngredients[i].nameClean;
                    div2.append(li);
                }
     

                img.className = "rimg";
                div.className = "button-div";
              
                button.className = "button";
                button.innerHTML = "Show Recipe";

                div2.className = "hiddenDiv";

                h1.innerHTML = data.title; // Recipe Article Title           
                img.src = data.image; // Recipe Image URL              
                

                // Show Home page recipe Summary if set to true
                if (sShowHPRSummary) {
                    p.innerHTML = data.summary; // Recipe Summary
                }
               
                p2.innerHTML = data.instructions; // Recipe Instructions



                button.addEventListener("click", function() {
                    
                    if (button.innerHTML == 'Show Recipe') {
                        button.innerHTML = 'Hide Recipe';
                        div2.className = "visibleDiv";
                    } else {
                        button.innerHTML = 'Show Recipe';
                        div2.className = "hiddenDiv";                       
                    }
                    

                  });

                div.append(button);
                
                div2.append(p2);

                frontArticle.append(h1);
                frontArticle.append(img);

                  diets.innerHTML = '<b>Diets:</b> ';

                // List diets
                for (let i in data.diets) {                  
                    diets.innerHTML += data.diets[i] + ', ';
                }

                if (data.glutenFree==false) { row1.innerHTML = "Gluten-free: <img src='images/redNo.png' style='width: 14px; height: 10px;'> &nbsp;&nbsp;"; } else { row1.innerHTML = "Gluten free: <img src='images/greenCheck2.jpg' style='width: 10px; height: 10px;'> &nbsp;&nbsp;"; }
                if (data.dairyFree==false) { row1.innerHTML += "Dairy-free: <img src='images/redNo.png' style='width: 14px; height: 10px;'> &nbsp;&nbsp;"; } else { row1.innerHTML += "Dairy-free: <img src='images/greenCheck2.jpg' style='width: 10px; height: 10px;'> &nbsp;&nbsp;"; }
                if (data.vegan==false) { row1.innerHTML += "Vegan: <img src='images/redNo.png' style='width: 14px; height: 10px;'>"; } else { row1.innerHTML += "Vegan: <img src='images/greenCheck2.jpg' style='width: 10px; height: 10px;'>"; }
                if (data.vegetarian==false) { row2.innerHTML = "Vegetarian: <img src='images/redNo.png' style='width: 14px; height: 10px;'> &nbsp;&nbsp;"; } else { row2.innerHTML = "Vegetarian: <img src='images/greenCheck2.jpg' style='width: 14px; height: 14px;'> &nbsp;&nbsp;"; }
                if (data.lowFodmap==false) { row2.innerHTML += "Low fodmap: <img src='images/redNo.png' style='width: 14px; height: 10px;'>"; } else { row2.innerHTML += "Low fodmap: <img src='images/greenCheck2.jpg' style='width: 10px; height: 10px;'>"; }

                frontArticle.append(diets);
                frontArticle.append(row1);
                frontArticle.append(row2);

                frontArticle.append(p);
                frontArticle.append(div);

                frontArticle.append(div2);

                // Place frontArticle in the main container Section 2
                section2c.append(frontArticle);
                

                return data.instructions; // Recipe instructions are returned

        });     
    }




    // Function that creates recipe <article> blocks in Section 2d of <main>
    // The ID of the recipe article is passed as an argument (fetchID)
    function frontArticle2(fetchId: number) {

        // Show loading GIF animation
        let loadingDIV = document.createElement("div") as HTMLDivElement;
        let loadingGIF = document.createElement("img") as HTMLImageElement;
        loadingGIF.src = 'images/loading.gif';
        loadingGIF.id = 'loading';
        loadingDIV.append(loadingGIF);
        section2d.append(loadingDIV);
        
        getData('', 'information', fetchId).then((data: any) => {

                // hide loadingGIF animation when finished loading
                removeAllChildNodes(loadingDIV);
                section2d.removeChild(loadingDIV); 
                
                let ingredients = document.createElement("article") as HTMLDivElement;
                let instructions = document.createElement("article") as HTMLDivElement;

                let h1 = document.createElement("h1") as HTMLDivElement;
                let h1b = document.createElement("h1") as HTMLDivElement;
                let img = document.createElement("img") as HTMLImageElement;

                let diets = document.createElement("p") as HTMLParagraphElement;
                let row1 = document.createElement("p") as HTMLParagraphElement;
                let row2 = document.createElement("p") as HTMLParagraphElement;

                let div1 = document.createElement("div") as HTMLDivElement;
                let div2 = document.createElement("div") as HTMLDivElement;
               
                let p1 = document.createElement("p") as HTMLParagraphElement;
                let p2 = document.createElement("p") as HTMLParagraphElement;

        
                p1.innerHTML = 'Ready in: ' + data.readyInMinutes + ' minutes';
            

                div2.append(p1); 

                for (let i in data.extendedIngredients) {
                    let li = document.createElement("li") as HTMLLIElement;
                    li.innerHTML = data.extendedIngredients[i].amount + " " + data.extendedIngredients[i].measures.metric.unitLong + " of " + data.extendedIngredients[i].nameClean;
                    div2.append(li);
                }
     

                img.className = "rimg";


                h1.innerHTML = data.title; // Recipe Article Title 
                h1b.innerHTML = 'Instructions'; // Recipe instructions title  
                img.src = data.image; // Recipe Image URL              


               
                p2.innerHTML = data.instructions; // Recipe Instructions


                div1.append(h1b);
                div1.append(p2);

                ingredients.append(h1);
                ingredients.append(img);

                diets.innerHTML = '<b>Diets:</b> ';

                // List diets
                for (let i in data.diets) {                  
                    diets.innerHTML += data.diets[i] + ', ';
                }

                if (data.glutenFree==false) { row1.innerHTML = "Gluten-free: <img src='images/redNo.png' style='width: 14px; height: 10px;'> &nbsp;&nbsp;"; } else { row1.innerHTML = "Gluten free: <img src='images/greenCheck2.jpg' style='width: 10px; height: 10px;'> &nbsp;&nbsp;"; }
                if (data.dairyFree==false) { row1.innerHTML += "Dairy-free: <img src='images/redNo.png' style='width: 14px; height: 10px;'> &nbsp;&nbsp;"; } else { row1.innerHTML += "Dairy-free: <img src='images/greenCheck2.jpg' style='width: 10px; height: 10px;'> &nbsp;&nbsp;"; }
                if (data.vegan==false) { row1.innerHTML += "Vegan: <img src='images/redNo.png' style='width: 14px; height: 10px;'>"; } else { row1.innerHTML += "Vegan: <img src='images/greenCheck2.jpg' style='width: 10px; height: 10px;'>"; }
                if (data.vegetarian==false) { row2.innerHTML = "Vegetarian: <img src='images/redNo.png' style='width: 14px; height: 10px;'> &nbsp;&nbsp;"; } else { row2.innerHTML = "Vegetarian: <img src='images/greenCheck2.jpg' style='width: 14px; height: 14px;'> &nbsp;&nbsp;"; }
                if (data.lowFodmap==false) { row2.innerHTML += "Low fodmap: <img src='images/redNo.png' style='width: 14px; height: 10px;'>"; } else { row2.innerHTML += "Low fodmap: <img src='images/greenCheck2.jpg' style='width: 10px; height: 10px;'>"; }

                ingredients.append(diets);
                ingredients.append(row1);
                ingredients.append(row2);

                ingredients.append(div2);

                instructions.append(div1);

                // Place frontArticle in the main container Section 2
                section2d.append(ingredients);
                section2d.append(instructions);
                
                return data.instructions; // Recipe instructions are returned

        });     
    }    






   // Function that creates a random recipe <article> block in Section 2d of <main>
    function frontArticleRandom(query: string) {

        removeAllChildNodes(section2d);

        // Show loading GIF animation
        let loadingDIV = document.createElement("div") as HTMLDivElement;
        let loadingGIF = document.createElement("img") as HTMLImageElement;
        loadingGIF.src = 'images/loading.gif';
        loadingGIF.id = 'loading';
        loadingDIV.append(loadingGIF);
        section2d.append(loadingDIV);
        
        // random as second argument
        getData(query, 'random', fetchId).then((data: any) => {

                // hide loadingGIF animation when finished loading
                removeAllChildNodes(loadingDIV);
                section2d.removeChild(loadingDIV); 
                
                let ingredients = document.createElement("article") as HTMLDivElement;
                let instructions = document.createElement("article") as HTMLDivElement;

                let h1 = document.createElement("h1") as HTMLDivElement;
                let h1b = document.createElement("h1") as HTMLDivElement;
                let img = document.createElement("img") as HTMLImageElement;

                let diets = document.createElement("p") as HTMLParagraphElement;
                let row1 = document.createElement("p") as HTMLParagraphElement;
                let row2 = document.createElement("p") as HTMLParagraphElement;

                let div1 = document.createElement("div") as HTMLDivElement;
                let div2 = document.createElement("div") as HTMLDivElement;
               
                let p1 = document.createElement("p") as HTMLParagraphElement;
                let p2 = document.createElement("p") as HTMLParagraphElement;

        
                p1.innerHTML = 'Ready in: ' + data.recipes[0].readyInMinutes + ' minutes';
            

                div2.append(p1); 

                
                for (let i in data.recipes[0].extendedIngredients) {
                    let li = document.createElement("li") as HTMLLIElement;
                    li.innerHTML = data.recipes[0].extendedIngredients[i].amount + " " + data.recipes[0].extendedIngredients[i].measures.metric.unitLong + " of " + data.recipes[0].extendedIngredients[i].nameClean;
                    div2.append(li);
                }
     

                img.className = "rimg";


                h1.innerHTML = data.recipes[0].title; // Recipe Article Title 
                h1b.innerHTML = 'Instructions'; // Recipe instructions title  
                img.src = data.recipes[0].image; // Recipe Image URL              


               
                p2.innerHTML = data.recipes[0].instructions; // Recipe Instructions


                div1.append(h1b);
                div1.append(p2);

                ingredients.append(h1);
                ingredients.append(img);

                diets.innerHTML = '<b>Diets:</b> ';

                // List diets
                for (let i in data.recipes[0].diets) {                  
                    diets.innerHTML += data.recipes[0].diets[i] + ', ';
                }

                if (data.recipes[0].glutenFree==false) { row1.innerHTML = "Gluten-free: <img src='images/redNo.png' style='width: 14px; height: 10px;'> &nbsp;&nbsp;"; } else { row1.innerHTML = "Gluten free: <img src='images/greenCheck2.jpg' style='width: 10px; height: 10px;'> &nbsp;&nbsp;"; }
                if (data.recipes[0].dairyFree==false) { row1.innerHTML += "Dairy-free: <img src='images/redNo.png' style='width: 14px; height: 10px;'> &nbsp;&nbsp;"; } else { row1.innerHTML += "Dairy-free: <img src='images/greenCheck2.jpg' style='width: 10px; height: 10px;'> &nbsp;&nbsp;"; }
                if (data.recipes[0].vegan==false) { row1.innerHTML += "Vegan: <img src='images/redNo.png' style='width: 14px; height: 10px;'>"; } else { row1.innerHTML += "Vegan: <img src='images/greenCheck2.jpg' style='width: 10px; height: 10px;'>"; }
                if (data.recipes[0].vegetarian==false) { row2.innerHTML = "Vegetarian: <img src='images/redNo.png' style='width: 14px; height: 10px;'> &nbsp;&nbsp;"; } else { row2.innerHTML = "Vegetarian: <img src='images/greenCheck2.jpg' style='width: 14px; height: 14px;'> &nbsp;&nbsp;"; }
                if (data.recipes[0].lowFodmap==false) { row2.innerHTML += "Low fodmap: <img src='images/redNo.png' style='width: 14px; height: 10px;'>"; } else { row2.innerHTML += "Low fodmap: <img src='images/greenCheck2.jpg' style='width: 10px; height: 10px;'>"; }

                ingredients.append(diets);
                ingredients.append(row1);
                ingredients.append(row2);

                ingredients.append(div2);

                instructions.append(div1);

                // Place frontArticle in the main container Section 2
                section2d.append(ingredients);
                section2d.append(instructions);
                
                return data.recipes[0].instructions; // Recipe instructions are returned

        });     
    }    












    // Function to dynamically style the Navbar
    function navStyling(page: string) {

        searchLink.style.removeProperty("background-color");
        favoriteLink.style.removeProperty("background-color");
        homeLink.style.removeProperty("background-color");
        recipeLink.style.removeProperty("background-color");

        switch(page) {

            case "search":
                searchLink.style.background = "#bbb"; 
                break;
            case "favorites":
                favoriteLink.style.background = "#bbb";
                break;                
            case "home":
                homeLink.style.background = "#bbb";
                break;
            case "recipe":
                recipeLink.style.background = "#bbb";
                break;
        }
        
    }




    homeLink.addEventListener("click", function() {
       
        //removeAllChildNodes(section2);
        // hide section2b, 2c and 2d and show section2 (search results)
        section2.style.display = "none"; // flex or none
        section2b.style.display = "none"; // flex or none      
        section2d.style.display = "none"; // flex or none  
        section2c.style.display = "flex"; // flex or none  

        mainHeader.className = "promo-header";
        searchDiv.style.display = "none"; 
        favoriteDiv.style.display = "none"; 
        recipeDiv.style.display = "none"; 
        promoDiv.style.display = "block"; 


        
        navStyling('home');

      });

    searchLink.addEventListener("click", function() {
       
        // hide section2b, 2c and 2d and show section2 (search results)
        section2b.style.display = "none"; // flex or none
        section2c.style.display = "none"; // flex or none   
        section2d.style.display = "none"; // flex or none   
        section2.style.display = "flex"; // flex or none     

        mainHeader.className = "search-header";
        promoDiv.style.display = "none"; 
        favoriteDiv.style.display = "none"; 
        recipeDiv.style.display = "none"; 
        searchDiv.style.display = "block"; 

        navStyling('search');

      });

      favoriteLink.addEventListener("click", function() {
       
        //removeAllChildNodes(section2);
        // hide section2, 2c and 2d and show section2b (favorites)
        section2.style.display = "none"; // flex or none   
        section2c.style.display = "none"; // flex or none   
        section2d.style.display = "none"; // flex or none
        section2b.style.display = "flex"; // flex or none

        mainHeader.className = "favorite-header";
        searchDiv.style.display = "none"; 
        promoDiv.style.display = "none"; 
        recipeDiv.style.display = "none"; 
        favoriteDiv.style.display = "block"; 

        navStyling('favorites');
        favoriteArticles();
        
      });    
      
      
      recipeLink.addEventListener("click", function() {
       
        //removeAllChildNodes(section2);
        // hide section2, 2c and 2d and show section2b (favorites)
        section2.style.display = "none"; // flex or none   
        section2b.style.display = "none"; // flex or none   
        section2c.style.display = "none"; // flex or none
        section2d.style.display = "flex"; // flex or none

        mainHeader.className = "recipe-header";
        searchDiv.style.display = "none"; 
        promoDiv.style.display = "none"; 
        favoriteDiv.style.display = "none"; 
        recipeDiv.style.display = "block"; 

        navStyling('recipe');

        // if no Recipe has been loaded in the recipe page, load a random one
        if (section2d.innerHTML=="") {
            frontArticleRandom(checkSearchOptions('random'));
        }
        
      }); 

      recipeLink.addEventListener("dblclick", function() {
       
        //removeAllChildNodes(section2);
        // hide section2, 2c and 2d and show section2b (favorites)
        section2.style.display = "none"; // flex or none   
        section2b.style.display = "none"; // flex or none   
        section2c.style.display = "none"; // flex or none
        section2d.style.display = "flex"; // flex or none

        mainHeader.className = "recipe-header";
        searchDiv.style.display = "none"; 
        promoDiv.style.display = "none"; 
        favoriteDiv.style.display = "none"; 
        recipeDiv.style.display = "block"; 

        navStyling('recipe');

        frontArticleRandom(checkSearchOptions('random'));
           
      });



// Auto run seletced Home Page recipes
if (sShowHomeRecipes) {
    for (let i in sHomeRecipes) {
        frontArticle(sHomeRecipes[i]);   
    }
}    


// run tooltiptext on load
/*
tooltipBox.style.visibility = 'visible';

function onStartup() {
    // hide tooltiptext
    tooltipBox.style.visibility = "hidden";
};

setTimeout(onStartup, 8000); // hides tooltip after 3 seconds
*/


// Function to remove all child-nodes (content) in a chosen container-element
// Used to empty DIV's and other containers
function removeAllChildNodes(parent: HTMLDivElement) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}











function searchArticles(query: string) {

    // Reset the wyceObject array
    wyceObject.article = [];

    // Empty <main> section 2.
    removeAllChildNodes(section2);

    // Show loading GIF animation
    let loadingDIV = document.createElement("div") as HTMLDivElement;
    let loadingGIF = document.createElement("img") as HTMLImageElement;
    loadingGIF.src = 'images/loading.gif';
    loadingGIF.id = 'loading';
    loadingDIV.append(loadingGIF);
    section2.append(loadingDIV);

    getData(query, 'standard', 0).then((data: any) => {
            
        // hide loadingGIF animation when finished loading
        removeAllChildNodes(loadingDIV);
        section2.removeChild(loadingDIV); 

        //console.log(data);

        // Save the first 10 results in wyceObject
        let wyceArticle: wyceTypes;

        for (let key in data.results) {

          wyceArticle = { 

                id: data.results[key].id, 
                image: data.results[key].image, 
                imageType: data.results[key].imageType, 
                title: data.results[key].title,      

            }


            wyceObject.article.push(wyceArticle);

        }

        for (let n in wyceObject.article) { 

            let searchArticles = document.createElement("article") as HTMLDivElement;
            let h1 = document.createElement("h1") as HTMLDivElement;
            let img = document.createElement("img") as HTMLImageElement;
            img.className = "rimg";

            h1.innerHTML = `${wyceObject.article[n].title}`;
            img.src = imageURL + wyceObject.article[n].image;
            searchArticles.append(h1);
            searchArticles.append(img);

            // Button to Show Recipe
            let button = document.createElement("button") as HTMLButtonElement; 
            button.className = "button";
            button.innerHTML = "Go to Recipe";
            button.addEventListener("click", function() {                
                    // Empty <main> section2d, display recipe there and go there
                    removeAllChildNodes(section2d);
                    frontArticle2(wyceObject.article[n].id);
                    recipeLink.click();
              });

            searchArticles.append(button);

            // Show recipe ID if the sShowRecipeID setting is set to true
            if (sShowRecipeID) {  
                let recipeID = document.createElement("span") as HTMLSpanElement;
                recipeID.className = "recipe-id";
                recipeID.innerText = 'Recipe ID: ' + wyceObject.article[n].id.toString();
                searchArticles.append(recipeID);
            }
            

            let articleFooter = document.createElement("div") as HTMLDivElement;
            articleFooter.className = "articleFooter";
            let favorite = document.createElement("input") as HTMLInputElement;
            favorite.setAttribute("type", "checkbox");
            favorite.checked = true;


            // IF: check if the recipe has already been added to Favorites and then make the STAR below filled
            if (wyceObject.favorite.filter(e => e.id === wyceObject.article[n].id).length > 0) {
                favorite.className = "favorites";
                favorite.id = "favorites";

                    favorite.addEventListener("click", function() {                
                        if(!favorite.checked) {
                            // Filter that removes the favorite recipe just unchecked from favorites
                            wyceObject.favorite = wyceObject.favorite.filter((_item, index, arr) => {
                                // return only those array items where the .id is not the same as the current .id
                                // i.e removal of the recipe just unchecked from the wyceObject.favorite array.
                                return arr[index].id!==wyceObject.article[n].id; 
                            });
                            
                        } else {

                             // Save recipe in the wyceObject's favorites
                             wyceObject.favorite.push(wyceObject.article[n]);
                                                   

                        }
       
                });
              // ELSE: if the recipe wasn't found in favorites: make sure that it can be added by clicking the STAR. 
              } else {
                favorite.className = "favorite";
                favorite.id = "favorite";

                    favorite.addEventListener("click", function() {                
                        if(favorite.checked) {
                            // Filter that removes the favorite recipe just unchecked from favorites
                            wyceObject.favorite = wyceObject.favorite.filter((_item, index, arr) => {
                                // return only those array items where the .id is not the same as the current .id
                                // i.e removal of the recipe just unchecked from the wyceObject.favorite array.
                                return arr[index].id!==wyceObject.article[n].id; 
                            });
                            
                        }
                        else {  
                            // Save recipe in the wyceObject's favorites
                            wyceObject.favorite.push(wyceObject.article[n]);
                               
                        }
                });              

              }



            articleFooter.append(favorite);
            searchArticles.append(articleFooter);

            section2.append(searchArticles);

           
        }

        //${getInformation(wyceObject.article[n].id)}
        
    });     

}





function favoriteArticles() {

    // Empty <main> section 2.
    removeAllChildNodes(section2b);


    
        for (let n in wyceObject.favorite) { 

            let favArticles = document.createElement("article") as HTMLDivElement;
            let h1 = document.createElement("h1") as HTMLDivElement;
            let img = document.createElement("img") as HTMLImageElement;
            img.className = "rimg";

            h1.innerHTML = `${wyceObject.favorite[n].title}`;
            img.src = imageURL + wyceObject.favorite[n].image;
            favArticles.append(h1);
            favArticles.append(img);

            // Button to Show Recipe
            let button = document.createElement("button") as HTMLButtonElement; 
            button.className = "button";
            button.innerHTML = "Go to Recipe";
            button.addEventListener("click", function() {                
                     // Empty <main> section2d, display recipe there and go there
                    removeAllChildNodes(section2d);
                    frontArticle2(wyceObject.favorite[n].id);
                    recipeLink.click();
              });

            favArticles.append(button);

            let articleFooter = document.createElement("div") as HTMLDivElement;
            articleFooter.className = "articleFooter";
            let favorite = document.createElement("input") as HTMLInputElement;
            favorite.setAttribute("type", "checkbox");
            favorite.checked = true;
            favorite.className = "favorites";
           
            favorite.id = "favorites";

            articleFooter.append(favorite);
            favArticles.append(articleFooter);

            section2b.append(favArticles);

            favorite.addEventListener("click", function() {                
               
                    // Filter that removes the favorite recipe just unchecked from favorites
                    wyceObject.favorite = wyceObject.favorite.filter((_item, index, arr) => {
                        // return only those array items where the .id is not the same as the current .id
                        // i.e removal of the recipe just unchecked from the wyceObject.favorite array.
                        return arr[index].id!==wyceObject.favorite[n].id; 
                      });
                      // re-run the favoriteArticles function after removal to see the update
                      favoriteArticles();
                      
                      
               
          });

        
        }


        
      

}



    // wyceObject type pattern
    interface wyceObject {
        article: Array<wyceTypes>;
        favorite: Array<wyceTypes>;
      }

      // wyceTypes type pattern
      interface wyceTypes {
        id: number;
        image: string;
        imageType: string;
        title: string;        
      } 

    // Wyce object to save recipes in, using type-pattern wyceObject
    const wyceObject: wyceObject = {      
        article: [],
        favorite: []
    }


    // Read the users search options, as for example checkboxes and other options
    // and return a string to send to the Recipe API
    function checkSearchOptions(searchType: string):string {

        let searchOptions: string = '';
        let searchOptions2: string = '';



        // ############################################################################################################
        // Check for intolerances and return search string based on checked boxes
        // Possible values: dairy, egg, gluten, peanut, sesame, seafood, shellfish, soy, sulfite, tree nut, and wheat
        let intolerances: string = '';
        let tags: string = '';

        if (glutenFree.checked) { 
            if (intolerances!=='') { 
                intolerances += ','; 
            } else { intolerances += '&intolerances='; }
            intolerances += 'gluten';
        }
        if (dairyFree.checked) { 
            if (intolerances!=='') { intolerances += ','; 
            } else { intolerances += '&intolerances='; }
            intolerances += 'dairy'; 
        }
        if (eggFree.checked) { 
            if (intolerances!=='') { intolerances += ','; 
            } else { intolerances += '&intolerances='; }
            intolerances += 'egg'; 
        }
        if (peanutFree.checked) { 
            if (intolerances!=='') { intolerances += ','; 
            } else { intolerances += '&intolerances='; }
            intolerances += 'peanut'; 
        }  
        if (sesameFree.checked) { 
            if (intolerances!=='') { intolerances += ','; 
            } else { intolerances += '&intolerances='; }
            intolerances += 'sesame'; 
        }          
        if (seafoodFree.checked) { 
            if (intolerances!=='') { intolerances += ','; 
            } else { intolerances += '&intolerances='; }
            intolerances += 'seafood'; 
        }    
        if (shellfishFree.checked) { 
            if (intolerances!=='') { intolerances += ','; 
            } else { intolerances += '&intolerances='; }
            intolerances += 'shellfish'; 
        }    
        if (soyFree.checked) { 
            if (intolerances!=='') { intolerances += ','; 
            } else { intolerances += '&intolerances='; }
            intolerances += 'soy'; 
        }    
        if (sulfiteFree.checked) { 
            if (intolerances!=='') { intolerances += ','; 
            } else { intolerances += '&intolerances='; }
            intolerances += 'sulfite'; 
        } 
        if (treenutFree.checked) { 
            if (intolerances!=='') { intolerances += ','; 
            } else { intolerances += '&intolerances='; }
            intolerances += 'tree%20nut'; // CHECK om det ska va " " eller + eller %20
        }
        if (wheatFree.checked) { 
            if (intolerances!=='') { intolerances += ','; 
            } else { intolerances += '&intolerances='; }
            intolerances += 'wheat';
        }              
        
        intolerances = intolerances.replace(",","%2c");
  
        // ############################################################################################################
 
         // replace blank space with URL suitable
         let searchValue:string = searchField.value.replace(/ /g,"%20");

        // ############################################################################################################

        // Tags section for random API version of search
        if (searchValue!=='') { 
            searchOptions2 += searchValue + ','; 
        }

        if (glutenFree.checked) { 
            if (tags!=='') { 
                tags += ','; 
            } 
            tags += 'gluten free';
        }
        if (dairyFree.checked) { 
            if (tags!=='') { 
                tags += ','; 
            } 
            tags += 'dairy free';
        }
        if (eggFree.checked) { 
            if (tags!=='') { 
                tags += ','; 
            } 
            tags += 'egg free';
        }
        if (peanutFree.checked) { 
            if (tags!=='') { 
                tags += ','; 
            } 
            tags += 'peanut free';
        }  
        if (sesameFree.checked) { 
            if (tags!=='') { 
                tags += ','; 
            } 
            tags += 'sesame free';
        }          
        if (seafoodFree.checked) { 
            if (tags!=='') { 
                tags += ','; 
            } 
            tags += 'seafood free';
        }    
        if (shellfishFree.checked) { 
            if (tags!=='') { 
                tags += ','; 
            } 
            tags += 'shellfish free';
        }    
        if (soyFree.checked) { 
            if (tags!=='') { 
                tags += ','; 
            } 
            tags += 'soy free';
        }    
        if (sulfiteFree.checked) { 
            if (tags!=='') { 
                tags += ','; 
            } 
            tags += 'sulfite free';
        } 
        if (treenutFree.checked) { 
            if (tags!=='') { 
                tags += ','; 
            } 
            tags += 'tree nut free';
        }
        if (wheatFree.checked) { 
            if (tags!=='') { 
                tags += ','; 
            } 
            tags += 'wheat free';
        }
        

        
        tags = tags.replace(/ /g,"%20"); // replace blankspace with url suitable %20
        tags = tags.replace(",","%2c"); // replace , with url suitable %2c


        // add tags to searchOptions2
        searchOptions2 += tags;



        searchOptions2 = searchOptions2.replace(/ /g,"%20"); // replace blankspace with url suitable %20
        searchOptions2 = searchOptions2.replace(",","%2c"); // replace , with url suitable %2c
        // ############################################################################################################



        // Search phrase and nr of search hits/recipes to show
        searchOptions += searchValue + '&number=' + sHits;



        // list with ingredients to exclude in the search, if provided by the user
        if (excludeIngredients.value!=="") {  
            let exvalue:string = excludeIngredients.value.replace(/ /g,"%20");
            searchOptions += '&excludeIngredients=' + exvalue;
            if (tags=='') { searchOptions2 += excludeIngredients.value.replace(",","%20free%2c"); }
            else { searchOptions2 += '%2c' + excludeIngredients.value.replace(",","%20free%2c"); }
        }

        // add diets to the searchOptions, if picked by the user
        if (diets.value!=='none') { 
            searchOptions += '&diet=' + diets.value; 
            searchOptions2 += ',' + diets.value; 
        }

        // add list with user-checked intolerances to the search query
        searchOptions += intolerances;

        

        if (searchType=='random') {
            
              return searchOptions2;   
        } else {
           
            return searchOptions;
        }

    }

    // when the user clicks on the Search button
    searchButton.addEventListener('click', function(event) {
        event.preventDefault();
    if (searchField.value==='') { /* do nothing */ } else {
            searchArticles(checkSearchOptions('standard'));
        }
    });

    

    
