//LOGOUT
let logoutBtn = new LogoutButton();
logoutBtn.action = () => {
    ApiConnector.logout((r) => { if (r.success) location.reload(); })
}
//ProfileWidget
ApiConnector.current((profile) => {//reload profile callback
    if (profile.success) ProfileWidget.showProfile(profile.data)
    else { console.log(profile.error) }
})
//ResetBoard
const tableCurrencies = new RatesBoard();
const updateTimer = 60000;
function updatingListOfCurrencies() {
    ApiConnector.getStocks((stoks) => {
        if (stoks.success) {
            tableCurrencies.clearTable();
            tableCurrencies.fillTable(stoks.data)
        } else {
            console.log(stoks.error)
        }
    })
}
updatingListOfCurrencies();
setInterval(() => {
    updatingListOfCurrencies();
}, updateTimer);
//MoneyManager
const moneyManager = new MoneyManager()
moneyManager.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, "Баланс успешно пополнен")
        }
        else {
            moneyManager.setMessage(response.success, response.error)
        }
    })
}
//Money convertation
moneyManager.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, "Конвертация прошла успешно")
        }
        else {
            moneyManager.setMessage(response.success, response.error)
        }
    })
}
//Money transfer
const favCallBack = (response) => {//load users list callback
    if (response.success) {
        moneyManager.updateUsersList(response.data)
    } else {
        moneyManager.setMessage(response.success, response.error)
    }
}
ApiConnector.getFavorites(favCallBack)
moneyManager.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, "Перевод прошел успешно")
        }
        else {
            moneyManager.setMessage(response.success, response.error)
        }
    })
}
//favorites widgets
const favoriteVidget = new FavoritesWidget();
ApiConnector.getFavorites((response) => {//load users list
    if (response.success) {
        favoriteVidget.clearTable()
        favoriteVidget.fillTable(response.data)
    } else {
        favoriteVidget.setMessage(response.success, response.error)
    }
});
favoriteVidget.addUserCallback = (data) => {
    ApiConnector.addUserToFavorites(data, (response) => {
        if (response.success) {
            ApiConnector.getFavorites(favCallBack)
            favoriteVidget.clearTable()
            favoriteVidget.fillTable(response.data)
            favoriteVidget.setMessage(response.success, "Пользователь добавлен")
        } else {
            favoriteVidget.setMessage(response.success, response.error)
        }
    })
}
favoriteVidget.removeUserCallback = (data) => {
    ApiConnector.removeUserFromFavorites(data, (response) => {
        if (response.success) {
            ApiConnector.getFavorites(favCallBack)
            favoriteVidget.clearTable()
            favoriteVidget.fillTable(response.data)
            favoriteVidget.setMessage(response.success, "Пользователь удален")
        } else {
            favoriteVidget.setMessage(response.success, response.error)
        }
    })
}