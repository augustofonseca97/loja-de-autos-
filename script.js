 // 1. Banco de dados fictício de veículos (Adicione ou altere as imagens e dados como quiser)
        /*const carsData = [
            { id: 1, name: "Onix Turbo", brand: "Chevrolet", price: 78000, km: 22000, year: 2021, fuel: "Flex", img: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=500&auto=format&fit=crop&q=60" },
            { id: 2, name: "Civic Touring", brand: "Honda", price: 145000, km: 35000, year: 2020, fuel: "Gasolina", img: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=500&auto=format&fit=crop&q=60" },
            { id: 3, name: "Corolla XEI", brand: "Toyota", price: 125000, km: 42000, year: 2019, fuel: "Flex", img: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=500&auto=format&fit=crop&q=60" },
            { id: 4, name: "Compass Longitude", brand: "Jeep", price: 138000, km: 58000, year: 2018, fuel: "Diesel", img: "https://images.unsplash.com/photo-153972230907a-edd00d606fd1?w=500&auto=format&fit=crop&q=60" },
            { id: 5, name: "Gol Trendline", brand: "Volkswagen", price: 45000, km: 85000, year: 2016, fuel: "Flex", img: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=500&auto=format&fit=crop&q=60" },
            { id: 6, name: "Mobi Like", brand: "Fiat", price: 49900, km: 15000, year: 2022, fuel: "Flex", img: "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=500&auto=format&fit=crop&q=60" },
            { id: 7, name: "Hilux SRV", brand: "Toyota", price: 210000, km: 0, year: 2024, fuel: "Diesel", img: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=500&auto=format&fit=crop&q=60" },
            { id: 8, name: "Mustang GT", brand: "Ford", price: 350000, km: 12000, year: 2021, fuel: "Gasolina", img: "https://images.unsplash.com/photo-158434560448a-13162f4e34d1?w=500&auto=format&fit=crop&q=60" },
            { id: 9, name: "Ferrari", brand: "Ferrari", price: 1000000, km: 50, year: 2026, fuel: "flex", img: "./img/ferrari.jpg" },
            { id: 10, name: "porshe", brand: "Porshe", price: 500000, km: 80, year: 2022, fuel: "flex", img: "./img/porshe911.avif" }
        ];*/

        const carsData = [
    { 
        id: 1, 
        name: "Onix Turbo", 
        brand: "Chevrolet", 
        price: 78000, 
        km: 22000, 
        year: 2021, 
        fuel: "Flex", 
        // Agora aceita várias fotos:
        imgs: [
            "./img/onix.png",
            "./img/t.jpg",
            "./img/internaOnix.webp"
        ] 
    },
    { 
        id: 2, 
        name: "Civic Touring", 
        brand: "Honda", 
        price: 145000, 
        km: 35000, 
        year: 2020, 
        fuel: "Gasolina", 
        imgs: [
            "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=500&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=500&auto=format&fit=crop&q=60",
            "./img/t.jpg"
        ] 
    },
    // ... Seus outros carros seguem a mesma lógica ...
    { 
        id: 9, 
        name: "Ferrari", 
        brand: "F5", 
        price: 1000000, 
        km: 50, 
        year: 2026, 
        fuel: "flex", 
        imgs: [
            "./img/ferrari.jpg",
            "./img/ferrari-interior.jpg",
            "./img/ferrari-traseira.jpg"
        ] 
    }
];

        // 2. Mapeamento dos elementos do HTML
        const carsGrid = document.getElementById('cars-grid');
        const searchInput = document.getElementById('search-input');
        const filterBrand = document.getElementById('filter-brand');
        const filterPrice = document.getElementById('filter-price');
        const filterKm = document.getElementById('filter-km');
        const filterYear = document.getElementById('filter-year');
        const filterFuel = document.getElementById('filter-fuel');
        const btnClear = document.getElementById('btn-clear');

        // 3. Função para renderizar os cards na tela
       function renderCars(cars) {
    carsGrid.innerHTML = ""; 

    if (cars.length === 0) {
        carsGrid.innerHTML = `<div class="no-results">Nenhum carro encontrado com os filtros selecionados.</div>`;
        return;
    }

    cars.forEach(car => {
        const formattedPrice = car.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        const formattedKm = car.km === 0 ? "Zero KM" : `${car.km.toLocaleString('pt-BR')} km`;

        // Cria o HTML do carrossel baseado no array de imagens do carro
        let slidesHTML = "";
        car.imgs.forEach((imgUrl, index) => {
            slidesHTML += `
                <div class="slide ${index === 0 ? 'active' : ''}" style="background-image: url('${imgUrl}')" onclick="openDetails(${car.id})"></div>
            `;
        });

        const carCard = `
            <div class="car-card" id="car-${car.id}">
                <div class="carousel-container">
                    ${slidesHTML}
                    <button class="carousel-btn prev" onclick="moveSlide(${car.id}, -1)">&#10094;</button>
                    <button class="carousel-btn next" onclick="moveSlide(${car.id}, 1)">&#10095;</button>
                </div>
                <div class="car-info">
                    <span class="car-brand">${car.brand}</span>
                    <h4 class="car-name" onclick="openDetails(${car.id})" style="cursor:pointer;">${car.name}</h4>
                    <div class="car-details">
                        <div>📅 Ano: <b>${car.year}</b></div>
                        <div>⛽ ${car.fuel}</div>
                        <div style="grid-column: span 2">🛣️ KM: <b>${formattedKm}</b></div>
                    </div>
                    <div class="car-price">${formattedPrice}</div>
                </div>
            </div>
        `;
        carsGrid.innerHTML += carCard;
    });
}

