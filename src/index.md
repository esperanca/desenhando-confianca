---
layout: livro
title: "Desenhando Confiança"
metaTitle: "Desenhando Confiança — Design, IA e confiança em interfaces generativas e agentes"
metaDesc: "Um livro sobre design, IA e confiança em interfaces generativas e agentes."
subtitle: "Design, IA e confiança em interfaces generativas e agentes"
collection: Livro
status: revisado
date: 2026-08-02T22:45:00-03:00
contact: "danieliscoding@gmail.com"
preface: "@danielsouza"
---

## Introdução {#introducao}

Este é um livro para quem faz design. Design no sentido de projetar. Dar forma intencional a uma experiência, um produto, um serviço, um sistema. E fazer isso de um jeito _designerly_[^1]. Nigel Cross cunhou este termo em 1982 para nomear um modo próprio de conhecer, que não é o do cientista nem o do filósofo. Pensar fazendo: desenhar, modelar, prototipar, comparar alternativas, aprender com as formas provisórias que emergem do fazer.

Nigel Cross defendia que há uma forma própria de conhecimento no design. Uma inteligência que não se reduz à ciência, à arte ou à engenharia, mas dialoga com as três.

O trabalho do designer está nesse vaivém. Formular o problema enquanto se busca uma solução. Tornar visível o que ainda é vago. Criar condições para que uma decisão possa ser discutida, testada e melhorada.

Quero te convidar para ter uma conversa de design sobre um tópico atual e urgente. Na boca do povo, poderíamos dizer que é sobre IA que alucina. Mas é um pouco mais que isso. Vamos explorar um _wicked problem_[^2] de escala global: como projetar sistemas automatizados mais úteis, rápidos e convenientes, sem empobrecer a capacidade humana de formular perguntas, avaliar alternativas e decidir com responsabilidade?

Esse desafio vale independentemente do seu título: product designer, content designer, product manager e até um vibe coder de final de semana[^3]. Algumas coisas que você deve saber antes de começar:

- É provável que algum novo modelo de linguagem ou tecnologia consiga em breve responder várias das questões que vamos abordar neste livro.
- Se você já tem experiência em engenharia de software, MLOps ou Machine Learning, é bem possível que este conteúdo soe básico para você. Se esse for o caso, no final do livro tem uma lista de recursos que podem ser úteis.

Mesmo que o problema sociotécnico seja resolvido pela tecnologia, acredito que o vocabulário e as ideias deste livro podem ajudar você a continuar pensando, decidindo e desenhando um mundo mediado por IA, particularmente no contexto de interfaces generativas e agentes[^4].

O livro está estruturado em três partes:

- Uma introdução teórica que define as qualidades de um sistema confiável
- Um conjunto de práticas, disciplinas e recursos para perfis não técnicos desenharem confiança
- Um catálogo de design patterns[^5] para interfaces de usuário e jornadas generativas

Este livro é o resultado de alguns meses de pesquisa e curadoria do conhecimento de vários autores que admiro, que nunca se esquivaram de temas complexos nem se contentaram com respostas simplistas. Somei a essas vozes minha opinião e algumas experiências pessoais para defender uma tese: agentes confiáveis não resultam somente de modelos melhores, mais rápidos ou mesmo de interfaces mais polidas. Resultam de uma combinação mais difícil: linguagem clara, limites explícitos, boas decisões de interação, critérios verificáveis e responsabilidade distribuída.

Não é meu objetivo tentar transformar designers, product managers, pesquisadores ou estrategistas em engenheiros. A proposta é outra: oferecer linguagem, critérios e ferramentas para que perfis não técnicos consigam participar melhor da construção desses sistemas.

Tentei usar a linguagem mais simples possível. O livro tem exemplos, notas de rodapé e itens de glossário que podem tornar sua leitura mais fluida. O site do livro tem ferramentas adicionais, entrevistas e artigos.

Tenho três compromissos com você: ser claro o bastante para começar, rigoroso o bastante para valer o esforço, e aberto o bastante para que a conversa continue depois da última página.

Boa leitura!

## Prefácio {#prefacio}

Em uma noite fria em Vancouver, em novembro de 2022, Jake Moffatt recebeu a notícia do falecimento de sua avó. Ele entrou no site da Air Canada com uma pergunta prática: se ele comprasse passagens de última hora para o velório, poderia pedir o desconto de tarifa de luto[^6] depois de voltar?

