'use strict';

// Выход из личного кабинета
const logoutButton = new LogoutButton();

logoutButton.action = () => {
    const callback = (response) => {
        if (response.success) {
            location.reload();
        } 
    }

    ApiConnector.logout(callback); 
}

// Получение информации о пользователе
const getProfile = () => {
    const callback = (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
        }
    }

    ApiConnector.current(callback);
}

// Получение текущих курсов валюты
const ratesBoard = new RatesBoard();

const getRatesBoard = () => {
    const callback = (response) => {
        if (response.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        } 
    }

    ApiConnector.getStocks(callback);
}

const ratesBoardTimer = setInterval(getRatesBoard, 60000);

// ОПЕРАЦИИ С ДЕНЬГАМИ
const moneyManager = new MoneyManager();

// пополнение баланса
moneyManager.addMoneyCallback = data => {
    const callback = (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, 'Баланс пополнен'); 
        } else {
            moneyManager.setMessage(response.success, response.data); 
        }
    }

    ApiConnector.addMoney(data, callback);
}

// конвертирование валюты
moneyManager.conversionMoneyCallback = data => {
    const callback = (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, 'Конвертация прошла успешно');
        } else {
            moneyManager.setMessage(response.success, response.data);
        }
    }

    ApiConnector.convertMoney(data, callback);
}

// перевод валюты
moneyManager.sendMoneyCallback = data => {
    const callback = (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, 'Средства переведены');
        } else {
            moneyManager.setMessage(response.success, response.data);
        }
    }

    ApiConnector.transferMoney(data, callback);
}


// РАБОТА С ИЗБРАННЫМ
const favoritesWidget = new FavoritesWidget();

// запрос начального списка избранных
const getFavorites = () => {
    const callback = (response) => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
        }
    }

    ApiConnector.getFavorites(callback)
}

// добавление пользователя в избранные
favoritesWidget.addUserCallback = data => {
    const callback = (response) => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(response.success, 'Пользователь добавлен в список избранных');
        } else {
            favoritesWidget.setMessage(response.success, response.data);
        }
    }

    ApiConnector.addUserToFavorites(data, callback);
}

// удаление пользователя из избранных
favoritesWidget.removeUserCallback = data => {
    const callback = (response) => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(response.success, 'Пользователь удалён из списка избранных');
        } else {
            favoritesWidget.setMessage(response.success, response.data);
        }
    }

    ApiConnector.removeUserFromFavorites(data, callback);
}