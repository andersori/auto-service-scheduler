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

  // User registration
  'user.registration.title': string;
  'user.registration.subtitle': string;
  'user.form.name': string;
  'user.form.email': string;
  'user.form.phone': string;
  'user.form.submit': string;
  'user.form.processing': string;
  'user.message.success': string;
  'user.message.error': string;
  'user.message.emailExists': string;
  'user.error.invalidEmail': string;
  'user.placeholder.name': string;
  'user.placeholder.email': string;
  'user.placeholder.phone': string;
}