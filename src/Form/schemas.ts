import * as Yup from 'yup'
import { AccountType, inputsErrors, REGEX_VALIDATION } from '../constants'

export const baseSchema = Yup.object().shape({
	accountType: Yup.string().oneOf(Object.values(AccountType)).defined(), // ensures the field's value is not undefined, but it can be null or an empty string (for string fields)
	username: Yup.string()
		.required(inputsErrors.required)
		.matches(REGEX_VALIDATION.email, inputsErrors.invalidEmail),
	password: Yup.string()
		.required(inputsErrors.required)
		.matches(REGEX_VALIDATION.password, inputsErrors.invalidPassword),
	serverAddress: Yup.string().when(
		(
			value: string[] | undefined,
			schema: Yup.StringSchema<
				string | undefined,
				Yup.AnyObject,
				undefined,
				''
			>
		) =>
			value && value[0]?.length
				? schema.matches(REGEX_VALIDATION.url, inputsErrors.invalidUrl)
				: schema.notRequired()
	),
})

export const extendedSchema = Yup.object().shape({
	serverPath: Yup.string().when(
		(
			value: string[] | undefined,
			schema: Yup.StringSchema<
				string | undefined,
				Yup.AnyObject,
				undefined,
				''
			>
		) =>
			value && value[0]?.length
				? schema.matches(
						REGEX_VALIDATION.path,
						inputsErrors.invalidPath
				  )
				: schema.notRequired()
	),
	port: Yup.number()
		.nullable()
		.transform((value, originalValue) =>
			String(originalValue).trim() === '' ? null : value
		)
		.typeError(inputsErrors.mustBeNumber)
		.min(1000, inputsErrors.getMin(1000))
		.max(9000, inputsErrors.getMax(9000)),
	useSSL: Yup.boolean(),
})
