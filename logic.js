var godPair=data.map(god => god.pair)

selector=d3.select('#filterSelect')


godPair.forEach((god) => {
let currentOption = selector.append("option");
  currentOption.property("value",god)
  currentOption.text(god)
  });


  function handleChange()
  {
      var dropdownMenu = d3.select("#filterSelect");
      // Assign the value of the dropdown menu option to a variable
      var selectedGod = dropdownMenu.property("value");
      console.log(selectedGod)
  }
    
  
  selector.on('change',handleChange)