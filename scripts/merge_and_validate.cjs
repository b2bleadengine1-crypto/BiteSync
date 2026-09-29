const fs = require('fs');
const path = require('path');

const petiscos = JSON.parse(fs.readFileSync(path.join(__dirname, 'petiscos.json'), 'utf8'));
const sopas = JSON.parse(fs.readFileSync(path.join(__dirname, 'sopas.json'), 'utf8'));
const peixes = JSON.parse(fs.readFileSync(path.join(__dirname, 'peixes.json'), 'utf8'));
const carnes = JSON.parse(fs.readFileSync(path.join(__dirname, 'carnes.json'), 'utf8'));
const doces = JSON.parse(fs.readFileSync(path.join(__dirname, 'doces.json'), 'utf8'));

const allRecipes = [...petiscos, ...sopas, ...peixes, ...carnes, ...doces];

console.log('--- Resumo das Categorias ---');
console.log('1. Petiscos & Entradas:', petiscos.length);
console.log('2. Sopas & Caldos:', sopas.length);
console.log('3. Peixe & Marisco:', peixes.length);
console.log('4. Carnes & Caça:', carnes.length);
console.log('5. Sobremesas & Doces Conventuais:', doces.length);
console.log('TOTAL:', allRecipes.length);

// Validação de Integridade e Campos Obrigatórios
const idSet = new Set();
let errors = 0;

allRecipes.forEach((r, idx) => {
  if (!r.id || idSet.has(r.id)) {
    console.error(`Erro: ID inválido ou duplicado na receita ${idx}: ${r.id}`);
    errors++;
  }
  idSet.add(r.id);

  if (!r.title || !r.category || !r.nutrition || typeof r.nutrition.calories !== 'number') {
    console.error(`Erro: Campos vitais em falta em ${r.id} (${r.title})`);
    errors++;
  }

  if (!r.ingredients || r.ingredients.length === 0) {
    console.error(`Erro: Sem ingredientes em ${r.id}`);
    errors++;
  } else {
    r.ingredients.forEach((ing, iIdx) => {
      if (!ing.item || !ing.amount || typeof ing.estimatedGrams !== 'number') {
        console.error(`Erro no ingrediente ${iIdx} em ${r.id}:`, ing);
        errors++;
      }
    });
  }

  if (!r.steps || r.steps.length === 0) {
    console.error(`Erro: Sem passos de preparação em ${r.id}`);
    errors++;
  }

  // Garantir flags portuguesas
  r.isPortugueseTraditional = true;
  r.area = "Portuguese";
  if (!r.tags) r.tags = [];
  if (!r.tags.includes("Portugal")) r.tags.push("Portugal");
  if (!r.tags.includes("Tradicional")) r.tags.push("Tradicional");
});

if (errors === 0) {
  console.log('✅ Todas as ' + allRecipes.length + ' receitas passaram na validação com 100% de sucesso!');
  
  // Salvar em src/data/portuguese_recipes.json e /portuguese_recipes.json
  const targetSrc = path.join(__dirname, '..', 'src', 'data', 'portuguese_recipes.json');
  const targetRoot = path.join(__dirname, '..', 'portuguese_recipes.json');

  fs.writeFileSync(targetSrc, JSON.stringify(allRecipes, null, 2), 'utf8');
  fs.writeFileSync(targetRoot, JSON.stringify(allRecipes, null, 2), 'utf8');
  console.log('✅ Ficheiros salvos em:');
  console.log(' - ' + targetSrc);
  console.log(' - ' + targetRoot);
} else {
  console.error(`❌ Encontrados ${errors} erros.`);
  process.exit(1);
}
