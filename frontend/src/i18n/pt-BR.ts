import { Translations } from '../types/i18n';

export const ptBR: Translations = {
  // Form labels
  'form.title': 'Agendamento de Serviços',
  'form.clientInfo': 'Informações do Cliente',
  'form.vehicleInfo': 'Informações do Veículo',
  'form.serviceScheduling': 'Serviço e Agendamento',
  'form.clientName': 'Nome *',
  'form.clientPhone': 'Telefone *',
  'form.vehicleBrand': 'Marca *',
  'form.vehicleModel': 'Modelo *',
  'form.vehicleYear': 'Ano *',
  'form.serviceType': 'Tipo de serviço *',
  'form.appointmentDate': 'Data *',
  'form.appointmentTime': 'Horário *',
  'form.submit': 'Agendar Serviço',
  'form.processing': 'Processando...',
  
  // Messages
  'message.success': 'Agendamento realizado com sucesso!',
  'message.error': 'Erro ao criar agendamento. Tente novamente.',
  'message.loading': 'Carregando...',
  'message.selectTime': 'Selecione o horário',
  'message.selectYear': 'Selecione o ano',
  'message.selectService': 'Selecione o serviço',
  
  // Service types
  'service.oilChange': 'Troca de óleo',
  'service.fullRevision': 'Revisão completa',
  'service.alignment': 'Alinhamento e balanceamento',
  'service.tireChange': 'Troca de pneus',
  'service.brakes': 'Freios',
  'service.suspension': 'Suspensão',
  'service.airConditioning': 'Ar condicionado',
  'service.others': 'Outros',
  
  // Placeholders
  'placeholder.phone': '(11) 99999-9999',
  
  // Success page
  'success.appointmentDetails': 'Detalhes do Agendamento',
  'success.message': 'Entraremos em contato para confirmação.',
  'success.backToForm': 'Novo Agendamento',
  'success.generateReceipt': 'Gerar Comprovante',
  'success.generateReceiptDateMessage': 'Gerado em',
  
  // Workshop list
  'workshop.list.title': 'Escolha uma Oficina',
  'workshop.list.subtitle': 'Selecione a oficina mais próxima de você para agendar seu serviço',
  'workshop.services': 'Serviços disponíveis',
  'workshop.schedule': 'Agendar Serviço',

  // Errors
  'error.generateReceipt': 'Erro ao gerar comprovante. Tente novamente.',
  'error.requiredFields': 'Por favor, preencha todos os campos obrigatórios.',
  'error.invalidPhone': 'Telefone inválido. Use o formato (99) 99999-9999.',

  // Console error messages
  'console.error.fetchServiceTypes': 'Erro ao buscar tipos de serviço:',
  'console.error.fetchVehicleCatalog': 'Erro ao buscar catálogo de veículos:',
  'console.error.fetchTimeSlots': 'Erro ao buscar horários disponíveis:',
};