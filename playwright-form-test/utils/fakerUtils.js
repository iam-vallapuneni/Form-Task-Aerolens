import { faker } from '@faker-js/faker';

export const generateFakeData = () => ({
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  email: faker.internet.email(),
  phone: faker.phone.number('8555002128'),
  address: faker.location.streetAddress()
});
