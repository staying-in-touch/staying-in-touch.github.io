
var timeout_handles = []    

var texts = [];
var times = [];
var paths = [];

var arr = [];
var obj = {};

var lines;

load()

function load(){
    d3.csv("assets/script.csv", (d) => { 
        for(i=0; i<d.length; i++){

            lines= d.length

            texts.push(d[i].text)
            times.push(d[i].time)
            paths.push(d[i].path)

            var item = {};

            item['text'] = d[i].text
            item['time'] = d[i].time
            item['path'] = d[i].path

            arr.push(item)
        }
        init()
    })
}

function init(){
    obj['texts'] = texts;
    obj['times'] = times;
    obj['paths'] = paths;

    // window.setTimeout(function() { nextPrompt(arr[0]) }, 3000)

    var count = 0;

    for(var i=0; i<lines; i++){

        var currentItem = arr[i];
        var currentTime = times[i]*1000
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
    timeout_handles[id] = setTimeout( function() { nextPrompt(id) }, time )
}

function nextPrompt(id){
    prompt = arr[id];
    document.getElementById('bubble').style.top= '90%';
    document.getElementById('bubble').style.visibility = 'visible';
    document.getElementById('bubble').style.top= '10%';
    document.getElementById('bubble').innerHTML=prompt.text;
}