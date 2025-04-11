const generateMessage = (status) => {
    switch (status) {
        case "unknownError":
            return "Bir hata oluştu. Lütfen daha sonra tekrar deneyin.";

        case "incorrectPassword":
            return "Hatalı şifre. Lütfen tekrar deneyin.";

        case "userNotFound":
            return "Verilen bilgilere sahip bir hesap bulunamadı.";

        case "emailInUse":
            return "E-posta adresi halihazırda kullanımda.";

        case "usernameInUse":
            return "Kullanıcı adı halihazırda kullanımda.";

        case "databaseError":
            console.log("Veri tabanı bağlantısında bir sorun yaşandı.");
            return "Bir hata oluştu. Lütfen daha sonra tekrar deneyin.";

        case "clearDatabase":
            return "Veri tabanındaki tüm veriler silindi.";

        case "insertMockData":
            return "Test verileri veri tabanına yazıldı.";

        case "createUser":
            return "Kullanıcı hesabı başarıyla oluşturuldu.";

        case "createAdmin":
            return "Admin hesabı başarıyla oluşturuldu.";
    }
};

const messageSchema = {
    unknownError: "unknownError",
    incorrectPassword: "incorrectPassword",
    userNotFound: "userNotFound",
    emailInUse: "emailInUse",
    usernameInUse: "usernameInUse",
    databaseError: "databaseError",
    clearDatabase: "clearDatabase",
    insertMockData: "insertMockData",
    createUser: "createUser",
    createAdmin: "createAdmin",
};

module.exports = { generateMessage, messageSchema };
