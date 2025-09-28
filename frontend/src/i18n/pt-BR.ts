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
  'success.generateReceipt': 'Salvar Comprovante',
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

  // User registration
  'user.registration.title': 'Cadastro de Usuário',
  'user.registration.subtitle': 'Cadastre-se para gerenciar sua oficina',
  'user.form.name': 'Nome *',
  'user.form.email': 'Email *',
  'user.form.phone': 'Telefone *',
  'user.form.password': 'Senha *',
  'user.form.confirmPassword': 'Confirmar Senha *',
  'user.form.submit': 'Cadastrar',
  'user.form.processing': 'Cadastrando...',
  'user.message.success': 'Usuário cadastrado com sucesso!',
  'user.message.error': 'Erro ao cadastrar usuário. Tente novamente.',
  'user.message.emailExists': 'Este email já está em uso.',
  'user.error.invalidEmail': 'Email inválido.',
  'user.error.passwordTooShort': 'A senha deve ter pelo menos 6 caracteres.',
  'user.error.passwordMismatch': 'As senhas não coincidem.',
  'user.placeholder.name': 'Digite seu nome completo',
  'user.placeholder.email': 'Digite seu email',
  'user.placeholder.phone': '(11) 99999-9999',
  'user.placeholder.password': 'Digite sua senha',
  'user.placeholder.confirmPassword': 'Confirme sua senha',

  // Login form
  'user.login.title': 'Login',
  'user.login.subtitle': 'Entre com sua conta para gerenciar sua oficina',
  'user.login.submit': 'Entrar',
  'user.login.processing': 'Entrando...',
  'user.login.noAccount': 'Não tem uma conta?',
  'user.login.registerLink': 'Cadastre-se aqui',
  'user.login.error.invalid': 'Email ou senha inválidos.',
  'user.login.error.general': 'Erro ao fazer login. Tente novamente.',

  // Dashboard
  'dashboard.welcome': 'Bem-vindo',
  'dashboard.logout': 'Sair',
  'dashboard.actions.title': 'O que você gostaria de fazer?',
  'dashboard.workshops.title': 'Cadastrar Oficina',
  'dashboard.workshops.description': 'Registre uma nova oficina para oferecer serviços aos clientes',
  'dashboard.workshops.register': 'Cadastrar Oficina',
  'dashboard.workshops.form.title': 'Nova Oficina',
  'dashboard.appointments.title': 'Ver Agendamentos',
  'dashboard.appointments.description': 'Visualize agendamentos existentes e gerencie serviços',
  'dashboard.appointments.view': 'Ver Agendamentos',
  'dashboard.back': 'Voltar',

  // Workshop form
  'workshop.form.name': 'Nome da Oficina *',
  'workshop.form.phone': 'Telefone *',
  'workshop.form.address': 'Endereço *',
  'workshop.form.description': 'Descrição *',
  'workshop.form.operatingHours': 'Horário de Funcionamento *',
  'workshop.form.services': 'Serviços Oferecidos *',
  'workshop.form.submit': 'Cadastrar Oficina',
  'workshop.form.processing': 'Cadastrando...',
  'workshop.form.success': 'Oficina cadastrada com sucesso!',
  'workshop.form.error': 'Erro ao cadastrar oficina. Tente novamente.',
  'workshop.form.error.noServices': 'Selecione pelo menos um serviço.',
  'workshop.form.error.noDays': 'Selecione pelo menos um dia da semana.',
  'workshop.form.error.noTimeRanges': 'Adicione pelo menos um horário para os dias selecionados.',
  'workshop.form.error.invalidTimeRange': 'Preencha todos os horários corretamente.',
  'workshop.form.error.invalidTimeOrder': 'O horário de início deve ser anterior ao horário de fim.',
  'workshop.form.placeholder.name': 'Ex: AutoService Centro',
  'workshop.form.placeholder.address': 'Ex: Rua das Flores, 123 - Centro - São Paulo, SP',
  'workshop.form.placeholder.description': 'Descreva sua oficina, especialidades e diferenciais...',
  'workshop.form.timeTo': 'às',
  'workshop.form.addTimeRange': '+ Adicionar Horário',
  'workshop.form.removeTimeRange': 'Remover horário',
  
  // Days of the week
  'workshop.form.days.monday': 'Segunda-feira',
  'workshop.form.days.tuesday': 'Terça-feira',
  'workshop.form.days.wednesday': 'Quarta-feira',
  'workshop.form.days.thursday': 'Quinta-feira',
  'workshop.form.days.friday': 'Sexta-feira',
  'workshop.form.days.saturday': 'Sábado',
  'workshop.form.days.sunday': 'Domingo',

  // Loading messages
  'loading.workshops': 'Carregando oficinas...',
};