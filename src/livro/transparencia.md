---
layout: livro
title: Transparência
summary: O que um serviço precisa tornar visível para que as pessoas compreendam o que está acontecendo.
type: chapter
informationType: concept
status: review
order: 30
tags:
  - chapter
about:
  - transparência
  - transparência operacional
  - serviços
  - agentes de IA
questions:
  - Que informações sobre um serviço precisam ser comunicadas?
  - O que deve atravessar a linha de visibilidade durante a prestação de um serviço?
  - Como tornar o trabalho de um agente legível sem sobrecarregar as pessoas?
dateModified: 2026-10-18
permalink: /livro/transparencia/
---

Quando utilizamos um serviço, seja ele prestado por uma pessoa, empresa ou governo, enxergamos apenas uma parte do trabalho necessário para que ele aconteça.

Para discutir transparência, precisamos considerar duas lentes: a transparência da **informação** e a transparência da **operação**.

## Transparência da informação

A **transparência da informação** diz respeito ao que é comunicado sobre o serviço.

No contexto de governos e políticas públicas, a Lei de Acesso à Informação estabelece que qualquer pessoa pode solicitar informações públicas aos órgãos e entidades abrangidos pela lei. A publicidade é a regra; o sigilo, a exceção. A informação deve ser oferecida de maneira transparente, clara e em linguagem de fácil compreensão.[^1]

No uso cotidiano de serviços, a transparência da informação ajuda o cliente a entender o que é oferecido, quem pode utilizar o serviço e quais condições se aplicam. Isso inclui, por exemplo, critérios de elegibilidade, custos, prazos e o que está incluído na contratação.

Essas informações permitem avaliar se o serviço atende a uma necessidade e ajudam a formar expectativas mais realistas sobre o que acontecerá.

## Transparência operacional

Enquanto a transparência da informação trata do que precisamos saber **sobre** um serviço, a **transparência operacional** torna visível como ele funciona. Ela ajuda o cliente a compreender o trabalho realizado para atendê-lo, mesmo quando esse trabalho acontece nos bastidores.

No Brasil, o dever de informar também está previsto no Código de Defesa do Consumidor, que assegura o direito a informações adequadas e claras sobre produtos e serviços.[^2]

O equilíbrio entre transparência operacional e experiência do cliente é delicado. Em 1984, G. Lynn Shostack apresentou o *service blueprint* como uma maneira de representar o funcionamento dos serviços.[^3] Um dos elementos desse modelo é a **linha de visibilidade**, que separa as atividades observadas pelo cliente daquelas que acontecem nos bastidores.

Podemos imaginar essa separação assim:

> **Acima da linha de visibilidade:** interações, mensagens, decisões e resultados que o cliente consegue observar.  
> **Abaixo da linha de visibilidade:** pessoas, regras, sistemas, dependências e atividades que sustentam o serviço nos bastidores.

A linha de visibilidade ajuda a compreender uma característica fundamental dos serviços: aquilo que experimentamos depende de uma operação muito maior do que conseguimos observar.

Mostrar o trabalho realizado pode ajudar o cliente a compreender o serviço. Mostrar tudo, porém, pode tornar a experiência confusa.

É a partir dessa relação que vamos discutir transparência operacional: como uma operação torna seu trabalho visível e compreensível para o cliente *durante* a prestação do serviço.

A questão principal é:

> Quais informações sobre o funcionamento do serviço precisam atravessar a linha de visibilidade?

Para explorar esse tópico, vamos falar um pouco de comida.

## A cozinha aberta

Para entender melhor a transparência operacional, lembre-se da última vez que você foi a uma lanchonete e compare essa experiência com uma visita a um restaurante de cozinha aberta.

Em alguns restaurantes, a cozinha fica à vista. Você pode acompanhar a preparação dos pratos, observar a equipe trabalhando e perceber o ritmo do serviço. Entre o pedido e a comida chegar à mesa, existe um trabalho que normalmente não vemos.

Ryan Buell, Tami Kim e Chia-Jung Tsay investigaram os efeitos dessa visibilidade em serviços de alimentação. Em um dos estudos, câmeras e telas permitiam variar o que clientes e cozinheiros conseguiam observar. Na condição em que os dois lados podiam se ver, a qualidade relatada pelos clientes aumentou 22,2%, enquanto o tempo de atendimento caiu 19,2%.[^4]

A pesquisa examinava os efeitos da visibilidade sobre os dois lados da relação. Para nossa discussão, interessa especialmente o que acontece quando o trabalho deixa de ser inteiramente invisível para o cliente.

> O valor percebido de um serviço não depende apenas do resultado entregue. A possibilidade de acompanhar sua execução também influencia a experiência.

## O trabalho também faz parte do serviço

Em um serviço digital, quase todo o trabalho acontece nos bastidores.

