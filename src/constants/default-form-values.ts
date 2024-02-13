import { AccountType } from './account-type.enum'

export const DEFAULT_BASE_VALUES = {
	accountType: AccountType.MANUAL,
	username: '',
	password: '',
	serverAddress: '',
}

export const DEFAULT_EXTENDED_VALUES = {
	serverPath: '',
	port: null,
}
