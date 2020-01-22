const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '',
        pass: ''
    }
});

const sendOrder = data => {
    const sum = Object.values(data.order).map(item => item.price).reduce((a, b) => a + b);
    const text = `
        Заказ:\n 
        ${Object.keys(data.order).map(key => (                      
            data.order[key].amount > 0 && `${data.order[key].title}: ` + data.order[key].amount
        )).filter(item => item).join(', ')}\n
        Стоимость: ${sum} р.\n
        Адрес: ${data.address}\n
        Область: ${data.region}\n
        Город: ${data.city}\n
        Почтовый индекс: ${data.zip}\n
        Адрес: ${data.address}
    `;
    const mailOptions = {
        from: '',
        to: '',
        subject: 'Ваш заказ подтвержден',
        text
    };
    
    return transporter.sendMail(mailOptions);
};

module.exports = {
    sendOrder
};