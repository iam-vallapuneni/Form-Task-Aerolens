export class Formfill {
  constructor(page) {
    this.page = page;

    this.firstname = page.locator('#firstName');
    this.lastname = page.locator('#lastName');
    this.email = page.locator('#userEmail');
    this.gender = page.locator('(//label[@class="custom-control-label"])[1]');
    this.number = page.locator('#userNumber');
    this.dob = page.locator('#dateOfBirthInput');
    this.subject = page.locator('#subjectsInput');
    this.hobbiesReading = page.locator('(//label[@class="custom-control-label"])[6]');
    this.uploadPicture = page.locator('#uploadPicture');
    this.currentAddress = page.locator('#currentAddress');
    this.selectState = page.locator('#state');
    this.selectCity = page.locator('#city');
    this.submitButton = page.locator('#submit');
  }

  async userpage() {
    await this.page.goto('https://demoqa.com/automation-practice-form');
    await this.page.waitForTimeout(2000);
  }

  async userdetailes(form) {
    await this.firstname.fill(form.firstName);
    await this.lastname.fill(form.lastName);
    await this.email.fill(form.emailId);
    await this.gender.click();
    await this.number.fill(form.mobile);

    // Set date of birth via JS (clears native date picker issues)
    await this.page.evaluate((date) => {
      const dobInput = document.querySelector('#dateOfBirthInput');
      dobInput.value = date;
      dobInput.dispatchEvent(new Event('input', { bubbles: true }));
    }, form.dob);

    await this.subject.click();
    await this.subject.type(form.subject);
    await this.page.keyboard.press('Enter');

    // Hobbies
    await this.hobbiesReading.click({ force: true });

    // Upload picture (file path relative to project root)
    await this.uploadPicture.setInputFiles('data/login_data.csv');

    await this.currentAddress.fill(form.currentAddress);
  }

  async handleModalsAndAds() {
  const modal = this.page.locator('.modal.show');
  if (await modal.isVisible()) {
    console.log('Modal visible before close:', await modal.isVisible());

    // Remove ad iframes that block interactions
    await this.page.evaluate(() => {
      document.querySelectorAll('iframe[id^="google_ads_iframe"], iframe[title*="ad"]').forEach(ad => ad.remove());
    });

    // Remove modal backdrop explicitly
    await this.page.evaluate(() => {
      const backdrop = document.querySelector('.modal-backdrop.show');
      if (backdrop) backdrop.style.display = 'none';
    });

    // Bring modal to front for safe clicking
    await this.page.evaluate(() => {
      const modalEl = document.querySelector('.modal.show');
      if (modalEl) modalEl.style.zIndex = '9999';
    });

    // Wait for Close button and click
    const closeBtn = modal.locator('button:has-text("Close")');
    await closeBtn.waitFor({ state: 'visible', timeout: 10000 });
    await closeBtn.click({ force: true });
    console.log('Clicked Close button');

    // Instead of waiting for modal hidden, forcibly remove modal and backdrop
    await this.page.evaluate(() => {
      const modal = document.querySelector('.modal.show');
      if (modal) modal.remove();

      const backdrop = document.querySelector('.modal-backdrop.show');
      if (backdrop) backdrop.remove();
    });
    console.log('Modal and backdrop forcibly removed');

    // Wait a bit for page to stabilize
    await this.page.waitForTimeout(1000);
  }

  // Hide any remaining ad iframes on page
  const adFrames = this.page.locator('iframe[title*="ad"], iframe[id^="google_ads_iframe"]');
  const count = await adFrames.count();
  for (let i = 0; i < count; i++) {
    await this.page.evaluate((index) => {
      const ads = document.querySelectorAll('iframe[title*="ad"], iframe[id^="google_ads_iframe"]');
      if (ads[index]) ads[index].style.display = 'none';
    }, i);
  }
}


 async stateAndCity(stateName, cityName) {
  await this.handleModalsAndAds();

  // Wait for no modal backdrops visible before continuing
  await this.page.waitForFunction(() => !document.querySelector('.modal-backdrop.show'));

  await this.selectState.click();
  await this.page.getByText(stateName, { exact: true }).click();

  await this.selectCity.click();
  await this.page.getByText(cityName, { exact: true }).click();
}


  async submitForm() {
    await this.submitButton.click();
  }
}
