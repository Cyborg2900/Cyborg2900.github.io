// const container = document.getElementById("grid-container");

// function makeRows(rows, cols) {
//   container.style.setProperty('--grid-rows', rows);
//   container.style.setProperty('--grid-cols', cols);
//   for (c = 0; c < (rows * cols); c++) {
//     let cell = document.createElement("div");
//     container.appendChild(cell).className = "grid-item";
//   };
// };

// makeRows(16, 16);
// addElement();

// function addElement () {
//     // create a new div element
//     const newDiv = document.createElement("div");
  
//     // and give it some content
//     const newContent = document.createTextNode("Hi there and greetings!");
  
//     // add the text node to the newly created div
//     newDiv.appendChild(newContent);

//     console.log(newDiv.childNodes);
//     let obj=document.getElementById("grid-container");
//     console.log(obj.childNodes[0]);
  
//     // add the newly created element and its content into the DOM
//     const currentDiv = document.getElementById("div1");
//     document.body.insertBefore(newDiv, currentDiv);
//   }







let num=0;

const container = document.getElementById("grid-container");

function grid_maker(){
    num=document.getElementById("num").value;
    document.getElementById("num").value=null;
    console.log("grid maker fired");
    make_Grid(num);
}


function make_Grid(n){
    // if(container.childNodes!=null){          // this is to remove any grid that is previously present in the page but this code it not working currently
    //     while(container.childNodes!=null){
    //         container.removeChild(container.childNodes[0]); 
    //     }
    // }
    let s='';
    console.log("inside make grid");
    for(let i=0;i<n;i++){
        const line_obj=document.createElement("div");
        line_obj.setAttribute("class","rows");
        for(let j=0;j<n;j++){            
            s=i.toString()+j.toString();
            console.log("cell maker fired for :"+ s);
            let cell=document.createElement("div");
            cell.setAttribute("class","cell");
            cell.setAttribute("id",s);
            //cell.innerHTML=i*10+j;

            line_obj.appendChild(cell);
            
        }
        container.appendChild(line_obj);
    }
}

// let i=0;


// function make(){
//     const container=document.getElementById("grid-container");
//     const cell=document.createElement('div');
//     cell.setAttribute("class","cell1");
//     cell.innerHTML='hello world'+i++;
//     container.appendChild(cell);

// }


// function remove1(){
//     const container=document.getElementById("grid-container");
//     let list=container.childNodes;
//     container.removeChild(list[list.length-1]);
//     --i;
// }


// cell selecting code 

console.log(document.getElementById("grid-container"));
let start=null;
let end=null;


document.querySelector("#grid-container").addEventListener('click',(e) =>{
    console.log(e);
    if(e.target.hasChildNodes())
        return; 
    if(start==null || end!=null){
    start=e.target;
    start.style.backgroundColor='#00ADB5';
    }
    else if(end==null || start!=null){
    end=e.target;
    end.style.backgroundColor='lightgreen';
    }
});


function start_journey(){
    console.log("starting point");
    console.log(start);
    console.log("ending point");
    console.log(end);

    let grd_i=new Array(num);
    for(let i=0;i<num;i++){
        grd_i[i]=new Array(num);
    }

    
}