Antes de comprar a passagem, ele quis confirmar as regras. Perguntou ao chatbot do site e fez uma captura de tela com a resposta, que confirmava que ele poderia pedir o reembolso em até noventa dias depois da viagem. Ele comprou as passagens no mesmo dia, fez a viagem, e quando voltou pediu o reembolso. A Air Canada recusou o pedido.

Jake Moffatt não deixou por isso mesmo. Nos meses seguintes, trocou e-mails com a companhia e recebeu respostas negativas. Em fevereiro de 2023, a empresa admitiu: o chatbot tinha usado "palavras enganosas", e se recusou novamente a pagar.

Moffatt decidiu levar o caso ao Civil Resolution Tribunal da British Columbia[^7]. No processo, a defesa surpreendeu: a Air Canada alegou não responder pelo que dizem seus representantes, chatbot incluído, como se a ferramenta fosse uma entidade jurídica à parte. Em fevereiro de 2024, o tribunal chamou a tese de "notável", rejeitou o argumento e condenou a empresa a pagar 812 dólares canadenses.

O tribunal apontou que Moffatt não tinha razão nenhuma para saber que uma parte do site merecia mais crédito do que a outra. A empresa nunca explicou por que a página de tarifas era mais confiável. O chatbot não dizia onde buscava as respostas, nem permitia verificar. Soava convincente demais para questionar.

A Air Canada não explicou como o chatbot funcionava. Nem para Moffatt, nem para o tribunal: a decisão registra que a empresa não apresentou nenhuma informação sobre a natureza do seu chatbot[^8]. O que se sabe é o que ele fez: inventou uma política que não existia.

Este é um caso emblemático pela desproporção: 812 dólares de condenação, manchetes no mundo inteiro. A decisão nomeou o que a indústria já sabia e evitava dizer. O risco não está no sistema falhar; está no sistema falhar parecendo infalível.

Essa desconfiança tem respaldo em números. Um levantamento de incidentes de IA catalogou 233 casos em 2024, alta de 56,4% sobre o ano anterior, boa parte deles seguindo o mesmo padrão do caso Moffatt: uma resposta convincente tomada como verdade antes de ser checada[^9].

A mesma decisão firmou um segundo entendimento, o da responsabilidade. A tese da entidade separada perdeu no Canadá e voltou a perder onde reapareceu: em 2026, um tribunal alemão condenou uma clínica pelo que seu chatbot dizia sobre os próprios médicos[^10]. Nenhuma jurisdição aceitou, até hoje, que o software responde sozinho.

Em 2026, assistentes de IA estão em todos os lugares: o ChatGPT sozinho tem 900 milhões de usuários semanais e recebe 2,5 bilhões de prompts por dia. Quase 29 mil a cada segundo[^11].

Os chatbots meio burros, de que a gente fazia piada, ficaram fluentes e convincentes. Para o brasileiro, essa mudança não chegou como tecnologia nova; chegou como conversa nova. A vida do país já corria dentro do WhatsApp: o bom dia no grupo da família, o áudio de três minutos, o boleto, a consulta, a venda[^12]. Quando a máquina aprendeu a conversar, entrou pelo lugar onde o brasileiro passa o dia: a janela de mensagens. O círculo azul da Meta AI apareceu ali em outubro de 2024, sem convite e sem botão de sair.

E quando uma interface conversacional (um chatbot, um assistente) substitui a consulta a informações, documentos oficiais, e até a execução de tarefas de forma autônoma, o desenho destes sistemas tem que prever consequências e riscos novos.

Em domínios regulados, saúde, finanças, governo, essa confusão entre fluência e confiabilidade não é apenas incômodo. A pessoa que recebe uma resposta de um chatbot sobre quando tomar um medicamento, ou se pode fazer um investimento financeiro, está tomando uma decisão de verdade.

O que a interface mostra é a conversa. O que não é transparente às vezes é o resto: de onde vem a resposta, por que saiu assim, se é verdadeira, o que ela significa, quem responde quando falha. Dessas cinco perguntas, os tribunais já resolveram a última, de Vancouver a Hamm. As outras quatro me parecem um bom problema de design. Tornar visível o que a fluência esconde é parte da resposta, e este livro dá um nome a cada parte: transparência, explicabilidade, verificabilidade, compreensibilidade.


