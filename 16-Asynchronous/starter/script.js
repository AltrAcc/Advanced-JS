'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

//////////////////////////////////////////////

const getCountryDataIndia = function(country) {
const request = new XMLHttpRequest();
request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
request.send();

request.addEventListener('load', function() {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    const html = `
    <article class="country">
          <img class="country__img" src="${data.flags['svg']}" />
          <div class="country__data">
            <h3 class="country__name">${data.name['common']}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)} people</p>
            <p class="country__row"><span>🗣️</span>${data.languages['hin']}</p>
            <p class="country__row"><span>💰</span>${data.currencies['INR'].name}</p>
          </div>
        </article>
    `;

    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
});
};

const getCountryDataUSA = function (country) {
    const request = new XMLHttpRequest();
    request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
    request.send();
  
    request.addEventListener('load', function () {
      const [data] = JSON.parse(this.responseText);
      console.log(data);
  
      const html = `
    <article class="country">
      <img class="country__img" src="${data.flags['svg']}" />
      <div class="country__data">
        <h3 class="country__name">${data.name['common']}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          +data.population / 1000000
        ).toFixed(1)} people</p>
        <p class="country__row"><span>🗣️</span>${data.languages['eng']}</p>
        <p class="country__row"><span>💰</span>${data.currencies['USD'].name}</p>
      </div>
    </article>
    `;
      countriesContainer.insertAdjacentHTML('beforeend', html);
      countriesContainer.style.opacity = 1;
    });
  };

  /* getCountryDataIndia('india');
  getCountryDataUSA('usa'); */

//////////////////////////////////////////////////
// 008 Promises and the Fetch API

// const request = new XMLHttpRequest();
// request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
// request.send();

/* const request = fetch(`https://restcountries.com/v3.1/name/india`);
console.log(request); */

///////////////////////////////////////////////////
// 009 Consuming Promises

// const getCountryData = function(country) {
//     fetch(`https://restcountries.com/v2/name/${country}`)  // return promise
//     .then(function(response) { // handle promise using then()
//         console.log(response);
//         return response.json(); // read the data from response - also return promise
//     }).then(function(data) {  // again then() for handle promise
//         console.log(data);
//     })
// };

// nicely formated
const getCountryData = function(country) {
    fetch(`https://restcountries.com/v3.1/name/${country}`)  // return promise
    .then(response => response.json())
    .then(data => console.log(data));
};

//getCountryData('india');

/////////////////////////////////////////////////
// API is different so more code in final JS file

/////////////////////////////////////////////////
// Coding Challenge #1


/* In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀
 */

/* const whereAmI = function (lat, lng) {
  fetch(`https://geocode.maps.co/reverse?lat=${lat}&lon=${lng}&api_key=66a89acab1efe531337106qfc82026c`)
    .then(res => {
      if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
      return res.json();
    })
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.country}`);

      return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`);
    })
    .then(res => {
      if (!res.ok) throw new Error(`Country not found (${res.status})`);

      return res.json();
    })
    .then(data => getCountryData(data[0]))
    .catch(err => console.error(`${err.message} 💥`));
};
whereAmI(52.508, 13.381);
whereAmI(19.037, 72.873);
whereAmI(-33.933, 18.474); */

//////////////////////////////////////////////////
// 015 The Event Loop in Practice

/* console.log('Test start');
setTimeout(() => console.log('0 sec timer'), 0); // second - in callback q
Promise.resolve('Resolved promise 1').then(res => console.log(res)); // first - in microtask q

Promise.resolve('Resolved promise 2').then(res => {
    for(let i = 0; i < 100; i++) {}
    console.log(res)});

console.log('test end'); */

//////////////////////////////////////////////
/// 016 Building a Simple Promise

/* const lotteryPromise = new Promise(function (resolve, reject) {
    console.log('Lotter draw is happening 🔮');
    setTimeout(function () {
      if (Math.random() >= 0.5) {
        resolve('You WIN 💰');
      } else {
        reject(new Error('You lost your money 💩'));
      }
    }, 2000);
});
lotteryPromise.then(res => console.log(res)).catch(err => console.log(err));

// Promisifying settimeout
const wait = function(seconds) {
    return new Promise(function(resolve) {
        setTimeout(resolve, seconds * 1000);
    });
};

wait(2).then(() => {
    console.log('2 minutes');
    return wait(1);
}).then(() => console.log('I wait for 1 second'));

wait(1).then(() => {
    console.log('1 sec passed');
    return wait(1);
}).then(() => {
    console.log('2 sec passed');
    return wait(1);
}).then(() => {
    console.log('3 sec passed');
    return wait(1);
}).then(() => {
    console.log('4 sec passed');
    return wait(1);
});

Promise.resolve('abcd').then(x => console.log(x));
Promise.reject('Problem!!!!').catch(x => console.error(x)); */

