const searchResult = () => {
    const searchBox = document.getElementById('search-box');
    const searchText = searchBox.value;
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
        .then(res => res.json())
        .then(data => allphones(data.data))
}




const allphones = (phones) => {
    phones.forEach(phone => {
        console.log(phone);
        const phoneContainer = document.getElementById('phone-container');
        const div = document.createElement('div');
        div.classList.add = 'col';
        div.innerHTML = `
                <div class="card h-100">
                    <div class="card-body">
                    <img src="${phone.image}" class="card-img-top mb-3 w-75" alt="...">
                        <h5 class="card-title">${phone.phone_name}</h5>
                        <p class="card-text">${phone.brand}</p>
                        <a href="#" class="btn btn-sm btn-primary">Show Details</a>
                    </div>
                </div>
        `;
        phoneContainer.appendChild(div);
    })
}