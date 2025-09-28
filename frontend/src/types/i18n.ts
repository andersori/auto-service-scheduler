export type Language = 'pt-BR' | 'en-US';

export interface Translations {
  // Form labels
  'form.title': string;
  'form.clientInfo': string;
  'form.vehicleInfo': string;
  'form.serviceScheduling': string;
  'form.clientName': string;
  'form.clientPhone': string;
  'form.vehicleBrand': string;
  'form.vehicleModel': string;
  'form.vehicleYear': string;
  'form.serviceType': string;
  'form.appointmentDate': string;
  'form.appointmentTime': string;
  'form.submit': string;
  'form.processing': string;
  
  // Messages
  'message.success': string;
  'message.error': string;
  'message.loading': string;
  'message.selectTime': string;
  'message.selectYear': string;
  'message.selectService': string;
  
  // Service types
  'service.oilChange': string;
  'service.fullRevision': string;
  'service.alignment': string;
  'service.tireChange': string;
  'service.brakes': string;
  'service.suspension': string;
  'service.airConditioning': string;
  'service.others': string;
  
  // Placeholders
  'placeholder.phone': string;
  
  // Success page
  'success.appointmentDetails': string;
  'success.message': string;
  'success.backToForm': string;
  'success.generateReceipt': string;
  'success.generateReceiptDateMessage': string;
  
  // Workshop list
  'workshop.register': string;
  'workshop.list.title': string;
  'workshop.list.subtitle': string;
  'workshop.services': string;
  'workshop.schedule': string;

  // Error messages
  'error.generateReceipt': string;
  'error.requiredFields': string;
  'error.invalidPhone': string;

  // Console error messages
  'console.error.fetchServiceTypes': string;
  'console.error.fetchVehicleCatalog': string;
  'console.error.fetchTimeSlots': string;
  'console.error.fetchWorkshops': string;
  'console.error.parseUser': string;

  // User registration and login
  'user.registration.title': string;
  'user.registration.subtitle': string;
  'user.form.name': string;
  'user.form.email': string;
  'user.form.phone': string;
  'user.form.password': string;
  'user.form.confirmPassword': string;
  'user.form.submit': string;
  'user.form.processing': string;
  'user.message.success': string;
  'user.message.error': string;
  'user.message.emailExists': string;
  'user.error.invalidEmail': string;
  'user.error.passwordTooShort': string;
  'user.error.passwordMismatch': string;
  'user.placeholder.name': string;
  'user.placeholder.email': string;
  'user.placeholder.phone': string;
  'user.placeholder.password': string;
  'user.placeholder.confirmPassword': string;

  // Login form
  'user.login.title': string;
  'user.login.subtitle': string;
  'user.login.submit': string;
  'user.login.processing': string;
  'user.login.noAccount': string;
  'user.login.registerLink': string;
  'user.login.error.invalid': string;
  'user.login.error.general': string;

  // Dashboard
  'dashboard.welcome': string;
  'dashboard.logout': string;
  'dashboard.actions.title': string;
  'dashboard.workshops.title': string;
  'dashboard.workshops.description': string;
  'dashboard.workshops.register': string;
  'dashboard.workshops.form.title': string;
  'dashboard.appointments.title': string;
  'dashboard.appointments.description': string;
  'dashboard.appointments.view': string;
  'dashboard.back': string;

  // Workshop form
  'workshop.form.name': string;
  'workshop.form.phone': string;
  'workshop.form.address': string;
  'workshop.form.description': string;
  'workshop.form.operatingHours': string;
  'workshop.form.services': string;
  'workshop.form.submit': string;
  'workshop.form.processing': string;
  'workshop.form.success': string;
  'workshop.form.error': string;
  'workshop.form.error.noServices': string;
  'workshop.form.error.noDays': string;
  'workshop.form.error.noTimeRanges': string;
  'workshop.form.error.invalidTimeRange': string;
  'workshop.form.error.invalidTimeOrder': string;
  'workshop.form.placeholder.name': string;
  'workshop.form.placeholder.address': string;
  'workshop.form.placeholder.description': string;
  'workshop.form.timeTo': string;
  'workshop.form.addTimeRange': string;
  'workshop.form.removeTimeRange': string;
  
  // Days of the week
  'workshop.form.days.monday': string;
  'workshop.form.days.tuesday': string;
  'workshop.form.days.wednesday': string;
  'workshop.form.days.thursday': string;
  'workshop.form.days.friday': string;
  'workshop.form.days.saturday': string;
  'workshop.form.days.sunday': string;

  // Loading messages
  'loading.workshops': string;
}