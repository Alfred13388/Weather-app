// var main = document.getElementById ('main');
// main.style.backgroundColor = "green"
// main.style.height= "200px"

// // e.PreventDefault

// // var student ={
//     name: "Alfred",
//     age: 25,
//     isStudent: true,
//     hobbies: ['reading', 'swimming'],
//     address: {
//         street: '123 main str',
//         city: 'Port Harcourt',
//         Po: '123456'
//     },
//  incrementAge: function () { this.age +=2
//  }
// };

// const {name, age, isStudent} = student

// delete.student.name;
// // console.log(name)
// // alert (name)
// const {street, city, po} = adress

// student.incrementAge();

// student.email = 'johndoe@example.com'

// h1. textContent = Student.age

// console.log(Object.keys(student));

// hi.textContent = Object.entries;

// hi.textContent = student.hasOwnProperty('age');

// console.log(newStudent)
// Object.assign(newStudent, student)
// console.log('New students', newStudent)

// h1.innerContent

// var students = ['Alfred', 'Ikechukwu', 'Jude', 'Darlington']
// students.push('Bisi', 'Alpha')
// students.pop()
// students.shift()
// students.unshift('Ahamba')

// students = students.contact(studentsAge)
// students.slice(1, 5,);
// students.splice(2, 0, 'new element')

// students = students.indexOf ('IK')

// students.forEach(name => console.log(name + " " + 'Hello'))

// if (students.some(e => e.includes('r'))) {
//     h1.textContent = 'Hurray!!!';
// } else {
//     h1.textContent = 'Not Included';
// }

// console.log('filter', students.filter(e => e.includes('r')));
    
// hi. textContent = students[0]


// var student ={
//     name: "Alfred",
//     age: 25,
//     isStudent: true,
//     hobbies: ['reading', 'swimming'],
//     address:  {
//         street: '123 main str',
//         city: 'Port Harcourt',
//         Po: '123456'
//     },
//  incrementAge: function () { this.age +=2;
//  }
// };

// console.log('object', student);
// console.log('JSON', JSON.stringify(student));



// Asynchronous  programming

// const myPromise = new Promise ((resolve, reject) => {
//     let success = true;
//     if (success) {
//         resolve('Operation was successful')
//     } else {
//         reject('Operation failed');
//     }
// });

// myPromise
//    .then(result => alert(result))
//    .catch(error => alert(error))
//    .finally(() => alert('promise is resolved'));

// const fetchData = new Promise((resolve, reject) => {
//     let data = fetch('https://jsonplaceholder.typicode.com/posts')
//     if (data.ok) {
//         resolve("successful")
//     } else {
//         reject("failed to fetch data")
//     }
// });



// fetch('https://jsonplaceholder.typicode.com/posts')
//    .then(response => {
//     if (!response.ok) {
//         throw new Errow('Network response not ok')
        
//     }
//     return response.json()
//    })
//     .then(data => alert(data))
//     .catch(error => console.log("There was a problem with the fetch operation:", error))
//     .finally(() => alert('Promise is complete'))

// async function getPost() {
//   try {
//     const response = await fetch(
//       "https://jsonplaceholder.typicode.com/posts/1"
//     );

//     const data = await response.json();

//     console.log(data);
//   } catch (error) {
//     console.error(error);
//   }
// }

// getPost();

// using async/await 

// const fetchData = async () => {
//   let data = await fetch ('https://jsonplaceholder.typicode.com/posts')

//   data = data.json()
   
// if (data) {
//   console.log("Data fetched", data)
// } else {
//   console.log("No data fetched");
//   }
// }

// fetchData()

// const fetchData = async () => {
//   try {
//     let data = await fetch('https://jsonplaceholder.typicode.com/posts');

//     data = await data.json();

//     console.log("Data fetched", data);
//   } catch (error) {
//     console.error(error);
//   }
// };

// fetchData();


const API_KEY = "e6c780c42a80d62ae429109d99a5a472"; 

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const currentWeather = document.getElementById("currentWeather");
const forecast = document.getElementById("forecast");
const error = document.getElementById("error");

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();

    if (!city) {
        error.textContent = "Please enter a city name.";
        return;
    }

    getWeather(city);
});

async function getWeather(city) {
    error.textContent = "";
    currentWeather.innerHTML = "";
    forecast.innerHTML = "";

    try {
        // Current Weather
        const weatherResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        );

        if (!weatherResponse.ok) {
            throw new Error("City not found");
        }

        const weatherData = await weatherResponse.json();

        displayCurrentWeather(weatherData);

        // 5-Day Forecast
        const forecastResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
        );

        const forecastData = await forecastResponse.json();

        displayForecast(forecastData);

    } catch (err) {
        error.textContent = err.message;
    }
}

function displayCurrentWeather(data) {
    currentWeather.innerHTML = `
        <h2>${data.name}</h2>
        <p>🌡 Temperature: ${data.main.temp}°C</p>
        <p>☁ Weather: ${data.weather[0].description}</p>
        <p>💧 Humidity: ${data.main.humidity}%</p>
    `;
}

function displayForecast(data) {
    const dailyForecasts = data.list.filter(item =>
        item.dt_txt.includes("00:00:00")
    );
    const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];

        dailyForecasts.slice(0, 5).forEach(day => {
  const card = document.createElement("div");
  card.classList.add("forecast-card");

  const dayNumber = new Date(day.dt_txt).getDay();
  const dayName = days[dayNumber];

  const dateName = new Date(day.dt_txt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });

  card.innerHTML = `
    <h4>${dayName}</h4>
    <small class="date">${dateName}</small>
    <p>${day.main.temp}°C</p>
    <p>${day.weather[0].main}</p>
  `;
 
  forecast.appendChild(card);
    
    });
};