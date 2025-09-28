import { Translations } from '../types/i18n';

export const enUS: Translations = {
  // Form labels
  'form.title': 'Service Scheduling',
  'form.clientInfo': 'Client Information',
  'form.vehicleInfo': 'Vehicle Information',
  'form.serviceScheduling': 'Service and Scheduling',
  'form.clientName': 'Name *',
  'form.clientPhone': 'Phone *',
  'form.vehicleBrand': 'Brand *',
  'form.vehicleModel': 'Model *',
  'form.vehicleYear': 'Year *',
  'form.serviceType': 'Service type *',
  'form.appointmentDate': 'Date *',
  'form.appointmentTime': 'Time *',
  'form.submit': 'Schedule Service',
  'form.processing': 'Processing...',

  // Messages
  'message.success': 'Appointment scheduled successfully!',
  'message.error': 'Error creating appointment. Please try again.',
  'message.loading': 'Loading...',
  'message.selectTime': 'Select time',
  'message.selectYear': 'Select year',
  'message.selectService': 'Select service',

  // Service types
  'service.oilChange': 'Oil change',
  'service.fullRevision': 'Full revision',
  'service.alignment': 'Alignment and balancing',
  'service.tireChange': 'Tire replacement',
  'service.brakes': 'Brakes',
  'service.suspension': 'Suspension',
  'service.airConditioning': 'Air conditioning',
  'service.others': 'Others',

  // Placeholders
  'placeholder.phone': '(555) 123-4567',

  // Success page
  'success.appointmentDetails': 'Appointment Details',
  'success.message': 'We will contact you for confirmation.',
  'success.backToForm': 'New Appointment',
  'success.generateReceipt': 'Save Receipt',
  'success.generateReceiptDateMessage': 'Generated on',

  // Workshop list
  'workshop.list.title': 'Choose a Workshop',
  'workshop.list.subtitle': 'Select the workshop closest to you to schedule your service',
  'workshop.services': 'Available services',
  'workshop.schedule': 'Schedule Service',

  // Errors
  'error.generateReceipt': 'Error generating receipt. Please try again.',
  'error.requiredFields': 'Please fill in all required fields.',
  'error.invalidPhone': 'Invalid phone. Use the format (999) 999-9999.',

  // Console error messages
  'console.error.fetchServiceTypes': 'Error fetching service types:',
  'console.error.fetchVehicleCatalog': 'Error fetching vehicle catalog:',
  'console.error.fetchTimeSlots': 'Error fetching time slots:',

  // User registration
  'user.registration.title': 'User Registration',
  'user.registration.subtitle': 'Register to manage your workshop',
  'user.form.name': 'Name *',
  'user.form.email': 'Email *',
  'user.form.phone': 'Phone *',
  'user.form.password': 'Password *',
  'user.form.confirmPassword': 'Confirm Password *',
  'user.form.submit': 'Register',
  'user.form.processing': 'Registering...',
  'user.message.success': 'User registered successfully!',
  'user.message.error': 'Error registering user. Please try again.',
  'user.message.emailExists': 'This email is already in use.',
  'user.error.invalidEmail': 'Invalid email.',
  'user.error.passwordTooShort': 'Password must be at least 6 characters long.',
  'user.error.passwordMismatch': 'Passwords do not match.',
  'user.placeholder.name': 'Enter your full name',
  'user.placeholder.email': 'Enter your email',
  'user.placeholder.phone': '(555) 123-4567',
  'user.placeholder.password': 'Enter your password',
  'user.placeholder.confirmPassword': 'Confirm your password',

  // Login form
  'user.login.title': 'Login',
  'user.login.subtitle': 'Sign in to your account to manage your workshop',
  'user.login.submit': 'Sign In',
  'user.login.processing': 'Signing in...',
  'user.login.noAccount': 'Don\'t have an account?',
  'user.login.registerLink': 'Register here',
  'user.login.error.invalid': 'Invalid email or password.',
  'user.login.error.general': 'Error logging in. Please try again.',

  // Dashboard
  'dashboard.welcome': 'Welcome',
  'dashboard.logout': 'Logout',
  'dashboard.actions.title': 'What would you like to do?',
  'dashboard.workshops.title': 'Register Workshop',
  'dashboard.workshops.description': 'Register a new workshop to offer services to customers',
  'dashboard.workshops.register': 'Register Workshop',
  'dashboard.workshops.form.title': 'New Workshop',
  'dashboard.appointments.title': 'View Appointments',
  'dashboard.appointments.description': 'View existing appointments and manage services',
  'dashboard.appointments.view': 'View Appointments',
  'dashboard.back': 'Back',

  // Workshop form
  'workshop.form.name': 'Workshop Name *',
  'workshop.form.phone': 'Phone *',
  'workshop.form.address': 'Address *',
  'workshop.form.description': 'Description *',
  'workshop.form.hours': 'Operating Hours *',
  'workshop.form.services': 'Services Offered *',
  'workshop.form.submit': 'Register Workshop',
  'workshop.form.processing': 'Registering...',
  'workshop.form.success': 'Workshop registered successfully!',
  'workshop.form.error': 'Error registering workshop. Please try again.',
  'workshop.form.error.noServices': 'Please select at least one service.',
  'workshop.form.placeholder.name': 'e.g., AutoService Center',
  'workshop.form.placeholder.address': 'e.g., 123 Main Street, Downtown - New York, NY',
  'workshop.form.placeholder.description': 'Describe your workshop, specialties and differentials...',
  'workshop.form.placeholder.hours': 'e.g., Mon-Fri: 8am-6pm | Sat: 8am-12pm',

  // Loading messages
  'loading.workshops': 'Loading workshops...',
};