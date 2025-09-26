# Auto Service Scheduler

Website SaaS para agendamento de serviços em oficinas mecânicas.

## Funcionalidades

- ✅ Formulário de agendamento com validação
- ✅ Informações do cliente (nome, telefone)  
- ✅ Informações do veículo (marca, modelo, ano, placa)
- ✅ Seleção de tipo de serviço
- ✅ Seleção de data e horário disponível
- ✅ Consulta de horários disponíveis via backend
- ✅ Interface responsiva e amigável

## Stack Tecnológico

### Frontend
- **React 18** com TypeScript
- **CSS3** com design responsivo
- **Fetch API** para comunicação com backend

### Backend  
- **Spring Boot 3.1.0** com Kotlin
- **H2 Database** (in-memory para desenvolvimento)
- **JPA/Hibernate** para persistência
- **Maven** para gerenciamento de dependências

## Estrutura do Projeto

```
auto-service-scheduler/
├── frontend/          # Aplicação React
│   ├── src/
│   │   ├── components/    # Componentes React
│   │   ├── services/      # Serviços de API
│   │   └── types/         # Definições TypeScript
│   └── public/
└── backend/           # API Spring Boot
    ├── src/main/kotlin/com/autoservice/scheduler/
    │   ├── controller/    # Controllers REST
    │   ├── service/       # Lógica de negócio
    │   ├── model/         # Entidades JPA
    │   ├── repository/    # Repositórios
    │   └── dto/           # Data Transfer Objects
    └── src/main/resources/
```

## Como Executar

### Pré-requisitos

- **Node.js 18+** e npm
- **Java 17+**
- **Maven 3.6+**

### Backend (Spring Boot)

1. Entre no diretório do backend:
   ```bash
   cd backend
   ```

2. Execute a aplicação:
   ```bash
   mvn spring-boot:run
   ```

3. O backend estará disponível em: `http://localhost:8080`

### Frontend (React)

1. Entre no diretório do frontend:
   ```bash
   cd frontend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Execute em modo de desenvolvimento:
   ```bash
   npm start
   ```

4. O frontend estará disponível em: `http://localhost:3000`

## API Endpoints

### Appointments

- `GET /api/appointments` - Lista todos os agendamentos
- `POST /api/appointments` - Cria um novo agendamento
- `GET /api/appointments/available-slots?date=YYYY-MM-DD` - Consulta horários disponíveis

### Exemplo de Requisição

```json
POST /api/appointments
Content-Type: application/json

{
  "clientName": "João Silva",
  "clientPhone": "(11) 99999-9999",
  "vehicleBrand": "Toyota",
  "vehicleModel": "Corolla", 
  "vehicleYear": 2020,
  "vehiclePlate": "ABC-1234",
  "serviceType": "Troca de óleo",
  "appointmentDate": "2025-01-15T10:00:00"
}
```

## Desenvolvimento

### Build do Frontend
```bash
cd frontend
npm run build
```

### Testes do Frontend
```bash
cd frontend
npm test
```

### Build do Backend
```bash
cd backend
mvn clean compile
```

## Banco de Dados

A aplicação usa H2 Database em memória para desenvolvimento. O console H2 está disponível em:
- **URL**: `http://localhost:8080/h2-console`
- **JDBC URL**: `jdbc:h2:mem:testdb`
- **Username**: `sa`
- **Password**: `password`

## Próximos Passos

- [ ] Autenticação e autorização
- [ ] Persistência em banco de dados real
- [ ] Notificações por email/SMS
- [ ] Calendário visual para seleção de datas
- [ ] Dashboard administrativo
- [ ] Deploy em produção

## Licença

MIT License - veja o arquivo [LICENSE](LICENSE) para detalhes.