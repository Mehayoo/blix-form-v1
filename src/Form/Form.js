import React, { useState } from 'react'
import * as Yup from 'yup'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import {
	DEFAULT_BASE_VALUES,
	DEFAULT_EXTENDED_VALUES,
	inputsErrors,
	REGEX_VALIDATION,
} from '../constants'
import './style.scss'

const Form = () => {
	const [accountType, setAccountType] = useState('Manual')

	const baseSchema = Yup.object().shape({
		accountType: Yup.string(),
		username: Yup.string()
			.required(inputsErrors.required)
			.matches(REGEX_VALIDATION.email, inputsErrors.invalidEmail),
		password: Yup.string()
			.required(inputsErrors.required)
			.matches(REGEX_VALIDATION.password, inputsErrors.invalidPassword),
		serverAddress: Yup.string().matches(
			REGEX_VALIDATION.url,
			inputsErrors.invalidUrl
		),
	})

	const extendedSchema = Yup.object().shape({
		serverPath: Yup.string().matches(
			REGEX_VALIDATION.path,
			inputsErrors.invalidPath
		),
		port: Yup.number()
			.typeError(inputsErrors.mustBeNumber)
			.min(1000, inputsErrors.getMin(1000))
			.max(9000, inputsErrors.getMax(9000))
			.nullable(),
		useSSL: Yup.boolean(),
	})

	const { clearErrors, control, formState, handleSubmit, register } = useForm(
		{
			resolver: yupResolver(
				accountType === 'Advanced'
					? baseSchema.concat(extendedSchema)
					: baseSchema
			),
			mode: 'all',
			defaultValues: {
				...DEFAULT_BASE_VALUES,
				...DEFAULT_EXTENDED_VALUES,
			},
		}
	)
	const { errors, isValid } = formState

	const handleFormSubmit = (data) => {
		const { accountType, username, password, serverAddress } = data

		let requestObject

		if (accountType === 'Manual') {
			requestObject = { accountType, username, password, serverAddress }
		} else {
			requestObject = data
		}

		console.log('@@requestObject: ', requestObject)
	}

	return (
		<div className="row form">
			<form
				onSubmit={(e) => {
					e.preventDefault()
					handleSubmit(handleFormSubmit)(e)
				}}
				className="col s6"
			>
				<div>
					<label>Account Type:</label>
					<Controller
						name="accountType"
						control={control}
						defaultValue="Manual"
						render={({ field }) => (
							<select
								{...field}
								onChange={(e) => {
									field.onChange(e)
									setAccountType(e.target.value)
									clearErrors(field.name)
								}}
							>
								<option value="Manual">Manual</option>
								<option value="Advanced">Advanced</option>
							</select>
						)}
					/>
				</div>

				<div>
					<label>Username:</label>
					<input type="text" {...register('username')} />
					{errors.username && <span>{errors.username.message}</span>}
				</div>

				<div>
					<label>Password:</label>
					<input type="password" {...register('password')} />
					{errors.password && <span>{errors.password.message}</span>}
				</div>

				<div>
					<label>Server Address:</label>
					<input type="text" {...register('serverAddress')} />
					{errors.serverAddress && (
						<span>{errors.serverAddress.message}</span>
					)}
				</div>

				{accountType === 'Advanced' && (
					<>
						<div>
							<label>Server Path:</label>
							<input type="text" {...register('serverPath')} />
							{errors.serverPath && (
								<span>{errors.serverPath.message}</span>
							)}
						</div>

						<div>
							<label>Port:</label>
							<input type="number" {...register('port')} />
							{errors.port && <span>{errors.port.message}</span>}
						</div>

						<div>
							<label>
								<input
									type="checkbox"
									{...register('useSSL')}
								/>
								<span>Use SSL</span>
							</label>
						</div>
					</>
				)}

				<button
					className="btn waves-effect waves-light"
					disabled={!isValid}
					type="submit"
					name="action"
				>
					Submit
				</button>
			</form>
		</div>
	)
}

export default Form
