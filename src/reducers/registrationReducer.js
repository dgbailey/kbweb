const initialState = {
	registrationStart: false,
	registrationSuccess: false,
	registrationError: ''
};

export const registrationReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'START_REGISTRATION':
			return {
				...state,
				registrationStart: true,
				registrationStart: false,
				registrationError: ''
			};

		case 'REGISTRATION_COMPLETE':
			return {
				...state,
				registrationStart: false,
				registrationSuccess: true
			};

		case 'REGISTRATION_ERROR':
			return {
				...state,
				registrationStart: false,
				registrationSuccess: false,
				registrationError: action.payload
			};

		default:
			return state;
	}
};
