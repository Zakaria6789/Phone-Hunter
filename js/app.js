const phoneContainer = document.getElementById('phone-container');
const notFoundError = document.getElementById('error-text');
const detailContainer = document.getElementById('detail-container');


const searchResult = () => {
    const searchBox = document.getElementById('search-box');
    const searchText = searchBox.value;
    searchBox.value = '';
    if (searchText == '') {
        notFoundError.innerText = 'Type something to get result...';
        phoneContainer.innerHTML = '';
        detailContainer.innerHTML = '';
    }
    else {
        detailContainer.style.display = 'none';
        fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
            .then(res => res.json())
            .then(data => allphones(data.data.slice(0, 20)));

    }
}




const allphones = (phones) => {
    if (phones.length == 0) {
        notFoundError.innerText = 'Result Not Found...';
        phoneContainer.innerHTML = '';
        detailContainer.innerHTML = '';
    }
    else {
        notFoundError.innerText = '';
        phoneContainer.textContent = '';
        phones.forEach(phone => {
            console.log(phone);
            const div = document.createElement('div');
            div.classList.add = 'col';
            div.innerHTML = `
                <div class="card h-100">
                    <div class="card-body">
                    <img src="${phone.image}" class="card-img-top mb-3 w-75" alt="...">
                        <h5 class="card-title">${phone.phone_name}</h5>
                        <p class="card-text">${phone.brand}</p>
                        <button onclick="phoneDetailsDataLoad('${phone.slug}')" class="btn btn-sm btn-primary">Show Details</button>
                    </div>
                </div>
        `;
            phoneContainer.appendChild(div);
        })
    }
}






const phoneDetailsDataLoad = (id) => {
    fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
        .then(res => res.json())
        .then(data => phoneDetail(data.data));
}




const phoneDetail = (phone) => {
    detailContainer.style.display = 'block';
    detailContainer.innerHTML = '';
    const div = document.createElement('div');
    div.innerHTML = `
         <div class="text-center mb-5">
            <img width="280px" src="${phone.image}" alt="">
         </div>
         <table class="table table-striped w-75 mx-auto border">
            <tbody>
                <tr>
                    <td>Name</td>
                    <td>${phone.name}</td>
                </tr>
                <tr>
                    <td>Brand</td>
                    <td>${phone.brand}</td>
                </tr>
                <tr>
                    <td>Release Date</td>
                    <td>${phone.releaseDate}</td>
                </tr>
                <tr>
                    <td class="h4">Main Features</td>
                    <td></td>
                </tr>
                <tr>
                    <td>ChipSet</td>
                    <td>${phone.mainFeatures.chipSet}</td>
                </tr>
                <tr>
                    <td>Display Size</td>
                    <td>${phone.mainFeatures.displaySize}</td>
                </tr>
                <tr>
                    <td>Memory</td>
                    <td>${phone.mainFeatures.memory}</td>
                </tr>
                <tr>
                    <td>Sensors</td>
                    <td>${phone.mainFeatures.sensors}</td>
                </tr>
                <tr>
                    <td>Storage</td>
                    <td>${phone.mainFeatures.storage}</td>
                </tr>
                <tr>
                    <td class="h4">Others</td>
                    <td></td>
                </tr>
                <tr>
                    <td>Bluetooth</td>
                    <td>${phone.others.Bluetooth}</td>
                </tr>
                <tr>
                    <td>GPS</td>
                    <td>${phone.others.GPS}</td>
                </tr>
                <tr>
                    <td>Radio</td>
                    <td>${phone.others.Radio}</td>
                </tr>
                <tr>
                    <td>USB</td>
                    <td>${phone.others.USB}</td>
                </tr>
                <tr>
                    <td>WLAN</td>
                    <td>${phone.others.WLAN}</td>
                </tr>
            </tbody>
        </table>   
    `;
    detailContainer.appendChild(div);
}