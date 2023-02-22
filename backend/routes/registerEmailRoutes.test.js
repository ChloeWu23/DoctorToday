// const { describe, test, expect } = require('@jest/globals');
// const { objectContaining } = require('expect');
// const { describe } = require('describe');
// const sendRegisterEmail = require('./registerEmailRoutes.js');

const nodemailer = require('nodemailer');
// Import the function you want to test
const {sendRegisterEmail} = require('./RegisterEmailRoutes');

//Define correct mock data for the test
const mockData = {
  firstName: 'John',
  email: 'johndoe@example.com'
};

// Mock the nodemailer createTransport function
jest.mock('nodemailer', () => ({
  createTransport: jest.fn(() => ({
    sendMail: jest.fn(() => Promise.resolve('Success'))
  }))
}));

describe('sendRegisterEmail', () => {
  test('should send registration email', async () => {
    await sendRegisterEmail(mockData);
    expect(nodemailer.createTransport).toHaveBeenCalled();
  });
});

//Define mock date without firstname
const mockDataNoFirstName = {
  firstName: '',
  email: 'johndoe@example.com'
};

// Mock the nodemailer createTransport function
jest.mock('nodemailer', () => ({
  createTransport: jest.fn(() => ({
    sendMail: jest.fn(() => Promise.resolve('Success'))
  }))
}));

describe('sendRegisterEmail', () => {
  test('should not send registration email without first name', async () => {
    await sendRegisterEmail(mockDataNoFirstName);
    expect(nodemailer.createTransport().sendMail).not.toHaveBeenCalled();
  });
});


//Define mock date without firstname
const mockDataNoEmail = {
  firstName: '',
  email: 'johndoe@example.com'
};

// Mock the nodemailer createTransport function
jest.mock('nodemailer', () => ({
  createTransport: jest.fn(() => ({
    sendMail: jest.fn(() => Promise.resolve('Success'))
  }))
}));

describe('sendRegisterEmail', () => {
  test('should not send registration email without destination email address', async () => {
    await sendRegisterEmail(mockDataNoEmail);
    expect(nodemailer.createTransport().sendMail).not.toHaveBeenCalled();
  });
});
