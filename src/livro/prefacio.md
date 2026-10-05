---
layout: livro
title: Prefácio
subtitle: O caso Moffatt v. Air Canada e o risco da confiança que parece infalível
summary: O caso Moffatt v. Air Canada e o risco da confiança que parece infalível
type: chapter
informationType: concept
status: review
order: 20
tags:
  - chapter
dateModified: 2026-10-05
permalink: /livro/prefacio/
---

Em uma noite fria em Vancouver, em novembro de 2022, Jake Moffatt recebeu a notícia do falecimento de sua avó. Ele entrou no site da Air Canada com uma pergunta prática: se ele comprasse passagens de última hora para o velório, poderia pedir o desconto de tarifa de luto[^sn-tarifa-luto] depois de voltar?

Antes de comprar a passagem, ele quis confirmar as regras. Perguntou ao chatbot do site e fez uma captura de tela com a resposta, que confirmava que ele poderia pedir o reembolso em até noventa dias depois da viagem. Ele comprou as passagens no mesmo dia, fez a viagem, e quando voltou pediu o reembolso. A Air Canada recusou o pedido.

Jake Moffatt não deixou por isso mesmo. Nos meses seguintes, trocou e-mails com a companhia e recebeu respostas negativas. Em fevereiro de 2023, a empresa admitiu: o chatbot tinha usado "palavras enganosas", e se recusou novamente a pagar.

Moffatt decidiu levar o caso ao Civil Resolution Tribunal da British Columbia[^1]. No processo, a defesa surpreendeu: a Air Canada alegou não responder pelo que dizem seus representantes, chatbot incluído, como se a ferramenta fosse uma entidade jurídica à parte. Em fevereiro de 2024, o tribunal chamou a tese de "notável", rejeitou o argumento e condenou a empresa a pagar 812 dólares canadenses.

O tribunal apontou que Moffatt não tinha razão nenhuma para saber que uma parte do site merecia mais crédito do que a outra. A empresa nunca explicou por que a página de tarifas era mais confiável. O chatbot não dizia onde buscava as respostas, nem permitia verificar. Soava convincente demais para questionar.

A Air Canada não explicou como o chatbot funcionava. Nem para Moffatt, nem para o tribunal: a decisão registra que a empresa não apresentou nenhuma informação sobre a natureza do seu chatbot[^2]. O que se sabe é o que ele fez: inventou uma política que não existia.

Este é um caso emblemático pela desproporção: 812 dólares de condenação, manchetes no mundo inteiro. A decisão nomeou o que a indústria já sabia e evitava dizer. O risco não está no sistema falhar; está no sistema falhar parecendo infalível.

Essa desconfiança tem respaldo em números. Um levantamento de incidentes de IA catalogou 233 casos em 2024, alta de 56,4% sobre o ano anterior, boa parte deles seguindo o mesmo padrão do caso Moffatt: uma resposta convincente tomada como verdade antes de ser checada[^3].

A mesma decisão firmou um segundo entendimento, o da responsabilidade. A tese da entidade separada perdeu no Canadá e voltou a perder onde reapareceu: em 2026, um tribunal alemão condenou uma clínica pelo que seu chatbot dizia sobre os próprios médicos[^4]. Nenhuma jurisdição aceitou, até hoje, que o software responde sozinho.

Em 2026, assistentes de IA estão em todos os lugares: o ChatGPT sozinho tem 900 milhões de usuários semanais e recebe 2,5 bilhões de prompts por dia. Quase 29 mil a cada segundo[^5].

Os chatbots meio burros, de que a gente fazia piada, ficaram fluentes e convincentes. Para o brasileiro, essa mudança não chegou como tecnologia nova; chegou como conversa nova. A vida do país já corria dentro do WhatsApp: o bom dia no grupo da família, o áudio de três minutos, o boleto, a consulta, a venda[^6]. Quando a máquina aprendeu a conversar, entrou pelo lugar onde o brasileiro passa o dia: a janela de mensagens. O círculo azul da Meta AI apareceu ali em outubro de 2024, sem convite e sem botão de sair.

E quando uma interface conversacional (um chatbot, um assistente) substitui a consulta a informações, documentos oficiais, e até a execução de tarefas de forma autônoma, o desenho destes sistemas tem que prever consequências e riscos novos.

Em domínios regulados, saúde, finanças, governo, essa confusão entre fluência e confiabilidade não é apenas incômodo. A pessoa que recebe uma resposta de um chatbot sobre quando tomar um medicamento, ou se pode fazer um investimento financeiro, está tomando uma decisão de verdade.

O que a interface mostra é a conversa. O que não é transparente às vezes é o resto: de onde vem a resposta, por que saiu assim, se é verdadeira, o que ela significa, quem responde quando falha. Dessas cinco perguntas, os tribunais já resolveram a última, de Vancouver a Hamm. As outras quatro me parecem um bom problema de design. Tornar visível o que a fluência esconde é parte da resposta, e este livro dá um nome a cada parte: transparência, explicabilidade, verificabilidade, compreensibilidade.

## Referências

[^1]: _Moffatt v. Air Canada_, 2024 BCCRT 149, Civil Resolution Tribunal de British Columbia. Julgamento: 14 de fevereiro de 2024. Decisão disponível no [CanLII](https://www.canlii.org/en/bc/bccrt/doc/2024/2024bccrt149/2024bccrt149.html). Linha do tempo do caso: consulta ao chatbot e primeira compra em 11 de novembro de 2022; pedido de reembolso em 17 de novembro de 2022; admissão das "misleading words" pela Air Canada em 8 de fevereiro de 2023; abertura do processo no tribunal em fevereiro de 2023.

[^2]: Análises posteriores presumem um modelo generativo: inventar uma política é incompatível com sistemas determinísticos, que respondem sempre com textos pré-aprovados (St-Hilaire, _UBC Law Review_, v. 58, n. 2, 2025).

[^3]: AI Incident Database (Stanford HAI, AI Index Report 2025).

[^4]: Em 12 de maio de 2026, o Oberlandesgericht Hamm, tribunal de segunda instância da Renânia do Norte-Vestfália, condenou a empresa Aesthetify GmbH a deixar de atribuir aos seus dois sócios títulos de especialista médico que o chatbot do site inventava. Processo I-4 UKl 3/25; cabe recurso ao Bundesgerichtshof, a mais alta corte cível alemã.

[^5]: Estatísticas de 2026: ChatGPT (900M usuários semanais), Gemini (900M+ mensais). Base: relatórios públicos das empresas. Frequência de prompts: estimativa do setor.

[^6]: Pesquisa Ipsos/Google (2024, 21 países): 54% dos brasileiros relataram já ter usado IA generativa, contra 48% da média global.

[^sn-tarifa-luto]: **Tarifa de luto.** A Air Canada oferecia desconto de tarifa de luto para quem comprava passagens aéreas após a perda de um parente próximo, mas com regras específicas sobre timing e comprovação. A página oficial de "Bereavement travel" excluía pedidos retroativos, feitos depois da viagem: o oposto exato do que o chatbot informou.
