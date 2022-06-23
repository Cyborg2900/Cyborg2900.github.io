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

    if(container.hasChildNodes()){   // removing pre exiting grid from the page
        container.innerHTML = "";
        start=null;
        end=null;
    }
    let s='';
    console.log("inside make grid");
    if(n>100){
        alert("Please give number smaller than 100");
        return ;
    }
    for(let i=0;i<n;i++){
        const line_obj=document.createElement("div");
        line_obj.setAttribute("class","rows");
        for(let j=0;j<n;j++){            
            s=i.toString()+j.toString();
           // console.log("cell maker fired for :"+ s);
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
let chance=true;


document.querySelector("#grid-container").addEventListener('click',(e) =>{
    // console.log(e);
    if(e.target.hasChildNodes())
        return; 
    if(start==null || chance==true){
        if(start!=null)
        start.style.backgroundColor='';
    start=e.target;
    start.style.backgroundColor='#00ADB5';
    // start.style.width='11px';
    // start.style.height='11px';
    // start.style.margin='0px';
    chance =false;
    }
    else if(end==null || chance ==false){
        if(end!=null)
            end.style.backgroundColor='';
    end=e.target;
    end.style.backgroundColor='#3EC70B';

    chance=true;
    }
});


function start_journey(){
    // console.log("starting point");
    // console.log(start);
    // console.log("ending point");
    // console.log(end);

    if(start==null || end==null)
    {
        alert("Please specify the starting end ending points");
        return ;
    }


    let start_index=new Array(2);
    let start_id=start.id;
    start_index[0]=Number(start_id[0]);
    start_index[1]=Number(start_id[1]);


    let end_index=new Array(2);
    let end_id=end.id;
    end_index[0]=Number(end_id[0]);
    end_index[1]=Number(end_id[1]);

    console.log(start_index);
    console.log(end_index);

    let grd_i=new Array(num);
    for(let i=0;i<num;i++){
        grd_i[i]=new Array(num);
    }

    let q=new Array();

    q.push(start_index);

    let flg =false;         // to check weather we found the cell or not 

    while(q.length>0){
        let cur=q.shift();
        console.log(cur);
        if(grd_i[cur[0]][cur[1]]==1)
            continue;

        visited(cur[0],cur[1],grd_i);


        if(cur[0]==end_index[0] && cur[1]==end_index[1]){
            let id=cur[0].toString()+cur[1].toString();
            start.style.backgroundColor='yellow';
            end.style.backgroundColor='yellow';
            flg=true;
            return ;
        }

        if(cur[1]+1<num){                   // add the right cell to queue
            q.push([cur[0],cur[1]+1]);
        }
        if(cur[0]+1<num){                   // adding the bottom cell to queue
            q.push([cur[0]+1,cur[1]]);
        }
        if(cur[1]-1>=0){                    // left cell
            q.push([cur[0],cur[1]-1]);
        }
        if(cur[0]-1>=0){                    // top cell
            q.push([cur[0]-1,cur[1]]);
        }
        
        
    }

    if(!flg){
        alert("could not reach the target cell");
    }




    
}

// visited function 

function visited(i,j,arr){
    
        console.log("visiting "+i+" "+j);
        let id=i.toString()+j.toString();
        document.getElementById(id).style.backgroundColor='blue';
        arr[i][j]=1;

    return ;
}




function clear_points(){
    start.style.backgroundColor="";
    start=null;
    end.style.backgroundColor="";
    end=null;
}