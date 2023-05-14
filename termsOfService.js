

async function fetchJsonData(){
    const url = "/TermsOfServices.json";
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

 function recursHeaders(parent,obj,headerType){
   const headerTitles = Object.keys(obj);
   for (let i in headerTitles){
    let section = createSection(parent);
    
     createHeading(section,headerType,headerTitles[i]);
    const subs = obj[headerTitles[i]];
    if (typeof subs == "string"){
        createParagraph(section,subs);
    }
    if (typeof subs == "object"){
        if (isArray(subs)){
            createunOrderedList(section,subs);
        }
        else{
            recursHeaders(section,subs,headerType+1);
        }
    }
   }

}

function createHeading(parent,type,title){
    const newHeader = document.createElement("h"+type);
    newHeader.textContent = title;
    newHeader.style.color = "#000";
    parent.append(newHeader);

}

function createSection(parent){
    const newSection = document.createElement("section");
    newSection.style.color = "#000";
    newSection.style.padding = "1rem";
    newSection.style.display = "flex";
    newSection.style.flexDirection = "column";
    newSection.style.justifyContent = "flex-start";
    newSection.style.flexWrap = "column wrap";
    parent.append(newSection);
    return newSection

}

function createunOrderedList(parent,items){
    const newList = document.createElement("ul");
    newList.style.paddingLeft = "5em";
    var values = Object.values(items);
    for (let i in values){
        const item = document.createElement("li");
        item.textContent = values[i];
        newList.append(item);
    }

    parent.append(newList);


}



function createParagraph(parent,title){
    const newParagraph = document.createElement("p");
    newParagraph.textContent = title;
    newParagraph.style.color = "#000";
    newParagraph.style.paddingLeft = "2rem";
    parent.append(newParagraph);

}

function isArray(myArray) {
    return myArray.constructor.toString().indexOf("Array") > -1;
  }


async function setUp(){
    const termsOfServicesObj = await fetchJsonData();
    let display =  document.getElementById("display");
    display.style.margin = "2px";
   display.style.display = "flex";
   display.style.flexDirection = "column";
   display.style.gap = "2rem";
   display.style.maxWidth = "75%";
   recursHeaders(display,termsOfServicesObj,2);

}

setUp()