/*
    Sieve of Eratosthenes - The sieve of Eratosthenes is one of the most efficient ways
    to find all of the smaller primes (below 10 million or so).
*/

// TODO: Adjust this script so it can work with the sieve.html file.

var sieve = function () {
  "use strict";

  const input = document.querySelector("#num");
  const n = input.value;
  
  

  var array = [],
    primes = [],
    i,
    j;

  // TODO: Implement the sieve of eratosthenes algorithm to find all the prime numbers under the given number.
  
  for (i = 0; i <= n; i++) {
    array[i] = true;
  }

  // Start from the first prime number, 2
  for (i = 2; i <= Math.sqrt(n); i++) {
    if (array[i]) {
      // Mark all multiples of i as non-prime
      for (j = i * i; j <= n; j += i) {
        array[j] = false;
      }
    }
  }

  // Collect all the prime numbers left in the array
  for (i = 2; i <= n; i++) {
    if (array[i]) {
      primes.push(i);
    }
  }


  const output = document.querySelector("#result");
  result.innerText = primes;
};

console.log(sieve(1000000));
