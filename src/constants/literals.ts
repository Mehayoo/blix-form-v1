export const inputsErrors = {
	required: 'This field cannot be empty',
	invalidEmail: 'Invalid email address',
	invalidPassword:
		'Password must have minimum 8 characters, no spaces, at least one number, at least one uppercase letter',
	invalidUrl: 'Invalid URL',
	invalidPath: 'Path must contain at least "/"',
	mustBeNumber: 'Value must be a number',
	getMin: (value: number) => `Minimum value accepted is ${value}`,
	getMax: (value: number) => `Maximum value accepted is ${value}`,
}

export const formLiterals = {
	labels: {
		accountType: 'Account Type',
		username: 'Username',
		password: 'Password',
		serverAddress: 'Server Address',
		serverPath: 'Server Path',
		port: 'Port',
		useSsl: 'Use SSL',
	},
	buttons: {
		submit: 'Submit',
	},
}
