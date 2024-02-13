import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { baseSchema, extendedSchema } from './schemas'
import { FormInputs } from './types'
import {
	AccountType,
	DEFAULT_BASE_VALUES,
	DEFAULT_EXTENDED_VALUES,
	formLiterals,
} from '../constants'
import './style.scss'

const Form = () => {
	const [accountType, setAccountType] = useState<AccountType>(
		AccountType.MANUAL
	)

	const { clearErrors, control, formState, handleSubmit, register } =
		useForm<FormInputs>({
			resolver: yupResolver(
				accountType === AccountType.ADVANCED
					? baseSchema.concat(extendedSchema)
					: baseSchema
			),
			mode: 'all',
			defaultValues:
				accountType === AccountType.ADVANCED
					? { ...DEFAULT_BASE_VALUES, ...DEFAULT_EXTENDED_VALUES }
					: DEFAULT_BASE_VALUES,
		})
	const { errors, isValid } = formState

	const handleFormSubmit = (data: FormInputs): void => {
		const { accountType, username, password, serverAddress } = data

		let requestObject: FormInputs

		if (accountType === AccountType.MANUAL) {
			requestObject = { accountType, username, password, serverAddress }
		} else {
			requestObject = data
		}

		console.log('@@requestObject: ', requestObject)
	}

	return (
		<div className="container">
			<div className="row">
				<form
					onSubmit={(e) => {
						e.preventDefault()
						handleSubmit(handleFormSubmit)(e)
					}}
					className="col s6 offset-s3"
				>
					<div>
						<label>{formLiterals.labels.accountType}</label>
						<Controller
							name="accountType"
							control={control}
							defaultValue={AccountType.MANUAL}
							render={({ field }) => (
								<select
									{...field}
									onChange={(e) => {
										field.onChange(e)
										setAccountType(
											e.target.value as AccountType
										)
										clearErrors(field.name)
									}}
								>
									<option value={AccountType.MANUAL}>
										{AccountType.MANUAL}
									</option>
									<option value={AccountType.ADVANCED}>
										{AccountType.ADVANCED}
									</option>
								</select>
							)}
						/>
					</div>

					<div>
						<label>{formLiterals.labels.username} *</label>
						<input type="text" {...register('username')} />
						{
							<span className="error-msg">
								{errors.username?.message}
							</span>
						}
					</div>

					<div>
						<label>{formLiterals.labels.password} *</label>
						<input type="password" {...register('password')} />
						{
							<span className="error-msg">
								{errors.password?.message}
							</span>
						}
					</div>

					<div>
						<label>{formLiterals.labels.serverAddress}</label>
						<input type="text" {...register('serverAddress')} />
						{
							<span className="error-msg">
								{errors.serverAddress?.message}
							</span>
						}
					</div>

					{accountType === AccountType.ADVANCED && (
						<>
							<div>
								<label>{formLiterals.labels.serverPath}</label>
								<input
									type="text"
									{...register('serverPath')}
								/>
								{
									<span className="error-msg">
										{errors.serverPath?.message}
									</span>
								}
							</div>

							<div>
								<label>{formLiterals.labels.port}</label>
								<input type="number" {...register('port')} />
								{
									<span className="error-msg">
										{errors.port?.message}
									</span>
								}
							</div>

							<div>
								<label>
									<input
										type="checkbox"
										{...register('useSSL')}
									/>
									<span>{formLiterals.labels.useSsl}</span>
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
						{formLiterals.buttons.submit}
					</button>
				</form>
			</div>
		</div>
	)
}

export default Form
