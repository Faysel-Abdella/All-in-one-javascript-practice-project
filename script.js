const logInBtn = document.getElementById("log-in-btn");
const signUpBtn = document.getElementById("sign-up-btn");
const logIn = document.getElementById("log-in");
const singUp = document.getElementById("sign-up");
const backDrop = document.getElementById("backdrop");

const userName = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

const insideScreen = document.getElementById("inside-screen");
const mealType = document.getElementById("meal-type");
const chosenType = document.querySelector("#available strong");
let chosenMealType = mealType.value;

const mealsContainer = document.getElementById("available-meals-container");
let mealTitleFor1 = document.querySelector("#available-meals-1 h3");
let mealTitleFor2 = document.querySelector("#available-meals-2 h3");
let mealTitleFor3 = document.querySelector("#available-meals-3 h3");

let mealPriceFor1 = document.querySelector("#available-meals-1 strong");
let mealPriceFor2 = document.querySelector("#available-meals-2 strong");
let mealPriceFor3 = document.querySelector("#available-meals-3 strong");

const orederButton = document.querySelector(".order-btn");
// -----------------FUNCTIONS-------------------

// ---LOG IN AND SIGN UP FUNCTIONS--

function renderThelogIn() {
  backDrop.classList.toggle("visible");
  logIn.className = "log-in visible";
}
function renderTheSignUp() {
  backDrop.classList.toggle("visible");
  singUp.className = "sign-up visible";
}

function getFieldName(element) {
  return element.id.charAt(0).toUpperCase() + element.id.slice(1);
}

function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const error = formControl.querySelector("small");
  error.innerText = message;
}

function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

function checkRequired(inputArr) {
  inputArr.forEach((element) => {
    if (element.value.trim() === "") {
      showError(element, `${getFieldName(element)}  is required`);
    } else {
      showSuccess(element);
    }
    console.log("Excuted");
  });
}

function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(input, `${getFieldName(input)} must be at least ${min}`);
  }
}

function checkEmail(input) {
  const re =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, "Email is not valid");
  }
}

function checkPasswordMacth(pass1, pass2) {
  if (pass1.value !== pass2.value) {
    showError(pass2, "Password do not match");
  }
}

// ---MEALS RELATED FUNCTIONS---

function updateChosenUI(chosenOfType) {
  chosenType.innerHTML = chosenOfType;
}

function updateAvailableUI(chosenOfType) {
  if (chosenOfType === "Dinner") {
    mealTitleFor1.innerHTML = "Juice";
    mealTitleFor2.innerHTML = "Sushi";
    mealTitleFor3.innerHTML = "Qolo";
    mealPriceFor1.innerHTML = "9";
    mealPriceFor2.innerHTML = "8";
    mealPriceFor3.innerHTML = "7";
  } else if (chosenOfType === "Fast-foods") {
    mealTitleFor1.innerHTML = "Pizza";
    mealTitleFor2.innerHTML = "Burger";
    mealTitleFor3.innerHTML = "Fatira";
    mealPriceFor1.innerHTML = "16";
    mealPriceFor2.innerHTML = "15";
    mealPriceFor3.innerHTML = "13";
  } else {
    mealTitleFor1.innerHTML = " Egg";
    mealTitleFor2.innerHTML = "Ful";
    mealTitleFor3.innerHTML = "Firfir";
    mealPriceFor1.innerHTML = "10";
    mealPriceFor2.innerHTML = "13";
    mealPriceFor3.innerHTML = "17";
  }
}
let totalPrice = 0;

function countAndUpdateUI(top, opration) {
  const selected = document.querySelectorAll(".selected");
  let totalSelected = [...selected].length;
  let price = +top.querySelector(".price").innerHTML;
  if (opration == "+") {
    totalPrice = totalPrice + price;
  } else {
    totalPrice = totalPrice - price;
  }

  if (totalSelected !== 0) {
    insideScreen.innerHTML = `You have selected ${totalSelected} meals for a price of $${totalPrice}`;
  } else {
    insideScreen.innerHTML =
      "Choose your favorite meal <br/> And make your life easy";
  }
}

// ---------------EVENTS----------------------
// ---LOG IN RELATED EVENTS---
logInBtn.addEventListener("click", renderThelogIn);
signUpBtn.addEventListener("click", renderTheSignUp);

backDrop.addEventListener("click", () => {
  logIn.className = "log-in";
  singUp.className = "sign-up";
  backDrop.classList.toggle("visible");
});

singUp.addEventListener("submit", function (event) {
  event.preventDefault();
  checkRequired([userName, email, password, password2]);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPasswordMacth(password, password2);
});

// ---MEALS RELATED EVENTS--

mealType.addEventListener("change", (event) => {
  chosenMealType = event.target.value;
  updateChosenUI(chosenMealType);
  updateAvailableUI(chosenMealType);
});

mealsContainer.addEventListener("click", (event) => {
  if (event.target.className === "order-btn") {
    const targeted = event.target.closest("div");
    targeted.querySelector(".ordered-txt").classList.toggle("invisible");
    if (event.target.innerHTML === "Order Now") {
      event.target.innerHTML = "Cancle Order!";
      event.target.parentElement.classList.add("selected");
      countAndUpdateUI(targeted, "+");
    } else if (event.target.innerHTML === "Cancle Order!") {
      event.target.innerHTML = "Order Now";
      event.target.parentElement.classList.remove("selected");
      countAndUpdateUI(targeted, "-");
    }
  }
});
