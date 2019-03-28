// sanity check
// alert("JS working");

/* global fetch */
 fetch('https://jsonplaceholder.typicode.com/todos/1')
          .then(function(response){  // THEN indicates a promise
             return response.json(); // THIS IS ASYNCHRONOUS
      
          })
          .then(function(json){
              console.log(json);
              return [json.title, json.id];
          })
          .then(function(a){
              console.log(a);
          })