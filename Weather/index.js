const searchBox = document.querySelector('.searchBox');

searchBox.addEventListener('keypress', function (event) {
    // event key has the information about key
    console.log('keypress');
    console.log(searchBox.value);

    if (event.code === 'Enter') {
        fetchWeatherdata(searchBox.value);
    }
});

const fetchWeatherdata = (city) => {
    const apiKey = 'd8cdfe5030a6b24a7f9f3906060759f0'
    const url = `https://api.openweathermap.org/data/2.5/find?q=${city}&appid=${apiKey}&units=metric`;
    console.log(url);
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            showWeather(data);
        })
        .catch(error => console.log(error.message));
};

const showWeather = (data) => {

    document.querySelector('.city').textContent = data.list[0].name;
    // document.querySelector('.city').textContent = data.list[0].name;
    document.querySelector('.temperature').textContent = data.list[0].main.temp + ' °C';
    document.querySelector('.weather').textContent = data.list[0].weather[0].main;
    document.querySelector('.high_low').textContent = `${data.list[0].main.temp_max} °C /  ${data.list[0].main.temp_min} °C`;
    document.querySelector('.date').textContent = getDateformat(data.list[0].dt);

};

const getDateformat = (dt) => {
    
    const date = new Date(dt * 1000);


const days = [
    'Sunday','Monday','Tuesday',
    'Wednesday','Thursday','Friday','Saturday'
]

const months = [
    'January','February','March',
    'April','May','June',
    'July','August','September',
    'October','November','December'
];

const DateFormat = `${days[date.getDay()]} ${months[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`;
    return DateFormat;
}

