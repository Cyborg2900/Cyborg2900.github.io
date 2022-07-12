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
container.innerHTML=null;

let blocker_flag=false;
let grd_i;
    

function grid_maker(){
    num=document.getElementById("num").value;
    document.getElementById("num").value=null;
    console.log("grid maker fired");
    make_Grid(num);
}


function clear_grid(){
    if(num!=0 && num!=undefined)
        make_Grid(num);
    else
        container.innerHTML=""

    return;
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



    grd_i=new Array(n);
    for(let i=0;i<n;i++){
        grd_i[i]=new Array(n);
    }




    console.log("inside make grid");
    if(n>100){
        alert("Please give number smaller than 100");
        return ;
    }
    for(let i=0;i<n;i++){
        const line_obj=document.createElement("div");
        line_obj.setAttribute("class","rows");
        for(let j=0;j<n;j++){            
            s=i.toString()+","+j.toString();
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
    
    if(blocker_flag){
        let block=e.target;
        let index=block.id.split(",");
        if(grd_i[index[0]][index[1]]!=1){
            grd_i[index[0]][index[1]]=1;
            block.style.backgroundColor='white';
        }
        else{
            grd_i[index[0]][index[1]]=0;
            block.style.backgroundColor='';
        }
        return ;
    }

    console.log(e.target.id);
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
    start_index=start_id.split(",");
    start_index[0]=Number(start_index[0]);
    start_index[1]=Number(start_index[1]);


    let end_index=new Array(2);
    let end_id=end.id;
    end_index=end_id.split(",");
    end_index[0]=Number(end_index[0]);
    end_index[1]=Number(end_index[1]);

    console.log(start_index + ": starting index");
    console.log(end_index+ " : ending index");


    let q=new Array();

    q.push(start_index);

    let flg =false;         // to check weather we found the cell or not 

    let counter_for_animation_delay=0;
    while(q.length>0){
        let cur=q.shift();
        console.log(cur);
        if(grd_i[cur[0]][cur[1]]==1)
            continue;

        


        if(cur[0]==end_index[0] && cur[1]==end_index[1]){
            let id=cur[0].toString()+cur[1].toString();
            setTimeout(()=>{
                start.style.backgroundColor='yellow';
                end.style.backgroundColor='yellow';
            },50*counter_for_animation_delay+10);
            flg=true;
            return ;
        }
        visited(cur[0],cur[1],grd_i,counter_for_animation_delay++);

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

function visited(i,j,arr,animation_delay){
    
        console.log("visiting "+i+" "+j);
        let id=i.toString()+","+j.toString();
        if(id==start.id){
            arr[i][j]=1;
            return;
        }
        setTimeout(()=>{
            document.getElementById(id).style.backgroundColor='blue';
        },50*animation_delay);
        arr[i][j]=1;

    return ;
}




function clear_points(){
    start.style.backgroundColor="";
    start=null;
    end.style.backgroundColor="";
    end=null;
}



function make_blockers(){
    // if(container.innerHTML==null){
    //     alert("first make grid");
    //     return ;
    // }
    const make_blockers_obj=document.getElementById("make_blocks_button");
    if(make_blockers_obj.innerHTML=="Add Blocker"){
        blocker_flag=true;
        make_blockers_obj.innerHTML="Stop Making blocks";
    }
    else{
        blocker_flag=false;
        make_blockers_obj.innerHTML="Add Blocker";

    }
    return;
}