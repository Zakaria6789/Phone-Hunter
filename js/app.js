///////////////////// All Global Variables///////////////////////
const searchBox = document.getElementById('search-box');
const phoneContainer = document.getElementById('phone-container');
const detailContainer = document.getElementById('detail-container');
const notFoundError = document.getElementById('error-text');
const loadingSpinner = document.getElementById('loading-spinner');


///////////////////// Shared/Common Function//////////////////////
const emptyContent = () => {
    phoneContainer.innerHTML = '';
    detailContainer.innerHTML = '';
}
const isDisplay = (id, displayValue) => id.style.display = displayValue;
const notFoundMassage = (massage) => notFoundError.innerText = massage;


///////////////////// Get Search Result (Data Load)////////////////////
const searchResult = async () => {
    isDisplay(loadingSpinner, 'block');
    notFoundMassage('');
    emptyContent();
    const searchText = searchBox.value;
    if (searchText == '') {
        notFoundMassage('Type Something To Get Result...');
        emptyContent();
        isDisplay(loadingSpinner, 'none');
    }
    else {
        isDisplay(detailContainer, 'none');
        const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
        const data = await res.json();
        allphones(data.data.slice(0, 20));
        isDisplay(loadingSpinner, 'none');
    }
    searchBox.value = '';
}


////////////////////// Get Search Result///////////////////////
const allphones = (phones) => {
    if (phones.length == 0) {
        notFoundMassage('Result Not Found...');
        emptyContent();
    }
    else {
        notFoundMassage('');
        phoneContainer.innerHTML = '';
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


//////////////////////// Item Details (Data Load)///////////////////
const phoneDetailsDataLoad = async (id) => {
    isDisplay(loadingSpinner, 'block');
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    phoneDetail(data.data);
    isDisplay(loadingSpinner, 'none');
}


//////////////////////////// Item Details/////////////////////////
const phoneDetail = (phone) => {
    isDisplay(detailContainer, 'block');
    detailContainer.innerHTML = '';
    const div = document.createElement('div');
    div.innerHTML = `
        <div class="text-center mb-5 detail-img">
            <img width="280px" src="${phone?.image}" alt="">
        </div>
         <table class="table table-striped border">
            <tbody>
                <tr>
                    <td>Name</td>
                    <td>${phone?.name ? phone?.name : 'Not Found'}</td>
                </tr>
                <tr>
                    <td>Release Date</td>
                    <td>${phone.releaseDate ? phone.releaseDate : 'Release Date Not Found'}</td>
                </tr>
                <tr>
                    <td>Brand</td>
                    <td>${phone?.brand ? phone?.brand : 'Not Found'}</td>
                </tr>
                <tr>
                    <td class="h5">Main Features</td>
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
                    <td class="sensors">${phone?.mainFeatures?.sensors ? phone?.mainFeatures?.sensors : 'Not Found'}</td>
                </tr>
                <tr>
                    <td>Storage</td>
                    <td>${phone?.mainFeatures?.storage ? phone?.mainFeatures?.storage : 'Not Found'}</td>
                </tr>
                <tr>
                    <td class="h5">Others</td>
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