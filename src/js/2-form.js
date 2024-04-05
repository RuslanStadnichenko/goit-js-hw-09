const feedbackFormEl = document.querySelector('.feedback-form');
let userData = {};
const storageKey = 'feedback-form-state';

const fillFeedbackFormFields = () => {
  try {
    const userDataFromLS = JSON.parse(localStorage.getItem(storageKey));

    if (userDataFromLS === null) {
      return;
    }

    userData = userDataFromLS
    feedbackFormEl.elements.email.value = userDataFromLS.email || "";
    feedbackFormEl.elements.message.value = userDataFromLS.message || "";
   } catch (err) {
       console.error('Error while filling form fields:', err);
  }

};

const saveFormState = (event) => {
  const feedbackFieldEl = event.target;
  const feedbackFieldName = feedbackFieldEl.name;
  const feedbackFieldValue = feedbackFieldEl.value;

  userData[feedbackFieldName] = feedbackFieldValue;

  localStorage.setItem(storageKey, JSON.stringify(userData));
};

const onFeedbackFormSubmit = event => {
  event.preventDefault();
  const { email, message } = event.currentTarget.elements
  if (email.value.trim() === "" || message.value.trim() === "") {
    return alert("Не всі поля заповнені")
  }
  userData.email = email.value.trim();
  userData.message = message.value.trim();
  console.log(userData);
  

  localStorage.removeItem(storageKey);
  feedbackFormEl.reset();
  userData = {};
};


fillFeedbackFormFields();

feedbackFormEl.addEventListener('input', saveFormState);
feedbackFormEl.addEventListener('submit', onFeedbackFormSubmit);