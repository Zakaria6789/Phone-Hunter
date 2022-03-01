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
                    <div class="card-body text-center">
                        <div>
                            <img src="${phone?.image}" class="card-img-top mb-3 w-75" alt="...">
                        </div>
                        <div>
                            <h5 class="card-title">${phone?.phone_name}</h5>
                            <p class="card-text">${phone?.brand}</p>
                            <button onclick="phoneDetailsDataLoad('${phone?.slug}')" class="btn btn-sm btn-primary">Show Details</button>
                        </div>
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
            <img width="280px" src="${phone?.image}" alt="">
         </div>
         <table class="table table-striped w-50 mx-auto border">
            <tbody>
                <tr>
                    <td>Name</td>
                    <td>${phone?.name ? phone?.name : 'Not Found'}</td>
                </tr>
                <tr>
                    <td>Brand</td>
                    <td>${phone?.brand ? phone?.brand : 'Not Found'}</td>
                </tr>
                <tr>
                    <td>Release Date</td>
                    <td>${phone.releaseDate ? phone.releaseDate : 'Release Date Not Found'}</td>
                </tr>
                <tr>
                    <td class="h4">Main Features</td>
                    <td></td>
                </tr>
                <tr>
                    <td>ChipSet</td>
                    <td>${phone?.mainFeatures?.chipSet ? phone?.mainFeatures?.chipSet : 'Not Found'}</td>
                </tr>
                <tr>
                    <td>Display Size</td>
                    <td>${phone?.mainFeatures?.displaySize ? phone?.mainFeatures?.displaySize : 'Not Found'}</td>
                </tr>
                <tr>
                    <td>Memory</td>
                    <td>${phone?.mainFeatures?.memory ? phone?.mainFeatures?.memory : 'Not Found'}</td>
                </tr>
                <tr>
                    <td>Sensors</td>
                    <td>${phone?.mainFeatures?.sensors ? phone?.mainFeatures?.sensors : 'Not Found'}</td>
                </tr>
                <tr>
                    <td>Storage</td>
                    <td>${phone?.mainFeatures?.storage ? phone?.mainFeatures?.storage : 'Not Found'}</td>
                </tr>
                <tr>
                    <td class="h4">Others</td>'Not Found'
                    <td></td>
                </tr>
                <tr>
                    <td>Bluetooth</td>
                    <td>${phone?.others?.Bluetooth ? phone?.others?.Bluetooth : 'Not Found'}</td>
                </tr>
                <tr>
                    <td>GPS</td>
                    <td>${phone?.others?.GPS ? phone?.others?.GPS : 'Not Found'}</td>
                </tr>
                <tr>
                    <td>Radio</td>
                    <td>${phone?.others?.Radio ? phone?.others?.Radio : 'Not Found'}</td>
                </tr>
                <tr>
                    <td>USB</td>
                    <td>${phone?.others?.USB ? phone?.others?.USB : 'Not Found'}</td>
                </tr>
                <tr>
                    <td>WLAN</td>
                    <td>${phone?.others?.WLAN ? phone?.others?.WLAN : 'Not Found'}</td>
                </tr>
            </tbody>
        </table>   
    `;
    detailContainer.appendChild(div);
}