import { render, screen, fireEvent } from '@testing-library/react';
import DynamicFormComponent from '../components/DynamicFormComponent';
import { vi } from 'vitest';

describe('DynamicFormComponent', () => {
    const mockSubmit = vi.fn();

    const loginFormFields = [
        { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter email' },
        { name: 'password', label: 'Password', type: 'password', placeholder: 'Enter password' },
    ];

    const settings = {
        submitButton: {
            text: 'Save',
            textLoading: "Saving...",
        }
    }

    beforeEach(() => {
        render(
            <DynamicFormComponent
                formFields={loginFormFields}
                onSubmit={mockSubmit}
                isFormSubmitted={false}
                serverError={null}
                setting={settings}
            />
        );
    });

    it('renders all form fields', () => {
        expect(screen.getByPlaceholderText(/enter email/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/enter password/i)).toBeInTheDocument();
        expect(screen.getByRole('button',/Save/i)).toBeInTheDocument();
    });


});