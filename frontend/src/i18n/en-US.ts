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
  'user.form.submit': 'Register',
  'user.form.processing': 'Registering...',
  'user.message.success': 'User registered successfully!',
  'user.message.error': 'Error registering user. Please try again.',
  'user.message.emailExists': 'This email is already in use.',
  'user.error.invalidEmail': 'Invalid email.',
  'user.placeholder.name': 'Enter your full name',
  'user.placeholder.email': 'Enter your email',
  'user.placeholder.phone': '(555) 123-4567',

  // Loading messages
  'loading.workshops': 'Loading workshops...',
};