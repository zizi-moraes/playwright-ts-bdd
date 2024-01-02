# Playwright em Typescript com BDD e SEM Cucumber

O BDD tem várias vantagens, e esta forma que vimos não é a única forma de utilizá-lo. Se você e seu time decidiram que sim é necessário utilizar BDD, apresento uma forma mais simples, com menos arquivos. O BDD no Playwright SEM criar os feature files.

## 1. Instalação
Só a instalação do Playwright já é suficiente. Vamos instalar da mesma forma que instalamos para o Cucumber (se você já fez esta etapa, não precisa fazer novamente):
```
npm init playwright@latest
```

## 2. Configuração
Abra o arquivo playwright.config.ts e altere a linha 19 para “retries: 2,“.

## 3. Implementação dos arquivos de teste
Crie um novo arquivo tests/example-bdd.spec.ts:
```
import { test, expect } from '@playwright/test';

test.describe('Feature: Playwright website', () => {
  test('Scenario: Has Title', async ({ page }) => {
    
    await test.step('Given I am at the playwright website', async () => {
      await page.goto('https://playwright.dev/');
    });

    await test.step('Then the title has the text "Playwright"', async () => {
            await expect(page).toHaveTitle(/Playwrights/); //this line is intentionally failing so we can see the reports
    });
  });
  
  test('Scenario: Get Started Link', async ({ page }) => {
    await test.step('Given I am at the playwright website', async () => {
      await page.goto('https://playwright.dev/');
    });
    
    await test.step('When I click at "Get Started"', async () => {
      await page.getByRole('link', { name: 'Get started' }).click();
    });

    await test.step('Then the URL has the text "intro"', async () => {
      await expect(page).toHaveURL(/.*intro/);
    });
  });

});
```

## Explicação:
> Usamos o test.describe para nomear a Feature. Esse método não é obrigatório no Playwright, mas bem útil.
Usamos o test para nomear o Scenario. Playwright permite nomear como você preferir, então tudo bem.
Usamos o test.step para os eventos When e Then quando necessário. Também não obrigatório, mas pode ser utilizado desta forma.
E é somente isto que precisa ser feito (considerando o mesmo cenário implementado com Cucumber).

## 4. Execução dos testes
Para rodar os testes, rodamos através do Playwright mesmo. Em seu terminal, rode:
```
npx playwright test
```

> Os testes serão executados em modo headless, e 3 browsers: chromium, firefox, webkit que é o padrão do Playwright. Também já vem com retry e o relatório irá abrir automaticamente se um algum teste falhar. 
Se você clicar em um dos testes que falhou, irá ver detalhadamente o valor esperado versos recebido; qual a linha de código que falhou; e apesar de não ter screenshot (poderíamos ter colocado a linha “screenshot: 'only-on-failure'", no playwright.config.ts), se você navegar até a aba “Retry 1”, rolar a página até o final, e clicar na imagem da área “Traces”. Será possível ver cada step que aconteceu no browser, muito legal!!!

## 4. Fonte
> https://testingwithrenata.com/blog/test-automation/playwright-bdd-cucumber-e-a-minha-opiniao-sobre-isso/

