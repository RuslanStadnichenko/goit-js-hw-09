const feedbackFormEl = document.querySelector('.feedback-form');
const userData = {};
const storageKey = 'feedback-form-state';

const fillFeedbackFormFields = () => {
  try {
    const userDataFromLS = JSON.parse(localStorage.getItem(storageKey));

    if (userDataFromLS === null) {
      return;
    }

    for (const key in userDataFromLS) {
      feedbackFormEl.elements[key].value = userDataFromLS[key];
    }
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

  localStorage.removeItem(storageKey);
  feedbackFormEl.reset();
};

fillFeedbackFormFields();

feedbackFormEl.addEventListener('input', saveFormState);
feedbackFormEl.addEventListener('submit', onFeedbackFormSubmit);