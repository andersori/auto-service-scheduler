import { Translations } from '../types/i18n';

export const enUS: Translations = {
  // Header
  'header.title': 'Auto Service Scheduler',

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
  'workshop.services': 'Available services',
  'workshop.schedule': 'Schedule Service',
  
  // Workshop invite (landing)
  'workshop.invite.register': 'Register Workshop',
  'workshop.invite.title': 'Connect Your Workshop to New Clients',
  'workshop.invite.subtitle': 'Make it easy for clients to reach you and organize your services digitally.',

  // Registered workshops list
  'workshop.list.registeredTitle': 'Registered Workshops',
  'workshop.list.registeredSubtitle': 'See workshops already available to receive online bookings.',

  // Errors
  'error.generateReceipt': 'Error generating receipt. Please try again.',
  'error.loadWorkshops': 'Error loading workshops.',

  // Messages
  'message.selectWorkshop': 'Select a workshop',
  'message.selectWorkshopToView': 'Please select a workshop to view appointments',
  'error.requiredFields': 'Please fill in all required fields.',
  'error.invalidPhone': 'Invalid phone. Use the format (999) 999-9999.',

  // Console error messages
  'console.error.fetchServiceTypes': 'Error fetching service types:',
  'console.error.fetchVehicleCatalog': 'Error fetching vehicle catalog:',
  'console.error.fetchTimeSlots': 'Error fetching time slots:',
  'console.error.fetchWorkshops': 'Error fetching workshops:',
  'console.error.parseUser': 'Error parsing user data:',
  'console.error.registration': 'Registration error:',
  'console.error.workshopRegistration': 'Workshop registration error:',

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
  'user.registration.alreadyWithAccount': 'Already have an account?',
  'user.registration.LoginLink': 'Log in here',

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
  'workshop.form.operatingHours': 'Operating Hours *',
  'workshop.form.services': 'Services Offered *',
  'workshop.form.submit': 'Register Workshop',
  'workshop.form.processing': 'Registering...',
  'workshop.form.success': 'Workshop registered successfully!',
  'workshop.form.error': 'Error registering workshop. Please try again.',
  'workshop.form.error.noServices': 'Please select at least one service.',
  'workshop.form.error.noDays': 'Please select at least one day of the week.',
  'workshop.form.error.noTimeRanges': 'Please add at least one time slot for selected days.',
  'workshop.form.error.invalidTimeRange': 'Please fill all time slots correctly.',
  'workshop.form.error.invalidTimeOrder': 'Start time must be before end time.',
  'workshop.form.placeholder.name': 'e.g., AutoService Center',
  'workshop.form.placeholder.address': 'e.g., 123 Main Street, Downtown - New York, NY',
  'workshop.form.placeholder.description': 'Describe your workshop, specialties and differentials...',
  'workshop.form.timeTo': 'to',
  'workshop.form.addTimeRange': '+ Add Time Slot',
  'workshop.form.removeTimeRange': 'Remove time slot',
  
  // Days of the week
  'workshop.form.days.monday': 'Monday',
  'workshop.form.days.tuesday': 'Tuesday',
  'workshop.form.days.wednesday': 'Wednesday',
  'workshop.form.days.thursday': 'Thursday',
  'workshop.form.days.friday': 'Friday',
  'workshop.form.days.saturday': 'Saturday',
  'workshop.form.days.sunday': 'Sunday',

  // Loading messages
  'loading.workshops': 'Loading workshops...',

  // Calendar
  'calendar.title': 'Appointments Calendar',
  'calendar.subtitle': 'View weekly appointments',
  'calendar.previousWeek': 'Previous Week',
  'calendar.nextWeek': 'Next Week',
  'calendar.currentWeek': 'Current Week',
  'calendar.noAppointments': 'No appointments for this date',
  'calendar.loading': 'Loading appointments...',
  'calendar.error': 'Error loading appointments',

  // Calendar days (short)
  'calendar.days.monday': 'Mon',
  'calendar.days.tuesday': 'Tue',
  'calendar.days.wednesday': 'Wed',
  'calendar.days.thursday': 'Thu',
  'calendar.days.friday': 'Fri',
  'calendar.days.saturday': 'Sat',
  'calendar.days.sunday': 'Sun',

  // Appointment preview
  'appointment.preview.title': 'Appointment Details',
  'appointment.preview.client': 'Client',
  'appointment.preview.phone': 'Phone',
  'appointment.preview.vehicle': 'Vehicle',
  'appointment.preview.services': 'Services',
  'appointment.preview.date': 'Date',
  'appointment.preview.time': 'Time',
  'appointment.preview.close': 'Close',
};