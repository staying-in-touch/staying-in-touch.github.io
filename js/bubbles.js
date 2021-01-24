
var timeout_handles = []    
var timeout_handles2 = []    

var texts = [];
var times = [];
var paths = [];

var currentPath = 0;

var arr = [];
var objs = {};

var currentPath = [];

var lines;

load()

function load(){
    d3.csv("assets/script.csv", (d) => { 
        for(i=0; i<d.length; i++){

            lines= d.length

            var item = {};

            item['text'] = d[i].text
            item['time'] = d[i].time
            item['path'] = d[i].path
            item['audio'] = d[i].audio


            arr.push(item)
        }
        init()
    })
}

function init(){

    var noPaths = arr[lines-1].path

    for(var i=0; i<noPaths; i++){
        objs['path'+i] = []
        for(var j=0; j<lines; j++){
            if(i==parseInt(arr[j].path)-1){
                objs['path'+i].push(arr[j])
            }
        }
    }

    path(0)

}

function path(pathCount){

    currentPath=objs['path'+pathCount]

    var count = 0;
    for(var i=0; i<currentPath.length; i++){

        if(i>0){
            var currentTime = currentPath[i-1].time*1000
        }
        else currentTime =0;
        count += currentTime;

        set_time_out( i, count )
    }

}

function set_time_out( id, time ) /// wrapper
{
    if( id in timeout_handles )
    {
        clearTimeout( timeout_handles[id] )
    }
    if( id in timeout_handles2 )
    {
        clearTimeout( timeout_handles2[id] )
    }
    timeout_handles[id] = setTimeout( function() { nextPrompt(id) }, time )
    timeout_handles2[id] = setTimeout( function() { reset(id) }, time+100 )

}

function reset(id){
    prompt = currentPath[id];

    var audio = new Audio('assets/audio/'+arr[id].audio);
    audio.play();

    if(prompt.text == ""){
        document.getElementById('bubble').style.visibility = 'hidden';
    }
    else{
        document.getElementById('bubble').style.visibility = 'visible';
    }

    if(id == currentPath.length-2){
        document.getElementById('wrapper').style.visibility = 'visible';
    }
    document.getElementById('bubble').style.transition = 'top 30s';
    document.getElementById('bubble').style.top = '10%';
}

function nextPrompt(id){
    prompt = currentPath[id];
    document.getElementById('bubble').style.visibility = 'visible';
    document.getElementById('bubble').style.transition = 'top 0s';
    document.getElementById('bubble').style.top = '80%';

    document.getElementById('bubble').innerHTML=prompt.text;
}

function option(j){
    console.log(j)
    document.getElementById('wrapper').style.visibility = 'hidden';
}
