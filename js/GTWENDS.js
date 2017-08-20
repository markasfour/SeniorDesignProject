//Global declarations
var baseURL = "https://raw.githubusercontent.com/markasfour/GTWENDS_Data/master"
var GoogleTrendsURL = baseURL + "/Google_Trends/"
var TwitterTrendsURL = baseURL + "/Twitter_Trends/"
var GoogleDataURL = baseURL + "/Google_Data/"
var TwitterDataURL = baseURL + "/Twitter_Data/"
var GoogleLinkURL = "https://trends.google.com/trends/explore?q=";
var TwitterLinkURL = "https://twitter.com/search?q=";
//console.log("urls are ", GoogleTrendsURL, TwitterTrendsURL, GoogleDataURL, TwitterDataURL);

//Functions
function getDate(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd = '0'+dd;
    }

    if(mm<10) {
        mm = '0'+mm;
    }

    return yyyy + '-' + mm + '-' + dd;
}

var retry_g = true;

function getGoogleTrends(){
    var search = GoogleTrendsURL + today + "google.txt";
    var google_trends = [];

    $.ajax({ url: search, 
        success: function(data) {
            google_trends = data.split("\n");
            if(google_trends[google_trends.length - 1] == '')
                google_trends.pop();
            var google_trends_display_list = $('#google_trends_list');
                $.each(google_trends, function(i)
                        {
                            var li = $('<li/>')
                                .attr('role', 'menuitem')
                                .appendTo(google_trends_display_list);

                            var aaa = $('<a>')
                                .appendTo(li);

                            var input = $('<input/>')
                                .attr('type', 'checkbox')
                                .attr('id', 'g_trend')
                                .attr('value', google_trends[i])
                                .appendTo(aaa);

                            var aaaa = $('<span>')
                                .text(google_trends[i])
                                .appendTo(aaa);
                        });
        },
        error: function() {
            if(retry_g){
                retry_g = false;
                var d = new Date();
                d.setDate(d.getDate() - 1);
                today = d;
                getGoogleTrends();
            }
            else
                alert("Sorry, GTWENDS was unable to retrieve Google trends :(");
        }
    });
}

var retry_t = true;

function getTwitterTrends(){
    var search = TwitterTrendsURL + today + "twitter.txt";
    var twitter_trends = [];

    $.ajax({ url: search, 
        success: function(data) {
            twitter_trends = data.split("\n");
            if(twitter_trends[twitter_trends.length - 1] == '')
                twitter_trends.pop();
            var twitter_trends_display_list = $('#twitter_trends_list');
            $.each(twitter_trends, function(i)
                    {
                        var li = $('<li/>')
                            .attr('role', 'menuitem')
                            .appendTo(twitter_trends_display_list);

                        var aaa = $('<a>')
                            .appendTo(li);

                        var input = $('<input/>')
                            .attr('type', 'checkbox')
                            .attr('id', 'tw_trend')
                            .attr('value', twitter_trends[i])
                            .appendTo(aaa);

                        var aaaa = $('<label>')
                            .text(twitter_trends[i])
                            .appendTo(aaa);
                    });
        },
        error: function() {
            if(retry_t){
                retry_t = false;
                var d = new Date();
                d.setDate(d.getDate() - 1);
                today = d;
                getTwitterTrends();
            }
            else
                alert("Sorry, GTWENDS was unable to retrieve Twitter trends :(");
        }
    });
}