Uma pesquisa por passagem aérea, uma transferência bancária ou a aprovação de uma compra com cartão depende de sistemas, regras e operações que não podemos observar diretamente.

A linha de visibilidade continua existindo. A interface faz a mediação entre a operação e o cliente: define qual versão do trabalho realizado nos bastidores estará disponível, em que momento, em qual formato e com que nível de detalhe.

O desenho dessa linha em interfaces se aproxima da heurística de **visibilidade do estado do sistema**, formulada por Jakob Nielsen: o sistema deve manter as pessoas informadas sobre o que está acontecendo, oferecendo feedback adequado em tempo razoável.[^5]

A contribuição do design de serviços é particularmente importante aqui. Ao representar atividades, atores e dependências que sustentam a experiência do cliente, o *service blueprint* torna essa estrutura compreensível para quem desenha e opera o serviço.

Transparência operacional é objeto de design. Precisamos tornar visíveis as informações que ajudam as pessoas a compreender o serviço e a formar uma percepção sobre o trabalho realizado.

## Agentes de IA e transparência operacional

Quando pensamos em experiências agênticas, informacionais ou transacionais, essa questão se torna ainda mais importante.

No contexto de agentes, podemos definir:

> **Transparência operacional é o grau em que uma interface torna legível o que está acontecendo durante uma interação.** Ela define o que um sistema deve mostrar enquanto interpreta, recomenda ou executa ações em uma troca entre cliente e provedor de serviço.

Sob a perspectiva de uma pessoa interagindo com um serviço, a transparência operacional pode ser avaliada em três dimensões:

### Processo

- O que está sendo feito em meu nome?
- Quais atividades estão sendo realizadas para atender à minha solicitação?
- Como essas atividades ajudam a atender ao meu pedido?

### Estado

- Em que ponto o serviço se encontra?
- O que já aconteceu e o que está em andamento?
- O que depende de outras pessoas ou sistemas?

### Resultado

- O que foi concluído?
- O que mudou depois da execução?
- O que permanece pendente?

Parecem perguntas simples, mas provavelmente você já passou por situações corriqueiras em que faltou transparência operacional. Momentos em que foi difícil entender as etapas necessárias ou o que ainda faltava para alcançar um objetivo. Ou situações em que a ausência de uma informação tornou impossível distinguir uma espera normal de um problema.

## O dilema da delegação

Os agentes de IA tornam essa questão mais complexa.

Uma interface convencional costuma oferecer operações delimitadas: você solicita uma informação, o sistema executa uma sequência relativamente conhecida e apresenta um resultado.

Um agente pode receber um objetivo mais amplo — como planejar férias de dezembro na Bahia — e definir parte das atividades necessárias para alcançá-lo. Pode consultar fontes, utilizar ferramentas e interagir com outros sistemas, pessoas e serviços. Em alguns casos, pode executar operações que não foram individualmente escolhidas por você.

Essa delegação amplia as consequências. As interações podem acontecer de forma assíncrona, e os erros podem ter impacto maior. Precisamos decidir o que atravessa a linha de visibilidade, em que momento e com qual nível de detalhe.

Também precisamos definir quais aspectos do sistema e da relação do cliente com o agente devem ser intencionalmente transparentes. Identidade, escopo, limites e autonomia são informações fundamentais.

Equilíbrio é a palavra de ordem. Mostrar demais pode sobrecarregar o cliente. Mostrar muito pouco pode prejudicar a compreensão e a calibração da confiança.

Transparência, explicabilidade, verificabilidade e compreensibilidade caminham juntas. No próximo capítulo, vamos falar de explicabilidade e de como ajudar as pessoas a entender as decisões e ações de um agente.

## Referências

[^1]: BRASIL. Lei nº 12.527, de 18 de novembro de 2011. Regula o acesso a informações. Ver especialmente os arts. 3º, 5º e 8º. Disponível em: [Planalto](https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2011/lei/l12527.htm).

[^2]: BRASIL. Lei nº 8.078, de 11 de setembro de 1990. Código de Defesa do Consumidor. Art. 6º, inciso III. Disponível em: [Planalto](https://www.planalto.gov.br/ccivil_03/leis/l8078compilado.htm).

[^3]: SHOSTACK, G. Lynn. Designing Services That Deliver. _Harvard Business Review_, v. 62, n. 1, p. 133–139, jan.–fev. 1984.

[^4]: BUELL, Ryan W.; KIM, Tami; TSAY, Chia-Jung. Creating Reciprocal Value Through Operational Transparency. _Management Science_, v. 63, n. 6, p. 1673–1695, 2017. DOI: [10.1287/mnsc.2015.2411](https://doi.org/10.1287/mnsc.2015.2411).

[^5]: NIELSEN NORMAN GROUP. Visibility of System Status (Usability Heuristic #1). 2018. Disponível em: [Nielsen Norman Group](https://www.nngroup.com/articles/visibility-system-status/).