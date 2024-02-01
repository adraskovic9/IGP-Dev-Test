export const fetchFormFields = () => {
    return fetch('https://api.jsonbin.io/v3/b/65b36376dc746540189b4299')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      });
  };
  