function setMapData(new_weights, mapDensities, source){
    var max = 0;
    var min = 0;
    for(i = 0; i < mapDensities["features"].length; i++){
        mapDensities["features"][i]["properties"]["density"] += new_weights[i]; 
        if(mapDensities["features"][i]["properties"]["density"] > max){
            max = mapDensities["features"][i]["properties"]["density"];
        }
        if(i == 0){
            min = mapDensities["features"][i]["properties"]["density"];
        }
        else if(min > mapDensities["features"][i]["properties"]["density"]){
            min = mapDensities["features"][i]["properties"]["density"];
        }
    }
       
    var range = max - min;

    if(source == 'Twitter'){
        max_tw_weight = max;
        if(max == 0)
            max_tw_weight = 1;
        d1t = range;
        d2t = (range/ 7) * 6;
        d3t = (range / 7) * 5;
        d4t = (range / 7) * 4;
        d5t = (range / 7) * 3;
        d6t = (range / 7) * 2;
        d7t = range / 7;
    }
    else if(source == 'Google'){
        d1g = range;
        d2g = (range / 7) * 6;
        d3g = (range / 7) * 5;
        d4g = (range / 7) * 4;
        d5g = (range / 7) * 3;
        d6g = (range / 7) * 2;
        d7g = range / 7;
    }

    //google
    map.removeLayer(states_data_google);
    states_data_google = L.geoJson(GoogleStatesData, {
        style: style1,
        onEachFeature: onEachFeature
    });
    geo_json = states_data_google.addTo(map);

    //twitter
    map.removeLayer(states_data_twitter);
    states_data_twitter = L.geoJson(TwitterStatesData, {
        style: style2,
        onEachFeature: onEachFeature
    });
    geo_json = states_data_twitter.addTo(map);
        
}

//Main Processing
$("#loading-background").show();
$("#loading-symbol").show();
var today = getDate();
getTwitterTrends();
getGoogleTrends();
$("#loading-background").hide();
$("#loading-symbol").hide();

//handle trend checkboxes 
$(document).on('change', '[type=checkbox]', function() {

    var states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
                  'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Florida',
                  'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 
                  'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 
                  'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
                  'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
                  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
                  'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 
                  'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah',
                  'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin',
                  'Wyoming'];

    var trend = $(this).val();
    var check = $(this).is(':checked');
    var id = $(this).attr('id');
    var mult_factor = 1;
    if(check == false){
        mult_factor = -1;
    }

    var trend_name = document.getElementById('trend_name');
    var g_link = document.getElementById('g_link');
    var tw_link = document.getElementById('tw_link');
    if(check){
        trend_name.textContent = trend;
        var trend_uri = encodeURI(trend);
        trend_uri = trend_uri.replace(/\#/g, '%23');
        g_link.href= GoogleLinkURL + trend_uri;
        g_link.innerHTML = "explore <i class='fa fa-external-link' aria-hidden='true'></i>";
        tw_link.href = TwitterLinkURL + trend_uri;
        tw_link.innerHTML = "explore <i class='fa fa-external-link' aria-hidden='true'></i>";
    }
    else{
        trend_name.textContent = "Select a trend";
        g_link.href = "";
        g_link.innerHTML = "";
        tw_link.href = "";
        tw_link.innerHTML = "";
    }

    trend = trend.replace(/\ /g, '_');
    trend = trend.replace(/\#/g, '');
    var search = '';


    $("#loading-background").show();
    $("#loading-symbol").show();

    //get twitter data
    search = TwitterDataURL + today + trend + '.txt';
    $.ajax({ url: search, 
        success: function(data) {
            if(data == '')
                return;
            weights = data.split('\n');
            for(var i = 0; i < weights.length; i++){
                weights[i] = weights[i].replace(/\D/g, '');
                weights[i] = mult_factor * weights[i];
            }
            setMapData(weights, TwitterStatesData, 'Twitter'); 
        },
        error: function(){
            alert("Sorry, GTWENDS was unable to retrieve data for this trend :(");
        }
    });

    //get google data
    search = GoogleDataURL + today + trend + '.txt';
    $.ajax({ url: search, 
        success: function(data) {
            if(data == '')
                return;
            weights = data.split('\n');
            weights.splice(0,2);
            for(var i = 0; i < weights.length; i++){
                var re = new RegExp(states[i], 'g');
                if(weights[i].match(re) == null){
                    weights.splice(i, 0, '0');
                }
                else {
                    weights[i] = weights[i].replace(/\D/g, '');
                    weights[i] = mult_factor * weights[i];
                }
            }
            setMapData(weights, GoogleStatesData, 'Google');
        },
        error: function(){
            alert("Sorry, GTWENDS was unable to retrieve data for this trend :(");
        }
    });

    $("#loading-background").hide();
    $("#loading-symbol").hide();
});

