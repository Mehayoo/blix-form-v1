import { AccountType } from '../constants'

export interface FormInputs {
	readonly accountType: AccountType
	readonly username: string
	readonly password: string
	readonly serverAddress?: string
	readonly serverPath?: string
	readonly port?: number
	readonly useSSL?: boolean
}
