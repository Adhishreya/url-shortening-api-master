var urlInput = document.getElementById("search");
var buttonSearch = document.getElementById("process");
var resultElement = document.getElementById("result");
var inputValue = "";
var shortInput = "";
var resultArray = [];
var url = "https://api.shrtco.de/v2/shorten?url="
urlInput.addEventListener('input',(e)=>{
    inputValue = e.target.value;
});
buttonSearch.addEventListener('click',async ()=>{
    if(inputValue.length>0)
    {
        // console.log(inputValue);
      var result = await  fetch(url+inputValue).then(res=>res.json()).then(res=>{
            // console.log(res.result)
            //  resultArray = 
            return  Object.values(res.result);
            // resultArray = resultArray.slice(1);
            // resultArray = resultArray.splice(-1);
            // resultArray.pop();
            // console.log(resultArray)
        });
        // console.log(result);
        result = result.slice(1);
        result.pop();
        resultArray = result;
    }

    console.log(resultArray)
});

// console.log(resultArray)