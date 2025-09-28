# Auto Service Scheduler

Website SaaS para agendamento de serviços em oficinas mecânicas.

## Funcionalidades

- ✅ Formulário de agendamento com validação
- ✅ Suporte a idiomas (Português e Inglês)
- ✅ Seletor de idioma com detecção automática
- ✅ Mensagens de erro localizadas
- ✅ Informações do cliente (nome, telefone)  
- ✅ Informações do veículo (marca, modelo, ano, placa)
- ✅ Seleção de tipo de serviço
- ✅ Seleção de data e horário disponível
- ✅ Consulta de horários disponíveis via backend
- ✅ Interface responsiva e amigável

## Stack Tecnológico

### Frontend
- **React 18** com TypeScript
- **Sistema de internacionalização** (i18n) com pt-BR e en-US
- **CSS3** com design responsivo
- **Fetch API** para comunicação com backend
- **Detecção automática de idioma** do navegador

### Backend  
- **Spring Boot 3.5.5** com Kotlin
- **Gradle** para gerenciamento de dependências e build
- **H2 Database** (in-memory para desenvolvimento)
- **JPA/Hibernate** para persistência
- **Internacionalização** com suporte a pt-BR e en-US

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
- **Gradle 8.14+** (wrapper incluído)

### Backend (Spring Boot)

1. Entre no diretório do backend:
   ```bash
   cd backend
   ```

2. Execute a aplicação com Gradle:
   ```bash
   ./gradlew bootRun
   ```

3. O backend estará disponível em: `http://localhost:8080`

### Suporte a Idiomas

A aplicação suporta automaticamente:
- **Português (pt-BR)** - idioma padrão
- **Inglês (en-US)**

O idioma é detectado automaticamente pelo navegador, mas pode ser alterado manualmente usando os botões de idioma no topo da página.

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
Accept-Language: pt-BR

{
  "clientName": "João Silva",
  "clientPhone": "(11) 99999-9999",
  "vehicleBrand": "Toyota",
  "vehicleModel": "Corolla", 
  "vehicleYear": 2020,
  "serviceType": "Troca de óleo",
  "appointmentDate": "2025-01-15T10:00:00"
}
```

### Cabeçalhos de Idioma

A API aceita o cabeçalho `Accept-Language` para localização:
- `pt-BR` - Mensagens em português
- `en-US` - Mensagens em inglês

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
./gradlew build
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