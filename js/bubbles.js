
var timeout_handles = []    
var timeout_handles2 = []    

var texts = [];
var times = [];
var paths = [];

var currentPath = 0;

var arr = [];
var objs = []

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
        console.log('hoho')
        var obj = {}
        obj[i] = []
    }

    for(var i=0; i<lines; i++){

    }

    var count = 0;

    for(var i=0; i<lines; i++){

        if(i>0){
            var currentTime = arr[i-1].time*1000
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
    prompt = arr[id];

    var audio = new Audio('assets/audio/'+arr[id].audio);
    audio.play();

    document.getElementById('bubble').style.visibility = 'visible';
    document.getElementById('bubble').style.transition = 'top 30s';
    document.getElementById('bubble').style.top = '10%';
}

function nextPrompt(id){
    prompt = arr[id];
    document.getElementById('bubble').style.visibility = 'visible';
    document.getElementById('bubble').style.transition = 'top 0s';
    document.getElementById('bubble').style.top = '80%';

    document.getElementById('bubble').innerHTML=prompt.text;
}

function option(j){
    console.log(j)
    document.getElementById('wrapper').style.visibility = 'hidden';
}
