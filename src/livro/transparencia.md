---
layout: livro
title: Transparência
summary: O que um serviço precisa tornar visível para que as pessoas compreendam o que está acontecendo.
type: chapter
informationType: concept
status: published
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

A **transparência da informação** diz respeito a quais informações sobre o serviço são comunicadas.

No contexto de governos e políticas públicas, a Lei de Acesso à Informação estabelece a publicidade como regra e o sigilo como exceção. A lei assegura o direito de acesso a informações públicas e prevê que esse acesso seja oferecido de forma transparente, clara e em linguagem de fácil compreensão.[^1]

Se a Lei de Acesso à Informação protege esse direito na relação com o Estado, o Código de Defesa do Consumidor o protege nas relações de consumo, garantindo informações adequadas e claras sobre produtos e serviços.[^2]

No uso cotidiano, essas informações ajudam o cliente a compreender o que pode esperar do serviço.

## Transparência operacional

Enquanto a transparência da informação diz respeito ao que precisamos saber sobre o serviço, a **transparência operacional** torna visível como ele funciona. Ela ajuda o cliente a compreender o trabalho realizado para atendê-lo, mesmo quando esse trabalho acontece nos bastidores.

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

Para entender melhor a transparência operacional, quero que você se lembre da última vez que foi ao McDonald's e compare com uma visita a um restaurante chique.

Em alguns restaurantes, a cozinha fica à vista. Você pode acompanhar a preparação dos pratos, observar a equipe trabalhando e perceber o ritmo do serviço. Entre o pedido e a comida chegar à mesa, existe um trabalho que normalmente não vemos.

Em 2017, Ryan Buell, Tami Kim e Chia-Jung Tsay publicaram uma pesquisa sobre transparência operacional em restaurantes. Em um dos experimentos, instalaram câmeras e telas que permitiam variar a visibilidade entre clientes e cozinheiros. Na condição em que ambos podiam se ver, a satisfação dos clientes com a comida aumentou 22,2%, enquanto o tempo de preparação caiu 19,2%.[^4]

A pesquisa examinava os efeitos da visibilidade sobre os dois lados da relação. Para nossa discussão, interessa especialmente o que acontece quando o trabalho deixa de ser inteiramente invisível para o cliente.

> O valor percebido de um serviço não depende apenas do resultado entregue. A possibilidade de acompanhar sua execução também influencia a experiência.

## O trabalho também faz parte do serviço

Em um serviço digital, quase todo o trabalho acontece nos bastidores.

Uma pesquisa por passagem aérea, uma transferência bancária ou a aprovação de uma compra com cartão depende de sistemas, regras e operações que não podemos observar diretamente.

A linha de visibilidade continua existindo. A interface faz a mediação entre a operação e o cliente: define qual versão do trabalho realizado nos bastidores estará disponível, em que momento, em qual formato e com que nível de detalhe.

O desenho dessa linha em interfaces se aproxima da heurística de **visibilidade do estado do sistema**, formulada por Jakob Nielsen: o sistema deve manter as pessoas informadas sobre o que está acontecendo, oferecendo feedback adequado em tempo razoável.[^5]

A contribuição do design de serviços é particularmente importante aqui. Ao representar atividades, atores e dependências que sustentam a experiência do cliente, o *service blueprint* torna essa estrutura compreensível para quem desenha e opera o serviço.

Transparência operacional é uma escolha de design. Precisamos tornar visíveis as informações que ajudam as pessoas a compreender o serviço e a formar uma percepção sobre o trabalho realizado.

## Agentes de IA e transparência operacional

Quando pensamos em experiências agênticas, informacionais ou transacionais, essa questão se torna ainda mais importante.

No contexto de agentes, podemos definir:

> **Transparência operacional é o grau em que uma interface torna legível a mediação do agente entre o cliente e o provedor do serviço:** o que acontece enquanto o agente interpreta solicitações, recomenda opções ou executa ações.

Você provavelmente já passou por situações corriqueiras em que faltou transparência operacional. Momentos em que foi difícil entender as principais etapas necessárias ou o que faltava em um serviço para atingir um objetivo. Ou quando a ausência de uma informação tornou impossível distinguir uma espera normal de um problema.

Podemos avaliar a transparência operacional a partir da perspectiva do cliente, com algumas perguntas:

### Processo

- O que está sendo feito em meu nome?
- Quais etapas estão sendo realizadas para atender à minha solicitação?
- Como cada etapa contribui para alcançar meu objetivo?

### Estado

- Em que ponto está o serviço?
- O que já aconteceu e o que está em andamento?
- O que depende de outras pessoas ou sistemas?

### Resultado

- O que foi concluído?
- O que mudou após a execução?
- O que ainda está pendente?

Essas perguntas se tornam mais difíceis de responder à medida que delegamos mais decisões e ações aos agentes.

## O dilema da delegação

À medida que delegamos mais aos agentes de IA, decidir o que tornar visível se torna mais complexo.

Uma interface convencional costuma oferecer operações delimitadas: você solicita uma informação, o sistema executa uma sequência relativamente conhecida e apresenta um resultado.

Um agente pode receber um objetivo mais amplo — por exemplo, organizar férias de dezembro na Bahia — e definir parte das atividades necessárias para alcançá-lo. Pode consultar fontes, utilizar ferramentas e interagir com outros sistemas, pessoas e serviços. Em alguns casos, pode executar operações que não foram individualmente escolhidas por você.

Essa delegação amplia as consequências. Parte das interações acontece de forma assíncrona, e os erros podem ter impacto maior. Por isso, precisamos decidir o que atravessa a linha de visibilidade, em que momento e com qual nível de detalhe.

Na prática, isso significa escolher quais aspectos do trabalho do agente o cliente vai ver (o processo em curso, o estado do serviço e o resultado entregue) e de que forma: no instante da ação, em atualizações ao longo da jornada de uso ou em um registro que ele pode consultar depois.

Equilíbrio é a palavra de ordem. Mostrar demais pode sobrecarregar o cliente. Mostrar muito pouco pode prejudicar a compreensão.

Transparência, explicabilidade, verificabilidade e compreensibilidade caminham juntas. No próximo capítulo, vamos falar de explicabilidade e de como ajudar as pessoas a entenderem as decisões e ações de um agente.

## Referências

[^1]: BRASIL. Lei nº 12.527, de 18 de novembro de 2011. Regula o acesso a informações. Ver especialmente os arts. 3º, 5º e 8º. Disponível em: [Planalto](https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2011/lei/l12527.htm).

[^2]: BRASIL. Lei nº 8.078, de 11 de setembro de 1990. Código de Defesa do Consumidor. Art. 6º, inciso III. Disponível em: [Planalto](https://www.planalto.gov.br/ccivil_03/leis/l8078compilado.htm).

[^3]: SHOSTACK, G. Lynn. Designing Services That Deliver. _Harvard Business Review_, v. 62, n. 1, p. 133–139, jan.–fev. 1984.

[^4]: BUELL, Ryan W.; KIM, Tami; TSAY, Chia-Jung. Creating Reciprocal Value Through Operational Transparency. _Management Science_, v. 63, n. 6, p. 1673–1695, 2017. DOI: [10.1287/mnsc.2015.2411](https://doi.org/10.1287/mnsc.2015.2411).

[^5]: NIELSEN NORMAN GROUP. Visibility of System Status (Usability Heuristic #1). 2018. Disponível em: [Nielsen Norman Group](https://www.nngroup.com/articles/visibility-system-status/).