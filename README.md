# 🚀 Picanço Legacy - Site Profissional (v4.0)

Site estático de alta performance, desenvolvido com HTML5, CSS3 e JavaScript puro (ES6+), seguindo rigorosamente as melhores práticas de UX/UI, SEO Local e Conformidade LGPD.

## 📋 Checklist de Pré-Lançamento

1. **Substituir Placeholders:**
   - [ ] Buscar e substituir `G-XXXXXXXXXX` pelo seu ID real do Google Analytics 4.
   - [ ] Buscar e substituir `AW-XXXXXXXXX` pelo seu ID de Conversão do Google Ads.
   - [ ] Buscar e substituir `GTM-XXXXXXX` pelo seu ID do Google Tag Manager.
   - [ ] Buscar e substituir `1234567890` pelo seu ID real do Meta Pixel.
   - [ ] Atualizar o número de WhatsApp `5511999998888` no `script.js` e nos links HTML.
   - [ ] Validar o CNPJ e e-mail no rodapé e na Política de Privacidade.

2. **Configuração de Ferramentas de Marketing:**
   - **GTM:** Crie uma conta em [tagmanager.google.com](https://tagmanager.google.com). Instale a tag do GA4 e do Meta Pixel através do GTM para melhor controle.
   - **GA4:** Configure eventos personalizados como `whatsapp_click` e `form_submit` (o JS já está enviando esses eventos).
   - **Google Meu Negócio:** Adicione a URL deste site no perfil da empresa. Verifique se o endereço e horário no Schema.org (JSON-LD no `<head>`) batem exatamente com o perfil do GMB.

3. **Testes Obrigatórios:**
   - [ ] **Teste de UTM:** Acesse `index.html?utm_source=instagram&utm_campaign=stories`. Clique no botão do WhatsApp. A mensagem pré-preenchida deve dizer: "Olá! Vim pelo instagram (stories)...".
   - [ ] **Teste de Dark Mode:** Clique no ícone de sol/lua. Recarregue a página. O tema deve persistir (verifique o LocalStorage no DevTools).
   - [ ] **Teste de Cookies:** Abra uma aba anônima. O banner deve aparecer. Clique em "Rejeitar". Verifique no DevTools > Application > LocalStorage se `cookie_consent` está como `rejected`.
   - [ ] **Responsividade:** Teste no Chrome DevTools (iPhone SE, iPad, Desktop). A barra fixa de "Ligar/WhatsApp" deve aparecer **apenas** no mobile.

## 📈 Plano de Ação de Marketing Local (8 Semanas)

- **Semana 1-2:** Otimização total do Perfil da Empresa no Google (GMB). Adicionar 10 fotos reais de alta qualidade, responder a todas as avaliações antigas e postar uma atualização semanal com o link do site.
- **Semana 3-4:** Campanha de Google Ads Local (Raio de 5km do Jardim Picanço) focada na palavra-chave "Barbearia perto de mim" e "Corte degradê Guarulhos", direcionando para a âncora `#servicos`.
- **Semana 5-6:** Ação no Instagram: Reels mostrando o "antes e depois" da Barba Terapia, com CTA claro: "Link na bio para agendar com desconto na primeira vez".
- **Semana 7-8:** Implementação de programa de fidelidade digital (ex: "No 5º corte, a barba é por nossa conta"), divulgado via mensagem de WhatsApp para a base de clientes capturada pelo formulário.

## 🛠️ Dicas Rápidas de Teste Local

1. **Simular UTM:** No VS Code, use a extensão "Live Server". Acesse `http://127.0.0.1:5500/index.html?utm_source=teste`. Abra o Console do DevTools e digite `localStorage`. Você verá as chaves UTM salvas.
2. **Bloqueio de Cookies:** No DevTools, vá em Application > LocalStorage e delete a chave `cookie_consent`. Recarregue a página. O banner deve reaparecer.
3. **Validação de Schema:** Copie o conteúdo do `<script type="application/ld+json">` e cole no [Rich Results Test do Google](https://search.google.com/test/rich-results) para garantir que o "LocalBusiness" está sendo lido corretamente.