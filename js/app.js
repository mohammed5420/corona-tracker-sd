const navigation = document.querySelector('.nav-list');

const humberger = document.querySelector('.humberger');

humberger.addEventListener('click' , function() {
   navigation.classList.toggle('open'); 
});


// corona tracker api 

async  function reackCorona (countryCode , className) {
   try {

      const jsonData = await fetch(`https://cors-anywhere.herokuapp.com/https://trackcorona.live/api/countries/sd`);
      const data = await jsonData.json();

      const stats = data.data[0];
      console.log(stats);
      const confirmed = stats.confirmed;
      const recovered = stats.recovered;
      const dead = stats.dead;
      const recPerse = Math.round((recovered / confirmed ) * 100);
      const deadPerse = Math.round((dead / confirmed ) * 100);

      
      numberFormating = function (num) {
         let int ,type = '' , splitNum , dicimel;
         int = num.toLocaleString(undefined,{minimumFractionDigits:0});
         if (int.length > 6 && int.length <= 9) {
            type = 'k';
         } else if(int.length >= 9 && int.length <= 11){
            type = 'M';
         } else if (int.length <= 3){
            return int;
         }

         splitNum = int.split(',');
         if( type == '') {
            dicimel = splitNum[1];
            return int = `${splitNum[0]},${dicimel}${type}`;
         } else if(type == 'k' || type == 'M'){
            if (splitNum[1][0] == 0){
               dicimel = splitNum[1];
            } else if (splitNum[1][1] == 0){
               dicimel = splitNum[1][0];
            } else if (splitNum[1][0] > 0) {
               dicimel = splitNum[1][0];
            } else {
               dicimel = splitNum[1][0];
            }
         }
         return int = `${splitNum[0]}.${dicimel}${type}`;
      }
     

      function updateUi (className) {
         document.querySelector(`#${className}--rec`).textContent = numberFormating(recovered);
         document.querySelector(`#${className}--con`).textContent = numberFormating(confirmed);
         document.querySelector(`#${className}--death`).textContent = numberFormating(dead);
         document.querySelector(`#${className}--recPerse`).textContent = recPerse + '%';
         document.querySelector(`#${className}--deadPerse`).textContent = deadPerse + '%';
      }

      updateUi(className);

   }
   catch(error) {
      console.log(error);
   }
}

reackCorona('sd','sd');

//9,999,999
//99,888
//999.899k
//9,999,99
