module.exports.signUpErrors = (err) => {
    let errors = { pseudo: "", email: "", password: "" };
  
    if (err.message.includes("pseudo"))
      errors.pseudo = "Pseudo incorrect ou déjà pris";
  
    if (err.message.includes("email")) errors.email = "Email incorrect ou deja pris";
  
    return errors;
  };

module.exports.postErrors = (err) => {
  let errors = { length: ""};

  if (err.message.includes('Post'))
    errors.length = "Le titre ne doit pas depasser 60 caracteres";

  return errors
}