///////////////////////////////////////////////////////////
// 017 Promisifying the Geolocation API

// navigator.geolocation.getCurrentPosition(
//     position => console.log(position),
//     err => console.log(err)
// )
// console.log('getting position');

const getPosition = function () {
    return new Promise(function (resolve, reject) {
        // navigator.geolocation.getCurrentPosition(
        //     position => resolve(position),
        //     err => reject(err)
        // );
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
};

//getPosition().then(pos => console.log(pos));

// promisifying challenge 1 in final JS

//////////////////////////////////////////////////
// 018 Coding Challenge #2

/* Coding Challenge #2
For this challenge you will actually have to watch the video! Then, build the image 
loading functionality that I just showed you on the screen.
Your tasks:
Tasks are not super-descriptive this time, so that you can figure out some stuff by 
yourself. Pretend you're working on your own �
PART 1
1. Create a function 'createImage' which receives 'imgPath' as an input. 
This function returns a promise which creates a new image (use 
document.createElement('img')) and sets the .src attribute to the 
provided image path
2. When the image is done loading, append it to the DOM element with the 
'images' class, and resolve the promise. The fulfilled value should be the 
image element itself. In case there is an error loading the image (listen for 
the'error' event), reject the promise
3. If this part is too tricky for you, just watch the first part of the solution
PART 2
4. Consume the promise using .then and also add an error handler
5. After the image has loaded, pause execution for 2 seconds using the 'wait'
function we created earlier
6. After the 2 seconds have passed, hide the current image (set display CSS 
property to 'none'), and load a second image (Hint: Use the image element 
returned by the 'createImage' promise to hide the current image. You will 
need a global variable for that �)
7. After the second image has loaded, pause execution for 2 seconds again
8. After the 2 seconds have passed, hide the current image
Test data: Images in the img folder. Test the error handler by passing a wrong 
image path. Set the network speed to “Fast 3G” in the dev tools Network tab, 
otherwise images load too fas */

/* const wait = function (seconds) {
    return new Promise(function (resolve) {
      setTimeout(resolve, seconds * 1000);
    });
  };
  
  const imgContainer = document.querySelector('.images');
  
  const createImage = function (imgPath) {
    return new Promise(function (resolve, reject) {
      const img = document.createElement('img');
      img.src = imgPath;
  
      img.addEventListener('load', function () {
        imgContainer.append(img);
        resolve(img);
      });
  
      img.addEventListener('error', function () {
        reject(new Error('Image not found'));
      });
    });
  };
  
  let currentImg;
  
  createImage('img/img-1.jpg')
    .then(img => {
      currentImg = img;
      console.log('Image 1 loaded');
      return wait(2);
    })
    .then(() => {
      currentImg.style.display = 'none';
      return createImage('img/img-2.jpg');
    })
    .then(img => {
      currentImg = img;
      console.log('Image 2 loaded');
      return wait(2);
    })
    .then(() => {
      currentImg.style.display = 'none';
    })
    .catch(err => console.error(err)); */

///////////////////////////////////////////////////
// 019 Consuming Promises with Async_Await

const whereAmI = async function(country) {
    const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);
    const data = await res.json();
    console.log(data);
    console.log(res);
};

// whereAmI('india');
// console.log('First');

// async - await in reverse geocoding in final JS

/////////////////////////////////////////////////
// 020 Error Handling With try...catch

/* try {
    let y = 1;
    const x = 2;
    x = 3;
} catch(err) {
    alert(err.message);
} */

// more in final JS error handling in reverse geocoding

// 021 Returning Values from Async Functions
console.log('1: will get location');
whereAmI('india');
console.log('3: finished getting location');

// more from final JS - returning values from async function

///////////////////////////////////////////////////
// 022 Running Promises in parallel

/* const get3Countries = async function (c1, c2, c3) {
    try {
      // const [data1] = await getJSON(
      //   `https://restcountries.eu/rest/v2/name/${c1}`
      // );
      // const [data2] = await getJSON(
      //   `https://restcountries.eu/rest/v2/name/${c2}`
      // );
      // const [data3] = await getJSON(
      //   `https://restcountries.eu/rest/v2/name/${c3}`
      // );
      // console.log([data1.capital, data2.capital, data3.capital]);
  
      const data = await Promise.all([
        getJSON(`https://restcountries.eu/rest/v2/name/${c1}`),
        getJSON(`https://restcountries.eu/rest/v2/name/${c2}`),
        getJSON(`https://restcountries.eu/rest/v2/name/${c3}`),
      ]);
      console.log(data.map(d => d[0].capital));
    } catch (err) {
      console.error(err);
    }
  };
  get3Countries('portugal', 'canada', 'tanzania'); */

  /////////////////////////////////////////////////
  // 023 Other Promise Combinators_ race, allSettled and any

/*   (async function () {
    const res = await Promise.race([
      getJSON(`https://restcountries.eu/rest/v2/name/italy`),
      getJSON(`https://restcountries.eu/rest/v2/name/egypt`),
      getJSON(`https://restcountries.eu/rest/v2/name/mexico`),
    ]);
    console.log(res[0]);
  })(); 
  
const timeout = function (sec) {
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error('Request took too long!'));
      }, sec * 1000);
    });
  };
  
  Promise.race([
    getJSON(`https://restcountries.eu/rest/v2/name/tanzania`),
    timeout(5),
  ])
    .then(res => console.log(res[0]))
    .catch(err => console.error(err));
  
  // Promise.allSettled
  Promise.allSettled([
    Promise.resolve('Success'),
    Promise.reject('ERROR'),
    Promise.resolve('Another success'),
  ]).then(res => console.log(res));
  
  Promise.all([
    Promise.resolve('Success'),
    Promise.reject('ERROR'),
    Promise.resolve('Another success'),
  ])
    .then(res => console.log(res))
    .catch(err => console.error(err));
  */


/* // Promise.any [ES2021]
Promise.any([
    Promise.resolve('Success'),
    Promise.reject('ERROR'),
    Promise.resolve('Another success'),
  ])
    .then(res => console.log(res))
    .catch(err => console.error(err)); */

////////////////////////////////////////////////
// 024  Coding Challenge #3
/* Coding Challenge #3
Your tasks:
PART 1
1. Write an async function 'loadNPause' that recreates Challenge #2, this time 
using async/await (only the part where the promise is consumed, reuse the 
'createImage' function from before)
2. Compare the two versions, think about the big differences, and see which one 
you like more
3. Don't forget to test the error handler, and to set the network speed to “Fast 3G”
in the dev tools Network tab
PART 2
1. Create an async function 'loadAll' that receives an array of image paths 
'imgArr'
2. Use .map to loop over the array, to load all the images with the 
'createImage' function (call the resulting array 'imgs')
3. Check out the 'imgs' array in the console! Is it like you expected?
4. Use a promise combinator function to actually get the images from the array �
5. Add the 'parallel' class to all the images (it has some CSS styles)
Test data Part 2: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img3.jpg']. To test, turn off the 'loadNPause' function */

const wait = function (seconds) {
    return new Promise(function (resolve) {
      setTimeout(resolve, seconds * 1000);
    });
  };
  
  const imgContainer = document.querySelector('.images');
  
  const createImage = function (imgPath) {
    return new Promise(function (resolve, reject) {
      const img = document.createElement('img');
      img.src = imgPath;
  
      img.addEventListener('load', function () {
        imgContainer.append(img);
        resolve(img);
      });
  
      img.addEventListener('error', function () {
        reject(new Error('Image not found'));
      });
    });
  };
  
  let currentImg;
  
  // createImage('img/img-1.jpg')
  //   .then(img => {
  //     currentImg = img;
  //     console.log('Image 1 loaded');
  //     return wait(2);
  //   })
  //   .then(() => {
  //     currentImg.style.display = 'none';
  //     return createImage('img/img-2.jpg');
  //   })
  //   .then(img => {
  //     currentImg = img;
  //     console.log('Image 2 loaded');
  //     return wait(2);
  //   })
  //   .then(() => {
  //     currentImg.style.display = 'none';
  //   })
  //   .catch(err => console.error(err));
  
  // PART 1
  const loadNPause = async function () {
    try {
      // Load image 1
      let img = await createImage('img/img-1.jpg');
      console.log('Image 1 loaded');
      await wait(2);
      img.style.display = 'none';
  
      // Load image 1
      img = await createImage('img/img-2.jpg');
      console.log('Image 2 loaded');
      await wait(2);
      img.style.display = 'none';
    } catch (err) {
      console.error(err);
    }
  };
  // loadNPause();
  
  // PART 2
  const loadAll = async function (imgArr) {
    try {
      const imgs = imgArr.map(async img => await createImage(img));
      const imgsEl = await Promise.all(imgs);
      console.log(imgsEl);
      imgsEl.forEach(img => img.classList.add('parallel'));
    } catch (err) {
      console.error(err);
    }
  };
  loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);
  
  