[^1]: É a capacidade de pensar por meio do projeto. O designer coloca uma hipótese no mundo (um rascunho, um protótipo, uma jornada) e usa essa forma provisória para aprender, discutir, decidir e transformar a própria compreensão do problema.

[^2]: Wicked problems são problemas complexos, ambíguos e socialmente situados, que não têm uma formulação definitiva nem uma solução final. Cada tentativa de resolvê-los muda o próprio entendimento do problema. O termo foi cunhado por **Horst W. J. Rittel** e **Melvin M. Webber**, no artigo **"Dilemmas in a General Theory of Planning"** (2025).

[^3]: Vibe coder é quem usa IA para transformar uma ideia ou objetivo em software, guiando o processo por prompts, ajustes, testes e feedback, mesmo sem controlar cada detalhe técnico do código produzido.

[^4]: Um agente de IA é um sistema que, além de conversar, consegue interpretar um objetivo, planejar passos, usar ferramentas, tomar decisões intermediárias e executar ações em nome do usuário dentro de certos limites.

[^5]: Um design pattern captura a relação entre contexto, problema e solução, oferecendo uma forma reutilizável de resolver uma situação recorrente sem prescrever uma implementação única.

[^6]: A Air Canada oferecia desconto de tarifa de luto para quem comprava passagens aéreas após a perda de um parente próximo, mas com regras específicas sobre timing e comprovação. A página oficial de "Bereavement travel" excluía pedidos retroativos, feitos depois da viagem: o oposto exato do que o chatbot informou.

[^7]: _Moffatt v. Air Canada_, 2024 BCCRT 149, Civil Resolution Tribunal de British Columbia. Julgamento: 14 de fevereiro de 2024. Decisão disponível no [CanLII](https://www.canlii.org/en/bc/bccrt/doc/2024/2024bccrt149/2024bccrt149.html). Linha do tempo do caso: consulta ao chatbot e primeira compra em 11 de novembro de 2022; pedido de reembolso em 17 de novembro de 2022; admissão das "misleading words" pela Air Canada em 8 de fevereiro de 2023; abertura do processo no tribunal em fevereiro de 2023.

[^8]: Análises posteriores presumem um modelo generativo: inventar uma política é incompatível com sistemas determinísticos, que respondem sempre com textos pré-aprovados (St-Hilaire, _UBC Law Review_, v. 58, n. 2, 2025).

[^9]: AI Incident Database (Stanford HAI, AI Index Report 2025).

[^10]: Em 12 de maio de 2026, o Oberlandesgericht Hamm, tribunal de segunda instância da Renânia do Norte-Vestfália, condenou a empresa Aesthetify GmbH a deixar de atribuir aos seus dois sócios títulos de especialista médico que o chatbot do site inventava. Processo I-4 UKl 3/25; cabe recurso ao Bundesgerichtshof, a mais alta corte cível alemã.

[^11]: Estatísticas de 2026: ChatGPT (900M usuários semanais), Gemini (900M+ mensais). Base: relatórios públicos das empresas. Frequência de prompts: estimativa do setor.

[^12]: Pesquisa Ipsos/Google (2024, 21 países): 54% dos brasileiros relataram já ter usado IA generativa, contra 48% da média global.

---

## Sumário

- [Introdução](#introducao)
- [Prefácio](#prefacio)

### Parte I — O que torna um sistema confiável

- Transparência
- Explicabilidade
- Verificabilidade
- Compreensibilidade
- Domínios regulados e legislação
- O agente confiável

### Parte II — Práticas para desenhar confiança

- Conteúdo responsável e compreensível
- De onde vem a resposta
- Evals: critérios e medição
- Governança como experiência
- Medindo confiança, adoção e autonomia

### Parte III — Catálogo de padrões

- Padrões para interfaces e jornadas generativas
- Fechamento
- O novo papel dos designers

### Seções adicionais

- Glossário
- Notas
- Links e recursos
- Índice remissivo

## Notas e links {#notas-e-links}

- [Memória semântica, episódica e procedural no financiamento imobiliário](/tipos-de-memoria/) — conceito de apoio sobre os três tipos de memória usados para desenhar continuidade entre canais.
- [5 Princípios de HCI Fundamentados em Pesquisa](/principios-hci-memoria/) — memória de trabalho, affordances, carga cognitiva, heurísticas de usabilidade e cognição distribuída, com referências originais e brasileiras.
