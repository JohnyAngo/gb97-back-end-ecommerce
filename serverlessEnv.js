module.exports.arnAuthorizer = () => ({
  dev: "arn:aws:lambda:us-east-1:503456759796:function:back-authorizer-dev-Authorizer",
  prod: "arn:aws:lambda:us-east-1:503456759796:function:back-authorizer-prod-Authorizer",
});

module.exports.jwtSecret = () => ({
  dev: "HKHVHJVKBKJKJBKBKHKBMKHB",
  prod: "HKHVHJVKBKJKJBKBKHKBMKHB",
});

module.exports.databaseM = () => ({
  dev: {
    mongoURL:
      "mongodb+srv://bg97proyectos:nNqnI2iDGfoWD1z2@gb97.vfdyrvl.mongodb.net/gb97EcommerceDev?retryWrites=true&w=majority", // ingresar el valor url correcto para dev
  },
  prod: {
    mongoURL:
      "mongodb+srv://bg97proyectos:nNqnI2iDGfoWD1z2@gb97.vfdyrvl.mongodb.net/gb97EcommerceProd?retryWrites=true&w=majority",
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
