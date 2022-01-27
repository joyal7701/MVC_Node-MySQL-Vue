 const validateName = fullname => {
    if (!fullname.length) {
      return { valid: false, error: "This field is required" };
    }
    return { valid: true, error: null };
  };
  
  const validatePhone = phone => {
    if (!phone.length) {
      return { valid: false, error: 'This field is required.' };
    }
  
    if (!phone.match(/^[+][(]?[0-9]{1,3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,7}$/gm)) {
      return { valid: false, error: 'Please, enter a valid international phone number.' };
    }
  
    return { valid: true, error: null };
  }
  
  const validateEmail = email => {
    if (!email.length) {
      return { valid: false, error: "This field is required" };
    }
    if (!email.match(/^\w+([.-]?\w+)_@\w+(_[_.-]?\w+)_(.\w{2,3})+$/)) {
      return { valid: false, error: "Please, enter a valid email." };
    }
    return { valid: true, error: null };
  };
  
  export default {validateName, validatePhone, validateEmail};