export const TodoValidationMessages = {
    name: {
      isNotEmpty: 'The name field is required.',
      minLength: 'The name must be at least 3 characters long.',
      maxLength: 'The name must not exceed 10 characters.',
    },
    description: {
      isNotEmpty: 'The description field is required.',
      minLength: 'The description must be at least 10 characters long.',
    },
    status: {
      isEnum: 'The status must be one of the allowed values: PENDING, IN_PROGRESS, COMPLETED.',
    },
  };