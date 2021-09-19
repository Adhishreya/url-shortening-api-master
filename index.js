var urlInput = document.getElementById("search");
var buttonSearch = document.getElementById("process");
var resultElement = document.getElementById("result");
var inputValue = "",display =true;
var shortInput = "";
var resultArray = [];
var menuElement = document.getElementsByClassName('hamburger')[0];
var leftElements = document.getElementsByClassName('left')[0];
var rightElements = document.getElementsByClassName('right')[0];
var blockElement = document.getElementById('block-display');
var inputElement = document.getElementsByTagName('input')[0];
var visible = false;
menuElement.addEventListener('click',()=>{
    // leftElements.style="display:flex;flex-direction:column";
    // rightElements.style="display:flex;flex-direction:column";
    // leftElements.style="display:block;margin-auto;border-bottom:2px solid  hsl(257, 7%, 63%);width:80%";
    // rightElements.style="display:block;margin-auto;align-self:center;margin:auto;width:100%";
    // blockElement.style="background:hsl(255, 11%, 22%);display:flex;text-align:center;flex-direction:column;align-items:center;justify-content:center;position:relative;top:10rem;width:100%";
    visible = ~visible;
    if(visible)
{
    leftElements.style="display:block;margin-auto;border-bottom:2px solid  hsl(257, 7%, 63%);width:80%";
    rightElements.style="display:block;margin-auto;align-self:center;margin:auto;width:100%";
    blockElement.style="background:hsl(255, 11%, 22%);display:flex;text-align:center;flex-direction:column;align-items:center;justify-content:center;position:relative;top:10rem;width:100%";
}
else
{
    blockElement.style="display:none"
}
});



var localStorageArray = [];

if(JSON.parse(localStorage.getItem('UrlShortner')) == null)
{localStorage.setItem('UrlShortner',JSON.stringify(localStorageArray));}
var url = "https://api.shrtco.de/v2/shorten?url="
urlInput.addEventListener('input',(e)=>{
    inputValue = e.target.value;
});

function createDOMs(x)
{
    var newElement = document.createElement("div");
    var newElementButton = document.createElement("button");
    var newElementHeader = document.createElement("h5");
    var newElementSpan = document.createElement("h4");
    newElementHeader.innerHTML =x.orig;
                newElementButton.innerHTML = "Copy";
                newElementSpan.innerHTML = "https://"+x.short;
                newElement.className = "result-card";
                newElementButton.className = "result-button"
                newElement.appendChild(newElementHeader);
                newElement.appendChild(newElementSpan);
                newElement.appendChild(newElementButton);
                resultElement.appendChild(newElement);
                newElementButton.addEventListener('click',()=>
                {
                    newElementButton.innerHTML = "Copied";
                    newElementButton.style.background = "hsl(257, 27%, 26%)"
                    navigator.clipboard.writeText(newElementSpan.innerHTML);
                });
}

buttonSearch.addEventListener('click',async ()=>{
    if(inputValue.length>0)
    {
        inputElement.style="border:none";
      var result = await  fetch(url+inputValue).then(res=>res.json()).then(res=>{
            return  Object.values(res.result);
        });
        result = result.slice(1);
        result.pop();
        resultArray = result;
    
    var pattern = /http/;
    var tempArray = resultArray.filter(ele=>{
        return (!ele.match(pattern));
    });
    resultArray = tempArray;
    resultArray.sort((a,b)=>a.length-b.length);
    
    localStorageArray = JSON.parse(localStorage.getItem('UrlShortner'));
    var obj = {"orig":inputValue,"short":resultArray[1]};
    if(localStorageArray.length == 0 || !(localStorageArray.map((ele)=>{
        return ele.orig}).includes(inputValue)))
    {localStorageArray.push(obj);}
    console.log(localStorageArray);
    localStorage.setItem('UrlShortner',JSON.stringify(localStorageArray));

    
    if(localStorageArray &&  display && localStorageArray.length>0)
     {   
            display = false;
            Array.from(localStorageArray,(x)=>{
            // alert(12);
                createDOMs(x);
            });
    }
    else
    {
        createDOMs(obj);
    }
}
else
{
    inputElement.style="border:2px solid hsl(0, 87%, 67%)";
}
});

window.addEventListener('close',()=>{
    localStorageArray.removeItem('UrlShortner');
})

