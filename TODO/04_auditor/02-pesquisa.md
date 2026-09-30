# 02 · Pesquisa

Levantado em 30/09/2026. "(não verificado)" = sem fonte primária.

## Control Union: o que ela pode verificar hoje

- Na Verra, a Control Union Certifications B.V. (VVB 055) está ativa **só no
  Plastic Program**, sem escopo AFOLU/VCS.
  https://verra.org/validation-verification/control-union-certifications/
- A própria CU diz estar "em processo de acreditação" para o VCS.
  https://germany.controlunion.com/en/certification-program/vcs-verified-carbon-standard/
- Verificação ISO 14064 ela já oferece.
  https://www.controlunion.com/certification-program/iso-14064/

**Consequência:** a CU pode verificar a pegada (Emissão, via ISO 14064-3 sobre a
ISO 14067). Remoção pelo padrão Verra (VM0042) ela ainda não pode verificar.

## O que o verificador precisa

- **ISO 14064-3:2019:** garantia **limitada** ou **razoável**; materialidade
  combinada (5 % é comum na razoável); evidência por recálculo, rastreamento,
  amostragem, confirmação externa; parecer sem ressalva, com ressalva, adverso ou
  abstenção. https://www.iso.org/standard/66455.html ·
  https://www.glocertinternational.com/resources/guides/iso-14064-3-verification-methodology-explained/
- **Declaração de verificação:** escopo, fronteira, gases, período, critério
  (ISO 14067 ou GHG Protocol), nível de garantia, conclusão, data, assinatura.
  https://dxc.com/content/dam/dxc/projects/dxc-com/us/pdfs/about-us/esg/DXC-ISO-14064-3-Verification-Statement.pdf
- **GHG Protocol Product, cap. 12:** garantia obrigatória, de primeira ou terceira
  parte; verificador independente do inventário.
  https://ghgprotocol.org/sites/default/files/standards/Product-Life-Cycle-Accounting-Reporting-Standard_041613.pdf
- **Verra:** constatações do tipo **CAR** (ação corretiva), **CL** (esclarecimento)
  e **FAR** (ação futura, resolvida na próxima verificação). O relatório registra
  a constatação, a resposta, a conclusão e o que mudou.
  https://verra.org/wp-content/uploads/2022/12/VCS-Joint-Validation-Verification-Report-Template-v3.1-watermark.pdf
- **VM0042 v2.2:** na abordagem de medir e remedir, amostra de solo obrigatória no
  início e em cada verificação; métodos de COS fixados; modelo calibrado pelo
  VMD0053; dedução por incerteza.
  https://verra.org/methodologies/vm0042-improved-agricultural-land-management-v2-2/
- **Trilha que o auditor pede:** fonte e versão de cada fator, metodologia,
  fronteira, dado primário vs estimado, quem aprovou.
  https://normative.io/insight/defend-carbon-numbers-audit/ ·
  https://watershed.com/blog/how-to-audit-proof-your-climate-data-sec-csrd

## Como as plataformas dão acesso ao auditor

| Plataforma | Escopo | O que o auditor faz | Fim do acesso |
|---|---|---|---|
| Vanta | Portal próprio, por auditoria | Aprova, sinaliza, comenta; cliente corrige e pede nova revisão. Comentário interno só aparece ao auditor se compartilhado | Automático ao concluir a auditoria. https://help.vanta.com/en/articles/11345429-adding-and-managing-auditors |
| Drata | Por auditoria, link seguro | Vê só evidências dentro do período da auditoria; recusa e-mail pessoal | Não expira sozinho (fonte de terceiro). https://help.drata.com/en/articles/13605649-create-and-add-auditors-to-an-audit |
| Workiva | Papel External Auditor | Só leitura, comenta, vê revisões, exporta | — https://support.workiva.com/hc/en-us/community/posts/13919266016148-External-Auditors |
| Carta | Papel "Audit" | Acesso limitado; convidado cria conta | — https://support.carta.com/kb/guide/en/how-to-add-an-auditor-to-an-investment-firm-zTOqFwGDlo/Steps/3724751 |
| One Click LCA | Verificador por projeto | Ao submeter, o projeto **trava**; verificador marca Verified ou Rejected | — https://help.oneclicklca.com/en/articles/322346-running-internal-project-epd-verifications |
| Normative | Espaço dedicado | Vê inventário, entradas e cálculos com metodologia travada | — https://normative.io/insight/defend-carbon-numbers-audit/ |
| SustainCERT | Plataforma de verificação onde o VVB trabalha | Modelo do futuro "pedir verificação na GAIA"; parceria com a Regrow | — https://www.sustain-cert.com/news/announcing-sustain-cert-s-partnership-with-regrow |
| Cool Farm Tool | Share code por grupo | Leitura; verificação em desenvolvimento | — https://coolfarm.org/frequently-asked-questions/ |

Portais da Control Union (CIS, ICU, CUCERT) são para clientes certificados dela,
não para trabalhar em plataforma de terceiros.
https://www.controlunion.com/certification-service/reporting-tracking-tracing/

**Padrão comum:** convite por projeto, não papel global; leitura mais comentário
ou sinalização; acesso termina com a auditoria; comentário interno separado do que
o auditor vê.

## Segurança do convite

- **Validade:** GitHub e Auth0 (padrão) 7 dias; Slack e Atlassian 30; Google
  Workspace 48 h. NIST: código de cadastro vale no máximo 7 dias.
  https://docs.github.com/en/organizations/managing-membership-in-your-organization/inviting-users-to-join-your-organization ·
  https://pages.nist.gov/800-63-3-Implementation-Resources/63A/enrollment
- **Token (OWASP):** uso único, expira, 128 bits ou mais, mesma resposta para
  token desconhecido, vencido ou usado.
  https://cheatsheetseries.owasp.org/cheatsheets/Forgot_Password_Cheat_Sheet.html
- **MFA para externos:** recomendado pela Microsoft para convidados.
  https://learn.microsoft.com/en-us/entra/external-id/what-is-b2b
- **Conta existente e vínculo ao e-mail:** sem fonte primária. Prática: aceitar só
  se o e-mail logado for o convidado; quem já tem conta faz login e ganha o
  projeto, sem conta nova.

## Constatações e registro de "verificado"

- Estados observados: Vanta (Flagged → corrigido → Ready → Approved); One Click
  (Submitted, travado → Verified ou Rejected). Para a GAIA: aberta → respondida →
  fechada, com tipo CAR, CL ou FAR.
- Registro do "verificado": verificador e organismo, data, escopo, período,
  critério, nível de garantia, tipo de parecer. Na v1, basta anexar o PDF assinado
  pela verificadora.
  https://www.forestcarbonpartnership.org/sites/default/files/documents/validation_and_verification_guidelines_v2.8_0.pdf

## LGPD

- Base legal provável: execução de contrato (art. 7, V) ou legítimo interesse
  (art. 7, IX), com minimização e registro das operações (art. 37). Interpretação,
  não verificada com advogado.
  https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm
- O auditor define os próprios procedimentos: tende a ser controlador
  independente, não operador (não verificado). Guia da ANPD:
  https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes/guia-agentes-de-tratamento-e-encarregado-versao-1-0-defeso-eleitoral.pdf/@@display-file/file
- Na prática: contrato com a verificadora, esconder CPF salvo necessidade, log de
  acesso (art. 37) e segurança (art. 46).
