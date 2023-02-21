const sendRegisterEmail = require('./sendRegisterEmail');

describe('sendRegisterEmail function', () => {
  test('should send email successfully with valid input', async () => {
    const mockData = {
      firstName: 'John',
      email: 'john@example.com'
    };

    // Mock nodemailer's createTransport method and sendMail method
    jest.mock('nodemailer');
    const nodemailer = require('nodemailer');
    nodemailer.createTransport.mockReturnValue({
      sendMail: jest.fn().mockResolvedValue({ accepted: [mockData.email] })
    });

    await sendRegisterEmail(mockData);

    expect(nodemailer.createTransport).toHaveBeenCalledWith(expect.objectContaining({
      host: 'smtp.office365.com',
      port: 587,
      secure: false,
      auth: {
        user: 'tiankgt@hotmail.com',
        pass: 'Ic20088203!'
      },
      tls: {
        rejectUnauthorized: false
      }
    }));

    expect(nodemailer.createTransport().sendMail).toHaveBeenCalledWith({
      from: 'tiankgt@hotmail.com',
      to: mockData.email,
      subject: 'Automatic reply',
      text: `Hi ${mockData.firstName},\n\nThank you for registering with DoctorToday!`
    });
  });

  test('should throw error with invalid input', async () => {
    const mockData = {
      firstName: '',
      email: 'john@example.com'
    };

    await expect(sendRegisterEmail(mockData)).rejects.toThrow();
  });
});
