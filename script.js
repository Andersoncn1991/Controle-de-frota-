// Vehicle management
let vehicles = [];
let ideasShown = 0;

// Ideas database - Always showing ideas for fleet management
const ideas = [
    {
        icon: "🔧",
        title: "Manutenção Preventiva",
        description: "Implemente um sistema de manutenção preventiva para evitar quebras inesperadas e reduzir custos com reparos emergenciais."
    },
    {
        icon: "📱",
        title: "App de Motoristas",
        description: "Crie um aplicativo móvel para que motoristas possam registrar ocorrências, consumo de combustível e quilometragem em tempo real."
    },
    {
        icon: "📊",
        title: "Dashboard de Análise",
        description: "Desenvolva dashboards com métricas de desempenho da frota, incluindo custos operacionais, consumo médio e tempo de inatividade."
    },
    {
        icon: "🔔",
        title: "Alertas Automáticos",
        description: "Configure alertas automáticos para renovação de documentos, revisões agendadas e prazos de licenciamento."
    },
    {
        icon: "🛣️",
        title: "Rastreamento GPS",
        description: "Instale sistemas de rastreamento GPS em todos os veículos para monitorar rotas, otimizar trajetos e aumentar a segurança."
    },
    {
        icon: "💰",
        title: "Controle de Combustível",
        description: "Implemente cartões de abastecimento e monitore o consumo de combustível para identificar desperdícios e fraudes."
    },
    {
        icon: "📅",
        title: "Agendamento Inteligente",
        description: "Use um sistema de agendamento para otimizar o uso dos veículos e evitar conflitos de horários."
    },
    {
        icon: "🔐",
        title: "Gestão de Acessos",
        description: "Controle quem tem acesso aos veículos através de um sistema de permissões e chaves eletrônicas."
    },
    {
        icon: "📈",
        title: "Relatórios Mensais",
        description: "Gere relatórios mensais automatizados sobre o desempenho da frota, custos e produtividade."
    },
    {
        icon: "🌱",
        title: "Sustentabilidade",
        description: "Monitore a pegada de carbono da sua frota e considere a adoção de veículos elétricos ou híbridos."
    },
    {
        icon: "👥",
        title: "Treinamento de Motoristas",
        description: "Invista em programas de treinamento para motoristas focados em direção defensiva e economia de combustível."
    },
    {
        icon: "📋",
        title: "Checklist Digital",
        description: "Substitua checklists de papel por versões digitais para inspeção de veículos antes e depois das viagens."
    },
    {
        icon: "⚠️",
        title: "Gestão de Multas",
        description: "Acompanhe e gerencie multas de trânsito, identificando padrões e oportunidades de melhoria."
    },
    {
        icon: "🔄",
        title: "Renovação de Frota",
        description: "Planeje a renovação da frota com base na idade dos veículos, custos de manutenção e necessidades operacionais."
    },
    {
        icon: "📞",
        title: "Suporte 24/7",
        description: "Ofereça suporte 24 horas para motoristas em caso de emergências ou problemas com os veículos."
    }
];

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    loadVehicles();
    displayInitialIdeas();
    updateStats();
});

// Add vehicle function
function addVehicle() {
    const plate = document.getElementById('vehiclePlate').value.trim();
    const model = document.getElementById('vehicleModel').value.trim();
    const year = document.getElementById('vehicleYear').value.trim();

    if (!plate || !model || !year) {
        alert('Por favor, preencha todos os campos!');
        return;
    }

    const vehicle = {
        id: Date.now(),
        plate: plate.toUpperCase(),
        model: model,
        year: year
    };

    vehicles.push(vehicle);
    saveVehicles();
    displayVehicles();
    updateStats();

    // Clear inputs
    document.getElementById('vehiclePlate').value = '';
    document.getElementById('vehicleModel').value = '';
    document.getElementById('vehicleYear').value = '';
}

// Remove vehicle function
function removeVehicle(id) {
    if (confirm('Tem certeza que deseja remover este veículo?')) {
        vehicles = vehicles.filter(v => v.id !== id);
        saveVehicles();
        displayVehicles();
        updateStats();
    }
}

// Display vehicles
function displayVehicles() {
    const vehicleList = document.getElementById('vehicleList');
    
    if (vehicles.length === 0) {
        vehicleList.innerHTML = '<p style="text-align: center; color: #999;">Nenhum veículo cadastrado ainda.</p>';
        return;
    }

    vehicleList.innerHTML = vehicles.map(vehicle => `
        <div class="vehicle-card">
            <h3>🚗 ${vehicle.plate}</h3>
            <p><strong>Modelo:</strong> ${vehicle.model}</p>
            <p><strong>Ano:</strong> ${vehicle.year}</p>
            <button onclick="removeVehicle(${vehicle.id})">Remover</button>
        </div>
    `).join('');
}

// Display initial ideas
function displayInitialIdeas() {
    showIdeas(3);
}

// Show more ideas
function showMoreIdeas() {
    showIdeas(3);
}

// Show ideas function
function showIdeas(count) {
    const ideasList = document.getElementById('ideasList');
    const startIndex = ideasShown;
    const endIndex = Math.min(startIndex + count, ideas.length);

    if (startIndex >= ideas.length) {
        // Reset and start from beginning
        ideasShown = 0;
        ideasList.innerHTML = '';
        showIdeas(count);
        return;
    }

    for (let i = startIndex; i < endIndex; i++) {
        const idea = ideas[i];
        const ideaCard = document.createElement('div');
        ideaCard.className = 'idea-card';
        ideaCard.innerHTML = `
            <h3><span class="idea-icon">${idea.icon}</span>${idea.title}</h3>
            <p>${idea.description}</p>
        `;
        ideasList.appendChild(ideaCard);
    }

    ideasShown = endIndex;
    updateStats();

    // Update button text
    const button = document.querySelector('.btn-more-ideas');
    if (ideasShown >= ideas.length) {
        button.textContent = 'Reiniciar Ideias';
    } else {
        button.textContent = 'Mostrar Mais Ideias';
    }
}

// Update statistics
function updateStats() {
    document.getElementById('totalVehicles').textContent = vehicles.length;
    document.getElementById('totalIdeas').textContent = ideasShown;
}

// Save vehicles to localStorage
function saveVehicles() {
    localStorage.setItem('fleetVehicles', JSON.stringify(vehicles));
}

// Load vehicles from localStorage
function loadVehicles() {
    const stored = localStorage.getItem('fleetVehicles');
    if (stored) {
        vehicles = JSON.parse(stored);
        displayVehicles();
    }
}