// Função lógica para mover as fotos do carrossel
function moveSlide(carId, direction) {
    const card = document.getElementById(`car-${carId}`);
    const slides = card.querySelectorAll('.slide');
    let activeIndex = Array.from(slides).findIndex(slide => slide.classList.contains('active'));
    
    slides[activeIndex].classList.remove('active');
    
    activeIndex += direction;
    
    if (activeIndex >= slides.length) activeIndex = 0;
    if (activeIndex < 0) activeIndex = slides.length - 1;
    
    slides[activeIndex].classList.add('active');
}
        // 4. Função principal que aplica os filtros e a pesquisa de texto ao mesmo tempo
        function filterCars() {
            const searchValue = searchInput.value.toLowerCase();
            const selectedBrand = filterBrand.value;
            const selectedPrice = filterPrice.value;
            const selectedKm = filterKm.value;
            const selectedYear = filterYear.value;
            const selectedFuel = filterFuel.value;

            const filteredCars = carsData.filter(car => {
                // Filtro por Input de Texto (Nome do carro ou Marca)
                const matchesSearch = car.name.toLowerCase().includes(searchValue) || car.brand.toLowerCase().includes(searchValue);
                
                // Filtro por Marca
                const matchesBrand = selectedBrand === "" || car.brand === selectedBrand;
                
                // Filtro por Preço Máximo
                const matchesPrice = selectedPrice === "" || car.price <= Number(selectedPrice);
                
                // Filtro por KM Máximo
                const matchesKm = selectedKm === "" || car.km <= Number(selectedKm);
                
                // Filtro por Ano Mínimo
                const matchesYear = selectedYear === "" || car.year >= Number(selectedYear);
                
                // Filtro por Combustível
                const matchesFuel = selectedFuel === "" || car.fuel === selectedFuel;

                // O carro só passa se atender a TODOS os critérios selecionados
                return matchesSearch && matchesBrand && matchesPrice && matchesKm && matchesYear && matchesFuel;
            });

            renderCars(filteredCars);
        }

        // 5. Ouvintes de Eventos (Escutam quando o usuário digita ou altera alguma opção)
        searchInput.addEventListener('input', filterCars);
        filterBrand.addEventListener('change', filterCars);
        filterPrice.addEventListener('change', filterCars);
        filterKm.addEventListener('change', filterCars);
        filterYear.addEventListener('change', filterCars);
        filterFuel.addEventListener('change', filterCars);

        // Botão para limpar todos os campos
        btnClear.addEventListener('click', () => {
            searchInput.value = "";
            filterBrand.value = "";
            filterPrice.value = "";
            filterKm.value = "";
            filterYear.value = "";
            filterFuel.value = "";
            renderCars(carsData); // Mostra todos os carros de volta
        });

        // Executar na primeira vez para mostrar os carros assim que a página abrir
        renderCars(carsData);

        // Abre a nova guia com os detalhes do carro
function openDetails(carId) {
    const selectedCar = carsData.find(car => car.id === carId);
    // Salva o carro selecionado para a nova aba conseguir ler
    localStorage.setItem('selectedCar', JSON.stringify(selectedCar));
    // Abre a nova página de detalhes
    window.open('detalhes.html', '_blank');
}