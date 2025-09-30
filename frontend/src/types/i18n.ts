export type Language = 'pt-BR' | 'en-US';

export interface Translations {
  // Appointment statuses
  'appointment.status.created': string,
  'appointment.status.pending_confirmation': string,
  'appointment.status.confirmed': string,
  'appointment.status.completed': string,
  'appointment.status.cancelled': string,

  'appointment.preview.status': string;
  'calendar.adminCreateAppointment': string;
  'calendar.expandDay': string;
  'calendar.minimizeDay': string;

  'error.close': string;

  // Header
  'header.title': string;

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
  'form.selectBranch': string;
  'form.appointmentDate': string;
  'form.appointmentTime': string;
  'form.submit': string;
  'form.processing': string;
  'form.cancel': string;
  
  // Messages
  'message.success': string;
  'message.error': string;
  'message.loading': string;
  'message.selectTime': string;
  'message.selectYear': string;
  'message.selectService': string;
  'message.selectBranch': string;
  
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
  'workshop.services': string;
  'workshop.schedule': string;

  // Workshop invite (landing)
  'workshop.invite.register': string;
  'workshop.invite.title': string;
  'workshop.invite.subtitle': string;

  // Registered workshops list
  'workshop.list.registeredTitle': string;
  'workshop.list.registeredSubtitle': string;

  // Error messages
  'error.generateReceipt': string;
  'error.receiptContainerNotFound': string;
  'error.requiredFields': string;
  'error.invalidPhone': string;
  'error.loadWorkshops': string;

  // Messages
  'message.selectWorkshop': string;
  'message.selectWorkshopToView': string;

  // Console error messages
  'console.error.fetchServiceTypes': string;
  'console.error.fetchVehicleCatalog': string;
  'console.error.fetchTimeSlots': string;
  'console.error.fetchWorkshops': string;
  'console.error.parseUser': string;
  'console.error.registration': string;
  'console.error.workshopRegistration': string;
  'console.error.branchRegistration': string;

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
  'user.registration.alreadyWithAccount': string;
  'user.registration.LoginLink': string;

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
  'dashboard.branches.manage': string;
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

  // Branch form
  'branch.form.address': string;
  'branch.form.operatingHours': string;
  'branch.form.services': string;
  'branch.form.submit': string;
  'branch.form.processing': string;
  'branch.form.success': string;
  'branch.form.error': string;
  'branch.form.placeholder.address': string;
  'branch.form.placeholder.customService': string;
  'branch.form.addCustomService': string;

  // Branch management
  'branch.management.title': string;
  'branch.management.subtitle': string;
  'branch.management.selectWorkshop': string;
  'branch.management.branches': string;
  'branch.management.addBranch': string;
  'branch.management.newBranch': string;
  'branch.management.noBranches': string;
  'branch.management.noWorkshops': string;
  'branch.management.createWorkshopFirst': string;
  'branch.management.edit': string;
  'branch.management.delete': string;
  
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

  // Calendar
  'calendar.title': string;
  'calendar.subtitle': string;
  'calendar.previousWeek': string;
  'calendar.nextWeek': string;
  'calendar.currentWeek': string;
  'calendar.noAppointments': string;
  'calendar.loading': string;
  'calendar.error': string;

  // Calendar days (short)
  'calendar.days.monday': string;
  'calendar.days.tuesday': string;
  'calendar.days.wednesday': string;
  'calendar.days.thursday': string;
  'calendar.days.friday': string;
  'calendar.days.saturday': string;
  'calendar.days.sunday': string;

  // Appointment preview
  'appointment.preview.title': string;
  'appointment.preview.client': string;
  'appointment.preview.phone': string;
  'appointment.preview.vehicle': string;
  'appointment.preview.services': string;
  'appointment.preview.date': string;
  'appointment.preview.time': string;
  'appointment.preview.close': string;
}