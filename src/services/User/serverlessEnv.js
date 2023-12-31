module.exports.arnAuthorizer = () => ({
  dev: "arn:aws:lambda:us-east-1:503456759796:function:back-authorizer-dev-Authorizer",
  prod: "arn:aws:lambda:us-east-1:503456759796:function:back-authorizer-prod-Authorizer",
});

module.exports.jwtSecret = () => ({
  dev: "HKHVHJVKBKJKJBKsd23234324fsdfdsfsddfdsfBKHKBMKHB",
  prod: "HKHVHJVKBKJKJBKsdfdsfds3423432BKdsfsdfdsfHKBMKHB",
});

module.exports.databaseM = () => ({
  dev: {
    mongoURL:
      "mongodb+srv://bg97proyectos:nNqnI2iDGfoWD1z2@gb97.vfdyrvl.mongodb.net/gb97PuntoVentaDev?retryWrites=true&w=majority", 
  },
  prod: {
    mongoURL:
      "mongodb+srv://bg97proyectos:nNqnI2iDGfoWD1z2@gb97.vfdyrvl.mongodb.net/gb97PuntoVentaProd?retryWrites=true&w=majority",
  },
});

module.exports.region = () => ({
  dev: {
    regionAws: "us-east-2",
  },
  prod: { 
    regionAws: "us-east-1",
  },
});
