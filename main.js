const bbdd = "https://ecommercebackend.fundamentos-29.repl.co/"

const articles = document.querySelector("#articles")

function getItems(){
    axios.get(bbdd)
        .then((response)=>{
            const product = response
            console.log(product)
        })
        .catch((error)=>{
            console.log(error)
        })
}
getItems()