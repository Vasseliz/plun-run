# 🏃‍♂️ Plun Run - Planejador Inteligente de Treinos de Corrida


## 📋 Sobre o Projeto

**Plun Run** é um planejador de treinos de corrida que utiliza IA (Google Gemini) para gerar planos semanais personalizados baseados nos seus treinos anteriores e objetivos específicos.

Este projeto nasceu da combinação de duas necessidades pessoais:
- Aprender Angular de forma prática e aplicada
- Ter um planejador de treinos acessível ao retomar a prática de corrida

### 🎯 Problema que Resolve

Muitos corredores iniciantes e intermediários têm dificuldade em:
- Estruturar progressões de treino adequadas
- Equilibrar volume, intensidade e recuperação
- Definir metas realistas baseadas no histórico
- Ter acesso a orientação de qualidade sem custo

**Plun Run** oferece uma solução gratuita e inteligente, democratizando o acesso a planejamento de treinos personalizados.

---

## ✨ Funcionalidades

### 📊 Registro de Treinos
- Registre até 7 treinos da última semana
- Campos: tempo, pace, distância, tipo de treino e observações
- Validação inteligente dos dados inseridos

### 🎯 Definição de Objetivos
- Configure seu objetivo específico (5K, 10K, velocidade, resistencia etc.)
- Adicione detalhes personalizados sobre suas metas
- Sistema opcional - funciona mesmo sem objetivo definido

### 🤖 Geração com IA
- Análise completa dos treinos anteriores
- Plano semanal detalhado (7 dias)
- Sugestões de pace, aquecimento e desaquecimento
- Dicas de nutrição, recuperação e prevenção de lesões
- Alinhamento automático com seus objetivos

### 📄 Exportação
- Download do plano completo em PDF
- Formatação profissional e legível
- Pronto para impressão ou compartilhamento

---

## 🛠️ Tecnologias Utilizadas

### Frontend
- **Angular 15** - Framework principal
- **TypeScript 4.9** - Linguagem de desenvolvimento
- **RxJS** - Gerenciamento de estado e requisições assíncronas


### Backend/API
- **Vercel Functions** - Serverless functions
- **Google Gemini 2.5 Flash** - IA para geração de planos

### Bibliotecas
- **jsPDF** - Geração de PDFs
- **HttpClient** - Requisições HTTP do Angular

### Deploy & Infraestrutura
- **Vercel** - Hospedagem e CI/CD
- **Variáveis de Ambiente** - Proteção da API Key

---


## 📁 Estrutura do Projeto

```
plun-run/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── formulario-treino/     # Formulário de entrada
│   │   │   ├── lista-treino/          # Lista de treinos registrados
│   │   │   └── resultado-treino/      # Exibição do plano gerado
│   │   ├── models/
│   │   │   └── training.model.ts      # Interfaces e tipos
│   │   ├── services/
│   │   │   ├── training.service.ts    # Lógica de treinos
│   │   │   ├── gemini-api.service.ts  # Integração com Gemini
│   │   │   └── pdf-generator.service.ts # Geração de PDFs
│   │   └── app.component.ts           # Componente raiz
│   └── ...
├── api/
│   ├── generate-plan.ts               # Vercel Function principal
│   ├── buildPrompt.ts                 # Construção do prompt
│   └── types.ts                       # Tipagens da API
└── ...
```

---

## 🎨 Diferenciais

### 1. **Gratuito e Acessível**
Ao contrário de apps pagos como Strava Premium ou TrainingPeaks, o Plun Run é 100% gratuito.

### 2. **IA Avançada**
Utiliza o Gemini 2.5 Flash, modelo de última geração do Google, para análises profundas e personalizadas.

### 3. **Prompt Engineering Otimizado**
Prompt estruturado com mais de 200 linhas garantindo:
- Análise detalhada dos treinos anteriores
- Planos progressivos e seguros
- Dicas contextualizadas de nutrição e recuperação
- Formatação limpa sem emojis para compatibilidade com PDF

### 4. **Segurança**
- API Key protegida por variáveis de ambiente
- Validações robustas no backend
- CORS configurado adequadamente

### 5. **Experiência do Usuário**
- Interface limpa e intuitiva
- Feedback visual durante o carregamento
- Validações em tempo real
- Mensagens de erro claras

---

## 🔒 Segurança e Privacidade

- ✅ API Key armazenada como variável de ambiente na Vercel
- ✅ Nenhum dado de treino é armazenado em banco de dados
- ✅ Todas as informações são processadas em tempo real
- ✅ CORS configurado para aceitar apenas domínios autorizados

---

## ⚠️ Aviso Importante

**Este aplicativo é uma ferramenta de auxílio ao treinamento e NÃO substitui o acompanhamento de profissionais qualificados.**

Para um treino verdadeiramente personalizado e seguro, consulte:
- 🏋️ Educador Físico especializado em corrida
- 🏥 Médico do Esporte para avaliação física completa
- 🥗 Nutricionista esportivo para orientação alimentar
- 💆 Fisioterapeuta em caso de lesões ou desconfortos

---


## 🤝 Contribuindo

Feedbacks, sugestões e contribuições são muito bem-vindos!

---

## 👨‍💻 Desenvolvedor

**Nícolas Vasseli**
- QA & Estudante de Engenharia de Software
- Em transição de carreira para Desenvolvimento
- https://www.linkedin.com/in/nicolasvasseli/

---

## 📄 Licença

Este projeto está em desenvolvimento e atualmente é de código fechado.

---

## 🙏 Agradecimentos

- Google Gemini pela API de IA
- Vercel pela infraestrutura de hospedagem
- Comunidade Angular pelo suporte

---

<div align="center">

**Desenvolvido com carinho por Nícolas Vasseli** ❤️

[Acesse o Plun Run](https://plun-run.vercel.app/) | [Reportar Bug](seu-email) | [Sugerir Feature](seu-email)

</div>
