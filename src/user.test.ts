import { Request, Response, NextFunction } from 'express';
import  UserRegistrationModel  from './model/UserRegistration'; // Import your model here
import userRegistrationController from './controller/UserRegistrationController'; // Import your controller here

jest.mock('./model/UserRegistration');

describe('User Controller - postUserRegistration', () => {
  it('should create a new user', async () => {
    const mockRequest = {
      body: {
        data: JSON.stringify({
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          password: 'somepassword',
        }),
        file: { filename: 'mock-file.jpg' }, 
      },
    } as Request;

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const mockUser = {
      _id: 'mock-user-id',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      role: 'user',
    };
    (UserRegistrationModel.create as jest.Mock).mockResolvedValue(mockUser);

    await userRegistrationController.postUserRegistration(
      mockRequest,
      mockResponse,
      {} as NextFunction
    );

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: 'User Register Successfully',
      hasError: false,
      user: mockUser,
    });
  });

  it('should return an error when user creation fails', async () => {
    const mockRequest = {
      body: {
        data: JSON.stringify({
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          password: 'somepassword',
        }),
        file: { filename: 'mock-file.jpg' }, 
      },
    } as Request;

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    (UserRegistrationModel.create as jest.Mock).mockResolvedValue(null);

    await userRegistrationController.postUserRegistration(
      mockRequest,
      mockResponse,
      {} as NextFunction
    );

    
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: 'User Registration Error....',
      hasError: true,
      results: {},
    });
  });
});
