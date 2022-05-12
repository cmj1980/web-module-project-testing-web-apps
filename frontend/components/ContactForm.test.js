import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

test('renders without errors', () => {
    render(<ContactForm/>);

});

test('renders the contact form header', () => {
    render(<ContactForm/>);

    const headerElement = screen.queryByText(/contact form/i);

    expect(headerElement).toBeInTheDocument();
    expect(headerElement).toBeTruthy();
    expect(headerElement).toHaveTextContent(/contact form/i);
});

 test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
     render(<ContactForm/>);

     const firstNameInput = screen.getByLabelText(/first name*/i);
     userEvent.type(firstNameInput,"foo");

     const errorMessage = await screen.findAllByTestId("error");
     expect(errorMessage).toHaveLength(1);
 });

 test('renders THREE error messages if user enters no values into any fields.', async () => {
      render(<ContactForm/>);  

     const submitButton = screen.getByRole("button");
     userEvent.click(submitButton);

     const errorMessages = await screen.findAllByTestId("error");
     expect(errorMessages).toHaveLength(3);
});

 test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
     render(<ContactForm/>);

     const firstNameInput = screen.getByLabelText(/first name*/i);
     userEvent.type(firstNameInput,"fooBar");

     const lastNameInput = screen.getByLabelText(/last name*/i);
     userEvent.type(lastNameInput,"baz");

     const emailInput = screen.getByLabelText(/email*/i);
     userEvent.type(emailInput,"foo");

   await waitFor(() => {
       const errorMessage = screen.queryAllByTestId("error");
       expect(errorMessage).toHaveLength(1);
   });

 });

 test('renders "email must be a valid email address" if an invalid email is entered', async () => {
     render(<ContactForm/>);

     const emailInput = screen.getByLabelText(/email*/i);
     userEvent.type(emailInput, "fooBar");

     const errorMessage = await screen.findByText(/email must be a valid email address/i);
     expect(errorMessage).toBeInTheDocument();

 });

 test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
     render(<ContactForm/>);

     const submitButton = screen.getByRole("button");
     userEvent.click(submitButton);

     const errorMessage = await screen.findByText(/lastName is a required field/i);
     expect(errorMessage).toBeInTheDocument();
 });

 test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
     render(<ContactForm/>);

     const firstNameInput = screen.getByLabelText(/first name*/i);
     const lastNameInput = screen.getByLabelText(/last name*/i);
     const emailInput = screen.getByLabelText(/email*/i);

     userEvent.type(firstNameInput, "fooBar");
     userEvent.type(lastNameInput, "baz");
     userEvent.type(emailInput, "foo@bar.com");

     const submitButton = screen.getByRole("button");
     userEvent.click(submitButton);

     await waitFor(() => {
         const firstNameDisplayed = screen.queryByText("fooBar");
         const lastNameDisplayed = screen.queryByText("baz");
         const emailDisplayed = screen.queryByText("foo@bar.com");
         const messageDisplay = screen.queryByTestId("messageDisplay");

         expect(firstNameDisplayed).toBeInTheDocument();
         expect(lastNameDisplayed).toBeInTheDocument();
         expect(emailDisplayed).toBeInTheDocument();
         expect(messageDisplay).not.toBeInTheDocument();

     });
 });

 test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm/>);

    const emailInput = screen.getByLabelText(/email*/i);
    userEvent.type(emailInput, "fooBar");

    const errorMessage = await screen.findByText(/email must be a valid email address/i);
    expect(errorMessage).toBeInTheDocument();

});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm/>);

    const submitButton = screen.getByRole("button");
    userEvent.click(submitButton);

    const errorMessage = await screen.findByText(/lastName is a required field/i);
    expect(errorMessage).toBeInTheDocument();
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm/>);

    const firstNameInput = screen.getByLabelText(/first name*/i);
    const lastNameInput = screen.getByLabelText(/last name*/i);
    const emailInput = screen.getByLabelText(/email*/i);
    const messageDisplay = screen.getByLabelText(/message/i);

    userEvent.type(firstNameInput, "fooBar");
    userEvent.type(lastNameInput, "baz");
    userEvent.type(emailInput, "foo@bar.com");
    userEvent.type(messageDisplay, "fooBarBaz");

    const submitButton = screen.getByRole("button");
    userEvent.click(submitButton);

    await waitFor(() => {
        const firstNameDisplayed = screen.queryByText("fooBar");
        const lastNameDisplayed = screen.queryByText("baz");
        const emailDisplayed = screen.queryByText("foo@bar.com");
        const messageDisplay = screen.queryByTestId("messageDisplay");

        expect(firstNameDisplayed).toBeInTheDocument();
        expect(lastNameDisplayed).toBeInTheDocument();
        expect(emailDisplayed).toBeInTheDocument();
        expect(messageDisplay).toBeInTheDocument();

    });
 });
