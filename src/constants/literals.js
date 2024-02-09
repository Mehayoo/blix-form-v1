export const inputsErrors = {
	required: 'This field cannot be empty',
	invalidEmail: 'Invalid email address',
	invalidPassword:
		'Password must have minimum 8 characters, no spaces, at least one number, at least one uppercase letter',
	invalidUrl: 'Invalid URL',
	invalidPath: 'Path must contain at least "/"',
	mustBeNumber: 'Value must be a number',
	getMin: (value) => `Minimum value accepted is ${value}`,
	getMax: (value) => `Maximum value accepted is ${value}`,
}
