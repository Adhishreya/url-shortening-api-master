var urlInput = document.getElementById("search");
var buttonSearch = document.getElementById("process");
var resultElement = document.getElementById("result");
var inputValue = "";
var shortInput = "";
var resultArray = [];
var menuElement = document.getElementsByClassName('hamburger')[0];

var localStorageArray = [];

if(JSON.parse(localStorage.getItem('UrlShortner')).length==0)
{localStorage.setItem('UrlShortner',JSON.stringify(localStorageArray));}
var url = "https://api.shrtco.de/v2/shorten?url="
urlInput.addEventListener('input',(e)=>{
    inputValue = e.target.value;
});
buttonSearch.addEventListener('click',async ()=>{
    if(inputValue.length>0)
    {
      var result = await  fetch(url+inputValue).then(res=>res.json()).then(res=>{
            return  Object.values(res.result);
        });
        result = result.slice(1);
        result.pop();
        resultArray = result;
    }
    var pattern = /http/;
    var tempArray = resultArray.filter(ele=>{
        return (!ele.match(pattern));
    });
    resultArray = tempArray;
    resultArray.sort((a,b)=>a.length-b.length);
    // console.log(resultArray);
    
    localStorageArray = JSON.parse(localStorage.getItem('UrlShortner'));
    // if(localStorage)
    var obj = {"orig":inputValue,"short":resultArray[1]};
    if(!(localStorageArray.map((ele)=>{
        return ele.orig}).includes(inputValue)))
    {localStorageArray.push(obj);}
    console.log(localStorageArray);
    localStorage.setItem('UrlShortner',JSON.stringify(localStorageArray));
    Array.from(localStorageArray,(x)=>{
        var newElement = document.createElement("div");
        var newElementButton = document.createElement("button");
        var newElementHeader = document.createElement("h5");
        var newElementSpan = document.createElement("h4");
        newElementHeader.innerHTML =x.orig;
        newElementButton.innerHTML = "Copy";
        newElementSpan.innerHTML = "https://"+x.short;
        newElement.className = "result-card";
        // newElement.appendChild(document.createElement("h1"));
        newElementButton.className = "result-button"
        // console.log(newElement);
        // newElement.innerHTML = x;
        newElement.appendChild(newElementSpan);
        newElement.appendChild(newElementHeader);
        newElement.appendChild(newElementButton);
        resultElement.appendChild(newElement);

        newElementButton.addEventListener('click',()=>
        {
            newElementButton.innerHTML = "Copied";
            newElementButton.style.background = "hsl(257, 27%, 26%)"
            navigator.clipboard.writeText(newElementSpan.innerHTML);
        })
    });
});

