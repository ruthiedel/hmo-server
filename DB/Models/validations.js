function isValidIsraeliID(id) {
    // Check if ID is 9 digits
    if (!/^\d{9}$/.test(id)) {
        return false;
    }

    // Calculate check digit
    var sum = 0;
    for (var i = 0; i < 9; i++) {
        var digit = parseInt(id.charAt(i));
        var weight = (i % 2 === 0) ? 1 : 2;
        var product = digit * weight;
        sum += (product > 9) ? product - 9 : product;
    }

    // Check if the remainder is 0
    return sum % 10 === 0;
}


function isValidMobile(value) {
    return /^05\d{8}$/.test(value);
}


function isValidPhone(value) {
    return /^0[2-9]\d{7}$/.test(value.replace(/-/g, ''));
}
function validDate(value) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return value < today;
}

export{
    isValidIsraeliID,
    isValidMobile,
    isValidPhone,
    validDate 
}