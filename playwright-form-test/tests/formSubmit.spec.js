import { test } from "@playwright/test";
import { Formfill } from '../pages/registrationPage.js';
import basicForm from '../data/basicForm.json' assert { type: 'json' };

test('form validation', async ({ page }) => {
  const form = new Formfill(page);

  await form.userpage();
  await form.userdetailes(basicForm);
  await form.handleModalsAndAds();
  await form.stateAndCity(basicForm.state, basicForm.city);
  await form.submitForm();
}, { timeout: 90000 });
