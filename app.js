const base_URL = "https://open.er-api.com/v6/latest/";

const dropdowns = document.querySelectorAll("#dropdown select");
const btn = document.querySelector("form button");
const fromcurr = document.querySelector("#from select");
const tocurr = document.querySelector("#to select");
const msg = document.getElementById("msg");

document.addEventListener("load",()=>{
  updateexchangerate();
})
for(let select of dropdowns){
  for(currcode in countryList){
    let newoption = document.createElement("option");
    newoption.innerHTML = currcode;
    newoption.value = currcode;
    if(select.name === "from" && currcode === "USD"){
      newoption.selected = "selected";
    }
    if(select.name === "to" && currcode === "INR"){
      newoption.selected = "selected";
    }
    select.append(newoption);
  }
  select.addEventListener("change",(evt)=>{
    updateflag(evt.target);
  })
}

const updateflag = (element) => {
  let currcode = element.value;
  let countrycode = countryList[currcode];
  let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newsrc;
};

btn.addEventListener("click",async (evt)=>{
  evt.preventDefault();
  updateexchangerate();
})

const updateexchangerate = async () => {
  let amount = document.querySelector("#amount");
  if(amount.value == "" || amount.value < 1){
    amount.value = "1";
  }
  const URL = `${base_URL}${fromcurr.value}`;
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data.rates[tocurr.value];
  let finalamount = amount.value*rate;
  msg.innerText = `${amount.value} ${fromcurr.value} = ${finalamount} ${tocurr.value}`;
}