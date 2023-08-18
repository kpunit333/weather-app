
if($(document).ready())
{

    let light = 1;

    let weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    function changetheme(x)
    {
        let mode = document.getElementById('mode');
        mode.href = mode.href.split('theme-')[0] + 'theme-' + x + '.css';
    }

    $('#themebtn').click(()=>{
        $('.links-box>.bi').toggleClass('bi-moon-stars-fill');
        $('.links-box>.bi').toggleClass('bi-sun-fill');
        let theme = (light) ? "dark" : "light";
        light = !light;
        // console.log(theme);
        changetheme(theme);
    })

    let inputPlace = 'Kolkata';

    function f2c(c)
    {
        c = (((c-32)*5)/9).toFixed(1);
        return c;
    }

    function updateAll(data)
    {
        today_place = data.address;
        today_place = today_place[0].toUpperCase() + today_place.slice(1);

        today_loc_lat = data.latitude;
        today_loc_long = data.longitude;
        today_zone = data.timezone;

        date = new Date();

        today_temp = f2c(parseFloat(data.days[0].hours[date.getHours()].temp));
        today_weather_cond = data.days[0].description;

        today_date = data.days[0].datetime.split('-')[2] + " " + month[parseInt(data.days[0].datetime.split('-')[1] - 1)] + " " + data.days[0].datetime.split('-')[0] ;
        today_icon = data.days[0].icon;
        today_desc = data.description;

        humidity = data.days[0].humidity;
        windspeed = data.days[0].windspeed;
        airpressure = data.days[0].pressure;
        visibility = data.days[0].visibility;
        sunrise = data.days[0].sunrise;
        sunset = data.days[0].sunset;

        $('.today-place>h2').html('Location');
        $('.today-place>h3').html('Tomezone');
        $('.today-location>span').html(today_loc_lat + " &deg;N, " + today_loc_long + " &deg;E");
        $('.today-temp>h2').html('Temperature');
        $('.today-condition>span').html('');
        $('.today-date>h3').html('Date');
        $('.today-icon').html(`<img src="clear-day.jpg" alt="icon" width="200" height="200">`)
        $('.today-desc>p').html('');

        $('#humidity>.other-condition-value>span').html(humidity + " %");
        $('#windspeed>.other-condition-value>span').html(windspeed + " km/h");
        $('#airpressure>.other-condition-value>span').html(airpressure + " hPa");
        $('#visibility>.other-condition-value>span').html(visibility);
        $('#sunrise>.other-condition-value>span').html(sunrise);
        $('#sunset>.other-condition-value>span').html(sunset);

        $('.today-hourly').html('');

        for(let i=0; i<data.days[0].hours.length; i+=3)
        {

            hour_time = data.days[0].hours[i].datetime;
            hour_icon = data.days[0].hours[i].icon;
            hour_temp = f2c(parseFloat(data.days[0].hours[i].temp));

            let hourlyCard = `<div class="today-hourly-card">            
                        <div class="hourly-time">            
                            <span>${hour_time}</span>            
                        </div>
                        <div class="hourly-icon">            
                            <img src="${hour_icon}.jpg" alt="icon" width="40" height="40">            
                        </div>
                        <div class="hourly-temp">            
                            <span>${hour_temp}  &#8451;</span>            
                        </div>
                    </div>`;

            $('.today-hourly').html($('.today-hourly').html() + hourlyCard);
        }

        $('.today-place>h2').html(today_place);
        $('.today-place>h3').html(today_zone);
        $('.today-location>span').html(today_loc_lat + " &deg;N, " + today_loc_long + " &deg;E");
        $('.today-temp>h2').html(today_temp + "&#8451;");
        $('.today-condition>span').html(today_weather_cond);
        $('.today-date>h3').html(today_date);
        $('.today-icon').html(`<img src="${today_icon}.jpg" alt="icon" width="200" height="200">`)
        $('.today-desc>p').html(today_desc);

        $('#humidity>.other-condition-value>span').html(humidity + " %");
        $('#windspeed>.other-condition-value>span').html(windspeed + " km/h");
        $('#airpressure>.other-condition-value>span').html(airpressure + " hPa");
        $('#visibility>.other-condition-value>span').html(visibility);
        $('#sunrise>.other-condition-value>span').html(sunrise);
        $('#sunset>.other-condition-value>span').html(sunset);

        $('.forecast-box').html(`<div class="final-row-heading">
        <h2>14-day Weather forecast</h2>
    </div>`);

        for(let i=0; i<14; i++)
        {

            forecast_day = weekday[6 - parseInt(data.days[i].datetimeEpoch-1)%7];
            forecast_icon = data.days[i].icon;
            forecast_tempmax = f2c(parseFloat(data.days[i].tempmax));
            forecast_tempmin = f2c(parseFloat(data.days[i].tempmin));

            if(i==0)
            {
                forecast_day = 'Today';
            }

            let forecastDay = `<div class="row">
                <h5>${forecast_day}</h5>
                <h5><img src="${forecast_icon}.jpg" alt="" width="30"> ${forecast_icon}</h5>
                <h5>${forecast_tempmax}/${forecast_tempmin}</h5>
                </div>`


            $('.forecast-box').html($('.forecast-box').html() + forecastDay);
        }        
    }

    $('#api-search').click(()=>{

        inputPlace = $('#input-place').val();
        
        fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${inputPlace}?unitGroup=us&key=S83QK834SPF9XU8PEJFD87C87&contentType=json`)
        .then((response) => response.json())
        .then(data=>{updateAll(data)});   
    });

    console.clear();
}
else
{
    console.log('Loading...');
}
